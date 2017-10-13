var fs = require('fs');
var thunkify = require('thunkify');
var readFile = thunkify(fs.readFile);
var co = require('co');

var gen = function* () {
    var r1 = yield readFile('input.txt');
    var r2 = yield readFile('input.txt');
    console.log(r1.toString());
    console.log(r2.toString());
};
// yield 命令后面，只能是 Thunk 函数或 Promise 对象
co(gen).then(function (data) {
    console.log(data);
});

//promise版本
var readFile1 = function (fileName){
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function(error, data) {
            if (error) {
                reject(error);
            } 
            resolve(data);
        });
    });
};
var gen1 = function* () {
    var r1 = yield readFile1('input.txt');
    var r2 = yield readFile1('input.txt');
    console.log(r1.toString());
    console.log(r2.toString());
};
//手动执行
var g = gen1();
g.next().value.then(function (data) {
    g.next(data).value.then(function (data) {
        g.next(data);
    })
});

var runPromise = function (gen) {
    var g = gen();
    function jumpNext(data) {
        var result = g.next(data);
        if (result.done) {
            return result.value
        }
        result.value.then(function (data) {
            jumpNext(data);
        }, function (err) {
            console.log(err);
        })
    }
    jumpNext();
};
runPromise(gen1);

//co  源码
function co(gen) {
    var ctx = this;
    return new Promise(function(resolve, reject) {
        function next(ret) {
            if (ret.done) return resolve(ret.value);
            var value = toPromise.call(ctx, ret.value);
            if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
            return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
                  + 'but the following object was passed: "' + String(ret.value) + '"'));
        }
        if (typeof gen === 'function') gen = gen.call(ctx);
        if (!gen || typeof gen.next !== 'function') return resolve(gen);
  
        onFulfilled();
        function onFulfilled(res) {
            var ret;
            try {
                ret = gen.next(res);
            } catch (e) {
                return reject(e);
            }
            next(ret);
        }    
    });
}
  