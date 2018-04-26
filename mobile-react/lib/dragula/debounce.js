define(function(require, module, exports) {
    "use strict";

    var ticky = require("./ticky");

    return function (fn, args, ctx) {
      if (!fn) {
        return;
      }
      ticky(function run() {
        fn.apply(ctx || null, args || []);
      });
    };
  });