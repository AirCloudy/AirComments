// write_stream.js

const fs = require('fs');
const perf = require('execution-time')();
var JSZip = require("jszip");
var zip = new JSZip();

let writeStream = fs.createWriteStream('./secret.csv');

var newData='id, song_id, user_id, content, time, track_time';
//newData.push({})
for(var i=0; i<10000000; i++) {
  newData = newData.concat(`\n${i},${i},${i},test content,1,1`)
}

//newData = JSON.stringify(newData)


perf.start();
// write some data with a UTF8 encoding
writeStream.write(newData, 'UTF8');

// the finish event is emitted when all data has been flushed from the stream
writeStream.on('finish', () => {
    console.log('wrote all data to file');
});

// close the stream
writeStream.end();

//at end of your code
const results = perf.stop();
console.log(results.time + ' ms');  // in milliseconds