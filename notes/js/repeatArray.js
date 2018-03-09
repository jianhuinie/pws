function repeatArray(array) {  
    var hashMap = {}, result = [];
    for (var i = 0; i < array.length; i++) {
        var value = array[i];
        if (!hashMap[value]) {
            result.push(value);
            hashMap[value] = true;
        }
    }
    return result;
}
var arr = [1, 1, 2, 2, 3, 4, 4, 5, 6, 5];
console.log(repeatArray(arr));