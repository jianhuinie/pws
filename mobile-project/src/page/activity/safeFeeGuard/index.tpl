{{*
@file 答题页面（活动）
@author huangshiming
@date 2016-05-27
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "学费卫士"}}

    {{$page_module = "page/activity/safeFeeGuard/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/safeFeeGuard/index.styl"/>
{{/block}}

{{block name="content"}}

{{*include file="page/_common/nav_bar/nav_bar.tpl" text="学费卫士"*}}

    <div class="header">
        <img src="{{$static_origin}}/src/page/activity/safeFeeGuard/image/title.png">
        <ul class="first-wrap clearfix">
            <li>
                <div class="text-info">
                    <p class="text-info-p">已覆盖</p>
                    <p class="number">400+</p>
                    <p class="text-info-p">城市及地区</p>
                </div>
            </li>
            <li>
                <div class="text-info">
                    <p class="text-info-p">已入驻</p>
                    <div class="text-info-span">
                        <span class="number2">6</span><span class="number-text-2">万+</span>
                    </div>
                    <p class="text-info-p">实名机构</p>
                </div>
            </li>
            <li>
                <div class="text-info">
                    <p class="text-info-p">已拥有</p>
                    <div class="text-info-span">
                        <span class="number2">50</span><span class="number-text-2">万+</span>
                    </div>
                    <p class="text-info-p">认证好老师</p>
                </div>
            </li>
        </ul>
        <ul class="second-wrap clearfix">
            <li>
                <div class="text-info">
                    <p class="text-info-p">年均</p>
                    <div class="text-info-span">
                        <span class="number2">10</span><span class="number-text-2">亿+</span>
                    </div>
                    <p class="text-info-p">托管学费</p>
                </div>
            </li>
            <li>
                <div class="text-info">
                    <p class="text-info-p">超过</p>
                    <div class="text-info-span">
                        <span class="number2">300</span><span class="number-text-2">万+</span>
                    </div>
                    <p class="text-info-p">受益学生</p>
                </div>
            </li>
        </ul>
    </div>
    <section>
        <div class="title-text">
            <p class="title-1">双重保障</p>
            <p class="title-2">学习必备防坑神器</p>
        </div>
        <div class="img-wenzai">
            <img data-src="{{$static_origin}}/src/page/activity/safeFeeGuard/image/img_xfws_wenzai.png" class="wenzai-main">
        </div>
        <div class="example">
            <div class="example-title">保障一：资金托管</div>
            <div class="example-explain">您在平台支付的学费由跟谁学替您保管，不会直接支付给老师或机构，当课程完成后觉得满意再扣款，充分保障您的资金安全。</div>
        </div>
            <div class="example-list">
               <p>北京一位家长，在某机构为自己孩子支付了40万元学费。该机构突然关门，其负责人失联，这位家长没能追回自己的血汗钱，造成巨额损失。业内人士统计，此事件影响的家庭，损失金额总数超过十几亿元。</p>
                <img data-src="{{$static_origin}}/src/page/activity/safeFeeGuard/image/img_emotion_xfws_jingya.png" class="wenzai-img">
        </div>

        <div class="example">
            <div class="example-title">保障二：随时退款</div>
            <div class="example-explain">在符合退款条件下申请退款，订单中未使用的课时所对应的学费将全部自动退回，不用担心退费纠纷。</div>
        </div>
        <div class="example-list">
                <p>青岛刘先生通过跟谁学平台选择了一位数学老师给自己的孩子上课，因家庭搬迁更换城市不能继续学习，通过平台轻松退回了剩余课程费用。</p>
                <img data-src="{{$static_origin}}/src/page/activity/safeFeeGuard/image/img_emotion_xfws_good.png" class="wenzai-img">
        </div>
        <div>
            <img data-src="{{$static_origin}}/src/page/activity/safeFeeGuard/image/img_xfws_brand.png" class="bottom-banner">
        </div>
        <div class="contact-us">
            <div class="contact-us-content" data-href="tel:4000910910">
                <img src="{{$static_origin}}/src/page/activity/safeFeeGuard/image/phone.png" class="phone-icon">
                <p class="phone-number">4000-910-910</p>
            </div>
            <p class="show-date">周一至周日 9:00-23:00</p>
        </div>
        <a href="https://m.genshuixue.com/recommend/fill_info?key=fee_safe_guard">
            <div class="help-us">
                <p>立即帮我找老师</p>
            </div>
        </a>
    </section>
{{/block}}