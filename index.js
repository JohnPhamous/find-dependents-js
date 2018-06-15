#!/usr/bin/env node 
const fs = require('fs');
const path = require('path');

const targetExtenstion = '.js';

const targetFile = process.argv[2];
const currentFile = path.basename(__filename);

let files = fs.readdirSync('./');

files = files.filter((file) => {
  const currentExtension = path.extname(file);
  return currentExtension == targetExtenstion && file !== currentFile;
});

let foundFiles = false;

files.forEach((file) => {
  fs.readFile(file, 'utf8', (error, data) => {
    if (error) {
      console.log(error);
    }
    if (data.includes(targetFile)) {
      foundFiles = true;
      console.log(`${file} depends on ${targetFile}`);
    }
  });
});

if (!foundFiles) {
  console.log("No files found");
}
