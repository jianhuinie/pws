function* createGenerator() {
    yield 'status 1';
    yield 1 + 2;
    yield 'status 3';
    return 'ended';
}

var cg = createGenerator();
console.log(cg.next());
console.log(cg.next().value);

// (function () {
//     yield 1;
// })()