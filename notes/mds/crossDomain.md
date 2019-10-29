### 什么是跨域？
协议、域名、端口三者有其一不一致即构成跨域；

JS跨域指的是通过JS在不同的域之间进行数据传输或通信。


### 跨域如何实现？
_______

#### 一、前端与前端跨域（主域相同）
在项目中经常会出现这种问题，比如M站中的课程详情页，在HTML中嵌套了一个 iframe（播放 video 视频），本身的域名是 a，iframe的域名是 b；
现在我们需要在页面底部做一个按钮，点击时让 iframe 中的 video 开始播放。在这种情况下，两个不同域名的js要进行跨域处理：

##### 1、通过修改document.domain跨子域
浏览器都有一个同源策略，其限制之一就是浏览器中不同域的框架之间是不能进行js的交互操作的。有一点需要说明，不同的框架之间（父子或同辈），
是能够获取到彼此的 window 对象，但是你不能使用获取到的 window 对象的属性和方法（HTML5 的 postMessage 方法例外，还有些浏览器比如 ie6 可以使用 top、parent 等少数几个属性）。
总之，你可以获取到一个几乎没有什么用的 window 对象。

我们可以在两个HTML中把 document.domain 都设置成 c。这样我们就可以通过 js 访问到 iframe 中的各种属性和对象了。

注意：document.domain 的设置是有限制的，只能把它设置成自身或更高一级的父域，且主域必须相同。

##### 2、使用window.name ＋ iframe 来进行跨域

window 对象有个 name 属性，这个属性有个特征：在一个窗口（window）的生命周期内，窗口载入的所有页面都是共享一个 window.name 的，每个页面对 window.name 都有读写的权限，
window.name 是持久存在一个窗口载入过的所有页面中的，并不会因新页的载入而进行重置。

```js
a.HTML

    <script>
        window.name = '我是页面a设置的值';
        setTimeout(function () {
            window.location = 'b.HTML';
        }, 3000);
    </script>

b.HTML

    <script>
        alert(window.name); // 我是页面a设置的值
    </script>
```

上面的例子中在打开 a 页面 3 秒后跳到 b 页面并弹出“我是页面a设置的值”。如果之后所有载入的页面都没对 window.name 进行修改的话，
那么所有这些页面获取到的 window.name 的值都是 a.HTML 页面设置的那个值。当然，如果有需要，其中的任何一个页面都可以对 window.name 的值进行修改。a，b 不同域也同样适用。

但是我们不能用打开一个页面的方式传递，所以设置一个中间桥梁 iframe。

a 页面要和请求 b 页面的数据并跨域，可以在 a 页面中新建一个 iframe 标签，iframe 的 src 属性指向同源的一个页面 c 然后再在 c 中设置 location=b，
其中 b 中设置 window.name 为想要的数据，a 中就可以用 iframe.contentWindow.name 来读取。

这个方法有两个条件：

1.iframe 标签的跨域能力

2.window.name 属性值在文档刷新后依旧存在

注意：window.name 的值只能是字符串的形式，最大不超过2M。

##### 3、window.postMessage 跨域

这个方法在子页面向父页面发送亲测有效（协议不同同样适用）

    window.postMessage(message, targetOrigin);

给谁发送 window 就是谁，message 是发送的数据信息（字符串形式），targetOrigin 是目标域名（字符串形式），不限制可以写 '*'。在上面的例子中我们可以用下面的写法：

```js
b 页面

    mUrl = '';
    window.parent.postMessage('start play', mUrl);

a 页面

    window.addEventListener('message', receiveMessage);
    function receiveMessage(event) {
        if (event.origin.indexOf('') < 0) return;

        if (event.data === 'start play') {
            ....... // 做出相应处理
        }
    }
```

上面的例子中得到的 message 我们可以对它的 origin 和 data 进行相应的校验处理。

注意：postMessage 支持 IE8 以上浏览器。

______

#### 前端和服务器跨域

##### 1、JSONP
JSONP 是一个非官方的协议，它允许在服务器端集成 Script tags 返回至客服端，通过 javascript callback 的形式实现跨域访问 JSONP 即JSON with Padding。
由于同源策略的限制，XmlHttpRequest 只允许请求当前源（域名、协议、端口）的资源。如果要进行跨域请求，我们可以通过使用HTML的 script 标记来进行跨域请求，
并在响应中返回要执行的 script 代码，其中可以直接使用 JSON 传递 javascript 对象。

