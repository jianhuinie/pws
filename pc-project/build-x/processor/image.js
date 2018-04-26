
exports.extnames = [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.ico'
];

exports.is = function (node) {
    return exports.extnames.indexOf(node.extname) >= 0;
};

exports.build = function (node, map) {

};
