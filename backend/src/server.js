import express from 'express'
import initWebRoutes from './routes/web'
import configViewEngine from './config/viewEngine'
import configCors from './config/cors'
import initApiRoutes from './routes/api'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
require('dotenv').config()

const app = express()

/**
 * config view engine
 */
configViewEngine(app)

configCors(app)
/*
    config body parser
*/
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/**
 * config cookies
 */
app.use(cookieParser())

/**
 * init web routes
 */
initWebRoutes(app)
initApiRoutes(app)

app.use((req, res) => {
    return res.send('404 Not found')
})

const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log(`Server is running port : ${PORT}`)
})
