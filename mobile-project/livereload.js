var livereload = require('livereload');
var argv = require('yargs').argv;
var path = require("path");

var watchFile = {
    image: ["png,jpg"],
    js: ["js"],
    css: ["css","less","styl","sass"],
    html: ["html","tpl"]
};
//watch type
var t = argv.t || "all";
//watch path
var p = path.join(__dirname,"src",argv.p||"");

var exts = (function(){
    var type = argv.t || "all";
    var list = []

    if(type == "js") {
        list = list.concat(watchFile.js);
    }

    if(type == "css") {
        list = list.concat(watchFile.css);
    }

    if(type == "html") {
        list = list.concat(watchFile.html);
    }

    if(type == "all") {
        list = list.concat(watchFile.js,watchFile.css,watchFile.html);
    }

    return list.concat(watchFile.image);
})();

var server = livereload.createServer({exts: exts})

server.watch(p);