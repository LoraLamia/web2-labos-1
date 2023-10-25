import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import { indexRouter } from './routes/index.js';
import { competitionRouter } from './routes/competition.js';
import { addCompetitionRouter } from './routes/addCompetition.js';
import { auth } from 'express-openid-connect';
import dotenv from 'dotenv';
dotenv.config();

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

app.set('view engine', 'ejs')

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use(express.static('public'))

app.use(bodyParser.json() );      
app.use(bodyParser.urlencoded({extended: true}))

app.use(auth(config));

app.use('/', indexRouter)
app.use('/', competitionRouter);
app.use('/addCompetition', addCompetitionRouter);

app.listen(3000, () => {
    console.log("express is running")
})