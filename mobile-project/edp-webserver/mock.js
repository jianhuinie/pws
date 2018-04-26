/**
 * @file tpl, router转发
 * @author wanglijun01
 */

var fs = require("fs");
var path = require("path");
const baseUrl = process.cwd()
// tpl PATH
var PageJson = (function () {
    var _tpl = {},
        _router = {},
        _addRouters = function (pathName, data) {
            if (data && !data.length) {
                data = [data];
            }

            data.forEach(function (item) {

                if (!item && !item.tpl) {
                    return;
                }

                var router = item.router || "",
                    tpl = item.tpl || "",
                    mock_data = item.mock_data ? _fixPath(pathName, item.mock_data) : "",
                    src = path.join(baseUrl, "src/");


                var tplPath = _fixPath(pathName, tpl);

                var mockData = {
                    tpl: tplPath.replace(src, '').replace(/.tpl$/g, ''),
                    mock_data: mock_data
                };

                if (tpl) {
                    _tpl[tplPath] = mockData;
                }
                if (router) {
                    _router[router] = mockData;
                }

            });
        },
        _fixPath = function (pathName, fileName) {
            var projectDir = baseUrl,
                src = path.join(projectDir, "src");

            //相对路径./ ../
            if (/^\.+/ig.test(fileName) && pathName) {

                var basePath = path.dirname(pathName);

                return path.join(basePath, fileName);
            }

            if (/^\//ig.test(fileName)) {
                return path.join(projectDir, fileName);
            }

            var prefix = {
                '/src': projectDir,
                '/mock': path.join(projectDir, "src/mock"),
                "/_common": path.join(projectDir, "src/page")
            };
            //获取文件根路径,并添加"/";
            var fstart = "/" + fileName.replace(/^\//ig, "").split("/")[0];

            //是否在配置文件当中，如果不存在，将所有路径添加根目录src
            var pfs = prefix[fstart];
            if (!pfs) {
                var extname = path.extname(fileName);
                if (!extname) {
                    fileName += ".js";
                }
                return path.join(path.join(baseUrl, 'src'), fileName);
            }

            return path.join(pfs, fileName);
        },
        _eachPageJson = function (root, fileName) {
            // 收集 PAGE.JSON 当中所有的 tpl, router, mockdata，并添加缓存
            var root = root || path.join(baseUrl, "/src"),
                fileName = fileName || "page.json";

            var files = fs.readdirSync(root);

            if (files) {
                files.forEach(function (name) {
                    var pn = path.join(root, name);
                    if (name == fileName) {
                        var data = fs.readFileSync(pn, "utf-8");

                        if (data) {
                            data = JSON.parse(data);

                            _addRouters(pn, data);
                        }
                    } else {
                        if (fs.existsSync(pn) && fs.statSync(pn).isDirectory()) {
                            _eachPageJson(pn);
                        }
                    }
                });
            }
        };

    return {
        isExist: function (pathName) {
            _eachPageJson();

            var tpl = path.extname(pathName);
            if (tpl == ".tpl") {
                var fixPath = path.join(baseUrl, pathName);

                return !!_tpl[fixPath];
            }

            return !!_router[pathName];

        },
        getMockPath: function (pathName) {
            var tpl = path.extname(pathName);

            if (tpl == ".tpl") {
                var fixPath = path.join(baseUrl, pathName);

                return _tpl[fixPath];
            }

            return _router[pathName];

        }
    }
})();


exports.init = function (port) {
    return {
        location: function (request) {
            //过滤tpl,router,tpl与router重新获取pageJson list.
            //异步请求与outer区别不开，所以会多次重新过滤pageJson
            //重新过滤page.json是为了，新件文件时，不需要重启服务器
            var fileName = request.pathname;
            var tpl = path.extname(fileName);
            if (tpl == ".tpl" || !/\./ig.test(fileName) ) {
                return PageJson.isExist(fileName);
            }
            return false;
        },
        handler: [
            function (context) {
                var request = context.request;
                var mockPath = PageJson.getMockPath(request.pathname);
                console.log(mockPath);
                //默认添加数MOCK空数据
                var data = JSON.stringify({
                    "tpl_data": {}
                });

                if (mockPath.mock_data) {
                    data = fs.readFileSync(mockPath.mock_data, "utf-8");
                }

                var strData = JSON.stringify({
                    tpl: mockPath.tpl,
                    data: JSON.parse(data)
                });


                var url = '/mock/mock.php?___data___=' + encodeURIComponent(strData);
                if (request.search) {
                    url += '&' + request.search.substring(1);
                }
                request.url = url;
            },
            proxy('127.0.0.1', port)
        ]
    }
};