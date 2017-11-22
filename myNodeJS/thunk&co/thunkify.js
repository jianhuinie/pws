var thunkify = require('thunkify');
var fs = require('fs');

var read = thunkify(fs.readFile);
read('input.txt')(function(err, data) {
    if (err) {
        return console.error(err);
    }
    console.log("异步读取文件数据: " + data.toString());
});

function add(a, b, callback){
    var sum = a + b;
    callback(sum);
    callback(sum);
}
  
var thunkAdd = thunkify(add);
thunkAdd(1, 2)(console.log); 