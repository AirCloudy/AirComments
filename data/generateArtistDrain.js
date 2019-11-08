const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const perf = require('execution-time')();
const fs = require('fs')
var faker = require('faker')
const momentRandom = require('moment-random');
const random = require('random')
const million = 1000000
var randomNormal = require('random-normal');
const writeArtist = fs.createWriteStream('../generatedData/artists1M.csv');
writeArtist.write('artist_name,artist_pic\n', 'utf8');

function generateArtist(writer, encoding, callback) {
  let i = 1*million;
  let id = 0;
  function write() {
    let ok = true;
    do {
      if(i%100000===0) {
        console.log((id/(1*million)*100).toFixed(2) +'%')
      }
      i -= 1;
      id += 1;
      var artist_name = faker.name.findName();
      var artist_pic = faker.image.avatar();
      

      const data = `${artist_name},${artist_pic}\n`;
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

generateArtist(writeArtist, 'utf-8', () => {
  writeArtist.end();
});