js跨域指的是通过js在不同的域之间进行数据传输或通信
#### 一、前端与前端跨域（主域相同）
在项目中经常会出现这种问题，比如M站中的视频课页面，在html中嵌套了一个iframe（里面是video视频），本身的域名是 m.genshuixue.com，iframe的域名是 www.genshuixue.com；现在我们需要在页面底部做一个按钮，点击时让iframe中的video开始播放。在这种情况下，两个不同域名的js要进行跨域处理：
##### 1、通过修改document.domain跨子域
浏览器都有一个同源策略，其限制之一就是浏览器中不同域的框架之间是不能进行js的交互操作的。有一点需要说明，不同的框架之间（父子或同辈），是能够获取到彼此的window对象，但是你不能使用获取到的window对象的属性和方法（html5的postMessage方法例外，还有些浏览器比如ie6可以使用top、parent等少数几个属性）。总之，你可以获取到一个几乎没有什么用的window对象。

我们可以在两个html中把 document.domain 都设置成 genshuixue.com。这样我们就可以通过js访问到jframe中的各种属性和对象了。

==注意：document.domain的设置是有限制的，只能把它设置成自身或更高一级的父域，且主域必须相同==

##### 2、使用window.name＋iframe来进行跨域

window对象有个name属性,这个属性有个特征：在一个窗口（window）的生命周期内，窗口载入的所有页面都是共享一个window.name的，每个页面对window.name都有读写的权限，window.name是持久存在一个窗口载入过的所有页面中的，并不会因新页的载入而进行重置。

a.html
    
    <script>
        window.name = '我是页面a设置的值';
        setTimeout(function () {
            window.location = 'b.html';
        }, 3000);
    </script>
b.html

    <script>
        alert(window.name); //我是页面a设置的值
    </script>
    
上面的例子中在打开a页面3秒后跳到b页面并弹出“我是页面a设置的值”。如果之后所有载入的页面都没对window.name进行修改的话那么所有这些页面获取到的window.name的值都是a.html页面设置的那个值。当然，如果有需要，其中的任何一个页面都可以对window.name的值进行修改。a，b不同域也同样适用。

但是我们不能用打开一个页面的方式传递，所以设置一个中间桥梁iframe。

a页面要和请求b页面的数据并跨域，可以在a页面中新建一个iframe标签，iframe的src属性指向同源的一个页面c然后再在c中设置location=b，其中b中设置window.name为想要的数据，a中就可以用iframe.contentWindow.name来读取

这个方法有两个条件：
1.iframe标签的跨域能力
2.window.name属性值在文档刷新后依旧存在

==注意：window.name的值只能是字符串的形式，最大不超过2M。==

##### 3、window.postMessage跨域

这个方法在子页面向父页面发送亲测有效（协议不同同样适用）

    window.postMessage(message, targetOrigin);

给谁发送window就是谁，message是发送的数据信息（字符串形式），targetOrigin是目标域名（字符串形式），不限制可以写'*'。在上面的例子中我们可以用下面的写法：

www.genshuixue.com页面

    mUrl = 'http://m.genshuixue.com';
    window.parent.postMessage('start play', mUrl);
    
m.genshuixue.com页面

     window.addEventListener('message', receiveMessage);
    function receiveMessage(event) {
        if (event.origin.indexOf('genshuixue.com') < 0) return;
        if (event.data === 'start play') {
            .......//做出相应处理
        }
    }
    
上面的例子中得到的message我们可以对她的origin和data进行相应的校验处理。

==注意：postMessage支持IE8以上浏览器==

#### 前端和服务器跨域

##### 1、JSONP
jsonp是一个非官方的协议，它允许在服务器端集成Script tags返回至客服端，通过javascript callback的形式实现跨域访问JSONP即JSON with Padding。由于同源策略的限制，XmlHttpRequest只允许请求当前源（域名、协议、端口）的资源。如果要进行跨域请求，我们可以通过使用html的script标记来进行跨域请求，并在响应中返回要执行的script代码，其中可以直接使用JSON传递javascript对象。

