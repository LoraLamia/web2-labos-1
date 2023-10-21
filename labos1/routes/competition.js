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

router.post('/updateScore', (req, res) => {
    const { competitionId, roundOrder, matchIndex, competitorOneScore, competitorTwoScore } = req.body;

    console.log(competitionId, roundOrder, matchIndex, competitorOneScore, competitorTwoScore)

    // Load the JSON data
    let data = JSON.parse(fs.readFileSync('natjecanja.json'));

    // Update the score
    data[competitionId - 1].rounds[roundOrder - 1].matches[matchIndex].competitorOneScore = competitorOneScore;
    data[competitionId - 1].rounds[roundOrder - 1].matches[matchIndex].competitorTwoScore = competitorTwoScore;

    // Write the updated data back to the file
    fs.writeFileSync('natjecanja.json', JSON.stringify(data, null, 2));

    res.redirect(`/${competitionId}`);
});

module.exports = router;