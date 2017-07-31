//单例模式

var Singleton = (function () {
    var instance;
    function Init(args) {
        var args = args || {};
        this.age = args.age || 12;
        this.name = args.name || 'Singleton';
    }
    // function init () {
    //     return {
                //...
    //     }
    // }
    return {
        getInstance: function (args) {
            if (instance === undefined) {
                instance = new Init(args);
                // instance = init();
            }
            return instance;
        },
        name: 'Singleton'
        //还可以添加
    };
})();
var singleton1 = Singleton.getInstance({});
var singleton2 = Singleton.getInstance({});
singleton1 === singleton2;
console.log(singleton1.age);