现在有个a.html页面，它里面的代码需要利用ajax获取一个不同域上的json数据，假设这个json数据地址是http://example.com/data.php，那么a.html中的代码是下面这样：

    <script>
        function dosomething(jsondata) {
            ..........
        }
    </script>
    <script src="http://example.com/data.php?callback=dosomething"></script>
    
获取数据的地址后面还有一个callback参数，按惯例是这个参数名，但是用其他的也一样。

data.php:

    <?php
        $callback = $_GET['callback'];
        $data = array('a', 'b', 'c');
        echo $callback.'('.json_encode($data)')';
    ?>
    
最终输出：
    
    dosomething(['a', 'b', 'c'])
    
==jsonp原理：通过script标签引入一个js文件，这个js文件载入成功后会执行我们再url参数中指定的函数，并且把我们需要的json数据作为参数传入。故jsonp需要服务器端进行配合。==

知道原理后，我们就可以用jquery或者用js动态声称script标签进行跨域操作：

    function getJsonp(url, data) {
        return $.ajax({
            url: url,
            data: data,
            dataType: 'jsonp'
            },
            success: suc(response)
        );
    }
    
    
##### 2、CORS
CORS是跨域资源共享（Cross－Origin Resourse Sharing）的缩写。是跨域AJAX请求的根本解决方法。相比JSONP只能发GET请求，CORS允许任何类型的请求。

它是W3C标准，允许浏览器向跨域服务器发出‘XMLHttpRequest’请求，从而克服了AJAX只能同源使用的限制。

==CORS与JSONP的使用目的相同，但是比JSONP更强大。JSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。==

整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信和同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

==实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。==

浏览器将CORS请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。

简单请求要满足两个条件(没有同时满足的则是非简单请求)：

（1）请求方法是HEAD、GET、POST中之一

（2）HTTP的头信息不超过几种字段（Accept, Accept-Language, Content-Language, Last-Event-ID, Content-Type）

###### 简单请求
对于简单请求，浏览器直接发出CORS请求。就是再头信息之中，增加一个Origin字段。

下面的例子中，浏览器发现这次跨源AJAX请求是简单请求，就自动在头信息之中，添加一个Origin字段。Origin字段表现了本次请求来自哪个源（协议＋域名＋端口）。服务器根据这个值，决定是否同意这次请求。如果Orgin指定的源，不在许可范围内，服务器会返回一个正常的HTTP回应。浏览器发现这个回应的头信息没有包含Access-Control-Allow-Orgin字段，就知道出错了，从而抛出一个错误，被XMLHttpRequest的onerror回调函数捕获。注意，这种错误无法通过状态码识别，因为HTTP回应的状态码有可能是200.

    GET /cors HTTP/1.1
    Origin: http://api.bob.com
    Host: api.alice.com
    Accept-Language: en-US
    Connection: keep-alive
    User-Agent: Mozilla/5.0...


如果Origin指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。

    Access-Control-Allow-Origin: http://api.bob.com
    Access-Control-Allow-Credentials: true
    Access-Control-Expose-Headers: FooBar
    Content-Type: text/html; charset=utf-8

上面的头信息之中，有三个与CORS请求相关的字段，都以Access-Control-开头。

（1）Access-Control-Allow-Origin：该字段是必须的，它的值要么是请求时Origin字段的值，要么是一个＊，表示接受任意域名的请求。

（2）Access-Control-Allow-Credentials：该字段可选，值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。

（3）Access-Control-Expose-Headers：该字段可选。CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。上面的例子指定，getResponseHeaderx('FooBar')可以返回FooBar字段的值。

 withCredentials属性
 
CORS请求默认不发送Cookie和HTTP认证信息。如果要把Cookie发到服务器，一方面要服务器同意，指定Access-Control-Allow-Credentials字段。

    Access-Control-Allow-Credentials: true
    
