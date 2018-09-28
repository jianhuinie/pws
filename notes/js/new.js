function __New(fn) {
    var newObj = Object.create(fn.prototype);
    // var newObj = {};
    // newObj.__proto__ = fn.prototype;
    var returnObj = fn.call(newObj);
    return returnObj
}