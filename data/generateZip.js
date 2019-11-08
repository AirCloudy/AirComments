var fs = require("fs");
var JSZip = require("jszip");
 
var zip = new JSZip();
 
// Add a top-level, arbitrary text file with contents
zip.file("./Hello.txt", "Hello World\n");
 
// Create a directory within the Zip file structure
var img = zip.folder("images");
 
// Sample image data
imgData = 'R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7';
 
// Add a file to the 'images' directory, 
// and add an image with data URI as contents.
img.file("star.gif", imgData, {base64: true});
 
// JSZip can generate Buffers so you can do the following
zip.generateNodeStream({type:'nodebuffer',streamFiles:true})
   .pipe(fs.createWriteStream('out.zip'))
   .on('finish', function () {
       // JSZip generates a readable stream with a "end" event,
       // but is piped here in a writable stream which emits a "finish" event.
       console.log("out.zip written.");
    });