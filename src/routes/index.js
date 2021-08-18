const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
require('express-async-errors')
const { NotFoundMiddleware, ErrorMiddleWare } = require('../middlewares')

module.exports = function ({ HomeRoutes }) {
    const router = express.Router()
    const apiRoutes = express.Router()

    apiRoutes
        .use(express.json())
        .use(cors())
        .use(helmet())
        .use(compression())
        .use(morgan('dev'))

    apiRoutes.use('/home', HomeRoutes)

    router.use('/v1/api', apiRoutes)

    router.use(NotFoundMiddleware)
    router.use(ErrorMiddleWare)

    return router
}