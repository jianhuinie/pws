{{if isset($tpl_data.trial_course_info)}}
    {{if $tpl_data.trial_course_info.status != -1}}
        {{$padding_width = "padding-big"}}
    {{else}}
        {{$padding_width = "padding-none"}}
    {{/if}}
{{else}}
    {{$padding_width = "padding-none"}}
{{/if}}

{{if not empty($tpl_data.base_info.org.extension) && ($tpl_data.base_info.org.city_filter gt 0)}}
    {{$tel_phone = true}}
{{else}}
    {{$tel_phone = false}}
{{/if}}


{{* app 中的交互按钮 *}}
<div class="app-bottom app-action display-none" data-click="teacher-bottom">
    <div class="item-action focus" data-focus="{{$tpl_data.base_info.focus_flag}}" data-click="follow" data-sku="teacher|{{$tpl_data.base_info.number}}">
        {{if $page_model != "super_vip"}}
            {{if $tpl_data.base_info.focus_flag}}
            <img class="img-focus" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5698aaa22f431.png">
            <span>已关注</span>
            {{else}}
            <img class="img-focus" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5698aaa209f31.png">
            <span>关注</span>
            {{/if}}
        {{else}}
            {{if $tpl_data.base_info.focus_flag}}
            <span>已关注</span>
            {{else}}
            <span>关注</span>
            {{/if}}
        {{/if}}
    </div>
    <div class="item-action consult {{$padding_width}}" {{if $tel_phone}} {{$tpl_data.base_info.org.extension}} {{/if}} data-click="consult" data-sku="teacher|{{$tpl_data.base_info.number}}">
        {{if $page_model != "super_vip"}}
            <img class="img-focus" src="https://imgs.genshuixue.com/0cms/d/file/content/2015/11/5650648709c0f.png">
        {{/if}}
    咨询
</div>
{{*个体老师/机构老师 支持试听课*}}
{{if isset($tpl_data.trial_course_info) && !empty($tpl_data.trial_course_info) && $tpl_data.trial_course_info.data}}
<div  class="item-action try user-exist item-action-{{$tpl_data.model}}" data-click="reserve " data-sku="teacher|{{$tpl_data.base_info.number}}" data-href="/teacher/reserveTrialCourseDetail?number={{$tpl_data.trial_course_info.data.number}}">
    <span>预约试听</span>
</div>
{{else}}
    {{if isset($tpl_data.base_info.org) && $tpl_data.base_info.org && $tpl_data.base_info.org.support_student_advisory}}
        {{*if $tpl_data.base_info.org.support_student_advisory*}}
        <div class="item-action appoint-try user-no-exists item-action-{{$tpl_data.model}}" data-click="reserve " data-sku="teacher|{{$tpl_data.base_info.number}}" id="bottom-appointment">
            <span>预约试听</span>
        </div>
        {{*/if*}}
    {{else}}
        <div class="item-action try-style bottom-stay-single" data-click="cs" data-sku="teacher|{{$tpl_data.base_info.number}}" data-href="/recommend/fill_info?source=genshuixue">
            <span>预约试听</span>
        </div>
    {{/if}}
{{/if}}
</div>


