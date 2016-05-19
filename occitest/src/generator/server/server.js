import express from 'express'

const app = express()

app.get('/favicon.ico', function(req, res) {})

app.use('/js', express.static(__dirname + '/js'));

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

const webServer = app.listen(3000, function() {
  var host = webServer.address().address
  var port = webServer.address().port

  console.log('Access quizz app at http://%s:%s', host, port)
})
