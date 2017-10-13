var fs = require("fs");
var callback = function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log("异步读取文件数据: " + data.toString());
}
//回调方式
fs.readFile('input.txt', callback);

//thunk 函数
var Thunk = function (fileName) {
    return function (callback) {
        return fs.readFile(fileName, callback);
    }
}
var readFileThunk = Thunk('input.txt');
readFileThunk(callback);

//Thunk函数转换  前提 fn有callback
var toThunk = function (fn) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return function (callback) {
            args.push(callback);
            return fn.apply(this, args);
        }
    }
}
var readFileThunk1 = toThunk(fs.readFile);
readFileThunk1('input.txt')(callback);

//thunkify 源码
function thunkify(fn) {
    return function() {
        var args = new Array(arguments.length);
        var ctx = this;
    
        for(var i = 0; i < args.length; ++i) {
            args[i] = arguments[i];
        }
    
        return function(done) {
            var called;
    
            args.push(function() {
                if (called) return;
                called = true;
                done.apply(null, arguments);
            });
    
            try {
                fn.apply(ctx, args);
            } catch (err) {
                done(err);
            }
        }
    }
}