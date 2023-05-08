const fs = require('fs'); 
const path = require('path'); 
 
//create folder 
const projectDistPath = path.join(__dirname, 'project-dist'); 
 
fs.stat(projectDistPath, (err, stats) => {   
  if(!stats){ 
    fs.mkdir(projectDistPath, (err) => { 
      if(err){ 
        throw err; 
      } 
    }); 
  } 
}); 
 
//merge components 
const componentsPath = path.join(__dirname, 'components'); 
const templatePath = path.join(__dirname, 'template.html'); 
 
fs.readdir(componentsPath, (err, files) => { 
  if(err){ 
    throw err; 
  } 
 
  fs.readFile(templatePath, 'utf-8', (err, content) => { 
    if(err){ 
      throw err; 
    } 
 
    let count = 0;
    files.forEach(file => { 
      if(path.extname(file) == '.html'){ 
        fs.readFile(path.join(componentsPath, file), 'utf-8', (err, componentContent) => { 
          if(err){
            throw err; 
          }
          content = content.replace(`{{${path.parse(file).name}}}`, componentContent);
          count++;
          if(count === files.length){ 
            fs.writeFile(path.join(projectDistPath, 'index.html'), content, (err) => {
              if(err){
                throw err; 
              } 
            }); 
          } 
        }); 
      } 
    });       
  }); 
});

//merge styles
const stylesPath = path.join(__dirname, 'styles');

fs.readdir(stylesPath, (err, files) => {
    if(err){
        throw err;
    }

    files.forEach(file => {
        fs.writeFile(path.join(projectDistPath, 'style.css'), '', (err) => {
            if(err){
                throw err;
            }
        });
        
        if(path.extname(file) == '.css'){
            fs.readFile(path.join(stylesPath, file), 'utf-8', (err, content) => {
                if(err){
                    throw err;
                }
                fs.appendFile(path.join(projectDistPath, 'style.css'), content, (err) => {
                    if(err){
                        throw err;
                    }
                });
            });
        }
    });    
});

//copy assets 
const sourceDir = path.join(__dirname, 'assets');
const newDir = path.join(projectDistPath, 'assets');

fs.stat(newDir, (err, stats) => {
  if(!stats){
    fs.mkdir(newDir, (err) => {
      if(err){
        throw err;
      }
      copyDir();
    });
  }else{
    clearDir();
    copyDir();
  }
});

function copyDir() { 
  fs.readdir(sourceDir, (err, files) => { 
      if(err){ 
          throw err; 
      } 

      files.forEach((file) => { 
          const sourceFile = path.join(sourceDir, file); 
          const copyFile = path.join(newDir, file); 

          fs.stat(sourceFile, (err, stats) => { 
              if(err){ 
                  throw err; 
              } 

              if(stats.isFile()){ 
                  fs.copyFile(sourceFile, copyFile, (err) => { 
                      if(err){ 
                          throw err; 
                      } 
                  }); 
              }else if(stats.isDirectory()){
                  fs.mkdir(copyFile, (err) => {
                      if(err){
                          throw err;
                      }
                      copyDirRecursive(sourceFile, copyFile);
                  });
              }
          });
      });
  });
}

function copyDirRecursive(source, copy) {
  fs.readdir(source, (err, files) => {
      if(err) {
        throw err;
      }

      files.forEach((file) => {
          const sourceFile = path.join(source, file);
          const copyFile = path.join(copy, file);

          fs.stat(sourceFile, (err, stats) => {
              if (err) {
                  throw err;
              }

              if (stats.isFile()) {
                  fs.copyFile(sourceFile, copyFile, (err) => {
                      if (err) {
                          throw err;
                      }
                  });
              } else if (stats.isDirectory()) {
                  fs.mkdir(copyFile, (err) => {
                      if (err) {
                          throw err;
                      }
                      copyDirRecursive(sourceFile, copyFile);
                  });
              }
          });
      });
  });
}

  
function clearDir(){
  fs.readdir(newDir, (err, files) => {
    if (err) {
      throw err;
    }

    files.forEach((file) => {
      const copyFile = path.join(newDir, file);

      fs.unlink(copyFile, (err) => {

      });
    });
  });
}
  
