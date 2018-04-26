{{if not empty($tpl_data.organization.extension) && isset($tpl_data.organization.city_filter) && ($tpl_data.organization.city_filter gt 0)}}
    {{$tel_phone = true}}
{{else}}
    {{$tel_phone = false}}
{{/if}}

{{$color = "orange"}}

{{if $tpl_data.course.template_m == "default" || $tpl_data.course.template_m == "orange"}}

    {{$color = "orange"}}

{{else if $tpl_data.course.template_m == "coffee"}}

    {{$color = "coffee"}}

{{else if $tpl_data.course.template_m == "red"}}

    {{$color = "red"}}

{{/if}}



<div class="bottom" data-click="one2one-bottom">

    {{if $ext_data.is_app}}
        {{include file="common/courseBottom/favor/index.tpl" templateModel=$templateModel}}
    {{/if}}

    {{include file="common/courseBottom/share/index.tpl" templateModel=$templateModel}}

    {{if isset($tpl_data.trial_course_info) && $tpl_data.trial_course_info.data}}
        {{$tryFlag = 1}}
    {{else}}
        {{if !empty($tpl_data.organization) 
            && isset($tpl_data.organization.city_filter) 
            &&  $tpl_data.organization.city_filter gt 0 && $tpl_data.organization.support_student_advisory}}
            {{$tryFlag = 2}}
        {{else}}
            {{$tryFlag = 3}}
        {{/if}}
    {{/if}}

    {{include file="common/courseBottom/consult/index.tpl"
        templateModel=$templateModel
        org_info=$tpl_data.organization
        easemob=$teacher.easemob_username
    }}

    {{include file="common/courseBottom/tryListen/index.tpl" orangeModel=$color tryFlag=$tryFlag templateModel=$templateModel}}

    <div class="list-bottom signup {{$color}}" {{if $templateModel == 'super'}} style="background: #FF5252;"{{/if}} data-click="order    " data-sku="one2one|{{$tpl_data.course.number}}">
        <div class="signup-text try-{{$color}}">
            立即购买
        </div>
    </div>
</div>