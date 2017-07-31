function* createGenerator() {
    yield 'status 1';
    yield 'status 2';
    yield 'status 3';
    return 'ended';
}

var cg = createGenerator();
console.log(cg.next());
console.log(cg.next().value);
console.log(cg.next());
console.log(cg.next());
// var cg = new createGenerator;