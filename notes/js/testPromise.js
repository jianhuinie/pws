
function MyPromiss() {
    this.msg='';
    this.status='pending';
    var that=this;
    arguments[0](function(){
        that.mig=arguments[0];
        that.status='resovle'
    },function(){
        that.msg=arguments[0];
        that.status='reject'
    })
}

MyPromiss.prototype.then=function(){
    if(this.status==='resolve'){
        arguments[0]=(this.msg);
    }
    if(this.status==='reject'){
        arguments[1](this.msg)
    }
}

var promise = new MyPromiss(function (resolve) { 
    setTimeout(function () { 
        console.log(3);
        resolve('12')
    }, 0);
});
promise.then(function(value) {
    console.log(value)
});