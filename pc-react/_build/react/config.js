/**
 * @file react的配置文件
 * @author hurry
 * @date 2017/04/05
 */
const path = require('path');

const baseUrl = process.cwd();
const rootName = 'src';
const srcName = '';
const compileName = 'dist';

const config = {
    ROOT_DIR_NAME: rootName,
    // spa源码目录
    SRC_DIR_NAME: srcName,
    // 把spa源码编译之后的目录，在该目录基础上打包
    COMPILE_DIR_NAME: compileName,
    COMPILE_DIR: path.join(baseUrl, compileName),
    SRC_DIR: path.join(baseUrl, rootName, srcName),
    MANIFEST: path.join(baseUrl, rootName, srcName, 'manifest.js'),
    BABEL: {
        EXCLUDE_FILES: [
            path.join(rootName, '/manifest.js'),
            path.join(rootName, '/loader.js')
        ]
    }
};

module.exports = config;