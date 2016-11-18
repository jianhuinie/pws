var dtd = $.Deferred(); // 新建一个Deferred对象
　　
var wait = function(dtd) {　　　　
    var tasks = function() {　　　　　　
        console.log("执行完毕！");　　　　　　
        dtd.resolve(); // 改变Deferred对象的执行状态
        　　　　
    };　　　　
    setTimeout(tasks, 5000);　　　　
    return dtd;　　
    //return dtd.promise();
};　　
// var d = wait(dtd);
$.when(wait(dtd))　
.done(function() {
    console.log("哈哈，成功了！");
})
.fail(function() {
    console.log("出错啦！");
});　　
// dtd.resolve();