{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "平台保障"}}

    {{$enable_backTopButton = false}}

     {{$page_module = "page/CPS/protection/index"}}

    {{$baseInfo = $tpl_data.basic_info}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/CPS/protection/css/index.styl"/>
{{/block}}

{{block name="content"}}
    {{include file="page/_common/nav_bar/nav_bar.tpl" text="平台保障"}}
    <div class="banner">
        <img class="bg-banner-img" data-src="{{$static_origin}}/src/page/CPS/protection/img/banner.png" />
        {{*<div class="title">*}}
            {{*<img data-src="{{$static_origin}}/src/page/CPS/protection/img/logo.png" />*}}
            {{*跟谁学平台保障*}}
        {{*</div>*}}
    </div>
    <ul class="list">
        <li>
            <div class="icon">
                <img data-src="{{$static_origin}}/src/page/CPS/protection/img/icon-1.png" />
            </div>
            <div class="info">
                <div class="title">资金安全</div>
                <div class="describe">课程结束前，课酬由跟谁学帮您保管，保证您的资金安全。</div>
                <div class="describe-sub"><img data-src="{{$static_origin}}/src/page/CPS/protection/img/icon-6.png" />青岛王女士在跟谁学平台上为自己女儿找到一家机构学习钢琴，机构以优惠诱导线下支付上万元学费，王女士同意了。学习没多久发现机构关门了，王女士没能追回自己的学费，造成巨大损失。</div>
            </div>
        </li>
        <li>
            <div class="icon">
                <img data-src="{{$static_origin}}/src/page/CPS/protection/img/icon-2.png" />
            </div>
            <div class="info">
                <div class="title">随时可退</div>
                <div class="describe">符合退款条件时申请退款，剩余课程的课酬将全部退回；优惠券在未确认课酬前也支持全部退回。</div>
                <div class="describe-sub"><img data-src="{{$static_origin}}/src/page/CPS/protection/img/icon-7.png" />北京刘先生通过跟谁学平台选择了一位数学老师给自己的孩子上课，因更换城市不能继续上课，通过平台退回了剩余课程的费用。</div>
            </div>
        </li>
        <li>
            <div class="icon">
                <img data-src="{{$static_origin}}/src/page/CPS/protection/img/icon-3.png" />
            </div>
            <div class="info">
                <div class="title">真实评价</div>
                <div class="describe">平台课程评价均由用户真实填写，部分评价包含图片展示及老师反馈，帮您多维度了解老师及授课效果。</div>
            </div>
        </li>
        <li>
            <div class="icon">
                <img data-src="{{$static_origin}}/src/page/CPS/protection/img/icon-4.png" />
            </div>
            <div class="info">
                <div class="title">实名认证</div>
                <div class="describe">跟谁学平台会对每位老师进行实名认证，包括但不限于身份认证、学历认证、教师资格认证和专业技能认证，确保信息真实可信。</div>
            </div>
        </li>
    </ul>
    {{if $ext_data.is_app || $ext_data.is_tapp}}
    <div class="report" style="display:none;">
        <div class="title"><img data-src="{{$static_origin}}/src/page/CPS/protection/img/icon-5.png" >问题举报</div>
        <div class="describe">若发现老师有课程价格虚高、诱导私下交易或个人信息作假等违规行为可直接举报，经核实无误将有最高200元现金奖励！</div>
        <a href="#" data-jockey='urlSchemeRoute|{"url":"bjhlstudent://o.c?a=toReport"}' id="report" class="btn">我要举报</a>
    </div>
    {{/if}}
{{/block}}
