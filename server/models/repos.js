
const DateDiff = require('date-diff');
const Promise = require('bluebird');
var db = require('../db/database');

var Repos = function() {
  this._repos = [];
  this._lastUpdateDate = new Date('1/1/2015');
};

Repos.prototype.getRepos = function () {
  var self = this;
  var hoursSinceLastFetch = new DateDiff(new Date(), this._lastUpdateDate).hours();
  
  if (this._repos.length === 0 ||
   hoursSinceLastFetch > 1) {
    return db.raw(`select * from repos`)
            .then((results) => {
              var RowDataArray = Object.keys(results[0]).map(k => results[0][k]);
              this._repos = RowDataArray.map(RowData => {
                var regObj = {};
                Object.keys(RowData).forEach(key => regObj[key] = RowData[key]);
                return regObj;
              })
              this._lastUpdateDate = new Date();
              return this._repos;
            });
  } else {
    return new Promise((resolve) => resolve(this._repos));
  }
};

Repos.prototype.inserRepoAsync = function(repo) {
   
    // Function to map user properties to usable SQL strings
    let userKeys = [];
    let userVals = [];
     _.each(repo,(val,key) => {
      userKeys.push( key + '');
      userVals.push( '"' + val + '"');
     })
    return db.raw(`INSERT INTO repos ( ${userKeys.join()} ) VALUES (${userVals.join()})`)
}

module.exports = Repos;

