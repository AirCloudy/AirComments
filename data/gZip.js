const zlib = require('zlib');
const gzip = zlib.createGzip();
const fs = require('fs');
const inp = fs.createReadStream('secret.csv');
const out = fs.createWriteStream('secret.csv.gz');

inp.pipe(gzip)
  .on('error', () => {
    // handle error
  })
  .pipe(out)
  .on('error', () => {
    // handle error
  });