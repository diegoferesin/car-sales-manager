const express = require('express');
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const app = express();

const mongodb = require('./data/database');

const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

app.use(bodyParser.json())
    .use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    }))
    .use(passport.initialize())
    .use(passport.session());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-Width, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', require('./routes'));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
(accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}
));

passport.serializeUser((user, done) => {
done(null, user);
});

passport.deserializeUser((user, done) => {
done(null, user);
});

app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out')
});

app.get('/github/callback', passport.authenticate('github', {failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);

mongodb.initDb((err, db) => {
    try {
        app.listen(port, () => { console.log(`Server listening on port ${port}. Database is up`) });
    }
    catch (err) {
        console.log(err);
    }
});