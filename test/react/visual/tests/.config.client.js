export default {
  initialHtml: `
    <!doctype html>
    <head>
      <link rel="stylesheet" href="/app.css" />
      <link href="https://fonts.googleapis.com/css?family=News+Cycle|PT+Sans" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.4.1/themes/prism-okaidia.min.css" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    </head>
    <html>
      <body>
        <div id="container">
          <div id="preview"></div>
        </div>
      </body>
    </html>
  `,
  getHeight (document) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(document.getElementById('container').scrollHeight + 14)
      }, 100)
    })
  }
}