现在有个 a.html 页面，它里面的代码需要利用 AJAX 获取一个不同域上的 json 数据，假设这个 json 数据地址是 http://example.com/data.php，那么 a.html 中的代码是下面这样：

```js
    <script>
        function dosomething(jsondata) {
            ..........
        }
    </script>
    <script src="http://example.com/data.php?callback=dosomething"></script>
```

获取数据的地址后面还有一个 callback 参数，按惯例是这个参数名，但是用其他的也一样。

```js
data.php:

    <?php
        $callback = $_GET['callback'];
        $data = array('a', 'b', 'c');
        echo $callback.'('.json_encode($data)')';
    ?>

最终输出：

    dosomething(['a', 'b', 'c'])
```

JSONP原理：通过 script 标签引入一个 JS 文件，这个 JS 文件载入成功后会执行我们在 URL 参数中指定的函数，并且把我们需要的 json 数据作为参数传入。故 JSONP 需要服务器端进行配合。

知道原理后，我们就可以用 jquery 或者用 JS 动态声称 script 标签进行跨域操作：

```js
    function getJsonp(url, data) {
        return $.ajax({
            url: url,
            data: data,
            dataType: 'jsonp'
            },
            success: suc(response)
        );
    }
```

##### 2、CORS
CORS是跨域资源共享（Cross－Origin Resourse Sharing）的缩写。是跨域 AJAX 请求的根本解决方法。相比 JSONP 只能发 GET 请求，CORS 允许任何类型的请求。

它是 W3C 标准，允许浏览器向跨域服务器发出 ‘XMLHttpRequest’ 请求，从而克服了 AJAX 只能同源使用的限制。

CORS 与 JSONP 的使用目的相同，但是比 JSONP 更强大。JSONP 只支持 GET 请求，CORS 支持所有类型的 HTTP 请求。JSONP 的优势在于支持老式浏览器，以及可以向不支持 CORS 的网站请求数据。

整个 CORS 通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS 通信和同源的 AJAX 通信没有差别，代码完全一样。浏览器一旦发现 AJAX 请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

实现 CORS 通信的关键是服务器。只要服务器实现了 CORS 接口，就可以跨源通信。

浏览器将 CORS 请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。

简单请求要满足两个条件(没有同时满足的则是非简单请求)：

（1）请求方法是 HEAD、GET、POST 中之一

（2）HTTP 的头信息不超过几种字段（Accept, Accept-Language, Content-Language, Last-Event-ID, Content-Type）

###### 简单请求
对于简单请求，浏览器直接发出 CORS 请求。就是在头信息之中，增加一个 Origin 字段。

下面的例子中，浏览器发现这次跨源 AJAX 请求是简单请求，就自动在头信息之中，添加一个 Origin 字段。Origin 字段表现了本次请求来自哪个源（协议＋域名＋端口）。服务器根据这个值，决定是否同意这次请求。如果 Orgin 指定的源，不在许可范围内，服务器会返回一个正常的 HTTP 回应。浏览器发现这个回应的头信息没有包含 Access-Control-Allow-Orgin 字段，就知道出错了，从而抛出一个错误，被 XMLHttpRequest 的 onerror 回调函数捕获。注意，这种错误无法通过状态码识别，因为 HTTP 回应的状态码有可能是200.

    GET /cors HTTP/1.1
    Origin: http://api.bob.com
    Host: api.alice.com
    Accept-Language: en-US
    Connection: keep-alive
    User-Agent: Mozilla/5.0...


如果 Origin 指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。

    Access-Control-Allow-Origin: http://api.bob.com
    Access-Control-Allow-Credentials: true
    Access-Control-Expose-Headers: FooBar
    Content-Type: text/HTML; charset=utf-8

上面的头信息之中，有三个与 CORS 请求相关的字段，都以 Access-Control- 开头。

（1）Access-Control-Allow-Origin：该字段是必须的，它的值要么是请求时 Origin 字段的值，要么是一个 '*'，表示接受任意域名的请求。

（2）Access-Control-Allow-Credentials：该字段可选，值是一个布尔值，表示是否允许发送 Cookie。默认情况下，Cookie 不包括在 CORS 请求中。设为true，即表示服务器明确许可，Cookie 可以包含在请求中，一起发给服务器。这个值也只能设为 true，如果服务器不要浏览器发送 Cookie，删除该字段即可。

（3）Access-Control-Expose-Headers：该字段可选。CORS 请求时，XMLHttpRequest 对象的 getResponseHeader() 方法只能拿到 6 个基本字段：Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma。如果想拿到其他字段，就必须在 Access-Control-Expose-Headers 里面指定。上面的例子指定，getResponseHeaderx('FooBar') 可以返回 FooBar 字段的值。

