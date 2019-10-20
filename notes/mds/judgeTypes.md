### 如何区分引用类型

#### typeof ?

***typeof 是满足不了需求的***

```js
* typeof null   // object
* typeof [1, 2]     // object
* typeof {name: 'niejianhui', age: 25}  // object
```
____

#### instanceof

用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上

字面意思很好理解

```js
a.__proto__ = A.prototype

function _instanceof(ins, cons) {
    ins = ins.__proto__;
    cons = cons.prototype;

    while (ins !== null) {
        if (ins === cons) {
            return true;
        }

        ins = ins.__proto;
    }

    return false;
}

```

***多框架集的场景下判断会有问题***
____


#### Object.prototype.toString.call

```js
Object.prototype.toString.call('niejianhui');    //[object String]
Object.prototype.toString.call(25);     //[object Number]
Object.prototype.toString.call(true);   //[object Boolean]
Object.prototype.toString.call(null);       //[object Null]
Object.prototype.toString.call(undefined);      //[object Undefined]
Object.prototype.toString.call({name: 'niejianhui'});    //[object Object]
Object.prototype.toString.call(function(){});       //[object Function]
Object.prototype.toString.call([]);     //[object Array]
Object.prototype.toString.call(new Date);       //[object Date]
Object.prototype.toString.call(/\d/);       //[object RegExp]
```

#### Object.prototype.toString原理

在toString方法被调用时,会执行下面的操作步骤:

1. 如果this的值为undefined,则返回"[object Undefined]".
2. 如果this的值为null,则返回"[object Null]".
3. 让O成为调用ToObject(this)的结果.
4. 让class成为O的内部属性[[Class]]的值.
5. 返回三个字符串"[object ", class, 以及 "]"连接后的新字符串.

***无法区分自定义对象类型，自定义类型可以采用instanceof***

#### 直接调用 xxx.toString() 可以吗？

也满足不了需求，因为其他构造函数都重写了 toString() 方法