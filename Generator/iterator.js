let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());


var myIterable = {};

myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
console.log([...myIterable])
for (let x of myIterable) {
    console.log(x);
}