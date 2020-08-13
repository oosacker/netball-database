const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

let player_data = [];

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'natsuki',
  password: '1234',
  database: 'netball'
});
connection.connect();

connection.query('SELECT * FROM players WHERE team=1', (err, rows, fields) => {
    if (err) throw err;
    // console.log(rows);

    player_data = rows;
    
});

connection.end();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    console.log(player_data);
    res.render('home', player_data);
});

app.post('/', (req, res) => {
    console.log(req.body);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));