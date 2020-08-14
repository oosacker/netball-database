const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

let database_data = [];

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'natsuki',
  password: '1234',
  database: 'netball'
});
connection.connect();

connection.query(
        'SELECT players.name as player_name, players.height, players.hometown, teams.name as team_name, player_positions.position ' + 
        'FROM ((players ' +
        'INNER JOIN teams ON players.team=teams.id) ' +
        'INNER JOIN player_positions ON players.id=player_positions.player_id);', 
    (err, rows, fields) => {
        if (err) throw err;
        database_data = rows;
});

connection.end();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/players', (req, res) => {
    // console.log(database_data);
    console.log('received get request...');
    res.render('players', database_data);
});

app.post('/', (req, res) => {
    console.log(req.body);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));