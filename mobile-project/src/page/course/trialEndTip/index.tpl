{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "试听结束"}}
    <meta name="screen-orientation" content="portrait">
    <meta name="x5-orientation" content="portrait">
    {{$page_module = "page/course/trialEndTip/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data.couponId = $tpl_data.coupon.serial_num}}
    {{$script_data.shareUrl = $tpl_data.detail_url}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/course/trialEndTip/index.styl"/>
{{/block}}

{{block name="content"}}
    <a href="{{$tpl_data.detail_url}}" class="return-to-live return-to-live-in-m hidden">
        <img class="left-angle" src="./image/left-angle.png" alt="">
        <span class="course-name">
            &nbsp;&nbsp;{{$tpl_data.course_name}}
        </span>
    </a>
    <a href="javacript:;" class="return-to-live title-in-app hidden">
        <span class="course-name">
            &nbsp;&nbsp;{{$tpl_data.course_name}}
        </span>
    </a>
    <img width="l00%" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5813209f0b57c.png" alt="" class="bottom-layer-img1">
    <!-- <img width="l00%" height="100%" data-src="./image/portrait@2x.png" alt="" class="bottom-layer-img1"> -->
    <!-- <img width="l00%" height="100%" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5813209eab2ee.png" alt="" class="bottom-layer-img2 hidden"> -->

    <div class="tip-block" data-detail-url="{{$tpl_data.detail_url}}"{{if !empty($tpl_data.coupon.serial_num)}} coupon-id="{{$tpl_data.coupon.serial_num}}"{{/if}}>
        <p class="text">
            试听{{if !empty($tpl_data.trial_minutes)}}{{$tpl_data.trial_minutes}}分钟{{/if}}已结束，
            {{if !empty($tpl_data.coupon.balance)}}
                该课程老师提供{{$tpl_data.coupon.balance}}元优惠券，
            {{/if}}
            觉得老师讲的不错就报名学习吧~
        </p>
        <div class="buttons">
            <a href="javascript:;" class="not-sign-up">
                暂不报名
            </a>
            <a href="{{if !empty($tpl_data.enroll_url)}}{{$tpl_data.enroll_url}}{{/if}}" class="now-sign-up{{if !empty($tpl_data.coupon.balance)}} coupon-sign-up{{/if}}">
                {{if !empty($tpl_data.coupon.balance)}}
                领取并报名
                {{else if}}
                立即报名
                {{/if}}
            </a>
        </div>
    </div>
    <div class="feedback-block hidden">
        <p class="title-text">
            可以请您选择不报名的原因吗？根据您的反馈我们会不断进步哦~
        </p>
        <ol class="options-list">
            <li class="item" data-index="1">
                <div class="flag">
                    <div class="inner-circle"></div>
                </div>
                <span class="desc">价格过高</span>
            </li>
            <li class="item" data-index="2">
                <div class="flag">
                    <div class="inner-circle"></div>
                </div>
                <span class="desc">试听时间太短，还不能做决定</span>
            </li>
            <li class="item" data-index="3">
                <div class="flag">
                    <div class="inner-circle"></div>
                </div>
                <span class="desc">老师讲的不好</span>
            </li>
            <li class="item" data-index="4">
                <div class="flag flag-selected">
                    <div class="inner-circle"></div>
                </div>
                <span class="desc">就是不想报名了</span>
            </li>
        </ol>
        <button class="submit-btn">提交</button>
    </div>
{{/block}}
