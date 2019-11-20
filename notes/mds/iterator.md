### Iterator 和 Generator

前面已经有一篇文章讲到了[Iterator 和 for-of 遍历](https://mp.weixin.qq.com/s?__biz=MzI0NTIyNDQzNQ==&mid=2247483810&idx=1&sn=061d8e8be8f91c12f2ca3f766cd90a5c&chksm=e950873ede270e28b166220455d09b3e75b23cb260baef35fced454031a379c0502fdddc0917&token=114463764&lang=zh_CN#rd)这里我结合 Generator 再做下梳理，已经掌握了 Iterator 的前半部分可以略过。

#### 举个栗子🌰

说起Iterator，大家可能会觉得有点陌生，好像没用过，别着急，我们先来看一段代码：

```js
const numbers = [1, 2, 3, 4, 5, 6];
for (let number of numbers) {
    console.log(number);
}
```
这段代码是不是看着很熟悉， for-of 遍历输出数组中的每一项，那么它和 Iterator 有什么联系呢，我们慢慢道来。

#### Iterator 之前的遍历

上述例子中的代码如果不用 for-of 遍历我们会怎么写呢？

```js
const numbers = [1, 2, 3, 4, 5, 6];
const length = numbers.length;
for (let i = 0; i < length; i++) {
    console.log(numbers[i]);
}
```

#### 什么是 Iterator ？

Iterator（迭代器也叫遍历器）是一种特殊对象，它具有一些专门为迭代过程设计的专有接口，所有的迭代器对象都有一个 next() 方法， 每次调用都返回一个对象，结果对象将有两个属性：一个是 value ，表示下一个将要返回的值；另一个是 done ，它是一个 bool 类型的值，当没有更多可返回数据时返回 true。迭代器还会保留一个内部指针，用来指向当前集合中值的位置，每调用一次 next() 方法，都会返回下一个可用的值。

如果在最后一个值返回后再调用 next() 方法，那么返回的对象中属性 done 的值为 true，属性 value 则包含迭代器最终返回的值，这个返回值不是数据集的一部分，它与函数的返回值类似，是函数调用过程中最后一次给调用者传递信息的方法，如果没有相关函数则返回 undefined。

#### ES5 手动部署一个迭代器

结合上述对 Iterator 的定义，我们来实现一下：

```js
function createIterator(items) {
    var i = 0;
    return {
        next: function () {
            var done = i >= items.length;
            return {
                done: done,
                value: done ? undefined: items[i++]
            }
        }
    }
}
var iterator = createIterator([1, 2, 3]);
console.log(iterator.next()); // { done: false, value: 1 }
console.log(iterator.next()); // { done: false, value: 2 }
console.log(iterator.next()); // { done: false, value: 3 }
console.log(iterator.next()); // { done: true, value: undefined }
```

这样我们就手动给这个数组部署上了 Iterator 接口，createIterator 是一个迭代器生成函数，执行后返回一个迭代器对象。

#### Symbol.iterator

上面有演示 for-of 是如何遍历数组的，这里要提到的与其相关的是可迭代对象，可迭代对象拥有 Iterator 接口，供 for-of 消费。可迭代对象的 Itarator 接口是通过Symbol.iterator 属性部署的，通过 Symbol.iterator 知名符号定义了对象的迭代器生成函数，通过执行 Symbol.iterator 方法，即可获得该对象的迭代器。

for-of 遍历在每次执行时会调用可迭代对象的 next() 方法，并将结果对象的 value 值返回。

凡是部署了 Symbol.iterator 属性的对象都可以通过 for-of 实现遍历。

上面的例子中我们手动部署了数组的 Iterator 接口，既然数组可以被 for-of 遍历，那么它就具有 Symbol.iterator 属性

```js
const numbers = [1, 2, 3];
const iterator = numbers[Symbol.iterator]();
console.log(iterator.next()); // { done: false, value: 1 }
console.log(iterator.next()); // { done: false, value: 2 }
console.log(iterator.next()); // { done: false, value: 3 }
console.log(iterator.next()); // { done: true, value: undefined }
```
可以看出来，通过执行 Symbol.iterator 方法，能获得该对象的迭代器对象，和手动部署效果一致

#### 原生部署 Symbol.iterator 的数据结构

+ Array
+ Map
+ Set
+ String
+ NodeList
+ TypeArray
+ arguments 对象

上述数据结构都可通过 for-of 实现遍历。

如果我们想让一个没有 Symbol.iterator 属性的对象能够被 for-of 遍历，我们就需要手动为它部署迭代器生成函数，类似下面这种形式：

```js
const obj = {
    items: [1, 2, 3],
    [Symbol.iterator]() {
        var that = this;
        var i = 0;
        return {
            next: function () {
                var done = i >= that.items.length;
                return {
                    done: done,
                    value: done ? undefined: that.items[i++]
                }
            }
        }
    }
}
for (let value of obj) {
    console.log(value);
}
// 1
// 2
// 3
```

#### Generator

上面手动去部署一个迭代器的写法好像有点麻烦，通过迭代器生成函数返回一个对象，对象包含 next() 方法支持该对象的某种遍历。那么有没有简单一点的方式来获取迭代器呢？

Generator 就是我们想要的答案，我们可以把 Generator 理解成上面部署的迭代器生成函数，它返回的是一个迭代器对象。

官方定义：Generator 是能返回一个迭代器的函数。

生成器函数由放在 function 关键字之后的星号 (*) 来表示，使用新的 yield 关键字作为暂停标记（迭代器对象只有手动调用 next 方法才能遍历下一个内部状态）。

上面给数组部署迭代器的写法我们可以稍微做下改动：

```js
function *createIterator(items){
    const length = items.length;
    for (let i = 0 ; i < length; i++) {
        yield items[i];
    }
}
const iterator = createIterator([1, 2, 3]);
console.log(iterator.next()); // { done: false, value: 1 }
console.log(iterator.next()); // { done: false, value: 2 }
console.log(iterator.next()); // { done: false, value: 3 }
console.log(iterator.next()); // { done: true, value: undefined }
```

效果和上述例子中的手动部署是一致的，同样部署 Symbol.iterator 属性的时候也可以使用 Generator。

```js
const obj = {
    items: [1, 2, 3],
    *[Symbol.iterator]() {
        const items = this.items;
        const length = items.length;
        for (let i = 0 ; i < length; i++) {
            yield items[i];
        }
    }
}
for (let value of obj) {
    console.log(value);
}
// 1
// 2
// 3
```

***yield 表达式只能使用在 Generator 内部，其他地方会报语法错误，Generator 函数内部的函数也不行***

```js
function *createIterator(items){
    items.forEach(function (item) {
        // 语法错误
        yield item;
    })
}
```

更多关于 Generator 的使用在这里就不赘述了，感兴趣的小伙伴可以深入学习一下，更多的应用还是体现在 ESNext 中 async await 语法糖。