var events = require("events");
var eventEmitter = new events.EventEmitter();

var connectHandler = function connected() {
   console.log('连接成功。');
   eventEmitter.emit('data_received');
};

eventEmitter.on('connection', connectHandler);

eventEmitter.on('data_received', function(){
   console.log('数据接收成功。');
});
eventEmitter.emit('connection');

console.log("程序执行完毕。");

console.log(__filename);
console.log( __dirname );

function printHello(){
   console.log( "Hello, World!");
}
// 两秒后执行以上函数
// setInterval(printHello, 2000);