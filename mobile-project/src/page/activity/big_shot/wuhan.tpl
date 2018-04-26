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
                <p class="get" style="background: {{$tpl_data.coupon_bg_color}}; font-size:16px; font-weight:bold;">报名领{{$tpl_data.coupon_money}}元优惠券</p>
                {{else}}
                <p class="get" style="font-size:16px; font-weight:bold;">报名领{{$tpl_data.coupon_money}}元优惠券</p>
                {{/if}}
                {{if $tpl_data.share_bg_color}}
                <p class="share" style="background: {{$tpl_data.share_bg_color}}; font-size:16px; font-weight:bold;">点我分享领{{$tpl_data.first_distributor}}元现金</p>
                {{else}}
                <p class="share" style="font-size:16px; font-weight:bold;">点我分享领{{$tpl_data.first_distributor}}元现金</p>
                {{/if}}
            </div>
        </div>
        {{foreach $img as $cImg}}
            <div class="img-infos">
                {{$imgLength = $img|count}}
                {{if $cImg@index < $imgLength-1}}
                <img class="lazy_img" pre_src="{{$cImg}}" width="100%">
                {{/if}}
            </div>
        {{/foreach}}

        <div class="download-app hide">
            <a href="http://pandora.genshuixue.com/ap/info.json?id=cptad_44&u=http%3A%2F%2Fm.genshuixue.com%2Fapp%2Fdw%3Fct%3DGenShuiXue_M2100013%26zn%3Dzn_appxiazai2_msite%26source%3Dcptad&k=d7ROxgu3n7H8jAMAWKO7nAOTnbnJnkmrjS98WKs1ng6R0KO8Vbd7jUhJMIRcjKmcZQn8MQROxKHhHXY7ZINaHIhEtgsaHX9cnXnq0Sy8tgsaHK07ZILzjbmmnIh3tgsaHUhmBULRxKyq07ROxK98nX3qtUnRdKmv">
                <p class="dapp-text">下载跟谁学APP</p>
            </a>
        </div>

        {{foreach $img as $cImg}}
            <div class="img-infos">
                {{$imgLength = $img|count}}
                {{if $cImg@index > $imgLength-2}}
                <img class="lazy_img" pre_src="{{$cImg}}" width="100%">
                {{/if}}
            </div>
        {{/foreach}}

        {{if isset($tpl_data.qrcode.img) && $tpl_data.qrcode.img}}
            <div class="qrcode-box hide">
                <img src="{{$tpl_data.qrcode.img}}" class="qrcode-img">
                <p>{{$tpl_data.qrcode.desc}}</p>
            </div>
        {{/if}}

        <div style="margin-bottom:40px;"></div>
    </div>