const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const perf = require('execution-time')();
const fs = require('fs')
var faker = require('faker')
const momentRandom = require('moment-random');
const random = require('random')
const million = 1000000
var randomNormal = require('random-normal');
const writeFollowings = fs.createWriteStream('../generatedData/followings.csv');
writeFollowings.write('username_id,artist_id\n', 'utf8');
var startTime = Date.now();
function generateFollowings(writer, encoding, callback) {
  let i = 50*million;
  let id = 0;
  function write() {
    let ok = true;
    do {
      if(i%100000===0 && id!==0) {
        var hour=0;
        var min=0;
        var sec=0
        var end = Date.now();
       // console.log(end, 'this is end')
        console.log((id/(50*million)*100).toFixed(2) +'%')
        var ms = end - startTime;
        //console.log(ms + ' in ms');
       // console.log(id, 'this is id')
        var timeRemaining = ms / (id/((50*million-id)))
       // console.log((timeRemaining/1000).toFixed(2) + " sec left")
        var timeSec = Math.round(timeRemaining/1000)
        while(timeSec>=3600) {
          hour++
          timeSec = timeSec-3600;
        }
        while(timeSec>=60) {
          min++
          timeSec = timeSec-60;
        }
        console.log(hour + ' hours ' + min + ' min ' + timeSec + ' secs')
      }
      i -= 1;
      id += 1;
      var username_id=Math.ceil(Math.abs(randomNormal({mean: 7*million, dev:2*million})));
      while(username_id>14*million){
        username_id = Math.ceil(Math.abs(randomNormal({mean: 7*million, dev:2*million})));
      }
      var artist_id=Math.ceil(Math.abs(randomNormal({mean: 0.5*million, dev:0.1*million})));
      while(artist_id>1*million){
        artist_id = Math.ceil(Math.abs(randomNormal({mean: 0.5*million, dev:0.1*million})));
      }
      
      const data = `${username_id},${artist_id}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}

generateFollowings(writeFollowings, 'utf-8', () => {
  writeFollowings.end();
});