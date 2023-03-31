import express from 'express'
import initWebRoutes from './routes/web'
import configViewEngine from './config/viewEngine'
import bodyParser from 'body-parser'
import connectDB from './config/connectDB'
import configCors from './config/cors'
import initApiRoutes from './routes/api'
require('dotenv').config()
const app = express()

/**
 * config view engine
 */
configViewEngine(app)

/*
    config body parser
*/
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

configCors(app);
//connectDB
// connectDB();
/**
 * init web routes
 */
initWebRoutes(app)
initApiRoutes(app)
const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log(`Server is running port : ${PORT}`)
})
