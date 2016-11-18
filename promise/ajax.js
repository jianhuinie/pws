$.ajax({　　　　
    url: "test.html",
    success: function() {　　　　　　
        alert("哈哈，成功了！");　　　　
    },
    error: function() {　　　　　　
        alert("出错啦！");　　　　
    }　　
});


$.ajax("test.html")
.done(function() {
    alert("哈哈，成功了！");
})　　
.fail(function() {
    alert("出错啦！");
})
.done(function () {
    //
})
.always(function () {
    //
});