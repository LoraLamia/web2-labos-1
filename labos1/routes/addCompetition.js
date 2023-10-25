import express from 'express';
import fs from 'fs';
var router = express.Router();
import firebaseApp from '../firebase.js';

const db = firebaseApp.firestore();

router.get('/create', (req, res) => {
    res.render('addCompetition', { isAuthenticated: req.oidc.isAuthenticated(), user: req.oidc.user });
});

router.post('/create', async (req, res) => {
    try {
        const { competitionName, competitors, scoringSystem } = req.body;
        const user = req.oidc.user

        const snapshot = await db.collection("competitions").get();
        const competitionsFromDatabase = [];
        snapshot.forEach((doc) => {
            competitionsFromDatabase.push(doc.data());
        });

        let competitions = competitionsFromDatabase[0]["extraKljuc"]

        const competitorsArray = competitors.split(',').map((competitor) => competitor.trim());
        const numberOfCompetitors = competitorsArray.length;

        if (numberOfCompetitors >= 4 && numberOfCompetitors <= 8) {
            const scheduleTemplate = JSON.parse(fs.readFileSync('schedules.json'))[numberOfCompetitors.toString()];

            const schedule = JSON.parse(JSON.stringify(scheduleTemplate).replace(/Competitor \d/g, (match) => {
                const index = parseInt(match.split(' ')[1]) - 1;
                return competitorsArray[index];
            }));

            let newId = 1;
            if (competitions.length > 0) {
                newId = competitions[competitions.length - 1].id + 1;
            }

            const rounds = schedule.map((round) => {
                return {
                    order: round.round,
                    matches: round.matches.map((match) => {
                        return {
                            competitorOne: match[0],
                            competitorTwo: match[1],
                            competitorOneScore: "TBD",
                            competitorTwoScore: "TBD"
                        };
                    })
                };
            });

            const newCompetition = {
                id: newId,
                name: competitionName,
                author: user.nickname,
                email: user.email,
                competitors: competitorsArray.join(","),
                scoringSystem: scoringSystem,
                rounds: rounds
            };

            competitions.push(newCompetition);

            const response = db.collection("competitions").doc("competitionsKey").set({"extraKljuc":competitions})
            res.redirect('/');
        } else {
            res.send('Invalid number of competitors');
        }
    } catch(error) {
        res.send(error)
    }
});

export const addCompetitionRouter = router;