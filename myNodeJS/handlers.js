function start(response) {
   console.log("Request handler 'start' was called.");
    var body = '<html>'+
         '<head>'+
         '<meta http-equiv="Content-Type" content="text/html; '+
         'charset=UTF-8" />'+
         '</head>'+
         '<body>'+
         '<form action="/upload" method="post">'+
         '<textarea name="text" rows="20" cols="60"></textarea>'+
         '<input type="submit" value="Submit text" />'+
         '</form>'+
         '</body>'+
         '</html>';
   response.writeHead(200, {"Content-Type": "text/html"});
   response.write(body);
   response.end();
}
function upload(response) {
   console.log("Request handler 'upload' was called.");
   var content = 'hello upload';
   response.writeHead(200, {"Content-Type": "text/plain"});
   response.write(content);
   response.end();
}
var handlers = {};
handlers['/'] = start;
handlers['/start'] = start;
handlers['/upload'] = upload;
exports.handlers = handlers;