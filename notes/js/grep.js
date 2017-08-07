function grep(elems, callback, invert) {
    var length = elems.length;
    var i = 0;
    var result, expectResult = !invert;
    var matches = [];
    for (; i < length; i++) {
        result = callback(elems[i], i);
        if (result === expectResult) {
            matches.push(elems[i]);
        }
    }
    return matches;
}
var array = [1, 2, 3, 4, 5, 6, 7, 8];
var callbackFunc = function(n, i) {
    return n > 3;
}
var newArray = grep(array, callbackFunc);
console.log(newArray);