var path = require('path')
var babel = require('babel-core')
var template = require('babel-template')
var detective = require('babel-plugin-detective')

var metaDataTemplate = template('COMPONENT.__PIGMENT_META = { file: FILEPATH, dependencies: DEPENDENCIES}')

function isModuleDependency (path) {
  return !path.startsWith('/') && !path.startsWith('.') && !path.endsWith('.js')
}

function makeMetaData (t, rootDir, variableName, importPath, fileName) {
  var result = babel.transformFileSync(path.join(path.dirname(fileName), importPath + '.js'), {
    plugins: ['detective']
  })
  var metadata = detective.metadata(result)
  var dependencies = metadata && metadata.strings ? metadata.strings : []

  function resolvePath (unresolvedPath) {
    return path.relative(rootDir, path.join(path.dirname(fileName), unresolvedPath))
  }

  return metaDataTemplate({
    COMPONENT: t.identifier(variableName),
    FILEPATH: t.stringLiteral(resolvePath(importPath)),
    DEPENDENCIES: t.arrayExpression(dependencies
      .filter((dependency) => !isModuleDependency(dependency))
      .map((dependency) => {
        return resolvePath(path.join(path.dirname(importPath), dependency))
      })
      .map((dependency) => t.stringLiteral(dependency)))
  })
}

module.exports = function (b) {
  const t = b.types
  return {
    visitor: {
      ImportDeclaration: {
        exit: function exit (path, state) {
          var variableName = path.node.specifiers[0].local.name
          var importPath = path.node.source.value
          var fileName = state.file.opts.filename

          if (!isModuleDependency(importPath)) {
            path.insertAfter(makeMetaData(t, state.opts.rootDir, variableName, importPath, fileName))
          }
        }
      },
      VariableDeclarator: {
        exit: function exit (path, state) {
          if (!path.node ||
              !path.node.init ||
              (
                !t.isIdentifier(path.node.init.callee, { name: 'require' }) &&
                !(
                  t.isMemberExpression(path.node.init.callee) &&
                  t.isIdentifier(path.node.init.callee.object, { name: 'require' })
                )
              )
          ) {
            return
          }

          var importPath = path.node.init.arguments[0].value
          var variableName = path.node.id.name
          var fileName = state.file.opts.filename

          if (!isModuleDependency(importPath)) {
            path.parentPath.insertAfter(makeMetaData(t, state.opts.rootDir, variableName, importPath, fileName))
          }
        }
      }
    }
  }
}
