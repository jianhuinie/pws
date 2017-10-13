function isArray(elems) {
    return Object.prototype.toString.call(elems).indexOf('Array') > -1;
}
function deepClone(deep, obj) {
    var newObj = {};
    if (isArray(obj)) {
        newObj = [];
    }
   
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (typeof(obj[i]) === 'object' && deep && i) {
                newObj[i] = deepClone(true, obj[i]);
            }
            else if (i) {
                newObj[i] = obj[i];
            }
        }
    }
    return newObj;
}

var obj = {
    name: 'niejianhui',
    age: 23,
    hobbies: {
        1: 'basketball',
        2: 'swim'
    },
    arr: [1, 2]
};
var newObj = deepClone(true, obj);
newObj.hobbies[1] = 'girl';
console.log(newObj);
console.log(obj);
var arr = [1, 2, 3];

var newArray = deepClone(true, arr);
console.log(newArray);
newArray[0] = 0;
console.log(newArray);
console.log(arr);
