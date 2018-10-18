const Promise = require('bluebird');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log('MongoDB connected');
})

let repoSchema = mongoose.Schema({
  username: String,
  repo_name: String,
  id: Number,
  size: Number,
  url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  return new Promise((resolve, reject) => {
    repos.forEach(repo => {
      Repo.find({ id: repo.id })
      .then((result) => {
        if (result.length > 0) {
          console.error('Repo already in database!');
        } else {
          new Repo(repo).save();
        }
      })
    })
    resolve('success');
  })
}

module.exports.save = save;
module.exports.Repo = Repo;