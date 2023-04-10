import express from 'express'
import initWebRoutes from './routes/web'
import configViewEngine from './config/viewEngine'
import bodyParser from 'body-parser'
// import connectDB from './config/connectDB'
import configCors from './config/cors'
import initApiRoutes from './routes/api'
require('dotenv').config()
import { createJWT, verifyToken } from './middleware/JWTActions'
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

configCors(app)

createJWT()

verifyToken(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmluaCIsImFkZHJlc3MiOiJoY20iLCJpYXQiOjE2ODExMDYwODZ9.dRl8Tx3DJa4wAD854Y4e5wUzNX8lym_2YMIR9na91yc'
)

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
