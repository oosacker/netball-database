const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'natsuki',
  password: '1234',
  database: 'netball'
});
connection.connect();

connection.query('SELECT * FROM players WHERE players.team=1', (err, rows, fields) => {
    if (err) throw err;
    console.log(rows);
});

connection.end();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));