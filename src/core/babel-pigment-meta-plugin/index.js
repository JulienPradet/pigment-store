const path = require('path')
const template = require('babel-template')
const babel = require('babel-core')
const detective = require('babel-plugin-detective')

const buildInitialExport = template(`
  module.exports = {
    __esModule: true
  };
`)

const buildExportDefault = template(`
  module.exports.default = {
    __PIGMENT_META: {
      file: FILEPATH,
      dependencies: DEPENDENCIES
    }
  };
`)

const buildExportNamed = (identifier) => (opts) => template(`
  module.exports.COMPONENT = {
    __PIGMENT_META: {
      file: FILEPATH,
      dependencies: DEPENDENCIES
    }
  };
`)(Object.assign({}, opts, {COMPONENT: identifier}))

const isModuleDependency = (path) => {
  return !path.startsWith('/') &&
    !path.startsWith('./') &&
    !path.startsWith('../') &&
    !path.endsWith('.js')
}

const getDependencies = (filepath) => {
  const filepathWithExtension = filepath.endsWith('.js') ? filepath : filepath + '.js'
  var result = babel.transformFileSync(filepathWithExtension, {
    plugins: ['detective']
  })
  var metadata = detective.metadata(result)
  return metadata && metadata.strings ? metadata.strings : []
}

const buildMetaData = (t, rootpath, filepath, template) => {
  return template({
    FILEPATH: t.stringLiteral(path.relative(rootpath, filepath)),
    DEPENDENCIES: t.arrayExpression(
      getDependencies(filepath)
        .filter((dependency) => !isModuleDependency(dependency))
        .map((dependency) => (
          path.relative(rootpath, path.join(path.dirname(filepath), dependency))
        ))
        .map((dependency) => dependency.endsWith('.js') ? dependency : dependency + '.js')
        .map((dependency) => t.stringLiteral(dependency))
    )
  })
}

module.exports = function (b) {
  const t = b.types

  return {
    visitor: {
      Program: {
        exit (mainPath, state) {
          const body = mainPath.get('body')
          const rootpath = state.opts.rootDir
          const filepath = state.file.parserOpts.sourceFileName

          console.log(filepath)

          if (filepath.startsWith(rootpath)) {
            mainPath.unshiftContainer('body', buildInitialExport())

            for (let path of body) {
              if (path.isExportDefaultDeclaration()) {
                path.replaceWith(
                  buildMetaData(t, rootpath, filepath, buildExportDefault)
                )
              } else if (path.isExportNamedDeclaration()) {
                if (path.node.specifiers.length > 0) {
                  let exports = path.node.specifiers.map((specifier) => (
                    buildMetaData(t, rootpath, filepath, buildExportNamed(specifier.local))
                  ))
                  path.replaceWithMultiple(exports)
                } else {
                  path.replaceWith(
                    buildMetaData(t, rootpath, filepath, buildExportNamed(path.node.declaration.declarations[0].id))
                  )
                }
              } else {
                path.remove()
              }
            }
          }
        }
      }
    }
  }
}