另一方面，开发者必须在AJAX请求中打开withCredentials属性。

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
否则，即使服务器同意发送Cookie，浏览器也不会发送。或者，服务器要求设置Cookie，浏览器也不会处理。但是，如果省略withCredentials设置，有的浏览器还是会一起发送Cookie。这时，可以显式关闭withCredentials。

    xhr.withCredentials = false;
    
需要注意的是，如果要发送Cookie，Access-Control-Allow-Origin就不能设置为＊，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的document.cookie也无法读取服务器域名下的Cookie。

###### 非简单请求

1.预检请求

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json

非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为“预检”请求。

浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会正式发出XMLHttpRequest请求，否则报错。下面是一段javascript脚本。

    var url = 'http://api.alice.com/cors';
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('X-Custom-Header', 'Value');
    xhr.send();
    
上面的代码中，HTTP请求的方法是PUT，并且发送一个自定义头信息X-Custom-Header.

浏览器发现，这是一个非简单请求，就自动发出一个“预检”请求，要求服务器确认可以这样请求。下面是这个“预检”请求的HTTP头信息。

    OPTIONS/cors HTTP/1.1
    Origin: http://api.bob.com
    Access-Control-Request-Method: PUT
    Access-Control-Request-Headers: X-Custom-Header
    Host: api.alice.com
    Accept-Language: en-US
    Connection: keep-alive
    User-Agent: Mozilla/5.0...
    
"预检"请求用的请求方法是OPTIONS，表示这个请求是用来询问的。头信息里面，关键字段是Origin，表示请求来自哪个源。
除了Origin字段，"预检"请求的头信息包括两个特殊字段：Access-Control-Request-Method（该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是PUT）；Access-Control-Request-Headers（该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，上例是X-Custom-Header）。

2.预检请求的回应

服务器收到"预检"请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。

    HTTP/1.1 200 OK
    Date: Mon, 01 Dec 2008 01:15:39 GMT
    Server: Apache/2.0.61 (Unix)
    Access-Control-Allow-Origin: http://api.bob.com
    Access-Control-Allow-Methods: GET, POST, PUT
    Access-Control-Allow-Headers: X-Custom-Header
    Content-Type: text/html; charset=utf-8
    Content-Encoding: gzip
    Content-Length: 0
    Keep-Alive: timeout=2, max=100
    Connection: Keep-Alive
    Content-Type: text/plain
    
上面的HTTP回应中，关键的是Access-Control-Allow-Origin字段，表示http://api.bob.com可以请求数据。该字段也可以设为星号，表示同意任意跨源请求。

如果浏览器否定了"预检"请求，会返回一个正常的HTTP回应，但是没有任何CORS相关的头信息字段。这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被XMLHttpRequest对象的onerror回调函数捕获。控制台会打印出如下的报错信息。

    XMLHttpRequest cannot load http://api.alice.com.
    Origin http://api.bob.com is not allowed by Access-Control-Allow-Origin.
    
服务器回应的其他CORS相关字段如下。

    Access-Control-Allow-Methods: GET, POST, PUT
    Access-Control-Allow-Headers: X-Custom-Header
    Access-Control-Allow-Credentials: true
    Access-Control-Max-Age: 1728000
    
（1）Access-Control-Allow-Methods
该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。

（2）Access-Control-Allow-Headers
如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。

（3）Access-Control-Allow-Credentials
该字段与简单请求时的含义相同。

（4）Access-Control-Max-Age
该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是20天（1728000秒），即允许缓存该条回应1728000秒（即20天），在此期间，不用发出另一条预检请求。

3.浏览器的正常请求和回应

一旦服务器通过了"预检"请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个Origin头信息字段。服务器的回应，也都会有一个Access-Control-Allow-Origin头信息字段。下面是"预检"请求之后，浏览器的正常CORS请求。其中Origin字段是浏览器自动添加的。

    PUT /cors HTTP/1.1
    Origin: http://api.bob.com
    Host: api.alice.com
    X-Custom-Header: value
    Accept-Language: en-US
    Connection: keep-alive
    User-Agent: Mozilla/5.0...
    
