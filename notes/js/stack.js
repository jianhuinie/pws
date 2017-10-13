function Stack() {
    this.stac = [];
}
Stack.prototype.enterStack = function (elem) {
    this.stac.push(elem);
};
Stack.prototype.exitStack = function () {
    this.stac.pop();
};
var stac1 = new Stack();
stac1.enterStack(1);
stac1.enterStack(2);
stac1.enterStack(3);
console.log(stac1.stac);
stac1.exitStack();
console.log(stac1.stac);