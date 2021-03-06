const express = require('express');
const bodyParser = require('body-parser');
const getRepos = require('../helpers/github.js');
const db = require('../database/index.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  getRepos.getReposByUsername(req.body.username, (err, repos) => {
    if (err) {
      console.log('ERROR');
    } else {
      db.save(repos)
      .then(message => {
        res.send(message);
      })
    }
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.Repo.find({})
    .sort({size: 'desc'})
    .limit(25)
    .exec((err, repos) => {
      if (err) console.error(err);
      res.json(repos);
    })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

