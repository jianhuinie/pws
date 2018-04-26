/**
 * Created by bjhl on 16/1/14.
 */
const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv;

const config = require('../config');
const util = require('../tool/util');
const reactFileExports = require('../react/tool/fileExports');

// 获取所有入口文件
module.exports = (function () {
    // build入口文件
    var _allFills = [];
    var _allWhiteList = {};
    // 去重
    var _removal = {};
    const _addImageWhiteList = function (pageName, images) {
        if (typeof images === 'string') {
            images = [images];
        }

        util.each(images, function (fileName) {
            const fixPath = util.fixPath(fileName, pageName);

            if (!_allWhiteList[fixPath]) {
                _allWhiteList[fixPath] = true;
            }
        });
    };
    const _addExportsFile = function (pathName, fileName) {
        const fixPath = util.fixPath(fileName, pathName);

        if (!_removal[fixPath]) {
            _allFills.push(fixPath);

            _removal[fixPath] = true;
        }
    };
    const _setFiles = function (pathName, data) {
        if (data && !data.length) {
            data = [data];
        }

        data.forEach(function (json) {
            json.tpl && _addExportsFile(pathName, json.tpl);
            json.image_white_list && _addImageWhiteList(pathName, json.image_white_list);
        });
    };
    /**
     * 获取指定文件，参数为空，获取/src下所有page.json的tpl属性
     * @params {string} root 根目录，默认取/src
     * @params {string} fileName 文件名，默认page.json
     */
    const _get = function (root, fileName) {
        var root = root || config.developSrc;
        var fileName = fileName || 'page.json';

        var files = fs.readdirSync(root);

        if (files) {
            files.forEach(function (name) {
                var pn = path.join(root, name);
                if (name === fileName) {
                    var data = fs.readFileSync(pn, 'utf-8');

                    if (data) {
                        data = JSON.parse(data);
                        _setFiles(pn, data);
                    }
                } else if (fs.existsSync(pn) && fs.statSync(pn).isDirectory()) {
                    _get(pn);
                }
            });
        }
    };
    var _load = false;

    return (function () {
        const loadPageJson = function (root, fileName) {
            if (!_load) {
                _get(root, fileName);

                _load = true;
            }
        };

        return {
            /**
             * 获取所有root指定文件
             * 默认获取src下所有page.json文件的tpl对应文件
             */
            getExportsFile: function (root, fileName) {
                loadPageJson(root, fileName);

                // spa增量部署
                if (argv.d === 1) {
                    _allFills = _allFills.concat(reactFileExports.init());
                }
                return _allFills;
            },
            getImagesWhiteList: function (root, fileName) {
                loadPageJson(root, fileName);

                return _allWhiteList;
            }
        };
    }());
}());