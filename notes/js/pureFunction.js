// 函数的返回结果只依赖于它的参数
// 函数执行过程里面没有副作用


// 不是纯函数
const a = 1;
const foo = (b) => {
    return a + b
}
foo(2);


const foo1 = (x, b) => {
    return x + b;
}
foo1(1, 2);



const foo2 = (obj, b) => {
    return obj.x + b
}
const counter = { x: 1 };
foo2(counter, 2);


// 不是纯函数
const foo3 = (obj, b) => {
    obj.x = 2
    return obj.x + b
}
const counter1 = { x: 1 };
foo3(counter1, 2);