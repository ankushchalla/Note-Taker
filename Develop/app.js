const express = require('express');

let app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.json());


require('./routes/api_routes')(app);
require('./routes/html_routes')(app);


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

