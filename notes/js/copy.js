function shallowCopy(src) {
    const dist = {};

    for (let prop in src) {
        if (src.hasOwnProperty(prop)) {
            dist[prop] = src[prop]
        }
    }

    return dist;
}

const obj = {
    name: 'niejianhui',
    age: 26,
    hobbies: ['basketball', 'swim']
}

function deepClone(obj) {
    let objClone = Array.isArray(obj) ? [] : {};

    if(obj && typeof obj === "object") {
        for(let key in obj) {
            if(obj.hasOwnProperty(key)) {
                // 判断 obj 子元素是否为对象，如果是，递归复制
                if(obj[key] && typeof obj[key] === "object") {
                    objClone[key] = deepClone(obj[key]);
                } else {
                    //如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}

const obj1 = deepClone(obj);
obj1.age = 27;
obj1.hobbies[2] = 'football';
console.log(obj);
console.log(obj1);