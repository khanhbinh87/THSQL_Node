import express from 'express'
import initWebRoutes from './routes/web'
import configViewEngine from './config/viewEngine'
import bodyParser from 'body-parser'
import connectDB from './config/connectDB'
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

//connectDB
// connectDB();
/**
 * init web routes
 */
initWebRoutes(app)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running port : ${PORT}`)
})
