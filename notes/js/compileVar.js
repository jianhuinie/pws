function test() { 
    console.log(a);
    var a = 3;
    function a () { 
        console.log('function2');
    }
    // var a = function () { 
    //     console.log('function');
    // }
    console.log(a);
   
 }
 test();

console.log(a);
// a();
var a = 3;
function a() {
    console.log(10);
}   
console.log(a);
// a=6;
// a();

// console.log(a); 
// var a = 3;
// function a(){};
// console.log(a);  //3



var name = 'larry';
function testA() {
    console.log(name);
    var name = 'niejianhui';
    testB();
}
function testB() {
    console.log(name);
}
testA();