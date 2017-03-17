var fs = require("fs");
// console.log("准备打开文件！");
// fs.open('input.txt', 'r+', function(err, fd) {
//    if (err) {
//        return console.error(err);
//    }
//   console.log("文件打开成功！");     
//   console.log(fd);     
// });

// fs.stat('input.txt', function (err, stats) {
//     console.log(stats.isFile());        //true
// })

console.log("准备写入文件");
fs.writeFile('input.txt', '我是通过写入的文件内容！',  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
   console.log("--------我是分割线-------------")
   console.log("读取写入的数据！");
   fs.readFile('input.txt', function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log("异步读取文件数据: " + data.toString());
   });
});

// fs.unlink('output.txt', function(err) {
//    if (err) {
//        return console.error(err);
//    }
//    console.log("文件删除成功！");
// });

// console.log("开始创建目录。");
// fs.mkdir("tmp",function(err){
//    if (err) {
//        return console.error(err);
//    }
//    console.log("目录创建成功。");
// });





