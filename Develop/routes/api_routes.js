
let fs = require('fs');

module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        fs.readFile('./db/db.json', function (err, data) {
            res.send(data);
        });
    });

    app.post('/api/notes', (req, res) => {
        let title = req.body.title;
        let text = req.body.text;
        let allNotes;
        try {
            allNotes = JSON.parse(fs.readFileSync('./db/db.json'));
        }
        catch (error) {
            // If the JSON file is empty, create a new array to hold the note objects. 
            if (error.message === "Unexpected end of JSON input") {
                allNotes = [];
            }
            else {
                throw error;
            }
        }
        let newNote = {
            id: allNotes.length, 
            title: title,
            text: text
        }
        console.log(newNote);
        allNotes.push(newNote);
        res.send(newNote);
        console.log("allNotes", allNotes);
    });

    app.delete('/api/notes:id', (req, res) => {

    });
}