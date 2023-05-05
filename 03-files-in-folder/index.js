const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, "secret-folder");

fs.readdir(filePath, (err, files) => {
    if(err){
        throw err;
    }
    files.forEach(el => {
        fs.stat(path.join(filePath, el), (err, stats) => {
            if(err){
                throw err;
            }else if(stats.isFile()){
                console.log(`${path.parse(el).name} - ${path.extname(el)} - ${stats.size}`);
            }
        });
    });
});

