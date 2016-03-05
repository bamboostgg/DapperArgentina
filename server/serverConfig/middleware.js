'use strict';
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

var config = require('../config');
var utils = require('./utils');


passport.use(new GitHubStrategy({
  clientID: config.githubClientId,
  clientSecret: config.githubSecret,
  callbackURL: 'http://104.236.168.119:3000//auth/github/callback'
}, function(accessToken, refreshToken, profile, done) {
  done(null, {
    accessToken: accessToken,
    profile: profile
  });
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = (app, express) => {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  app.use(session({secret: 'it\'s a secret'}));
  app.use(passport.initialize());
  app.use(passport.session());


  app.use('/app', express.static(__dirname + '/../../client'));
;
};

