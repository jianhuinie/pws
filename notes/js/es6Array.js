const arr = [
    {
        id: 12,
        flag: true
    },
    {
        id: 2,
        flag: false
    },
    {
        id: 21,
        flag: true
    },
    {
        id: 11,
        flag: true
    },
    {
        id: 9,
        flag: false
    },
];

/**
 * array.reduce(callback, initialValue)
 * callback(previousValue, currentValue, index, array)
 */
// const reduceResult = arr.reduce((count, current, index, array) => {
const reduceResult = arr.reduceRight((count, current, index, array) => {
    console.log(count);
    console.log(current);
    console.log(index);
    console.log(array);
    // return current.flag ? ++count: count;
    return count + current.id;
}, 0);
console.log(reduceResult);
console.log(arr);

/**
 * array.filter(callback, thisArg)
 * callback(currentValue, index, arr)
 * 返回新数组
 */
const filterResult = arr.filter((currentValue, index, array) => {
    console.log(currentValue);
    console.log(index);
    console.log(array);
    return currentValue.flag;
});
console.log(filterResult);
console.log(arr);

/**
 * array.map(callback, thisArg)
 * callback(currentValue, index, arr)
 * 可改变原数组
 * 返回新数组
 */
const mapResult = arr.map((currentValue, index, array) => {
    console.log(currentValue);
    console.log(index);
    console.log(array);
    return {
        id: currentValue.id + 1,
        flag: !currentValue.flag
    };
});
console.log(mapResult);
console.log(arr);

/**
 * array.every(callback, thisArg)
 * callback(currentValue, index, arr)
 */
const everyResult = arr.every((currentValue) => {
    return currentValue.flag;
});
console.log(everyResult);

/**
 * array.some(callback, thisArg)
 * callback(currentValue, index, arr)
 */
const someResult = arr.some((currentValue) => {
    return currentValue.flag;
});
console.log(someResult);

/**
 * array.foreach(callback, thisArg)
 * callback(currentValue, index, arr)
 * 为每个元素执行对应的操作
 * 可改变原数组
 */
arr.forEach((currentValue, index) => {
    currentValue.id = currentValue.id + 1;
});
console.log(arr);