<header id="page_nav_bar" class="nav-bar">
    {{if !(isset($no_back_button) && !empty($no_back_button) && $no_back_button)}}
    <div class="nav-wrap-left">
        {{if isset($type) && $type == 'askDetail'}}
        <a class="nav-button" href="javascript:history.length == 1?(window.location.href='http://m.genshuixue.com/wenda/home'):history.go(-1);">
            {{else}}
            <a class="nav-button" href="javascript:history.length == 1?(window.location.href='https://m.genshuixue.com/'):history.go(-1);">
                {{/if}}
                <i class="icon icon-back"></i>
            </a>
    </div>
    {{/if}}

    <div class="nav-header h1">
        {{$text|cn_truncate:12}}
    </div>

    {{if isset($search_button) && !empty($search_button) && $search_button}}
        <div class="nav-wrap-right">
            <a href="{{$search_button}}"><span class="icon-search"></span></a>
        </div>
    {{/if}}

    {{if isset($menu_button) && !empty($menu_button) && $menu_button}}
        <div class="nav-wrap-right">
        <span class="nav-button menu-button">
            <i class="icon icon-menu"></i>
        </span>
        </div>
    {{/if}}

    {{if isset($share_button) && !empty($share_button) && $share_button}}
        <div class="nav-wrap-right">
        <span class="nav-button">
            <a href="http://kaoyan.m.genshuixue.com/download/kaoyan">
                <img width="20" height="20" src="{{$static_origin}}/src/page/_common/nav_bar/ic_hc_donwload_n@2x.png" >
            </a>
        </span>
        </div>
    {{/if}}

    {{if isset($addIcon) && !empty($addIcon) && $addIcon}}
        <div class="nav-wrap-right">
        <span class="nav-button">
            <a href="/recommend/fill_info?source=genshuixue&page_type=index-index&type=list">
                <img width="20" height="20" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/08/57c687a463fe7.png" >
            </a>
        </span>
        </div>
    {{/if}}

    {{if isset($studentRoomRule) && !empty($studentRoomRule) && $studentRoomRule}}
        <div class="nav-wrap-right">
        <span class="nav-button">
            <a href="/recommend/studentsHallRule">
                <span style="margin-right: 15px;color: #6d6d6e;">规则说明</span>
            </a>
        </span>
        </div>
    {{/if}}

    {{*问答详情页提问*}}
    {{if isset($ask_button) && !empty($ask_button) && $ask_button}}
        <div class="nav-wrap-right">
        <span class="nav-button">
            <a data-href="/Wenda/askQuestion" class="answer-tobe-ask">
                <span>提问</span>
            </a>
        </span>
        </div>

    {{/if}}

    {{*我的提问*}}
    {{if isset($askRoom) && !empty($askRoom) && $askRoom}}
        <div class="nav-wrap-right">
        <span class="nav-button">
            <a data-href="/Wenda/askQuestion" class="ask-for-teacher">
                <span class="my-question">
                    <p class="my-question-text">我的提问</p>
                    {{if isset($questionNumber) && $questionNumber>0}}
                        <p class="my-question-number"></p>
                    {{/if}}
                </span>
            </a>
        </span>
        </div>
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
