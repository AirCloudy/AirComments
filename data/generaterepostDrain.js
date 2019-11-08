const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const perf = require('execution-time')();
const fs = require('fs')
var faker = require('faker')
const momentRandom = require('moment-random');
const random = require('random')
const million = 1000000
var randomNormal = require('random-normal');
const writeRepost = fs.createWriteStream('../generatedData/repost.csv');
writeRepost.write('username_id,song_id\n', 'utf8');

function generateRepost(writer, encoding, callback) {
  let i = 100*million;
  let id = 0;
  function write() {
    let ok = true;
    do {
      if(i%100000===0) {
        console.log((id/(100*million)*100).toFixed(2) +'%')
      }
      i -= 1;
      id += 1;
      var username_id=Math.ceil(Math.abs(randomNormal({mean: 7000000, dev:2000000})));
      while(username_id>10000000){
        username_id = Math.ceil(Math.abs(randomNormal({mean: 7000000, dev:2000000})));
      }
      var song_id=Math.ceil(Math.abs(randomNormal({mean: 5000000, dev:2000000})));
      while(song_id>10000000){
        song_id = Math.ceil(Math.abs(randomNormal({mean: 5000000, dev:2000000})));
      }
      
      const data = `${username_id},${song_id}\n`;
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

generateRepost(writeRepost, 'utf-8', () => {
  writeRepost.end();
});