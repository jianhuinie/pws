function runAsync(){
    var def = $.Deferred();
    //做一些异步操作
    setTimeout(function(){
        console.log('执行完成');
        def.resolveWith({name: 'niejianhui'}, [1, 2, 3]);
    }, 2000);
    return def;
}
//如果def是全局对象 在这加一行   def.resolve('你猜输出什么');
runAsync().then(function (data) {
    console.log(this.name);
    console.log(data);
});