const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let repos;
  let options = {
    url: `https://api.github.com/users/${username}/repos?per_page=100`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (err, res, body) => {
    if (err) {
      console.log('error: ', err)
    } else {
      repos = JSON.parse(body).map(repo => {
        return {username: repo.owner.login, repo_name: repo.name, id: repo.id, size: repo.size};
      })
      callback(null, repos);
    }
  })
}

module.exports.getReposByUsername = getReposByUsername;