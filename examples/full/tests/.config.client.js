export default {
  initialHtml: `
    <!doctype html>
    <head>
      <link rel="stylesheet" href="/public/style.css" />
    </head>
    <html>
      <body>
        <div id="preview"></div>
      </body>
    </html>
  `,
  onFrameLoaded: (document) => {
    const copyright = document.createElement('div')
    copyright.innerHTML = 'fake © Pigment Store'
    copyright.classList.add('copyright')
    document.body.appendChild(copyright)
  }
}
