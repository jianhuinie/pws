function Queue() {
    this.que = [];
}
Queue.prototype.enterQueue = function (elem) {
    this.que.push(elem);
};
Queue.prototype.exitQueue = function () {
    this.que.shift();
};
var que1 = new Queue();
que1.enterQueue(1);
que1.enterQueue(2);
que1.enterQueue(3);
console.log(que1.que);
que1.exitQueue();
console.log(que1.que);