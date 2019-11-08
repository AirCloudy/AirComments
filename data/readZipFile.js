var fs = require("fs");
var JSZip = require("jszip");
 
// read a zip file
fs.readFile("out.zip", function(err, data) {
    if (err) throw err;
    JSZip.loadAsync(data).then(function (zip) {
      files = Object.keys(zip.files);
      console.log(files);
    });
});