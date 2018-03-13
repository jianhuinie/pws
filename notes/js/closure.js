var arr = [];
for (var i = 0; i < 10; i++) {
    // arr[i] = (function (i) {
    //     return function () {
    //         console.log(i);
    //     }
    // })(i);
    (function (i) {  
        arr[i] = function () { 
            console.log(i);
         }
    })(i);
    // arr[i] = function () { 
    //     console.log(i);
    // }
}
arr[1]();

function Dog() {
    this.name = 'Gim';
    return {name: 'Hellen'}
}
var dog = new Dog();
console.log(dog.name);