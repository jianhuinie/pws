/**
 * @file 本地mock数据
 * @author niejianhui
 */
module.exports = function (req, reply) {
    var fs = require('fs');
    var pathInfo = {};
    var param = {};
    var fileToRead;
    var path = req.path;
    var type = 'POST';
    if (path) {
        fileToRead = './mock' + path + '.js';
        console.log(fileToRead);
        fs.exists(fileToRead, function (exists) {
            if (req.method === 'POST') {
                var content = '';
                req.on('data', function (data) {

                    content += data.toString();
                    var allParams = content && content.split('&');

                    if (allParams && allParams.length) {
                        if (content.indexOf('&') >= 0) {
                            var params = {};
                            for (var i = 0; i < allParams.length; i++) {
                                var params = allParams[i].split('=');
                                param[params[0]] = params[1];
                            } 
                        } else {
                            param = JSON.parse(content);
                        }
                    } else {
                        param = JSON.parse(content);
                    }
                    var ajaxInfo = {
                        path: path,
                        type: type,
                        param: param
                    }
                    pathInfo[path] = ajaxInfo;

                    //fs.appendFile('./nodeUtil/param.txt', '\n' + JSON.stringify(ajaxInfo));
                });

                req.on('end', function () {
                    var data = fs.readFileSync(fileToRead);
                    eval(data.toString());
                    var returnRes = mockCreatFunction ? mockCreatFunction(param) : {status: 500};
                    var sleep = returnRes.sleep || 0;
                    delete returnRes.sleep;
                    setTimeout(function() {
                        reply(
                            JSON.stringify( returnRes)
                        );
                    }, sleep);
                });

            } else {
                type = 'GET';
                var allParams = '';
                var index = path.indexOf('?');
                if (index != -1) {
                    path = path.slice(0, index);
                    allParams = path.slice(index);
                }
                // 处理参数
                for (var i = 0, item; item = allParams[i++];) {
                    var val = item.split('=');
                    param[val[0]] = val[1];
                }
                var data = fs.readFileSync(fileToRead);
                eval(data.toString());
                reply(
                    JSON.stringify(
                        mockCreatFunction ? mockCreatFunction(param) : {status: 500}
                    )
                );
                var ajaxInfo = {
                    path: path,
                    type: type,
                    param: param
                }
                pathInfo[path] = ajaxInfo;
                //fs.appendFile('./nodeUtil/param.txt', '\n' + JSON.stringify(ajaxInfo));
            }
        });
    }
};