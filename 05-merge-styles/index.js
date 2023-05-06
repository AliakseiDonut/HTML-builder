const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');

fs.readdir(stylesPath, (err, files) => {
    if(err){
        throw err;
    }

    files.forEach(file => {
        fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', (err) => {
            if(err){
                throw err;
            }
        });
        
        if(path.extname(file) == '.css'){
            fs.readFile(path.join(stylesPath, file), 'utf-8', (err, content) => {
                if(err){
                    throw err;
                }
                fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), content, (err) => {
                    if(err){
                        throw err;
                    }
                });
            });
        }
    });    
});