withCredentials属性：

CORS 请求默认不发送 Cookie 和 HTTP 认证信息。如果要把 Cookie 发到服务器，一方面要服务器同意，指定 Access-Control-Allow-Credentials 字段。

    Access-Control-Allow-Credentials: true

另一方面，开发者必须在 AJAX 请求中打开 withCredentials 属性。

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

否则，即使服务器同意发送 Cookie，浏览器也不会发送。或者，服务器要求设置 Cookie，浏览器也不会处理。但是，如果省略 withCredentials 设置，有的浏览器还是会一起发送 Cookie。这时，可以显式关闭withCredentials。

    xhr.withCredentials = false;

需要注意的是，如果要发送 Cookie，Access-Control-Allow-Origin 就不能设置为 '*'，必须指定明确的、与请求网页一致的域名。同时，Cookie 依然遵循同源政策，只有用服务器域名设置的 Cookie 才会上传，其他域名的 Cookie 并不会上传，且（跨源）原网页代码中的 document.cookie 也无法读取服务器域名下的 Cookie。

###### 非简单请求

1.预检请求

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是 PUT或 DELETE ，或者 Content-Type 字段的类型是 application/json

非简单请求的 CORS 请求，会在正式通信之前，增加一次 HTTP查询请求，称为“预检”请求。

浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些 HTTP 动词和头信息字段。只有得到肯定答复，浏览器才会正式发出 XMLHttpRequest 请求，否则报错。下面是一段javascript 脚本。

```js
    var url = 'http://api.alice.com/cors';
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('X-Custom-Header', 'Value');
    xhr.send();
```

上面的代码中，HTTP 请求的方法是 PUT，并且发送一个自定义头信息 X-Custom-Header.

浏览器发现，这是一个非简单请求，就自动发出一个“预检”请求，要求服务器确认可以这样请求。下面是这个“预检”请求的 HTTP 头信息。

    OPTIONS/cors HTTP/1.1
    Origin: http://api.bob.com
    Access-Control-Request-Method: PUT
    Access-Control-Request-Headers: X-Custom-Header
    Host: api.alice.com
    Accept-Language: en-US
    Connection: keep-alive
    User-Agent: Mozilla/5.0...

"预检"请求用的请求方法是 OPTIONS，表示这个请求是用来询问的。头信息里面，关键字段是 Origin，表示请求来自哪个源。
除了 Origin 字段，"预检"请求的头信息包括两个特殊字段：Access-Control-Request-Method（该字段是必须的，用来列出浏览器的 CORS 请求会用到哪些 HTTP 方法，上例是 PUT）；Access-Control-Request-Headers（该字段是一个逗号分隔的字符串，指定浏览器 CORS 请求会额外发送的头信息字段，上例是 X-Custom-Header）。

2.预检请求的回应

服务器收到"预检"请求以后，检查了Origin、Access-Control-Request-Method 和 Access-Control-Request-Headers 字段以后，确认允许跨源请求，就可以做出回应。

    HTTP/1.1 200 OK
    Date: Mon, 01 Dec 2008 01:15:39 GMT
    Server: Apache/2.0.61 (Unix)
    Access-Control-Allow-Origin: http://api.bob.com
    Access-Control-Allow-Methods: GET, POST, PUT
    Access-Control-Allow-Headers: X-Custom-Header
    Content-Type: text/HTML; charset=utf-8
    Content-Encoding: gzip
    Content-Length: 0
    Keep-Alive: timeout=2, max=100
    Connection: Keep-Alive
    Content-Type: text/plain

上面的 HTTP 回应中，关键的是 Access-Control-Allow-Origin 字段，表示 http://api.bob.com 可以请求数据。该字段也可以设为星号，表示同意任意跨源请求。

如果浏览器否定了"预检"请求，会返回一个正常的 HTTP 回应，但是没有任何 CORS 相关的头信息字段。这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被 XMLHttpRequest 对象的 onerror 回调函数捕获。控制台会打印出如下的报错信息。

    XMLHttpRequest cannot load http://api.alice.com.
    Origin http://api.bob.com is not allowed by Access-Control-Allow-Origin.

服务器回应的其他 CORS 相关字段如下。

    Access-Control-Allow-Methods: GET, POST, PUT
    Access-Control-Allow-Headers: X-Custom-Header
    Access-Control-Allow-Credentials: true
    Access-Control-Max-Age: 1728000

