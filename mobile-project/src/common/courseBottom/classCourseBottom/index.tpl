{{*
    @file 班课、视频课底导
    @date 2017/02/09
    @params $course_lesson_way 上课方式
    button_info.type各状态说明：
        enrolling: 立即报名
        has_buy: 已报名
        finish: 课程结束
        full: 满班
        live: 进入教室
*}}
{{$button_info = $course_info.button_info}}
{{$tel_phone = false}}

{{if not empty($org_info)}}
    {{if isset($org_info.city_filter) && ($org_info.city_filter > 0) and (not empty($org_info.extension))}}
    {{$tel_phone = true}}
    {{/if}}
{{/if}}

{{*页面底部*}}
{{if !empty($tpl_data.spread_info) && $tpl_data.spread_info.is_self}}
    <div class="bottom-tip">
        <div class="tip">朋友通过链接购买并上课后您返现￥{{$tpl_data.spread_info.commission_price}}</div>
        <div class="immediate-share">立即分享</div>
    </div>
{{else}}
    {{$model = "orange"}}
    {{if $tpl_data.course_info.template_m == "orange" || $tpl_data.course_info.template_m == "default"}}
        {{$model = "orange"}}
    {{else if $tpl_data.course_info.template_m == "coffee"}}
        {{$model = "coffee"}}
    {{else}}
        {{$model = "red"}}
    {{/if}}

<div class="bottom" data-click="class-bottom" {{if $templateModel == 'default'}}style="border-top: 1px solid #F0F0F0;"{{/if}} >
    {{*收藏*}}
    {{include file="common/courseBottom/favor/index.tpl" templateModel=$templateModel}}
    {{*分享*}}
    {{include file="common/courseBottom/share/index.tpl" templateModel=$templateModel}}
    {{*咨询*}}
    {{include file="common/courseBottom/consult/index.tpl"
        templateModel=$templateModel
        org_info=$org_info
        course_info=$course_info
    }}
    {{*电话*}}
    {{include file="common/courseBottom/call/index.tpl"
        templateModel=$templateModel
        org_info=$org_info
    }}
    {{*预约试听：非满班、非已报名、非课程结束，有预约试听，线下班课和一对一*}}
    {{if 
        !(
            $button_info.type == 'finish'
            || $button_info.type == 'has_buy'
            || $button_info.type == 'full'
        )}}
        {{if (not empty($org_info)) && isset($tpl_data.support_student_advisory) && $course_lesson_way == 4}}
            {{include file="common/courseBottom/tryListen/index.tpl" templateModel=$templateModel tryFlag=2 orangeModel=$model}}
        {{else if $course_lesson_way != 2}}
            {{include file="common/courseBottom/tryListen/index.tpl" templateModel=$templateModel tryFlag=3 orangeModel=$model}}
        {{/if}}
    {{/if}}

    {{*进教室试听*}}
    {{if
        isset($tpl_data.trial_info)
        && $tpl_data.trial_info.is_support_trial
        && !empty($tpl_data.trial_info.lesson)
        && $button_info.type !== "live"
    }}
        {{include file="common/courseBottom/enterClassroom/index.tpl"
        templateModel=$templateModel tryFlag=1 orangeModel=$model}}
    {{/if}}

    {{*观看回放*}}
    {{if isset($tpl_data.course_info.replay_button_info) && !empty($tpl_data.course_info.replay_button_info)}}
        {{include file="common/courseBottom/replay/index.tpl" orangeModel=$model templateModel=$templateModel}}
    {{/if}}
    

    {{if !(
        (
            $button_info.type == 'finish'
            || 
            $button_info.type == 'has_buy'
        )
        && isset($course_info.replay_button_info)
        && $course_info.replay_button_info
    )}}
    <div class="bottom-item  bottom-item-signup {{$model}}" data-click="order " data-sku="class|{{$course_info.number}}">
        <div id="btn-{{$button_info.type}}"  class="sign-up {{$button_info.type}} {{$button_info.type}}-{{$model}}
                {{if $button_info.type == "finish" && $ext_data.is_app}} app-finish {{/if}}"
                data-course-number="{{$course_info.number}}"
                data-spread_id="{{if !empty($tpl_data.spread_info)}} {{$tpl_data.spread_info.spread_id}} {{/if}}"
                data-url="{{$button_info.url}}" data-ismobile="{{$course_info.is_mobile}}">
                {{$button_info.name}}
        </div>
    </div>
    {{/if}}

    {{*课程结束且没有回放状态*}}
    {{if $button_info.type == 'finish' && (!isset($course_info.replay_button_info) || empty($course_info.replay_button_info))}}
        <div class="bottom-item">
            <a href="{{if isset($tpl_data.related_course) && isset($tpl_data.related_course.more_url)}}{{$tpl_data.related_course.more_url}}{{/if}}">
            <div
                class="related-course-btn"
                data-course-number="{{$course_info.number}}"
            >
                相关课程
            </div>
            </a>
        </div>
    {{/if}}

    {{*已报名未开课状态/已报名多课节开课过程中无回放状态，且app环境，且直播课*}}
    {{if
        $button_info.type == 'has_buy'
        && $ext_data.is_app
        && $lesson_way.way == '2'
        && (!isset($tpl_data.course_info.replay_button_info) || empty($tpl_data.course_info.replay_button_info))
    }}
        <div class="bottom-item">
            <div
                class="course-center-btn"
                data-course-number="{{$course_info.number}}"
                data-purchase-id="{{$course_info.purchase_id}}"
            >
                课程中心
            </div>
        </div>
    {{/if}}
</div>
{{/if}}