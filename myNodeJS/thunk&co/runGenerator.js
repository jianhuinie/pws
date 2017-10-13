var fs = require('fs');
var thunkify = require('thunkify');
var readFile = thunkify(fs.readFile);

var gen = function* () {
    var r1 = yield readFile('input.txt');
    console.log(r1.toString());
    var r2 = yield readFile('input.txt');
    console.log(r2.toString());
};
//手动执行
var g = gen();
var r1 = g.next();
r1.value(function(err, data) {
    if (err) throw err;
    var r2 = g.next(data);
    r2.value(function(err, data) {
        if (err) throw err;
        g.next(data);
    });
});
//自动执行   递归的过程
var runGenerator = function (gen) {
    var g = gen();
    var jumpText = function (err, data) {
        var result = g.next(data);
        if (result.done) {
            return;
        }
        result.value(jumpText);
    }
    jumpText();
}
runGenerator(gen);
