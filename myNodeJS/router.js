var handler = require("./handlers");
var handlers = handler.handlers;
function route(pathname, response) {
   console.log("About to route a request for " + pathname);

    if (typeof handlers[pathname] === 'function') {
       return handlers[pathname](response);
    } else {
       console.log("No request handler found for " + pathname);
       return "404 not found";
    }
}
exports.route = route;