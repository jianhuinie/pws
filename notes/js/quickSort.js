function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }
    else {
        var num = Math.ceil(array.length / 2);
        var value = array.splice(num, 1)[0];
        var left = [];
        var right = [];
        for (var i = 0; i < array.length; i++) {
            if (array[i] <= value) {
                left.push(array[i]);
            }
            else {
                right.push(array[i]);
            }
        }
        return quickSort(left).concat([value]).concat(quickSort(right));
    }
}
var array = [2, 6, 1, 11, 7, 0];
console.log(quickSort(array));

function bubbleSort(array) {
    var length = array.length;
    console.log(length)
    console.log(array)
    for (var i = 0; i < length; i++) {
        for (var j = 0; j < length - 1 - i; j++) {
            if (array[j] > array[j+1]) {
                var temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
        }

    }
    return array;
}
console.log(bubbleSort([2, 6, 1, 11, 7, 0]));