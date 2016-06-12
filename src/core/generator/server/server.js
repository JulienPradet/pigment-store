import express from 'express'
import path from 'path'

const app = express()

app.get('/favicon.ico', function (req, res) {})

app.use('/', express.static(__dirname))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

const webServer = app.listen(3000, function () {
  var host = webServer.address().address
  var port = webServer.address().port

  console.log('Access quizz app at http://%s:%s', host, port)
})
