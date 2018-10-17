const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log('MongoDB connected');
})

let repoSchema = mongoose.Schema({
  username: String,
  repos: Array
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (collection, fields) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  collection.insertOne(fields)
}

module.exports.save = save;