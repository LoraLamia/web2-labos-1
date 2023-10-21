var express = require('express')
const fs = require('fs');
const bodyParser = require('body-parser');
var indexRouter = require('./routes/index.js')
var competitionRouter = require('./routes/competition.js');
const { auth } = require('express-openid-connect')
require('dotenv').config()


const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER
};

var app = express()
app.set('views', 'views')
//direktorij views
app.set('view engine', 'ejs')
//za viewove koristimo ejs
app.use(express.json())
//to je da svaki json koji dode moze biti hendlan (middlewear za dolazne podatke)
app.use(express.urlencoded({extended:true}))
//ovo sluzi da zahtjev koji ima query parametre moze biti hendlan (isto middlewear)
//"extended:true" znaci da mozemo hendlat ugnijezdene podatke
app.use(express.static('public'))
//za posluzivanje statickih stvari koje se nalaze u direktoriju 'public' prije ikakvih ruta(slike,...)

app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({extended: true}))

app.use(auth(config));
//AUTH!!!

app.use('/', indexRouter)
app.use('/', competitionRouter);

app.listen(3000, () => {
    console.log("express is running")
})