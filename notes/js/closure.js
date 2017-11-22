var arr = [];
for (var i = 0; i < 10; i++) {
    arr[i] = (function (i) {
        return function () {
            console.log(i);
        }
    })(i);
}
arr[1]();