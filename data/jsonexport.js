var jsonexport = require('jsonexport');
var fs = require('fs');
const perf = require('execution-time')();

var reader = fs.createReadStream('./secret.json');
var writer = fs.createWriteStream('./out.csv');

reader.pipe(jsonexport()).pipe(writer);

