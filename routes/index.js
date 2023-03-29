var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const songs = [];

// POST route to add a new song
router.post('/songs', (req, res) => {
  const { title, artist, album } = req.body;
  if (!title || !artist || !album) {
    return res.status(400).json({ error: 'Please provide title, artist, and album for the song.' });
  }
  const newSong = { title, artist, album };
  songs.push(newSong);
  res.status(201).json(newSong);
});

// GET route to retrieve all songs
router.get('/songs', (req, res) => {
  res.json(songs);
});

module.exports = router;


/* app.get('/viewAll', function(req, res){
  res.send('Data sent successfully!');
});

app.post('/addSongs', function(req, res){
  res.send('Data received successfully!');
}); */

/* app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function () {
  console.log("Server is running on localhost3000");
}); */

module.exports = router;
