<header id="page_nav_bar" class="nav-bar hide">
    <div class="nav-wrap-left">
        <a class="nav-button" href="javascript:history.length == 1?(window.location.href='https://m.genshuixue.com/'):history.go(-1);">
            <p class="icon icon-back"></p>
        </a>
    </div>
    {{if isset($text1) && isset($text2)}}
        <div class="nav-header h1">{{$text1}}<sup>.</sup>{{$text2}}</div>
    {{else}}
        <div class="nav-header h1">{{$text}}</div>
    {{/if}}
</header>

<script>
    /* 如果在app中，隐藏掉navbar */
    /* bjum:用于判断UM-app */
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('genshuixue') > -1 ||  /bjum-(\w*)/.exec(ua)) {
        document.getElementById('page_nav_bar').style.display="none";
        var bodyCss = document.body.style.cssText;
        if (bodyCss.indexOf('is-app') == -1) {
            bodyCss += "is-app";
            document.body.setAttribute('class', bodyCss);
        }
    }
    gsx_ready(function (config) {
        if (config.source == "baidu_app_zhidahao" || config.source == "baidu_zhidahao"|| config.source == "x360life") {
            document.getElementById("page_nav_bar").style.display = "none";
        }
    });
</script>
