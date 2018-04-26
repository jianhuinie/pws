const gaze = require('gaze');
const config = require('../config');
const util = require('../util');
const path = require('path');
const exec = require('child_process').exec;
const baseUrl = process.cwd();

// Also accepts an array of patterns 
gaze(config.SRC_DIR + '/**/*.*', function () {
    this.on('all', function (event, filePath) {
        if (event === 'deleted') {
            console.log('deleted:' + filePath);
            util.delFile(filePath);
            return;
        }
        console.log('update:' + filePath);
        if (path.extname(filePath) !== '.jsx') {
            util.copyAllFile(filePath);
        } else {
            util.transEs6ToAmd(filePath);
        }
    });
});