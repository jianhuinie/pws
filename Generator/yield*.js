function* anotherGenerator(i) {
    yield i + 1;
    yield i + 2;
    yield i + 3;
}

function* generator(i){
    yield i;
    yield* ['a']
    yield* anotherGenerator(i);
    yield i + 10;
}

var gen = generator(10);

console.log(gen.next().value); 
console.log(gen.next().value); 
console.log(gen.next().value);
console.log(gen.next().value); 
console.log(gen.next().value); 
console.log(gen.next().value); 


//递归 取出嵌套数组的值
function* getArrayValue(array) {
    if (Array.isArray(array)) {
        for (let i = 0; i < array.length; i ++) {
            yield* getArrayValue(array[i]);
        }
    }
    else {
        yield array;
    }
}
const array = [1, [2, 3, [4], [5]]];
for (let x of getArrayValue(array)) {
    console.log(x);
}