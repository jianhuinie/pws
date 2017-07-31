function* gen(x){
    try {
        var y = yield x + 2;
    } 
    catch (e) {
        console.log(e);
    }
    return y;
}

var g = gen(1);
g.next();
g.throw('出错了');

try {
    g.throw('外部异常')
}
catch (e) {
     console.log(e);
}

var x = 1;

function f(m){
    return m * 2;
}

console.log(f(x + 5));