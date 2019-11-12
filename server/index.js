// Importing express framework, body-parser for post requests
require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var commentsRouter = require('./routers/comments.js');
var cors = require('cors');
var db = require('../db/models/song.js')
const Uuid = require('cassandra-driver').types.Uuid;

// Set PORT# to listen on
const PORT = 4000;

// Create server
const app = express();

app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));
app.use('/songs/:id', express.static(path.join(__dirname, '../public')));

app.get('/songs/:id/comments', (req,res) => {
  //var id = Math.ceil(Math.random()*10000000)
  var id = req.url.split('/')[2]
  id = Number(id)

  db.getCommentsBySongId(id)
  .then((data)=>{
    res.send(data)
    })
})

app.post('/songs/:id/comments', (req,res)=> {
  var id = Math.ceil(Math.random()*10000000)
  const commentId = Uuid.random();
  var comment={
    song_id: id,
    id:commentId,
    username: 'testuser',
    user_pic_url: 'http:// test',
    content: "nice song",
    time_posted: '20191108',
    track_time: 123
  }
  db.postCommentBySongId(comment)
  .then(()=>{
    //console.log('posted')
    res.send('posted')
    })
})


// listen on port
app.listen(PORT, console.log('Listening on port', PORT));