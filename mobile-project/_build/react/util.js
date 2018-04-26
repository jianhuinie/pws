const fs = require('fs');
const write = require('write');
const path = require('path');
const walk = require('esprima-walk');
const esprima = require('esprima');
const babel = require('babel-core');

const generateTask = require('../tasks/generate');
const config = require('./config');
const biz = require('../tool/biz');

const stat = fs.stat;

exports.replaceReactPath = (content) => {
    return content.replace(/(['"\/])(spa)(\/)/gim, function () {
        return arguments[1] + config.COMPILE_DIR_NAME + arguments[3];
    });
}

const copyFile = (src, dst, replaceFn) => {
    var content = biz.readFileSync(src);
    if (typeof replaceFn === 'function') {
        content = replaceFn(content);
    } else {
        content = exports.replaceReactPath(content);
    }
    if (!dst) {
        dst = src.replace('/spa/', '/' + config.COMPILE_DIR_NAME + '/').replace(/\.js[x]?$/, '.js');
    }
    
    write(
        dst,
        content,
        (err) => {
            if (err) {
                throw new Error(err);
            }
        }
    );
};

// 获取多页面的每个入口文件，用于配置中的entry
const copyDir = (src, output, fileReg, replaceFn) => {
    fs.readdir(src, (err, paths) => {
        if (err) {
            throw new Error('出错路径：' + src + ';\n出错信息：' + err);
        }
        paths.forEach((pathName) => {
            const _src = path.resolve(src, pathName);
            const _dst = path.resolve(output, pathName);
            stat(_src, (err, st) => {
                if (err) {
                    throw err;
                }
                // 判断是否为文件
                if (st.isFile() && _src.match(fileReg)) {
                    copyFile(_src, _dst, replaceFn);
                }
                // 如果是目录则递归调用自身
                else if (st.isDirectory()){
                    copyDir( _src, _dst, fileReg, replaceFn);
                }
            });
        });
    });
};

/**
 *  拷贝文件
 *      目录，拷贝该目录下所有符合规则的文件
 *      文件，直接拷贝
 *  @param {string} srcDir 来源目录/文件
 *  @param {string} outputDir 目标目录/文件
 *  @param {RegExp} fileReg 文件名匹配的正则表达式
 */
exports.copyAllFile = (srcDir, outputDir, fileReg, replaceFn) => {
    stat(srcDir, (err, st) => {
        if (err) {
            throw new Error(err);
        }
        // 判断是否为文件
        if (st.isFile()) {
            copyFile(srcDir, outputDir, replaceFn);
        } else if (st.isDirectory()) {
            copyDir(srcDir, outputDir, fileReg, replaceFn);
        }
    });
};

/**
 * 把
 * define(['exports', 'react', './config', 'react-router', 'common/service', 'common/share/initialize', 'css-loader!./index.styl'], function (exports, _react, _config, _reactRouter, service, setShare) {
 * 转换成这种
 * define(function (require, exports) {
    var _react = require('react');
    var _config = require('./config');
    var _reactRouter = require('react-router');
    var service = require('common/service');
    var setShare = require('common/share/initialize');
    require('css-loader!./index.styl');
 * @params {string} srcFile 要转换的文件路径
 * @params {?string} outputFile 输出的文件路径，为空从srcFile转换
*/
exports.transEs6ToAmd = (srcFile, outputFile) => {
    babel.transformFile(srcFile, function (err, result) {
        var ast;
        try {
            ast = esprima.parse(result.code);
        } catch (e) {
            console.trace();
            console.error(srcFile);
        }
        walk(ast, function (json) {
            var json = json || {};
            if (json.type === 'CallExpression') {
                var callee = json.callee || {};
                var dfArray = json.arguments || [];
                // define
                if (callee.name === 'define') {
                    var mods = json.arguments[0];
                    var alias = json.arguments[1];
                    if (
                        mods.type === 'ArrayExpression'
                        && alias.type === 'FunctionExpression'
                    ) {
                        var aliasParams = alias.params;
                        mods.elements.forEach((item, index) => {
                            if (item.value !== 'exports') {
                                var astObj;
                                if (item.value.indexOf('css-loader!') === 0 || !aliasParams[index]) {
                                    // 直接插入require
                                    astObj = {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "Identifier",
                                            "name": "require"
                                        },
                                        "arguments": [
                                            {
                                                "type": "Identifier",
                                                "name": "'" + item.value + "'"
                                            }
                                        ]
                                    };
                                } else {
                                    // 插入表达式
                                    astObj = {
                                        "type": "VariableDeclaration",
                                        "kind": "var",
                                        "declarations": [
                                            {
                                                "type": "VariableDeclarator",
                                                "id": {
                                                    "type": "Identifier",
                                                    "name": aliasParams[index].name
                                                },
                                                "init": {
                                                    "type": "CallExpression",
                                                    "callee": {
                                                        "type": "Identifier",
                                                        "name": "require"
                                                    },
                                                    "arguments": [
                                                        {
                                                            "type": "Identifier",
                                                            "name": "'" + item.value + "'"
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    };
                                }
                                alias.body.body.splice(index, 0, astObj);
                            }
                        });
                        try {
                            // 把依赖数组去掉, 只保留exports
                            // mods.elements.length = 1;
                            json.arguments.shift();
                            // 只保留exports，前面插入require
                            if (Array.isArray(alias.params) && alias.params[0].name === 'exports') {
                                alias.params.length = 1;
                            } else {
                                alias.params.length = 0;
                            }
                        } catch (e) {
                            console.error(e);
                            console.log(srcFile);
                        }
                        
                        
                        alias.params.unshift({
                            "type": "Identifier",
                            "name": "require"
                        });
                    }
                }
            }
        });
        var content = generateTask.generate(ast);
        content = exports.replaceReactPath(content);
        if (!outputFile) {
            outputFile = srcFile.replace('/spa/', '/' + config.COMPILE_DIR_NAME + '/').replace(/\.js[x]?$/, '.js');
        }
        write(
            outputFile,
            content,
            function (error) {
                if (error) {
                    console.error(error);
                }
            }
        );
    });
}

exports.delFile = (filePath) => {
    //检测文件或者文件夹存在 nodeJS
    function fsExistsSync(path) {
        try{
            fs.accessSync(path, fs.F_OK);
        }catch(e){
            return false;
        }
        return true;
    }
    stat(filePath, (err, st) => {
        if (err) {
            console.error(err);
        }
        // 判断是否为文件
        if (st.isFile() && fsExistsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    });
    
}