下面是服务器正常的回应。

    Access-Control-Allow-Origin: http://api.bob.com
    Content-Type: text/html; charset=utf-8
    
上面头信息中，Access-Control-Allow-Origin字段是每次回应都必定包含的。
##### 3.XDomainRequest
XDomainRequest跨域是针对IE8和IE9的跨域技术(只支持IE8、IE9)，CORS跨域支持IE10+，所以IE8和IE9的跨域就是一个空档，我们需要用XDomainRequest实现。
###### 相应事件
    
    var xdr = new XDomainRequest();
    
（1）onerror

在跨域请求发生错误时触发，事件方法没有参数

    function err () {
        alert('XDR onerror');
    }
    xdr.onerror = err;
    
（2）onload

跨域请求完成后触发，事件方法没有参数

    function loaded () {
        alert('XDR onload');
    }
    xdr.onload = loaded;
    
（3）onprogress

跨域请求接受数据时触发，事件方法没有参数，此事件在调用send方法和onload事件触发间隔内触发0,1或者无数次

    function progres () {
        alert('XDR onprogress');
    }
    xdr.onprogress = progres;
    
（4）ontimeout

跨域请求连接超时时触发，事件方法没有参数。此事件限于onload事件触发。触发了ontimeout事件，XDomainRequest属性responseText不可用，调用此属性会报错。

    function timeo () {
        alert('XDR ontimeout');
    }
    xdr.ontimeout = timeo;
    
###### 对象方法
（1）abort

终止当前http跨域请求。使用方法：object.abort() ，无参数。
返回值类型：HRESULT（参见：https://my.oschina.net/u/1024767/blog/354493），成功执行返回S_OK，否则返回HRESULT错误代码。

在open方法被调用后，onload事件触发前调用，在其他时间段内调用此方法会报错。

    xdr.abort();
    
（2）open

链接服务器，打开跨域请求。

参数说明：

bstrMethod：字符串，请求方法，get或者post
bstrUrl：字符串，服务器url地址，
==把要发送的数据以参数形式放到url后面==

    xdr.open(bstrMethod, bstrUrl);

（3）send

发送到服务器的字符串数据。

    xdr.send();
###### 后端支持
后端需要设置：Access-Control-Allow-Origin和Access-Control-Allow-Methods即可
###### 前端实现

###### 对象属性
（1）constructor

返回对象构造函数

（2）contentType

获取请求或者想要的内容类型

    value = xdr.get_contentType( p);
    
（3）responseText

响应的内容，字符串格式

（4）timeout

获取或者设置跨域请求超时时间，单位毫秒

下面以机构登录为例：

    if (window.XDomainRequest) {
        var appliance = new window.XDomainRequest();
        appliance.onload = function () {
            var response = JSON.parse(appliance.responseText);
            if (response.code === 0) {
                    if (response.data.redirect_url) {
                            location.href = decodeURIComponent(response.data.redirect_url);
                        } else {
                            location.reload();
                        }
                    }
                    else {
                        alert(response.msg || '用户名或密码错误');
                    }
                };
        appliance.onerror = function (response) {
            alert('网络异常，请稍后重试');
        };
        var data = 'appId=' + formData.appId
                    + '&username=' + formData.username
                    + '&symbol=' + formData.symbol
                    + '&countryCode=' + formData.countryCode
                    + '&password=' + formData.password
                    + '&rememberMe=' + formData.rememberMe
                    + '&targetService=' + formData.targetService;
        appliance.open("POST", loginUrl + '?' + data, true);
        setTimeout(function () {
            appliance.send();
            }, 0);
        }
        
==上面的send放在timeout中，为了防止多个XDoaminRequest在同一时间发送而丢失。==
##### 4.withCredentials属性
正常情况下前后端跨域，后端没有读写写cookie的权限，这种情况下我们可以通过给前后端加属性实现。

服务器端需要配置参数：

    Access-Control-Allow-Credentials:true

前端需要在请求头中加上:

    xhrFields: {
        withCredentials: true
    }
