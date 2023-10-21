var express = require('express')
var router = express.Router()
const fs = require('fs');

router.get('/:id', (req, res) => {
    const competitionId = parseInt(req.params.id);
    fs.readFile('natjecanja.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const competitions = JSON.parse(data);
        const competition = competitions.find(comp => comp.id === competitionId);
        if (!competition) {
            console.log("Competition not found");
            return;
        }

        res.render('competition', {
            competition: competition,
            isAuthenticated: req.oidc.isAuthenticated(),
            user: req.oidc.user
        });
    });
});

module.exports = router;