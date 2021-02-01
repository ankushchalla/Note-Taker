
let fs = require('fs');

module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        let data = JSON.parse(fs.readFileSync('./db/db.json'));
        res.json(data);
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
        allNotes.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(allNotes), function (err) {
            if (err) throw err;
        });
        res.send(newNote);
    });

    app.delete('/api/notes/:id', (req, res) => {
        console.log("delete request");
        let id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.sendStatus(400)
        }
        else {
            let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
            data.splice(id, 1);
            for (let i = 0; i < data.length; i++) {
                data[0].id = i;
            }
            fs.writeFile('./db/db.json', JSON.stringify(data), function (err) {
                if (err) throw err;
            });
        }
    });
}