=======
js跨域指的是通过js在不同的域之间进行数据传输或通信
#### 一、前端与前端跨域（主域相同）
在项目中经常会出现这种问题，比如M站中的视频课页面，在html中嵌套了一个iframe（里面是video视频），本身的域名是 m.genshuixue.com，iframe的域名是 www.genshuixue.com；现在我们需要在页面底部做一个按钮，点击时让iframe中的video开始播放。在这种情况下，两个不同域名的js要进行跨域处理：
##### 1、通过修改document.domain跨子域
浏览器都有一个同源策略，其限制之一就是浏览器中不同域的框架之间是不能进行js的交互操作的。有一点需要说明，不同的框架之间（父子或同辈），是能够获取到彼此的window对象，但是你不能使用获取到的window对象的属性和方法（html5的postMessage方法例外，还有些浏览器比如ie6可以使用top、parent等少数几个属性）。总之，你可以获取到一个几乎没有什么用的window对象。

我们可以在两个html中把 document.domain 都设置成 genshuixue.com。这样我们就可以通过js访问到jframe中的各种属性和对象了。

==注意：document.domain的设置是有限制的，只能把它设置成自身或更高一级的父域，且主域必须相同==

##### 2、使用window.name＋iframe来进行跨域

window对象有个name属性,这个属性有个特征：在一个窗口（window）的生命周期内，窗口载入的所有页面都是共享一个window.name的，每个页面对window.name都有读写的权限，window.name是持久存在一个窗口载入过的所有页面中的，并不会因新页的载入而进行重置。

a.html
    
    <script>
        window.name = '我是页面a设置的值';
        setTimeout(function () {
            window.location = 'b.html';
        }, 3000);
    </script>
b.html

    <script>
        alert(window.name); //我是页面a设置的值
    </script>
    
上面的例子中在打开a页面3秒后跳到b页面并弹出“我是页面a设置的值”。如果之后所有载入的页面都没对window.name进行修改的话那么所有这些页面获取到的window.name的值都是a.html页面设置的那个值。当然，如果有需要，其中的任何一个页面都可以对window.name的值进行修改。a，b不同域也同样适用。

但是我们不能用打开一个页面的方式传递，所以设置一个中间桥梁iframe。

a页面要和请求b页面的数据并跨域，可以在a页面中新建一个iframe标签，iframe的src属性指向同源的一个页面c然后再在c中设置location=b，其中b中设置window.name为想要的数据，a中就可以用iframe.contentWindow.name来读取

这个方法有两个条件：
1.iframe标签的跨域能力
2.window.name属性值在文档刷新后依旧存在

==注意：window.name的值只能是字符串的形式，最大不超过2M。==

##### 3、window.postMessage跨域

这个方法在子页面向父页面发送亲测有效（协议不同同样适用）

    window.postMessage(message, targetOrigin);

给谁发送window就是谁，message是发送的数据信息（字符串形式），targetOrigin是目标域名（字符串形式），不限制可以写'*'。在上面的例子中我们可以用下面的写法：

www.genshuixue.com页面

    mUrl = 'http://m.genshuixue.com';
    window.parent.postMessage('start play', mUrl);
    
m.genshuixue.com页面

     window.addEventListener('message', receiveMessage);
    function receiveMessage(event) {
        if (event.origin.indexOf('genshuixue.com') < 0) return;
        if (event.data === 'start play') {
            .......//做出相应处理
        }
    }
    
上面的例子中得到的message我们可以对她的origin和data进行相应的校验处理。

==注意：postMessage支持IE8以上浏览器==

#### 前端和服务器跨域

##### 1、JSONP
jsonp是一个非官方的协议，它允许在服务器端集成Script tags返回至客服端，通过javascript callback的形式实现跨域访问JSONP即JSON with Padding。由于同源策略的限制，XmlHttpRequest只允许请求当前源（域名、协议、端口）的资源。如果要进行跨域请求，我们可以通过使用html的script标记来进行跨域请求，并在响应中返回要执行的script代码，其中可以直接使用JSON传递javascript对象。

