import path from 'path'
import express from 'express'
import swaggerize from 'swaggerize-express'
import swaggerTools from 'swagger-tools'
import * as bodyParser from 'body-parser'

const app = express()
const swaggerPath = path.resolve(__dirname, './swagger.json')
const handlersPath = path.resolve(__dirname, './handlers')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(swaggerize({
    api: swaggerPath,
    handlers: handlersPath
}));

let initializeSwaggerTools = swaggerTools.initializeMiddleware

let appInit = new Promise(function (resolve, reject) {
    initializeSwaggerTools(require(swaggerPath), function (swaggerMiddleware) {
        app.use(swaggerMiddleware.swaggerUi())
        resolve(app)
    })
})

export default appInit
