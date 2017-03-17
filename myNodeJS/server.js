var http = require("http");
var url = require("url");
var router = require("./router");


function start () {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        // var params = url.parse(request.url, true).query;
        console.log(params);
        var content = router.route(pathname, response);
        console.log('request for ' + pathname + ' received!')
    }
    http.createServer(onRequest).listen(8888);
    console.log('server started!');
}

exports.start = start;