现在有个a.html页面，它里面的代码需要利用ajax获取一个不同域上的json数据，假设这个json数据地址是http://example.com/data.php，那么a.html中的代码是下面这样：

    <script>
        function dosomething(jsondata) {
            ..........
        }
    </script>
    <script src="http://example.com/data.php?callback=dosomething"></script>
    
获取数据的地址后面还有一个callback参数，按惯例是这个参数名，但是用其他的也一样。

data.php:

    <?php
        $callback = $_GET['callback'];
        $data = array('a', 'b', 'c');
        echo $callback.'('.json_encode($data)')';
    ?>
    
最终输出：
    
    dosomething(['a', 'b', 'c'])
    
==jsonp原理：通过script标签引入一个js文件，这个js文件载入成功后会执行我们再url参数中指定的函数，并且把我们需要的json数据作为参数传入。故jsonp需要服务器端进行配合。==

知道原理后，我们就可以用jquery或者用js动态声称script标签进行跨域操作：

    function getJsonp(url, data) {
        return $.ajax({
            url: url,
            data: data,
            dataType: 'jsonp'
            },
            success: suc(response)
        );
    }
    
    
##### 2、CORS
CORS是跨域资源共享（Cross－Origin Resourse Sharing）的缩写。是跨域AJAX请求的根本解决方法。相比JSONP只能发GET请求，CORS允许任何类型的请求。

它是W3C标准，允许浏览器向跨域服务器发出‘XMLHttpRequest’请求，从而克服了AJAX只能同源使用的限制。

==CORS与JSONP的使用目的相同，但是比JSONP更强大。JSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。==

整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信和同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

==实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。==

浏览器将CORS请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。

简单请求要满足两个条件(没有同时满足的则是非简单请求)：

（1）请求方法是HEAD、GET、POST中之一

（2）HTTP的头信息不超过几种字段（Accept, Accept-Language, Content-Language, Last-Event-ID, Content-Type）

###### 简单请求
对于简单请求，浏览器直接发出CORS请求。就是再头信息之中，增加一个Origin字段。

下面的例子中，浏览器发现这次跨源AJAX请求是简单请求，就自动在头信息之中，添加一个Origin字段。Origin字段表现了本次请求来自哪个源（协议＋域名＋端口）。服务器根据这个值，决定是否同意这次请求。如果Orgin指定的源，不在许可范围内，服务器会返回一个正常的HTTP回应。浏览器发现这个回应的头信息没有包含Access-Control-Allow-Orgin字段，就知道出错了，从而抛出一个错误，被XMLHttpRequest的onerror回调函数捕获。注意，这种错误无法通过状态码识别，因为HTTP回应的状态码有可能是200.

    GET /cors HTTP/1.1
    Origin: http://api.bob.com
    Host: api.alice.com
    Accept-Language: en-US
    Connection: keep-alive
    User-Agent: Mozilla/5.0...


如果Origin指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。

    Access-Control-Allow-Origin: http://api.bob.com
    Access-Control-Allow-Credentials: true
    Access-Control-Expose-Headers: FooBar
    Content-Type: text/html; charset=utf-8

上面的头信息之中，有三个与CORS请求相关的字段，都以Access-Control-开头。

（1）Access-Control-Allow-Origin：该字段是必须的，它的值要么是请求时Origin字段的值，要么是一个＊，表示接受任意域名的请求。

（2）Access-Control-Allow-Credentials：该字段可选，值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。

（3）Access-Control-Expose-Headers：该字段可选。CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。上面的例子指定，getResponseHeaderx('FooBar')可以返回FooBar字段的值。

 withCredentials属性
 
CORS请求默认不发送Cookie和HTTP认证信息。如果要把Cookie发到服务器，一方面要服务器同意，指定Access-Control-Allow-Credentials字段。

    Access-Control-Allow-Credentials: true
    
