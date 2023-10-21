var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/create', (req, res) => {
    res.render('addCompetition', { isAuthenticated: req.oidc.isAuthenticated() });
});

router.post('/create', (req, res) => {
    const { competitionName, competitors, scoringSystem } = req.body;

    // Assuming your competitions have a unique ID, generate it here
    const generatedID = generateID(); // You need to implement this function

    // Logic to save the competition to the JSON file
    let competitions = []; // Read competitions from file
    // Modify competitions object
    competitions.push({
        id: generatedID,
        ime: competitionName,
        // Add other properties as needed
    });
    // Write back to file

    // Redirect to the competition page with the generated ID
    res.redirect(`/${generatedID}`);
});

function generateID() {
    const timestamp = new Date().getTime().toString();
    const randomNum = Math.floor(Math.random() * 1000).toString(); // Adjust the range as needed
    const uniqueID = timestamp + randomNum;
    return uniqueID;
}

module.exports = router;