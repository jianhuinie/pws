function* gen() {
    yield 1;
    this.b = 2;
    this.a = 1;
    yield 2;
}
gen.prototype.helloWorld = function () {
    console.log('hello world');
}
// let g = gen();
// console.log(g instanceof gen);
// g.helloWorld();
// console.log(g.a);

// let obj = {};
// let g = gen.call(obj);
// g.next();
// g.next();
// console.log(obj.a);

// let obj = new gen();

// let g = gen.call(gen.prototype);
// g.next();
// g.next();
// g.next();
// console.log(g.a);

function cGen() {
    return gen.call(gen.prototype);
}
var cg = new cGen();
cg.next();
cg.next();
console.log(cg.a);