另一方面，开发者必须在AJAX请求中打开withCredentials属性。

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
否则，即使服务器同意发送Cookie，浏览器也不会发送。或者，服务器要求设置Cookie，浏览器也不会处理。但是，如果省略withCredentials设置，有的浏览器还是会一起发送Cookie。这时，可以显式关闭withCredentials。

    xhr.withCredentials = false;
    
需要注意的是，如果要发送Cookie，Access-Control-Allow-Origin就不能设置为＊，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的document.cookie也无法读取服务器域名下的Cookie。

###### 非简单请求

1.预检请求

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json

非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为“预检”请求。

浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会正式发出XMLHttpRequest请求，否则报错。下面是一段javascript脚本。

    var url = 'http://api.alice.com/cors';
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('X-Custom-Header', 'Value');
    xhr.send();
    
上面的代码中，HTTP请求的方法是PUT，并且发送一个自定义头信息X-Custom-Header.

浏览器发现，这是一个非简单请求，就自动发出一个“预检”请求，要求服务器确认可以这样请求。下面是这个“预检”请求的HTTP头信息。

    OPTIONS/cors HTTP/1.1
    Origin: http://api.bob.com
    Access-Control-Request-Method: PUT
    Access-Control-Request-Headers: X-Custom-Header
    Host: api.alice.com
    Accept-Language: en-US
    Connection: keep-alive
    User-Agent: Mozilla/5.0...
    
"预检"请求用的请求方法是OPTIONS，表示这个请求是用来询问的。头信息里面，关键字段是Origin，表示请求来自哪个源。
除了Origin字段，"预检"请求的头信息包括两个特殊字段：Access-Control-Request-Method（该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是PUT）；Access-Control-Request-Headers（该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，上例是X-Custom-Header）。

2.预检请求的回应

服务器收到"预检"请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。

    HTTP/1.1 200 OK
    Date: Mon, 01 Dec 2008 01:15:39 GMT
    Server: Apache/2.0.61 (Unix)
    Access-Control-Allow-Origin: http://api.bob.com
    Access-Control-Allow-Methods: GET, POST, PUT
    Access-Control-Allow-Headers: X-Custom-Header
    Content-Type: text/html; charset=utf-8
    Content-Encoding: gzip
    Content-Length: 0
    Keep-Alive: timeout=2, max=100
    Connection: Keep-Alive
    Content-Type: text/plain
    
上面的HTTP回应中，关键的是Access-Control-Allow-Origin字段，表示http://api.bob.com可以请求数据。该字段也可以设为星号，表示同意任意跨源请求。

如果浏览器否定了"预检"请求，会返回一个正常的HTTP回应，但是没有任何CORS相关的头信息字段。这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被XMLHttpRequest对象的onerror回调函数捕获。控制台会打印出如下的报错信息。

    XMLHttpRequest cannot load http://api.alice.com.
    Origin http://api.bob.com is not allowed by Access-Control-Allow-Origin.
    
服务器回应的其他CORS相关字段如下。

    Access-Control-Allow-Methods: GET, POST, PUT
    Access-Control-Allow-Headers: X-Custom-Header
    Access-Control-Allow-Credentials: true
    Access-Control-Max-Age: 1728000
    
（1）Access-Control-Allow-Methods
该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。

（2）Access-Control-Allow-Headers
如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。

（3）Access-Control-Allow-Credentials
该字段与简单请求时的含义相同。

（4）Access-Control-Max-Age
该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是20天（1728000秒），即允许缓存该条回应1728000秒（即20天），在此期间，不用发出另一条预检请求。

3.浏览器的正常请求和回应

一旦服务器通过了"预检"请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个Origin头信息字段。服务器的回应，也都会有一个Access-Control-Allow-Origin头信息字段。下面是"预检"请求之后，浏览器的正常CORS请求。其中Origin字段是浏览器自动添加的。

    PUT /cors HTTP/1.1
    Origin: http://api.bob.com
    Host: api.alice.com
    X-Custom-Header: value
    Accept-Language: en-US
    Connection: keep-alive
    User-Agent: Mozilla/5.0...
    
