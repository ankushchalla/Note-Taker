
let fs = require('fs');

module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        fs.readFile('./db/db.json', function (err, data) {
            res.send(data);
        })
    });

    app.post('/api/notes', (req, res) => {
        let title = req.body.title;
        let text = req.body.text;
        let allNotes = JSON.parse(fs.readFileSync('./db/db.json'));
        let newNote = {
            id: allNotes.length , 
            title: title,
            text: text
        }
        allNotes.push(newNote);
        res.send(newNote);
    });

    app.delete('/api/notes:id', (req, res) => {

    });
}