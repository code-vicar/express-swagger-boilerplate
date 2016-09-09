import http from 'http'
import appInit from './app'

const port = (process.env.PORT) ? process.env.PORT : 1337

appInit.then(function(app) {
    const server = http.createServer(app)
    server.listen(port, 'localhost', function () {
        app.swagger.api.host = server.address().address + ':' + server.address().port;
        console.info(`listening at ${app.swagger.api.host}`)
    })
})
