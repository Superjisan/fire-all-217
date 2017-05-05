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

//ONLY do this on prod
if (process.env.PORT) {
    heroku.ping({
        interval: 300000,     // milliseconds, defaults to 30 minutes
        silent: false,       // logging (default: false)
        apps: [{
            name: 'fire-all-217', // heroku app name - required
            secure: true      // requires https (defaults: false)
        }]
    });
}
