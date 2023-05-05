const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'files');
const newDir = path.join(__dirname, 'files-copy');

fs.stat(newDir, (err, stats) => {
    if(!stats){
        fs.mkdir(newDir, (err) => {
            if(err){
                throw err;
            }
            copyDir();
        });
    }else{
        copyDir();
    }
});

function copyDir() {
    fs.readdir(sourceDir, (err, files) => {
      if (err) {
        throw err;
      }
  
      files.forEach((file) => {
        const sourceFile = path.join(sourceDir, file);
        const copyFile = path.join(newDir, file);
  
        fs.copyFile(sourceFile, copyFile, (err) => {
          if (err) {
            throw err;
          }
        });
      });
    });
  }
  

