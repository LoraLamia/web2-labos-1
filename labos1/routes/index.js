var express = require('express')
var router = express.Router()
const fs = require('fs');

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

module.exports = router