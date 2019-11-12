const cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: ['127.0.0.1'],localDataCenter: 'datacenter1',keyspace: 'testkeyspace'});

client.connect(function (err) {
  if(err) {
    console.log('error connecting to database');
    console.log(err);
  } else {
    console.log('connect to db');
  }
});

const getCommentsBySongId = function(id) {
  let query = `SELECT * FROM testkeyspace.commentsBySongId WHERE song_id = ${id};`;
 // console.log('query');
  return client.execute(query);
}

const getartistsBySongId = function(id) {
  let query = `SELECT * FROM testkeyspace.artistsBySongId WHERE song_id = ${id};`;
  return client.execute(query);
}

const postCommentBySongId = function(comment) {

  //var song_id =comment.song_id
  var song_id=2;
  var commentid=comment.id
  var username=comment.username
  var user_pic_url=comment.user_pic_url
  var content=comment.content
  var time_posted=comment.time_posted
  var track_time=comment.track_time
  let query = `Insert into testkeyspace.commentsbysongid(song_id,id,username,user_pic_url,content,time_posted,track_time) values (${song_id},${commentid},'${username}','${user_pic_url}','${content}','${time_posted}',${track_time});`
  let query2=`Insert into testkeyspace.commentsbysongid(song_id,id,username,user_pic_url,content,time_posted,track_time) values (5000200,20,'tes
  tname','http://test','test comment','20191108',123);`
  return client.execute(query);
}

module.exports.getCommentsBySongId = getCommentsBySongId;
module.exports.getartistsBySongId = getartistsBySongId;
module.exports.postCommentBySongId = postCommentBySongId;