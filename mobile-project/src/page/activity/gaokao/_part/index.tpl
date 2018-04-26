<div id="bottom-gaokao">
<div class="bottom-nav">
    <img src="{{$static_origin}}/src/page/activity/gaokao/image/ic_close.png" class="cancel-banner">
    <img src="{{$static_origin}}/src/page/activity/gaokao/image/gsx-icon.png" class="banner-img">
    <div class="banner-text">
        <p class="first-line">跟谁学手机APP</p>
        <p class="second-line">了解更多高考志愿填报信息</p>
    </div>
    <a href="http://pandora.genshuixue.com/ap/info.json?id=cptad_44&u=http%3A%2F%2Fm.genshuixue.com%2Fapp%2Fdw%3Fct%3DGenShuiXue_M2100013%26zn%3Dgkzy%26source%3Dcptad&k=d7ROxgu3n7H8jAMAWKO7nAOTnbnJnkmrjS98WKs1ng6R0KO8Vbd7jUhJMIRcjKmcZQn8MQROxKHhHXY7ZINaHIhEtgsaHX9cnXnq0Sy8tgsaHK07ZILzjbmmnIh3tgsaHUhmBULRxKyq07ROxK98nX3qtUnRdKmv">
        <img src="{{$static_origin}}/src/page/activity/gaokao/image/open.jpg" class="banner-open">
    </a>
</div>
</div>

<script>
    /* 如果在app中，隐藏掉navbar */
    /* bjum:用于判断UM-app */
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('genshuixue') > -1 ||  /bjum-(\w*)/.exec(ua)) {
        document.getElementById('bottom-gaokao').style.display="none";
        var bodyCss = document.body.style.cssText;
        if (bodyCss.indexOf('is-app') == -1) {
            bodyCss += "is-app";
            document.body.setAttribute('class', bodyCss);
        }
    }
    gsx_ready(function (config) {
        if (config.source == "baidu_app_zhidahao" || config.source == "baidu_zhidahao"|| config.source == "x360life") {
            document.getElementById("bottom-gaokao").style.display = "none";
        }
    });
</script>