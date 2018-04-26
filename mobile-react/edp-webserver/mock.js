/**
 * @file tpl, router转发
 */

const fs = require('fs');
const path = require('path');

const baseUrl = process.cwd();
// tpl PATH
const PageJson = (function () {
    const _tpl = {};
    const _router = {};
    const _addRouters = function (pathName, data) {
        if (data && !data.length) {
            data = [data];
        }

        data.forEach(function (item) {
            const router = item.router || '';
            let indexPath = _fixPath(pathName, './index.html');
            // console.log(pathName);
            // console.log(indexPath);
            indexPath = indexPath.substr(indexPath.indexOf('/src')).replace('/src/', '/dist/');
            if (router) {
                _router[router] = indexPath;
            }
        });
    };
    const _fixPath = function (pathName, fileName) {
        const projectDir = baseUrl;

        // 相对路径./ ../
        if (/^\.+/ig.test(fileName) && pathName) {
            const basePath = path.dirname(pathName);
            return path.join(basePath, fileName);
        }

        if (/^\//ig.test(fileName)) {
            return path.join(projectDir, fileName);
        }
    };
    const _eachPageJson = function (root, fileName) {
        // 收集page.json当中所有的router
        root = root || path.join(baseUrl, '/src');
        fileName = fileName || 'page.json';
        const files = fs.readdirSync(root);

        if (files) {
            files.forEach(function (name) {
                const pn = path.join(root, name);
                if (name === fileName) {
                    let data = fs.readFileSync(pn, 'utf-8');
                    if (data) {
                        data = JSON.parse(data);
                        _addRouters(pn, data);
                    }
                } else if (fs.existsSync(pn) && fs.statSync(pn).isDirectory()) {
                    _eachPageJson(pn);
                }
            });
        }
    };

    return {
        isExist: function (pathName) {
            _eachPageJson();
            return !!_router[pathName];
        },
        getRouterPath: function (pathName) {
            return _router[pathName];
        }
    };
})();


exports.init = function (port) {
    return {
        location: function (request) {
            // 过滤tpl,router,tpl与router重新获取pageJson list.
            // 异步请求与outer区别不开，所以会多次重新过滤pageJson
            // 重新过滤page.json是为了，新件文件时，不需要重启服务器
            const fileName = request.pathname;
            if (!/\./ig.test(fileName)) {
                return PageJson.isExist(fileName);
            }
            return false;
        },
        handler: [
            function (context) {
                const request = context.request;
                let url = PageJson.getRouterPath(request.pathname);
                console.log(url);
                if (request.search) {
                    url += '?' + request.search.substring(1);
                }
                request.url = url;
            },
            proxy('127.0.0.1', port)
        ]
    };
};