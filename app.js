const express = require('express');
const heroku = require('heroku-ping');

const app = express();

app.use(express.static('src'));

app.get('/', (req, res) => {
    res.render('index.html');
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    /* eslint-disable no-console */
    console.log(`Server started at ${PORT}`);
});