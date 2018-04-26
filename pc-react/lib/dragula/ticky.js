define(function(require, module, exports) {
    var si = typeof setImmediate === "function",
      tick;
    if (si) {
      tick = function(fn) {
        setImmediate(fn);
      };
    } else {
      tick = function(fn) {
        setTimeout(fn, 0);
      };
    }

    return tick;
});