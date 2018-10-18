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
  size: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (fields) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  Repo.find({ id: fields.id })
    .then((result) => {
      if (result.length > 0) {
        console.error('Repo already in database!');
      } else {
        new Repo(fields).save();
      }
    })
}

module.exports.save = save;
module.exports.Repo = Repo;