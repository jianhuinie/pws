function bind(fn, context) {
    var outerArgs = Array.prototype.slice.call(arguments, 2);
    return function () {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = outerArgs.concat(innerArgs);
        return fn.apply(context, finalArgs);
    }
}
var add = function () {
    var sum =  Array.prototype.slice.call(arguments, 0).reduce(function (a, b) {
        return a + b;
    });
    sum += this.a + this.b;
    return sum;
}
var obj = {
    a: 1,
    b: 2,
    c: 3
};
var sum = bind(add, obj, 4);
console.log(sum(1, 2, 3));
