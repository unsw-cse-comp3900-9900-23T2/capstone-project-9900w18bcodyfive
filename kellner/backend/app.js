const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
app.use(express.json({limit: "50mb", extended: true}))
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}))
app.use(cors())

//app.use(bodyParser.urlencoded({ extended: false }))


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
    next();
})

const kelRouter = require('./Routers/routes.js')
app.use(kelRouter)


module.exports = app;