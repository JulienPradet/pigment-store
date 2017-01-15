const path = require('path')
const template = require('babel-template')
const babel = require('babel-core')
const detective = require('babel-plugin-detective')

const buildImportReplacement = (t, {identifier, parent = null}) => (opts) => {
  let replacements = template(`
    function IDENTIFIER() {
      return null
    }

    IDENTIFIER.__PIGMENT_META = {
      file: FILEPATH,
      dependencies: DEPENDENCIES
    };
  `)(Object.assign({}, opts, {IDENTIFIER: identifier}))

  if (parent) {
    replacements.push(
      template(`
        IDENTIFIER.displayName = DISPLAYNAME;
      `)({IDENTIFIER: identifier, DISPLAYNAME: t.stringLiteral(`${parent}.${identifier.name}`)})
    )
  }

  return replacements
}

const isModuleDependency = (path) => {
  return !path.startsWith('/') &&
    !path.startsWith('./') &&
    !path.startsWith('../') &&
    !path.endsWith('.js')
}

const appendJs = (filepath) => filepath.endsWith('.js') ? filepath : filepath + '.js'

const getDependencies = (filepath) => {
  const filepathWithExtension = appendJs(filepath)
  var result = babel.transformFileSync(filepathWithExtension, {
    plugins: ['detective']
  })
  var metadata = detective.metadata(result)
  return metadata && metadata.strings ? metadata.strings : []
}

const buildMetaData = (t, rootpath, originpath, dependency, template) => {
  const filepath = appendJs(
    path.relative(
      rootpath,
      path.join(path.dirname(originpath), dependency)
    )
  )

  return template({
    FILEPATH: t.stringLiteral(filepath),
    DEPENDENCIES: t.arrayExpression(
      getDependencies(path.join(rootpath, filepath))
        .filter((dependency) => !isModuleDependency(dependency))
        .map((dependency) => path.join(path.dirname(filepath), dependency))
        .map((dependency) => appendJs(dependency))
        .map((dependency) => t.stringLiteral(dependency))
    )
  })
}

const extractVariable = (source) => (specifier) => {
  if (specifier.type === 'ImportDefaultSpecifier') {
    return {
      identifier: specifier.local
    }
  } else if (specifier.type === 'ImportSpecifier') {
    return {
      parent: source,
      identifier: specifier.local
    }
  } else {
    console.log(`WARNING: Unknown specifier type (${specifier.type}). Please report to https://github.com/JulienPradet/pigment-store.`)
  }
}

const isInSourceDirectory = (sourcepath, filepath) => {
  return !path.relative(sourcepath, filepath).startsWith('..')
}

const getMetasFromImportDeclaration = (rootpath, filepath, node) => {
  const source = node.source.value

  if (!isModuleDependency(source) && isInSourceDirectory(rootpath, path.join(path.dirname(filepath), source))) {
    const specifiers = node.specifiers

    let parent = path.basename(source)
    if (parent === 'index') {
      parent = path.basename(path.dirname(source))
    }

    return specifiers
      .map(extractVariable(parent))
      .map(({identifier, parent}) => ({
        source,
        identifier,
        parent
      }))
  }
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

          for (let path of body) {
            let metas = []

            if (path.isImportDeclaration()) {
              metas = getMetasFromImportDeclaration(rootpath, filepath, path.node)
            } else {
              continue
            }

            if (metas && metas.length > 0) {
              path.replaceWithMultiple(
                metas
                  .map(({source, identifier, parent}) => buildMetaData(
                    t,
                    rootpath,
                    filepath,
                    source,
                    buildImportReplacement(t, {identifier, parent})
                  ))
                  .reduce((acc, arr) => acc.concat(arr), [])
              )
            }
          }
        }
      }
    }
  }
}