下面是服务器正常的回应。

    Access-Control-Allow-Origin: http://api.bob.com
    Content-Type: text/html; charset=utf-8
    
上面头信息中，Access-Control-Allow-Origin字段是每次回应都必定包含的。
##### 3.XDomainRequest
XDomainRequest跨域是针对IE8和IE9的跨域技术(只支持IE8、IE9)，CORS跨域支持IE10+，所以IE8和IE9的跨域就是一个空档，我们需要用XDomainRequest实现。
###### 相应事件
    
    var xdr = new XDomainRequest();
    
（1）onerror

在跨域请求发生错误时触发，事件方法没有参数

    function err () {
        alert('XDR onerror');
    }
    xdr.onerror = err;
    
（2）onload

跨域请求完成后触发，事件方法没有参数

    function loaded () {
        alert('XDR onload');
    }
    xdr.onload = loaded;
    
（3）onprogress

跨域请求接受数据时触发，事件方法没有参数，此事件在调用send方法和onload事件触发间隔内触发0,1或者无数次

    function progres () {
        alert('XDR onprogress');
    }
    xdr.onprogress = progres;
    
（4）ontimeout

跨域请求连接超时时触发，事件方法没有参数。此事件限于onload事件触发。触发了ontimeout事件，XDomainRequest属性responseText不可用，调用此属性会报错。

    function timeo () {
        alert('XDR ontimeout');
    }
    xdr.ontimeout = timeo;
    
###### 对象方法
（1）abort

终止当前http跨域请求。使用方法：object.abort() ，无参数。
返回值类型：HRESULT（参见：https://my.oschina.net/u/1024767/blog/354493），成功执行返回S_OK，否则返回HRESULT错误代码。

在open方法被调用后，onload事件触发前调用，在其他时间段内调用此方法会报错。

    xdr.abort();
    
（2）open

链接服务器，打开跨域请求。

参数说明：

bstrMethod：字符串，请求方法，get或者post
bstrUrl：字符串，服务器url地址，
==把要发送的数据以参数形式放到url后面==

    xdr.open(bstrMethod, bstrUrl);

（3）send

发送到服务器的字符串数据。

    xdr.send();
###### 后端支持
后端需要设置：Access-Control-Allow-Origin和Access-Control-Allow-Methods即可
###### 前端实现

###### 对象属性
（1）constructor

返回对象构造函数

（2）contentType

获取请求或者想要的内容类型

    value = xdr.get_contentType( p);
    
（3）responseText

响应的内容，字符串格式

（4）timeout

获取或者设置跨域请求超时时间，单位毫秒

下面以机构登录为例：

    if (window.XDomainRequest) {
        var appliance = new window.XDomainRequest();
        appliance.onload = function () {
            var response = JSON.parse(appliance.responseText);
            if (response.code === 0) {
                    if (response.data.redirect_url) {
                            location.href = decodeURIComponent(response.data.redirect_url);
                        } else {
                            location.reload();
                        }
                    }
                    else {
                        alert(response.msg || '用户名或密码错误');
                    }
                };
        appliance.onerror = function (response) {
            alert('网络异常，请稍后重试');
        };
        var data = 'appId=' + formData.appId
                    + '&username=' + formData.username
                    + '&symbol=' + formData.symbol
                    + '&countryCode=' + formData.countryCode
                    + '&password=' + formData.password
                    + '&rememberMe=' + formData.rememberMe
                    + '&targetService=' + formData.targetService;
        appliance.open("POST", loginUrl + '?' + data, true);
        setTimeout(function () {
            appliance.send();
            }, 0);
        }
        
==上面的send放在timeout中，为了防止多个XDoaminRequest在同一时间发送而丢失。==

##### 4.withCredentials属性
正常情况下前后端跨域，后端没有读写写cookie的权限，这种情况下我们可以通过给前后端加属性实现。

服务器端需要配置参数：

    Access-Control-Allow-Credentials:true

前端需要在请求头中加上:

    xhrFields: {
        withCredentials: true
    }
