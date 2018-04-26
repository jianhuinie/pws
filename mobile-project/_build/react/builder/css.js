const path = require('path');

const config = require('../config');
const util = require('../util');

exports.init = function () {
    util.copyAllFile(config.SRC_DIR, config.COMPILE_DIR, /(.+)\.styl$/ig);
}