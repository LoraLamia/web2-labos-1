import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import { indexRouter } from './routes/index.js';
import { competitionRouter } from './routes/competition.js';
import { addCompetitionRouter } from './routes/addCompetition.js';
import { auth } from 'express-openid-connect';
import dotenv from 'dotenv';
import { initializeApp } from "firebase/app";
dotenv.config();

const firebaseConfig = {
    apiKey: "AIzaSyBCAQNniW9AG7Frv0zPv87xdB3YTcYQGLk",
    authDomain: "labos1-66e00.firebaseapp.com",
    projectId: "labos1-66e00",
    storageBucket: "labos1-66e00.appspot.com",
    messagingSenderId: "978661393928",
    appId: "1:978661393928:web:4041c8a1287ce2c4d873bd",
    measurementId: "G-001KKGVHK2"
};

const app2 = initializeApp(firebaseConfig);


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

app.use(bodyParser.json() );      
app.use(bodyParser.urlencoded({extended: true}))

app.use(auth(config));
//AUTH!!!

app.use('/', indexRouter)
app.use('/', competitionRouter);
app.use('/addCompetition', addCompetitionRouter);

app.listen(3000, () => {
    console.log("express is running")
})