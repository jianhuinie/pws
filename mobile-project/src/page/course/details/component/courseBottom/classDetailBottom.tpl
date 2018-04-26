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
    {{else if $tpl_data.course_info.template_m == "red"}}
        {{$model = "red"}}
    {{/if}}

<div class="bottom" data-click="class-bottom" {{if $templateModel == 'default'}}style="border-top: 1px solid #F0F0F0;"{{/if}} >
    {{if $course_info.button_info.type != "finish" && $course_info.button_info.type != "has_pay"}}
    <!-- {{if $ext_data.is_app}}
        {{include file="./favor.tpl" templateModel=$templateModel}}
    {{/if}} -->

    {{include file="./share.tpl" templateModel=$templateModel}}

    {{if not empty($orgInfo.extension)}}
        {{$tel_phone = true}}
    {{else}}
        {{$tel_phone = false}}
    {{/if}}

    {{if !$ext_data.is_app && !$tel_phone}}
        {{$consultFlag = 1}}
    {{else if !$ext_data.is_app && $tel_phone}}
        {{$consultFlag = 3}}
    {{else}}
        {{$consultFlag = 2}}
    {{/if}}

    {{include file="./courseConsult.tpl" templateModel=$templateModel consultFlag=$consultFlag}}

    {{if (not empty($org_info)) && $tpl_data.support_student_advisory && $courseInfo.lesson_way == 4}}
        {{include file="./courseTryListen.tpl" templateModel=$templateModel tryFlag=2 orangeModel=$model}}
    {{else if $courseInfo.lesson_way != 2}}
        {{include file="./courseTryListen.tpl" templateModel=$templateModel tryFlag=3 orangeModel=$model}}
    {{/if}}
    {{/if}}

    {{if isset($tpl_data.trial_info) && $tpl_data.trial_info.is_support_trial &&
       !empty($tpl_data.trial_info.lesson) &&
        $course_info.button_info.type !== "live"}}
        {{include file="./enterClassroom.tpl"
        templateModel=$templateModel tryFlag=1 orangeModel=$model}}
    {{/if}}

    <div class="bottom-item  bottom-item-signup {{$model}}" data-click="order " data-sku="class|{{$course_info.number}}">
        <div id="btn-{{$course_info.button_info.type}}"  class="sign-up {{$course_info.button_info.type}} {{$course_info.button_info.type}}-{{$model}}
                {{if $course_info.button_info.type == "finish" && $ext_data.is_app}} app-finish{{/if}}{{if $course_info.status eq 14}} yi-xiajia{{/if}}"
                data-course-number="{{$course_info.number}}"
                data-spread_id="{{if !empty($tpl_data.spread_info)}} {{$tpl_data.spread_info.spread_id}} {{/if}}"
                data-url="{{$course_info.button_info.url}}" data-ismobile="{{$course_info.is_mobile}}">
            {{if $course_info.button_info.type == "finish"}} {{if $ext_data.is_app}} 结束啦 {{else}} 课程已结束，查看更多课程 {{/if}}{{else if $course_info.button_info.type == "has_pay"}} 已报名，查看课程安排 {{else if $course_info.status eq 14}} 课程已下架 {{else}}{{$course_info.button_info.name}} {{/if}}
        </div>
    </div>

</div>
{{/if}}
