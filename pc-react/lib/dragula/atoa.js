define(function() {
    return function (a, n) {
      return Array.prototype.slice.call(a, n);
    };
  });