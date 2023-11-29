import express from 'express';
import fs from 'fs';
var router = express.Router()
import firebaseApp from '../firebase.js';

const db = firebaseApp.firestore()

router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection("competitions").get();
        const competitionsFromDatabase = [];
        snapshot.forEach((doc) => {
            competitionsFromDatabase.push(doc.data());
        });
        console.log(competitionsFromDatabase[0]["extraKljuc"]);


        res.render('index', {
            title: 'Competitions',
            competitions: competitionsFromDatabase[0]["extraKljuc"],
            isAuthenticated: req.oidc.isAuthenticated(),
            user: req.oidc.user
        });
    } catch {

    }
});

router.get('/callback', async (req, res) => {
    try {
        const snapshot = await db.collection("competitions").get();
        const competitionsFromDatabase = [];
        snapshot.forEach((doc) => {
            competitionsFromDatabase.push(doc.data());
        });
        console.log(competitionsFromDatabase[0]["extraKljuc"]);


        res.render('index', {
            title: 'Competitions',
            competitions: competitionsFromDatabase[0]["extraKljuc"],
            isAuthenticated: req.oidc.isAuthenticated(),
            user: req.oidc.user
        });
    } catch {

    }
});

export const indexRouter = router;