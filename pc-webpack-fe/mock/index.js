// 不要修改这个文件

'use strict';

const path = require('path');
const glob = require('glob');

const mockPath = __dirname;
const mockFiles = glob.sync('**/*.js', {
    cwd: mockPath,
});

const currentFile = __filename.substr(__dirname.length + 1);
module.exports = mockFiles.reduce((mocks, file) => {
    if (file === currentFile) {
        return mocks;
    }

    const mock = require(path.join(mockPath, file));
    return {
        ...mocks,
        ...(mock.default || mock),
    };
}, {});
