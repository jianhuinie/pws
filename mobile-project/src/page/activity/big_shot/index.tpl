{{*
@file 答题页面（活动）
@author hanzhaohang
@date 2016-05-27
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = $tpl_data.title}}
    {{$page_module = "page/activity/big_shot/index"}}
    {{$enable_backTopButton = true}}
{{/block}}
{{block name="data"}}
    {{$script_data = $tpl_data}}
    {{$course_number = $tpl_data.course_number}}

    {{if isset($smarty.get.user_number)}}
        {{$script_data["user_number"] = $smarty.get.user_number}}
    {{/if}}
    {{if isset($smarty.get.user_channel)}}
        {{$script_data["user_channel"] = $smarty.get.user_channel}}
    {{/if}}


{{/block}}

{{block name="style"}}
        <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/big_shot/index.styl"/>
{{/block}}

{{block name="content"}}

    {{$img = $tpl_data.body_imgs}}
    <div class="hide-dialog"></div>

    {{*刘雨需求，为了配合武汉活动做了定制处理 course_number为160705902085的课程的分销模板做特殊处理*}}
    {{if $course_number!=160705902085}}
    <div class="content">
        <div class="banner" id="top-banner">
            <div class="first-img-anim"></div>
            <img src="{{$tpl_data.head_img}}" class="banner-img hide">
            {{if $tpl_data.show_student_count == 1}}
            <div class="has-pay-number hide">
                <div class="has-pay-order">
                    <div class="box-item"><p class="box-i-1"></p></div>
                        <div class="box-item"><p class="box-i-2"></p></div>
                        <div class="box-item"><p class="box-i-3"></p></div>
                        <div class="box-item box-no-right"><p class="box-i-4"></p></div>
                        </div>
                        <div class="has-pay-text">
                        <p>人已报名</p>
                </div>
            </div>
            {{/if}}
            <div class="buy-btn none-visible">
                {{if $tpl_data.coupon_bg_color}}
                <p class="get" style="background: {{$tpl_data.coupon_bg_color}};">报名领{{$tpl_data.coupon_money}}元优惠券</p>
                {{else}}
                <p class="get">报名领{{$tpl_data.coupon_money}}元优惠券</p>
                {{/if}}
                {{if $tpl_data.share_bg_color}}
                <p class="share" style="background: {{$tpl_data.share_bg_color}}">点我分享领{{$tpl_data.first_distributor}}元现金</p>
                {{else}}
                <p class="share">点我分享领{{$tpl_data.first_distributor}}元现金</p>
                {{/if}}
            </div>
        </div>
        {{foreach $img as $cImg}}
            <div class="img-infos">
                <img class="lazy_img" pre_src="{{$cImg}}" width="100%">
            </div>
        {{/foreach}}

        <div class="download-app hide">
            <a href="http://pandora.genshuixue.com/ap/info.json?id=cptad_44&u=http%3A%2F%2Fm.genshuixue.com%2Fapp%2Fdw%3Fct%3DGenShuiXue_M2100013%26zn%3Dzn_appxiazai2_msite%26source%3Dcptad&k=d7ROxgu3n7H8jAMAWKO7nAOTnbnJnkmrjS98WKs1ng6R0KO8Vbd7jUhJMIRcjKmcZQn8MQROxKHhHXY7ZINaHIhEtgsaHX9cnXnq0Sy8tgsaHK07ZILzjbmmnIh3tgsaHUhmBULRxKyq07ROxK98nX3qtUnRdKmv">
                <p class="dapp-text">下载跟谁学APP</p>
            </a>
            <img src="{{$static_origin}}/src/page/activity/big_shot/image/logo-show.png" class="logo-show">
        </div>

        {{if isset($tpl_data.qrcode.img) && $tpl_data.qrcode.img}}
            <div class="qrcode-box hide">
                <img src="{{$tpl_data.qrcode.img}}" class="qrcode-img">
                <p>{{$tpl_data.qrcode.desc}}</p>
            </div>
        {{/if}}

        <div style="margin-bottom:100px;"></div>
    </div>

    {{else}}
        {{include file="page/activity/big_shot/wuhan.tpl"}}
    {{/if}}

    <div class="fixed-bottom-btn">
        {{if $tpl_data.coupon_bg_color}}
            <p class="l get" style="background: {{$tpl_data.coupon_bg_color}}">报名领{{$tpl_data.coupon_money}}元优惠券</p>
        {{else}}
            <p class="l get">报名领{{$tpl_data.coupon_money}}元优惠券</p>
        {{/if}}

        {{if $tpl_data.share_bg_color}}
            <p class="r share" style="background: {{$tpl_data.share_bg_color}}">点我分享领{{$tpl_data.first_distributor}}元现金</p>
        {{else}}
            <p class="r share">点我分享领{{$tpl_data.first_distributor}}元现金</p>
        {{/if}}
    </div>


    {{* 微信分享页面遮罩层 *}}
    <div class="share-mask" style="display: none;">
        <div class="content">
            <img width="100%" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e91f33723af.png"/>
        </div>
    </div>



{{/block}}