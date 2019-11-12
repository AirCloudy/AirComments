const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const perf = require('execution-time')();
const fs = require('fs')
const csvWriter = require('csv-write-stream');
var faker = require('faker')
const momentRandom = require('moment-random');
const random = require('random')
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);
var writer = csvWriter();
const start = new Date(2011, 8, 01);
const end   = new Date(2019, 11, 04);
const range = moment.range(start, end)
const million = 1000000
var randomNormal = require('random-normal');
const Uuid = require('cassandra-driver').types.Uuid;

//var normal = distributions.Normal(0.3 /* mean */, 1 /* std deviation */);
const commentLengthNormal = random.normal(0.2, 0.05)
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
// const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 1,
    min: 1
  },
  wordsPerSentence: {
    max: 3,
    min: 1
  }
});
const writeUsers = fs.createWriteStream('../generatedData/commentsTestCass100M.csv');
writeUsers.write('song_id|id|username|user_pic_url|content|time_posted|track_time\n', 'utf8');
var startTime = Date.now();
console.log(startTime, 'this is start')
function generateSong(writer, encoding, callback) {
  let i = 100*million;
  let id = 0;
  function write() {
    let ok = true;
    do {
      if(i%100000===0 && id!==0) {
        estimateTime(id);
      }
      i -= 1;
      id += 1;
      const commentId = Uuid.random();
      var date = momentRandom(end, start).format("YYYYMMDD")
      var year = date.slice(0,4)
      var username = faker.internet.userName();
      var user_pic = faker.image.avatar();
      var numWords = Math.ceil(Math.random()*3)
      var track_name = faker.lorem.words(numWords);
      var comment = lorem.generateParagraphs(1);
      var song_id=Math.ceil(Math.abs(randomNormal({mean: 5*million, dev:2*million})));
      while(song_id>10*million){
        song_id = Math.ceil(Math.abs(randomNormal({mean: 5*million, dev:2*million})));
      }

      var time_stamp = momentRandom().format("YYYYMMDD");
      var track_time = Math.ceil(Math.random()*400);
      const data = `${song_id}|${commentId}|${username}|${user_pic}|${comment}|${time_stamp}|${track_time}\n`;
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

generateSong(writeUsers, 'utf-8', () => {
  writeUsers.end();
});

var estimateTime = function(id) {
        var hour=0;
        var min=0;
        var sec=0;
        var end = Date.now();
       // console.log(end, 'this is end')
        console.log((id/(100*million)*100).toFixed(2) +'%')
        var ms = end - startTime;
        //console.log(ms + ' in ms');
       // console.log(id, 'this is id')
        var timeRemaining = ms / (id/((100*million-id)))
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