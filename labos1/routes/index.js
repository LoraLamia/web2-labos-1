import express from 'express';
import fs from 'fs';
var router = express.Router()

router.get('/', (req, res) => {
    fs.readFile('natjecanja.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const competitions = JSON.parse(data);
        res.render('index', { 
            title: 'Competitions', 
            competitions: competitions,
            isAuthenticated: req.oidc.isAuthenticated(),
            user: req.oidc.user
        });
    });
});

export const indexRouter = router;