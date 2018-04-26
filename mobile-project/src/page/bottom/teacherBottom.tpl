{{*
    @file url参数中pageType=overview是预览页，隐藏整个bottom
*}}
{{if not empty($tpl_data.base_info.org.extension) && ($tpl_data.base_info.org.city_filter gt 0)}}
    {{$tel_phone = true}}
{{else}}
    {{$tel_phone = false}}
{{/if}}
<div class="bottom {{if isset($smarty.get.pageType) && $smarty.get.pageType == 'overview'}}hide{{/if}}"
    {{if $templateMode == 'super'}}
        style="background: #00BCD4;"
    {{else}}
        style="border-top: 1px solid #f2f2f3;"
    {{/if}}
>
    {{include file="common/courseBottom/share/index.tpl" templateModel=$templateMode}}

    {{if $tel_phone == false}}
        {{$phoneFlag = 1}}
    {{else}}
        {{$phoneFlag = 2}}
    {{/if}}
    {{include file="page/bottom/focus/index.tpl" templateMode=$templateMode}}
    
    {{*咨询*}}
    {{include file="common/courseBottom/consult/index.tpl"
        templateModel=$templateMode
        gsType="m_teacher_im"
    }}

    {{include file="common/courseBottom/call/index.tpl" phoneFlag = $phoneFlag templateModel=$templateMode}}

    {{if isset($tpl_data.trial_course_info) && !empty($tpl_data.trial_course_info) && $tpl_data.trial_course_info.data}}
        {{$flag = 1}}
    {{else}}
        {{if isset($tpl_data.base_info.org) && $tpl_data.base_info.org && $tpl_data.base_info.org.support_student_advisory}}
            {{$flag = 2}}
        {{else}}
            {{$flag = 3}}
        {{/if}}
    {{/if}}

    {{include file="page/bottom/tryListen/index.tpl" flag = $flag}}

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
</div>

