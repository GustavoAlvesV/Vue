const app = require('express')() 
//é igual ==
//const express = require('express');
//const app = express();

const consign = require('consign')
const db = require('./config/db')

const mongoose = require('mongoose')
require('./config/mongodb') // Estou chamando require aqui, so para ele chamar o arquivo e 
                            // automaticamente estabelecer uma conexao com mongodb

app.db = db
app.mongoose = mongoose // a partir do app.mongoose => consigo fazer model, find, conseguir inserir os dados.





consign()
    .include('./config/passport.js')
    .include('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./schedule/statsSchedule.js')
    .then('./config/routes.js')
    .into(app)


app.listen(3000, ()=>{
    console.log("Backend Executando...");
})
