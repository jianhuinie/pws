const fs = require('fs');
const PATH = './myNodeJs/icons';
// 遍历目录拿文件
function getAllFiles(path) {
    const files = fs.readdirSync(path);
    files.forEach((file) => {
        if (fs.statSync(path + '/' + file).isFile()) {
            console.log(file);
            const oldPath = path + '/' + file;
            const newPath = path + '/' + file.replace(/_/g, '-');
            console.log(oldPath);
            console.log(newPath);
            rename(oldPath, newPath);
        }
    })
}

// 重命名
function rename(oldPath, newPath) { 
    fs.rename(oldPath, newPath, function(err) {
        if (err) {
            throw err;
        }
    });
}
getAllFiles(PATH);