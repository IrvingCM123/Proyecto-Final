import app from './app.mjs'

app.listen(app.get('port'))

console.log('Puerto-Server: ', app.get('port'))

