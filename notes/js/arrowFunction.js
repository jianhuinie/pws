let add = (obj) => console.log(obj.x + 3);
add({x:3});
// var add = function () {
//     console.log(this.x + 3);
// }
// add.call({x: 3});
const obj = {
    items: [1, 2, 3],
    *[Symbol.iterator]() {
        const items = this.items;
        const length = items.length;
        for (let i = 0 ; i < length; i++) {
            yield items[i];
        }
    }
}
for (let value of obj) {
    console.log(value);
}