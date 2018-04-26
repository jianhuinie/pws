define(function(require, module, exports) {
      "use strict";
      var global = window;
      var eventmap = [];
      var eventname = "";
      var ron = /^on/;

      for (eventname in global) {
        if (ron.test(eventname)) {
          eventmap.push(eventname.slice(2));
        }
      }

      return eventmap;
  });