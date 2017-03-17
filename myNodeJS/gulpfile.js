var gulp = require('gulp');
var md5 = require('gulp-md5-plus');
var uglify = require("gulp-uglify");
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-minify-css');
var cssver = require('gulp-make-css-url-version'); 

gulp.task('default', function() {
  console.log('hello gulp');
});


gulp.task('testTask', function() {
    gulp.src('./*.txt')
        .pipe(md5(10))
        .pipe(gulp.dest('./input1'));
});

// gulp.watch('./input.txt', function (event) {
//     console.log(event.type);
// });
gulp.watch('./input.txt', ['default']);


gulp.task('task1',function(){
    console.log('task1 done');
});
gulp.task('task2',function(){
    console.log('task2 done!');
});
gulp.task('task3',function(){
    console.log('task3 done');
});
gulp.task('end',['task1','task3','task2'],function(){
    console.log('end done');
});

gulp.task('uglify', function() {
    gulp.src('./router.js')
        .pipe(md5(10))
        .pipe(uglify())
        .pipe(gulp.dest('./input1'));
});

gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        //省略布尔属性的值 <input checked="true"/> ==> <input />
        collapseBooleanAttributes: true,
        //删除所有空格作属性值 <input id="" /> ==> <input />
        removeEmptyAttributes: true,
        //删除<script>的type="text/javascript"
        removeScriptTypeAttributes: true,
        //删除<style>和<link>的type="text/css"
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('./test.html')
        .pipe(htmlmin(options))
        .pipe(md5(10))
        .pipe(gulp.dest('./input1'));
});

// gulp.task('testCssmin', function () {
//     gulp.src('./test.css')
//         // .pipe(cssver()) //给css文件里引用文件加版本号（文件MD5）
//         .pipe(cssmin())
//         .pipe(gulp.dest('./input1'));
// });









