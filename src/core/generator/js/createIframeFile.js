const path = require('path')
const readCategory = require('./readCategory')

const renderIframeFile = (category, styleguideDir) => {
  const pathToPigmentStore = path.relative(styleguideDir, path.join(__dirname, '../../../'))
  return `
    /* This is a generated file ! Do not override or your changes will be lost on next compilation */
    const category = ${category.render()}
    import renderIframe from '${pathToPigmentStore}/react/renderIframe'
    renderIframe(category)
  `
}

module.exports = function createIframeFile (testDir, indexDir) {
  const indexCategory$ = readCategory(testDir, testDir, indexDir)
  return indexCategory$
    .map((category) => renderIframeFile(category, indexDir))
}
