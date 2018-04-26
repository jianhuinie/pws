
var path = require('path');
var argv = require('yargs').argv;
var feTreeUtil = require('fe-tree/lib/util');

var config = require('./config');
var task = require('./task');

// 是否压缩（较慢）
config.release = (argv.fast || !argv.release) ? false : true;

// 是否全量 build
config.total = argv.total ? true : false;

// 源码 hash 文件存放位置，便于下次 build 进行对比
config.sourceHashFile = argv.sourceHashFile || path.join(config.projectDir, 'sourceHash.json')

// 带有 md5 的输出文件存放位置，便于下次增量编译时直接取值
config.outputHashFile = argv.outputHashFile || path.join(config.projectDir, 'outputHash.json')

config.sourceAmdConfig.minify =
config.outputAmdConfig.minify = config.release;

var totalBenchmark = feTreeUtil.benchmark('总耗时：');


var benchmark = feTreeUtil.benchmark('读文件耗时：');
task.parseSourceTree()
.then(function () {
    benchmark();


    benchmark = feTreeUtil.benchmark('对比文件变化耗时：');
    task.compareFile();
    benchmark();


    benchmark = feTreeUtil.benchmark('编译文件耗时：');
    task.buildFile()
    .then(function () {
        benchmark();


        benchmark = feTreeUtil.benchmark('写文件耗时：');
        task.outputFile();
        benchmark();


        benchmark = feTreeUtil.benchmark('添加 md5 耗时：');
        task.createHashedFile();
        benchmark();


        benchmark = feTreeUtil.benchmark('写文件耗时：');
        task.outputFile();
        benchmark();


        task.complete();


        totalBenchmark();

    });
});
