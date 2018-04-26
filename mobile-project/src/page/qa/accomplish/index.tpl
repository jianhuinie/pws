{{*
    @file 问答完成
    @author wangtianhua
    @date 2016-06-30
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = "问答"}}
    {{$page_module = "page/qa/accomplish/index"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/qa/accomplish/index.styl"/>
{{/block}}

{{block name="content"}}

    <header id="page_nav_bar" class="nav-bar">
        <div class="nav-wrap-left">
            <a class="nav-button" href="javascript:history.length == 1?(window.location.href='https://m.genshuixue.com/'):history.go(-1);">
                <i class="icon icon-back"></i>
            </a>
        </div>

        <div class="nav-header h1">
            问答
        </div>
        <!--
            <div class="nav-wrap-right">
                <a href="#">
                    我的提问
                </a>
            </div>
        -->
    </header>

    <div class="main">
        <div class="picture">
            <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/5774de504d3f3.png">
        </div>
        {{if $smarty.get.result == 'accomplish'}}
            <p class="text primary middle">
                问题已经飞向老师，请耐心等待老师解答哦
            </p>

            <div class="bottom">
                <p class="text black large">
                    {{if $smarty.get.type == 21}}
                    为了及时收到回答，强烈建议关注皖新书院服务号
                    {{else}}
                    为了及时收到回答，强烈建议关注跟谁学服务号
                    {{/if}}
                </p>

                <div class="qrcode">
                    {{if $smarty.get.type == 21}}
                    <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/08/57a8760f0e03d.jpg">
                    {{else}}
                    <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/5774e68ec09ee.jpg">
                    {{/if}}
                </div>
                <p class="text muted small">
                    长按识别二维码，收取老师回答
                </p>
            </div>
        {{else}}
        <div class="download">
            <p class="text primary middle">
                问题已经飞向老师，请耐心等待老师解答哦
            </p>
            <p class="text black large" style="margin-top: 10px">
                为了能及时收到回答，强烈建议使用跟谁学APP哦
            </p>
            <a href="http://m.genshuixue.com/app/dw?t=s&ct=GenShuiXue_M2100013" class="btn">立即看回答</a>
        </div>
        {{/if}}
    </div>

{{/block}}

