// https://segmentfault.com/a/1190000009478377
function _Promise(fn) {
    this.status = 'pending';
    this.resolveCallbacks = [];
    this.rejectCallbacks = [];
    var that = this;
    function resolve(data) {
        that.status = 'fullfilled';
        setTimeout(function () {
            that.resolveCallbacks.forEach(function (callback) {
                callback(data);
            });
        }, 0);
    }
    function reject(data) {
        that.status = 'rejected';
        setTimeout(function () {
            that.rejectCallbacks.forEach(function (callback) {
                callback(data);
            });
        }, 0);
    }
    fn(resolve, reject);
}

_Promise.prototype.then = function (resolveHandler, rejectHandler) { 
    resolveHandler && this.resolveCallbacks.push(resolveHandler);
    rejectHandler && this.rejectCallbacks.push(rejectHandler);
    return this;
}
var promise = new _Promise(function (resolve, reject) { 
    setTimeout(function () {
        resolve(3);
    }, 1000)
});
promise.then(function (data) {
    console.log(data);
}).then(function () {
    
});