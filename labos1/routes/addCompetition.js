var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/create', (req, res) => {
    res.render('addCompetition', { isAuthenticated: req.oidc.isAuthenticated() });
});

router.post('/create', (req, res) => {
    const { competitionName, competitors, scoringSystem } = req.body;

    let competitions = JSON.parse(fs.readFileSync('natjecanja.json'));

    const competitorsArray = competitors.split(',').map((competitor) => competitor.trim());
    const numberOfCompetitors = competitorsArray.length;

    if (numberOfCompetitors >= 4 && numberOfCompetitors <= 8) {
        const scheduleTemplate = JSON.parse(fs.readFileSync('schedules.json'))[numberOfCompetitors.toString()];

        const schedule = JSON.parse(JSON.stringify(scheduleTemplate).replace(/Competitor \d/g, (match) => {
            const index = parseInt(match.split(' ')[1]) - 1;
            return competitorsArray[index];
        }));

        // Generate ID for the new competition
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

        // Add the newly created competition to the competitions array
        const newCompetition = {
            id: newId,
            name: competitionName,
            author: "Some Author", // Add the actual author here
            email: "example@example.com", // Add the actual email here
            competitors: competitors,
            scoringSystem: scoringSystem,
            rounds: schedule,
        };

        competitions.push(newCompetition);

        fs.writeFileSync('natjecanja.json', JSON.stringify(competitions, null, 2));

        res.redirect('/');
    } else {
        res.send('Invalid number of competitors');
    }
});

module.exports = router;