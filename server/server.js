import 'dotenv/config'

import express from 'express'
import userRoutes from './src/routes/user.routes.js'
import bodyParser from 'body-parser'
import cors from 'cors'
const app = express()
const port = 3000

var corsOptions = {
    origin: process.env.FE_URL,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//api version
const apiVersion = 'v1';

app.use(bodyParser.json())

app.use(`/api/${apiVersion}/user`, cors(corsOptions), userRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})