<div class="bottom m-action gray-500 display-none" data-click="teacher-bottom">
    <!-- 老师主页底部按钮改版 去掉收藏，增加分享 -->
    <!--<div class="list-bottom favor" style="width: {{$list_width}}">-->
    <!--<div class="icon-span">-->
    <!--{{* if $page_model != "super_vip" *}}-->
    <!--<i class="icon icon-unfavor"></i>-->
    <!--{{* /if *}}-->
    <!--<span class="span-favor">收藏</span>-->
    <!--</div>-->
    <!--</div>-->
    <!-- 增加分享按钮 -->
    <div class="list-bottom share" data-click="share" data-sku="teacher|{{$tpl_data.base_info.number}}">
        <div class="icon-span">
            <i class="icon icon-share"></i>
            <span class="span-share">分享</span>
        </div>
    </div>


    <a href="tel:4000910910" id="bottom-chat" class="list-bottom consult" data-click="consult" data-sku="teacher|{{$tpl_data.base_info.number}}" data-easemob="{{if isset($tpl_data.base_info.easemob_username)}}{{$tpl_data.base_info.easemob_username|escape}}{{/if}}" {{if $tel_phone}} data-tel="{{$tpl_data.base_info.org.extension}}"{{/if}}">
    <div class="icon-span {{$padding_width}}">
        {{if $page_model != "super_vip"}}
            {{if !$ext_data.is_app}}
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2015/12/56791ca9ed3b9.png" alt=""/>
            <span class="span-ear">{{if $tel_phone}}电话{{else}}<span class="zxkf">咨询客服</span>{{/if}}</span>
            {{else}}
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2015/11/5650648709c0f.png"/>
            <span class="span-chat">咨询</span>
            {{/if}}
        {{else}}
            {{if !$ext_data.is_app}}
            <span class="span-chat">{{if $tel_phone}}电话{{else}}<span class="zxkf">咨询客服</span>{{/if}}</span>
            {{else}}
            <span class="span-chat">咨询</span>
            {{/if}}
        {{/if}}
    </div>
</a>
{{* 个体老师/机构老师 支持试听课*}}
{{if isset($tpl_data.trial_course_info) && !empty($tpl_data.trial_course_info) && $tpl_data.trial_course_info.data == true}}
    <div
        class="list-bottom try list-bottom-{{$tpl_data.model}}"
        data-click="reserve"
        data-sku="teacher|{{$tpl_data.base_info.number}}"
        data-href="/teacher/reserveTrialCourseDetail?number={{$tpl_data.trial_course_info.data.number}}">
            <span>预约试听</span>
    </div>
{{else}}
     {{if not empty($tpl_data.base_info.org)}}
        {{if $tpl_data.base_info.org.support_student_advisory}}
        <div class="item-action appoint-try user-no-exists item-action-{{$tpl_data.model}}" data-click="reserve " data-sku="teacher|{{$tpl_data.base_info.number}}" id="bottom-appointment">
            <span>预约试听</span>
        </div>
        {{/if}}
    {{else}}
        <div class="item-action try-style bottom-stay-single" data-click="cs" data-sku="teacher|{{$tpl_data.base_info.number}}" data-href="/recommend/fill_info?source=genshuixue">
            <span>预约试听</span>
        </div>
    {{/if}}
{{/if}}

</div>

<div class="bottom kaoyan-action display-none">

    <div class="download-ky">
        <a href="http://kaoyan.m.genshuixue.com/download/kaoyan">
            <span>下载跟谁学考研APP</span>
        </a>
    </div>

</div>

<div class="bottom jinyou-action display-none">

    <div class="download-jy" style="background-color: #51b598">
        <a href="http://jinyou.m.genshuixue.com/download/jinyou">
            <span><i class="icon icon-download"></i>&nbsp;下载金囿学堂客户端</span>
        </a>
    </div>

</div>

<div class="try-container">
    <div class="mask"></div>
    <div class="front">
        <h3>预约试听</h3>
        {{if $tpl_data.trial_course_info.status == 4}}
        <p>您之前已经发起预约，但未支付成功</p>
        <p>是否马上去完成支付？</p>
        {{elseif $tpl_data.trial_course_info.status == 2 || $tpl_data.trial_course_info.status == 1}}
        <p>您已经成功预约试听，无需重复预约</p>
        <p>请前往订单页面查看详情</p>
        {{/if}}
        <div class="btn">
            <div class="cancel-pay">
                取消
            </div>
            {{if $tpl_data.trial_course_info.status == 4}}
            <div class="pay">
                <a data-app="toThirdPartyPayment|{{$tpl_data.trial_course_info.data.purchase_id}}|5" href="/pay/payProductPurchase?purchase_id={{$tpl_data.trial_course_info.data.purchase_id}}"> 立即支付</a>
            </div>
            {{elseif $tpl_data.trial_course_info.status == 2 || $tpl_data.trial_course_info.status == 1}}
            <div class="pay">
                <a href="/student_center/order_detail?purchase_id={{$tpl_data.trial_course_info.data.purchase_id}}"> 查看详情</a>
            </div>
            {{/if}}
        </div>
    </div>
</div>