（1）Access-Control-Allow-Methods
该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。

（2）Access-Control-Allow-Headers
如果浏览器请求包括 Access-Control-Request-Headers 字段，则 Access-Control-Allow-Headers 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。

（3）Access-Control-Allow-Credentials
该字段与简单请求时的含义相同。

（4）Access-Control-Max-Age
该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是 20 天（1728000秒），即允许缓存该条回应 1728000 秒（即20天），在此期间，不用发出另一条预检请求。

3.浏览器的正常请求和回应

一旦服务器通过了"预检"请求，以后每次浏览器正常的 CORS 请求，就都跟简单请求一样，会有一个 Origin 头信息字段。服务器的回应，也都会有一个 Access-Control-Allow-Origin 头信息字段。下面是"预检"请求之后，浏览器的正常 CORS 请求。其中 Origin 字段是浏览器自动添加的。

    PUT /cors HTTP/1.1
    Origin: http://api.bob.com
    Host: api.alice.com
    X-Custom-Header: value
    Accept-Language: en-US
    Connection: keep-alive
    User-Agent: Mozilla/5.0...

下面是服务器正常的回应。

    Access-Control-Allow-Origin: http://api.bob.com
    Content-Type: text/HTML; charset=utf-8

上面头信息中，Access-Control-Allow-Origin 字段是每次回应都必定包含的。

##### 3.XDomainRequest
XDomainRequest 跨域是针对 IE8 和 IE9 的跨域技术(只支持IE8、IE9)，CORS 跨域支持 IE10+，所以 IE8 和 IE9 的跨域就是一个空档，我们需要用 XDomainRequest 实现。

###### 相应事件

    var xdr = new XDomainRequest();

（1）onerror

在跨域请求发生错误时触发，事件方法没有参数

```js
    function err () {
        alert('XDR onerror');
    }
    xdr.onerror = err;
```

（2）onload

跨域请求完成后触发，事件方法没有参数

```js
    function loaded () {
        alert('XDR onload');
    }
    xdr.onload = loaded;
```

（3）onprogress

跨域请求接受数据时触发，事件方法没有参数，此事件在调用 send 方法和 onload 事件触发间隔内触发 0，1或者无数次

```js
    function progres () {
        alert('XDR onprogress');
    }
    xdr.onprogress = progres;
```

（4）ontimeout

跨域请求连接超时时触发，事件方法没有参数。此事件限于 onload 事件触发。触发了 ontimeout 事件，XDomainRequest 属性 responseText 不可用，调用此属性会报错。

```js
    function timeo () {
        alert('XDR ontimeout');
    }
    xdr.ontimeout = timeo;
```

###### 对象方法
（1）abort

终止当前 http 跨域请求。使用方法：object.abort() ，无参数。
返回值类型：HRESULT（参见：https://my.oschina.net/u/1024767/blog/354493），成功执行返回 S_OK，否则返回 HRESULT 错误代码。

在 open 方法被调用后，onload 事件触发前调用，在其他时间段内调用此方法会报错。

    xdr.abort();

（2）open

链接服务器，打开跨域请求。

参数说明：

bstrMethod：字符串，请求方法，get 或者 post
bstrUrl：字符串，服务器 url 地址

把要发送的数据以参数形式放到 url 后面

    xdr.open(bstrMethod, bstrUrl);

（3）send

发送到服务器的字符串数据。

    xdr.send();

###### 后端支持
后端需要设置：Access-Control-Allow-Origin 和 Access-Control-Allow-Methods 即可

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

```js
    if (window.XDomainRequest) {
        var appliance = new window.XDomainRequest();

        appliance.onload = function () {
            var response = JSON.parse(appliance.responseText);

            if (response.code === 0) {
                if (response.data.redirect_url) {
                    location.href = decodeURIComponent(response.data.redirect_url);
                }
                else {
                    location.reload();
                }
            }
            else {
                alert(response.msg || '用户名或密码错误');
            }
        }

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

        appliance.open('POST', loginUrl + '?' + data, true);

        setTimeout(function () {
            appliance.send();
        }, 0);
    }
```

上面的 send 放在 timeout 中，为了防止多个 XDoaminRequest 在同一时间发送而丢失。

##### 4.withCredentials 属性

正常情况下前后端跨域，后端没有读写写 cookie 的权限，这种情况下我们可以通过给前后端加属性实现。

服务器端需要配置参数：

    Access-Control-Allow-Credentials:true

前端需要在请求头中加上:

    xhrFields: {
        withCredentials: true
    }
