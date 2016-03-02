var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db/database');
var app = express();

var Issues = require('./models/issues');
Issues = new Issues();
var Repos = require('./models/repos');
Repos = new Repos();
var User = require('./models/user');
User = new User();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

var port = process.env.PORT || 3000;

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

console.log(`server running on port ${port} in ${process.env.NODE_ENV} mode`);
// start listening to requests on port 3000
app.listen(port);

// export our app for testing and flexibility, required by index.js
module.exports = app;
