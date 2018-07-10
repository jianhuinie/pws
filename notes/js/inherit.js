// function Super(name) {
//     this.name = name;
//     // this.arr = [1, 2, 3];
// }
// Super.prototype.arr = [1, 2, 3];
// var super1 = new Super('222');
// super1.arr.push(4);
// console.log(super1.arr);
// var super2 = new Super('111');
// console.log(super2.arr);


let Super = function(name) {
    this.name = name;
    this.getName = () => {
        return this.name;
    }
   
}
Super.prototype.getName = () => {
    return this.name;
}
Super.prototype.setName = (name) => {
    this.name = name;
}
let Sub = function(sex, name) {
    Super.call(this,name); 
    this.sex = sex;
}

let sub1 = new Sub('male','eric'),
sub2 = new Sub('female','eric');
    //  sub1.setName('ada')
console.log(sub2.name); 
console.log(sub2.getName); 
console.dir(sub2); 
console.log(sub1.getName === sub2.getName); 