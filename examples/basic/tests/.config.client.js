export default {
  initialHtml: `
    <!doctype html>
    <html>
      <body>
        <div id="preview"></div>
      </body>
    </html>
  `,
  onFrameLoaded: (document) => {
    return new Promise((resolve, reject) => {
      const copyright = document.createElement('div')
      copyright.innerHTML = 'fake © Pigment Store'
      copyright.classList.add('copyright')
      console.log(document.body.appendChild(copyright))
      resolve()
    })
  }
}
