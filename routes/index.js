var express = require('express');
var router = express.Router();

let serverArray = [];

var SongObject = function (songname, artist, album) {
  this.ID=Math.random().toString(16).slice(5);
  this.songname=songname;
  this.artist=artist;
  this.album=album;
}

var fs = require("fs");

let fileManager = {
  read: function() {
    var rawdata = fs.readFileSync('objectdata.json');
    let goodData = JSON.parse(rawdata);
    serverArray = goodData;
  },

  write: function() {
    let data = JSON.stringify(serverArray);
    fs.writeFileSync('objectdata.json', data);
  }, 

  validData: function() {
    var rawdata = fs.readFileSync('objectdata.json');
    if(rawdata.length < 1) {
      return false;
    } else {
      return true;
    }
  }
};

if(!fileManager.validData()) {
  fileManager.write();
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const songs = [];

// POST route to add a new song
router.post('/AddSongs', function(req, res) {
  const newSong = req.body;
  console.log("Post " +newSong);
  serverArray.push(newSong);
  fileManager.write();
  res.status(200).json(newSong);
});


// GET route to retrieve all songs
router.get('/GetAllSongs', function(req, res, next) {
  console.log(req.body);
  fileManager.read();
  res.status(200).json(serverArray);
 
});


module.exports = router;
