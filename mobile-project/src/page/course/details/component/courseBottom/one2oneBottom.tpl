{{if not empty($orgInfo.extension)}}
    {{$tel_phone = true}}
{{else}}
    {{$tel_phone = false}}
{{/if}}

{{$color = "orange"}}

{{if $courseInfo.template_m == "default" || $courseInfo.template_m == "orange"}}

    {{$color = "orange"}}

{{else if $courseInfo.template_m == "coffee"}}

    {{$color = "coffee"}}

{{else if $courseInfo.template_m == "red"}}

    {{$color = "red"}}

{{/if}}



<div class="bottom" data-click="one2one-bottom">

    <!-- 功能还未完成，等后端完成再放出 -->
    <!-- {{if $ext_data.is_app}}
        {{include file="./favor.tpl" templateModel=$templateModel}}
    {{/if}} -->

    {{include file="./share.tpl" templateModel=$templateModel}}

    {{if !$ext_data.is_app && !$tel_phone}}
        {{$consultFlag = 1}}
    {{else if !$ext_data.is_app && $tel_phone}}
        {{$consultFlag = 3}}
    {{else}}
        {{$consultFlag = 2}}
    {{/if}}

    {{if isset($tpl_data.trial_course_info) && $tpl_data.trial_course_info.data}}
        {{$tryFlag = 1}}
    {{else}}
        {{if !empty($orgInfo)}}
            {{$tryFlag = 2}}
        {{else}}
            {{$tryFlag = 3}}
        {{/if}}
    {{/if}}

    {{include file="./consult.tpl" consultFlag=$consultFlag templateModel=$templateModel}}

    {{include file="./tryListen.tpl" orangeModel=$color tryFlag=$tryFlag templateModel=$templateModel}}

    <div id="btn-enrolling" class="list-bottom signup{{if !$isCourseSet && $courseInfo.status != 2}} j_disable{{/if}}{{if $courseInfo.status eq 14}} yi-xiajia{{else}} {{$color}}{{/if}}" {{if $templateModel == 'super'}} style="background: #FF5252;"{{/if}} data-click="order    " data-sku="one2one|{{$courseInfo.number}}">
        <div class="signup-text try-{{$color}}">
            {{if $isCourseSet}}
                {{if $courseInfo.status eq 14}}
                    课程已下架
                {{else}}
                    选班报名
                {{/if}}
            {{else}}
                {{if $courseInfo.status == 2}}
                    立即购买
                {{else if $courseInfo.status eq 14}}
                    课程已下架
                {{else}}
                    暂停招生
                {{/if}}
            {{/if}}
        </div>
    </div>
</div>

{{include file="./purchase.tpl"}}
