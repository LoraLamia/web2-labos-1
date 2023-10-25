
import express from 'express';
import fs from 'fs';
var router = express.Router()
import firebaseApp from '../firebase.js';

const db = firebaseApp.firestore();

router.get('/:id', async (req, res) => {
    try {
        const snapshot = await db.collection("competitions").get();
        const competitionsFromDatabase = [];
        snapshot.forEach((doc) => {
            competitionsFromDatabase.push(doc.data());
        });
        const competitionId = parseInt(req.params.id);

        const competition = competitionsFromDatabase[0]["extraKljuc"].find(comp => comp.id === competitionId);
        if (!competition) {
            console.log("Competition not found");
            return;
        }

        res.render('competition', {
            competition: competition,
            isAuthenticated: req.oidc.isAuthenticated(),
            user: req.oidc.user
        });
    } catch {

    }
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