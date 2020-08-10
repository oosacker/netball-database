const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));