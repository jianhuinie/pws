{{* 课程详情 *}}
<div class="tabs class-introduce" data-tab="class-introduce">
    <div class="college-tip">
        <div class="logo">
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/57ff25fbec197.png">
        </div>
        <span class="c-title">
            跟谁学大学
        </span>
        <span class="description">
            <span class="character">互联网教育的西点军校</span>
        </span>
        <a href="javascript:void(0)" class="college-link">
            <p class="big" style="text-align:center;">点击进入</p>
            <i class="icon icon-angle-right"></i>
        </a>
    </div>
    <div class="base-info">
        <h1 class="v-title ">{{$course_info.name}}</h1>
        {{if !isset($tpl_data.is_juhuixue) || !$tpl_data.is_juhuixue}}
            {{$price_show = "display-show"}}
        {{else}}
            {{$price_show = "display-hidden"}}
        {{/if}}
        <div class="money-rent {{$price_show}}">
            {{if !empty($course_info.discount)}}
                <span style="font-size:14px;">
                    秒杀价:￥{{$course_info.discount.discount_price}}
                </span>
                <span class="original">
                    <span class="unit">￥</span>
                    {{$course_info.price}}
                </span>
                {{if $course_info.discount.type == 2}}
                    {{*限时折扣*}}
                    <div class="countdown" style="font-size:14px;"></div>
                {{elseif $course_info.discount.type == 1}}
                    {{*限额折扣*}}
                    <div class="limited_time">
                        <i class="icon icon-shijian"></i>
                        剩余<span>{{$course_info.discount.remain_amount}}</span>个优惠名额
                    </div>
                {{/if}}
            {{else}}
                {{if $course_info.price > 0}}
                <span class="symbol">￥</span>{{$course_info.price}}
                {{else}}
                免费
                {{/if}}
            {{/if}}

        </div>
        <div class="label-cps">
            {{if isset($course_info.cashback) && $course_info.cashback}}
                <div class="cps-label">
                    <span class="cps-jxj">返奖学金：￥{{$course_info.cashback}}</span>
                </div>
            {{/if}}

            {{if isset($tpl_data.is_cps) && $tpl_data.is_cps}}
                <div class="jifen-box">
                    <span class="jifen-nav-1">上课送学分</span>
                    <span class="jifen-nav-2">支持学分抵学费</span>
                </div>
            {{/if}}
        </div>
        <ul class="course-comment">
            <li class="comment">
                {{round($tpl_data.course_info.great_rate)}}% 好评
            </li>
            <li class="line"></li>
            <li class="study-info">{{$course_info.payer_count}}人已报名</li>
            <li class="line"></li>
            {{if $course_info.play_count > 0}}
                <li class="study-info">{{$course_info.play_count}}次播放</li>
            {{/if}}
        </ul>
    </div>

    {{* 课程标签 *}}
    {{include file="common/component/course/tags/index.tpl"}}
    {{* 分期 *}}
    
    {{if !empty($tpl_data.fenqi)}}
        <div class="staging">
            {{include file="common/component/course/staging/index.tpl"}}
        </div>
    {{/if}}
    {{*免费试听*}}
    {{include file="./tryListen.tpl"}}
    {{*课程信息*}}
    {{include file="./courseInfo.tpl"}}

    {{*课程资料*}}
    {{include file="common/component/course/material/index.tpl"}}
    {{if isset($tpl_data.org_info)}}
        {{*机构信息*}}
        {{include file="page/course/video/component/orgInfo/index.tpl"}}
    {{/if}}
    {{if isset($tpl_data.teacher_info) && !empty($tpl_data.teacher_info)}}
        {{*老师信息*}}
        {{include file="common/component/course/teacherInfo/index.tpl"}}
    {{/if}}
    {{*课程评价*}}
    {{include file="./comment/comment.tpl"}}
    {{*相关课程*}}
    {{include file="common/component/course/relatedCourse/index.tpl"}}
    {{*平台保障*}}
    {{include file="common/component/course/platformSupport/index.tpl"}}
    {{* 分享 *}}
    <div class="share-course hide">
        <div class="app-share display-none">
            <ul>
                <li class="list-share li-friends">
                    <div class="friends">
                        <img width="14" height="14"
                             src="https://imgs.genshuixue.com/0cms/d/file/content/2015/11/564b26ad93caf.png" alt=""/>
                        朋友圈
                    </div>
                </li>
                <li class="list-share li-weixin">
                    <div class="weixin">
                        <i class="icon icon-weixin"></i>微信
                    </div>

                </li>
                <li class="list-share li-qrcode">
                    <div class="qrcode">
                        <i class="icon icon-qrcode"></i>
                        二维码
                    </div>
                </li>
            </ul>
            <div class="tip">分享给小伙伴，一起进步涨知识！</div>
        </div>
        <div class="m-share display-none">
            <div class="m-qrcode">
                <i class="icon icon-qrcode"></i>二维码
            </div>
            <div class="course-id">课程ID:{{$course_info.number}}</div>
        </div>
    </div>
</div>