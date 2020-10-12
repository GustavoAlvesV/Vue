const app = require('express')() 
//é igual ==
//const express = require('express');
//const app = express();

const consign = require('consign')
const db = require('./config/db')

app.db = db

consign()
    .include('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)


app.listen(3000, ()=>{
    console.log("Backend Executando...");
})
