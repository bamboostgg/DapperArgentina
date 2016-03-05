const serverUrl = 'http://localhost:3000';
//const serverUrl = 'http://45.55.29.22:3000';
// const serverUrl = 'http://104.236.168.119:3000';
const $ = require('jquery');

module.exports = {};

var issues = [];
var languages = [];

var getIssuesFromApi = function (successCallback, errCallback) {
  var options = {
    url: serverUrl + '/api/issues',
    type: 'GET',
    success: successCallback,
    error: errCallback
  };

  $.ajax(options);  
};

module.exports.getIssues = function(successCallback, errCallback, searchTerm, language) {
  if (issues.length === 0) {
    getIssuesFromApi((data) => {
      issues = data;
      if (searchTerm || language) {
        return successCallback(returnFilteredIssues(searchTerm, language));
      }
      return successCallback(issues);
    }, errCallback);
  } else {
    if (searchTerm || language) {
      return successCallback(returnFilteredIssues(searchTerm, language));
    }
    return successCallback(issues);
  }
};

module.exports.getIssuesByRepoId = function(id, successCallback) {
  module.exports.getIssues(() =>{
    var filtered = issues.filter((issue) => (issue.repo_id.toString() === id));
    successCallback(filtered);
  }, (err) => console.log(err), null, null);
};

var returnFilteredIssues = function(searchTerm, language) {
  var results = [];
  
  issues.forEach((issue) => {
    var languageMatch = true;
    var searchMatch = true;
    
    //handle null language issues
    issue.language = issue.language || '';
    if(language) {
      languageMatch = (language.toLowerCase() === issue.language.toLowerCase());
    }
    
    if(searchTerm) {
      var searchMatch = ( (issue.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                          (issue.org_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                            (issue.repo_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
                        );                   
    }
    
    if (languageMatch && searchMatch) {
      results.push(issue);
    }
  });
  
  return results;
};


