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
//var normal = distributions.Normal(0.3 /* mean */, 1 /* std deviation */);
const commentLengthNormal = random.normal(0.2, 0.1)

const writeUsers = fs.createWriteStream('../generatedData/song.csv');
writeUsers.write('artist_id,track_name,release_date,p_line,c_line,language_rating\n', 'utf8');
var startTime = Date.now();
function generateSong(writer, encoding, callback) {
  let i = 11*million;
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
        console.log((id/(11*million)*100).toFixed(2) +'%')
        var ms = end - startTime;
        //console.log(ms + ' in ms');
       // console.log(id, 'this is id')
        var timeRemaining = ms / (id/((11*million-id)))
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
      var date = momentRandom(end, start).format("YYYYMMDD")
      var year = date.slice(0,4)
      var company = faker.company.companyName()
      var company2 = faker.company.companyName()
      const username = faker.internet.userName();
      var numWords = Math.ceil(Math.random()*5)
      var track_name = faker.lorem.words(numWords);
      const avatar = faker.image.avatar();
      var p_line =`&#8471; ${company}; &#8471; ${year} ${company} LLC under exclusive license to ${company2} Inc.`;
      var c_line=`&#169; ${year} &#169; ${year} ${company} LLC under exclusive license to ${company2} Inc.`;
      var language_rating = 'explicit'
      while(p_line.includes(',')) {
        p_line = p_line.replace(',', '')
      }
      while(c_line.includes(',')) {
        c_line = c_line.replace(',', '')
      }
      var artist_id=Math.ceil(Math.abs(randomNormal({mean: 0.5*million, dev:0.2*million})));
      while(artist_id>1*million){
        artist_id = Math.ceil(Math.abs(randomNormal({mean: 0.5*million, dev:0.2*million})));
      }
 
      const data = `${artist_id},${track_name},${date},${p_line},${c_line},${language_rating}\n`;
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