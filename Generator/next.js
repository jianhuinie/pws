function* demo() {
    // console.log('Hello' + yield); 
    // console.log('Hello' + yield 123); 
    console.log('hello');
    console.log('Hello' + (yield '1'));
    console.log('Hello' + (yield '123')); 
}
var dm = demo();
// console.log(dm.next());
// console.log(dm.next());
// console.log(dm.next());
console.log(dm.next());
console.log(dm.next(10));
console.log(dm.next(2));