var a = '123';
var b = '456';
var c = '789';
var d = 'qwe';
var e = 'rty';
console.time();
var str = a + b + c + d + e;
console.timeEnd();

var arr = [];
arr.push(a);
arr.push(b);
arr.push(c);
arr.push(d);
arr.push(e);
var str1 = arr.join('');
console.timeEnd();