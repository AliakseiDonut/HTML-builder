const fs = require('fs');
const path = require('path');

const { stdin, stdout } = process;

const filePath = path.join(__dirname, "text.txt");

fs.writeFile(filePath,"", err => {
    if(err){
        throw err;
    }

    stdout.write('Введите текст:\n');
    stdin.on('data', data => {
        if(data.toString().trim() === 'exit'){ 
            stdout.write('До свидания!'); 
            process.exit(); 
        } 
        fs.appendFile(filePath, data, (err) => {
            if(err){
                throw err;
            }
        });
    });
})


