const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const perf = require('execution-time')();
const fs = require('fs')
const csvWriter = require('csv-write-stream');
var faker = require('faker')
var distributions = require('distributions');
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
const songNormal = random.normal(0.5, 0.3)
//const playedNormal = random.normal(0.5, 0.5)

const dataGen =  () => {
  writer.pipe(fs.createWriteStream('../generatedData/data.csv'));
  for(var i=1; i<=100000; i++) {
    var numSentence = Math.ceil(Math.abs(commentLengthNormal())*10)
    var comment = faker.lorem.sentences(numSentence)
    var songID=randomNormal({mean: 5000000, dev:2000000});
    var userID=randomNormal({mean: 7000000, dev:2000000});
    // while(songID>10000000){
    // var songID = Math.ceil(Math.abs(songNormal())*10000000)
    // }
    // while(userID>14000000) {
    //   userID = Math.ceil(Math.abs(songNormal())*14000000)
    // }
    //var playID = Math.ceil(Math.abs(playedNormal())*1000)
    writer.write({
        song_id: Math.ceil(songID),
        username_id: Math.ceil(Math.random()*userID),
        content: comment,
        time_stamp: momentRandom().format("YYYYMMDD"),
        track_time: Math.ceil(Math.random()*400)
    })
  }
  writer.end()

}

const userGen =  () => {
  writer.pipe(fs.createWriteStream('../generatedData/user.csv'));
  for(var i=1; i<=14000000; i++) {
        if(i%100000===0) {
      console.log((i/(10*million)*100).toFixed(2) +'%')
    }
    var numSentence = Math.ceil(Math.abs(commentLengthNormal())*10)
    var comment = faker.lorem.sentences(numSentence)
    var songID=1000000000;
    var userID=1400000000;
    writer.write({
        id:i,
        username: faker.internet.userName(),
        user_pic: faker.image.avatar(),
    })
  }
  writer.end()
}

const artistGen =  () => {
  writer.pipe(fs.createWriteStream('../generatedData/artist.csv'));
  for(var i=1; i<=14000000; i++) {
    writer.write({
        artist_name: faker.internet.userName(),
        artist_pic: faker.image.avatar(),
    })
  }
  writer.end()
}

const songGen =  () => {
  writer.pipe(fs.createWriteStream('../generatedData/song.csv'));
  for(var i=1; i<=14*million; i++) {
    if(i%100000===0) {
      console.log((i/(14*million)*100).toFixed(2) +'%')
    }

    var date = momentRandom(end, start).format("YYYYMMDD")
    var year = date.slice(0,4)
    var company = faker.company.companyName()
    var company2 = faker.company.companyName()
    writer.write({
        artist_id: i,
        track_name: faker.image.avatar(),
        release_date: date,
        p_line: `&#8471; ${company}; &#8471; ${year} ${company}, LLC, under exclusive license to ${company2}, Inc.`,
        c_line:`&#169; ${year} &#169; ${year} ${company}, LLC, under exclusive license to ${company2}, Inc.`
    })
  }
  writer.end()
}
//songGen()
//artistGen();
userGen();

//dataGen();
