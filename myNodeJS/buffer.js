// buf = new Buffer(256);
// len = buf.write("www.runoob.com");

// console.log("写入字节数 : "+  len);
// 

buf = new Buffer(26);
for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97;
}

// for (var i = 0 ; i < 26 ; i++) {
//   console.log(buf.toJSON(buf[i]));
// }

console.log( buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log( buf.toString('ascii',0,5));   // 输出: abcde
console.log( buf.toString('utf8',0,5));    // 输出: abcde
console.log( buf.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde