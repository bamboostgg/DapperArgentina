var request = require('request');
var config = require('../config');

var utils = require('./utils');
var Promise = require('bluebird');
Promise.promisifyAll(utils);

var Issues = require('../models/issues');
Issues = new Issues();
var Repos = require('../models/repos');
Repos = new Repos();
var User = require('../models/user');
User = new User();

module.exports = function(app, express) {

  app.route('/api')
    .get(function(req, res){
      res.send('Hello World');
    });

  app.route('/api/issues')
    .get(function(req, res) {
      Issues.getIssues()
      .then((results) => res.send(results))
      .catch((err) => {
        console.log(err);
        res.statusCode = 501;
        res.send('Unknown Server Error');
      });
    });

  app.route('/api/repos')
    .get(function(req, res){
      Repos.getRepos()
      .then((results) => res.send(results))
      .catch(() => {
        res.statusCode = 501;
        res.send('Unknown Server Error');
      });
    });


  app.route('/api/user')
    .get(function(req, res){
      User.getUserAsync(req.session.userHandle)
      .then((userObj) => {
        res.send(userObj);
      })
    })

  // GitHub redirects user to /login/auth endpoint after login
  app.get('/login/auth', function(req, res) {
    req.session.user = true;

    // Make initial request to GitHub OAuth for access token
    utils.getAccessTokenAsync(req.query.code)
    .then(function(result) {
      var access_token = result.body;
      req.session.access_token = access_token;

      // Make request to github for current user information
      utils.getUserInfoAsync(access_token)
      .then(function(result) {
        // Format user object so that it can be consumed by mysql
        var userObj = utils.formatUserObj(JSON.parse(result.body));
        req.session.userHandle = userObj.login;

        // Check if current user exists in the db
        User.getUserAsync(userObj.login)
        .then(function(user) {
          if (user.length === 0) {
            // If user is not in db, insert new user
            User.makeNewUserAsync(userObj)
            .then(function(data) {
              console.log('new user created in db: ', data);
            }).catch(utils.logError);
          } else {
            // If user is currently in db, update user data
            User.updateUserAsync(userObj)
            .then(function(data) {
              console.log('user updated: ', data);
            })
            .catch(utils.logError);
          }
        }).catch(utils.logError);
      }).catch(utils.logError);
    }).catch(utils.logError);

    res.redirect('/');
  });
}
