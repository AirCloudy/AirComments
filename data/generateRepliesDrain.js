const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const perf = require('execution-time')();
const fs = require('fs')
var faker = require('faker')
const momentRandom = require('moment-random');
const random = require('random')
const million = 1000000
var randomNormal = require('random-normal');
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
// const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 2,
    min: 1
  },
  wordsPerSentence: {
    max: 4,
    min: 1
  }
});
const writeReplies = fs.createWriteStream('../generatedData/replies.csv');
writeReplies.write('username_id,song_id\n', 'utf8');

function generateReplies(writer, encoding, callback) {
  let i = 30*million;
  let id = 0;
  function write() {
    let ok = true;
    do {
      if(i%100000===0) {
        console.log((id/(30*million)*100).toFixed(2) +'%')
      }
      i -= 1;
      id += 1;
      var username_id=Math.ceil(Math.abs(randomNormal({mean: 7*million, dev:2*million})));
      while(username_id>14*million){
        username_id = Math.ceil(Math.abs(randomNormal({mean: 7*million, dev:2*million})));
      }
      var comment_id=Math.ceil(Math.abs(randomNormal({mean: 150*million, dev:20*million})));
      while(comment_id>300*million){
        comment_id = Math.ceil(Math.abs(randomNormal({mean: 150*million, dev:20*million})));
      }
      var comment = lorem.generateParagraphs(1);
      
      const data = `${comment_id},${username_id},${comment}\n`;
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

generateReplies(writeReplies, 'utf-8', () => {
  writeReplies.end();
});