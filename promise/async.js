function fn(url, callback) {
    var httpRequest;　　　　 //创建XHR
    httpRequest = window.XMLHttpRequest ? new XMLHttpRequest() : 　　　 //针对IE进行功能性检测
        　　　　window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : undefined;

    httpRequest.onreadystatechange = function() {
        if (httpRequest.readystate === 4 && httpRequest.status === 200) {　　 //状态判断
            callback.call(httpRequest.responseXML);
        }
    };
    httpRequest.open("GET", url);
    httpRequest.send();
}

fn("text.xml", function() {　　　　 //调用函数
    console.log(this);　　 //此语句后输出
});

console.log("this will run before the above callback.");　　 //此语句先输出