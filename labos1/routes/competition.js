
import express from 'express';
import fs from 'fs';
var router = express.Router()

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

    let data = JSON.parse(fs.readFileSync('natjecanja.json'));

    data[competitionId - 1].rounds[roundOrder - 1].matches[matchIndex].competitorOneScore = competitorOneScore;
    data[competitionId - 1].rounds[roundOrder - 1].matches[matchIndex].competitorTwoScore = competitorTwoScore;

    fs.writeFileSync('natjecanja.json', JSON.stringify(data, null, 2));

    res.redirect(`/${competitionId}`);
});

export const competitionRouter = router;