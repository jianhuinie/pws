{{*
    @file 咨询
    @date 2017-01-09
    @params $templateModel 模板类型 值：super
    @params $org_info 机构信息
    @params $course_info 课程信息
    @params $spread_info ...
*}}
{{if !$ext_data.is_app}}
    {{if isset($org_info) && !empty($org_info)}}
        {{$consultFlag = 2}}
    {{else}}
        {{$consultFlag = 1}}
    {{/if}}
{{else}}
    {{$consultFlag = 2}}
{{/if}}
{{$tel_phone = false}}
{{if isset($org_info) && !empty($org_info)}}
    {{if isset($org_info.city_filter) && ($org_info.city_filter > 0) && (not empty($org_info.extension))}}
        {{$tel_phone = true}}
    {{/if}}
{{/if}}
<div
    class="consult-box analysis-habo-log {{$templateModel}}"
    {{if isset($gsType)}}
        data-habo-type="{{$gsType}}"
    {{/if}}
    {{if isset($stype) && $stype}}
    data-habo-stype="{{$stype}}"
    {{else}}
    data-habo-stype="im"
    {{/if}}
    {{if isset($tpl_data.one_on_one_teacher_mobile) && $tpl_data.one_on_one_teacher_mobile}}
        href="{{'tel:'|cat:$tpl_data.one_on_one_teacher_mobile}}"
    {{else}}
        {{if isset($telphones)}}
            href={{$telphones}}
        {{else}}
            href="tel:4000910910"
        {{/if}}
    {{/if}}
    {{if isset($course_info)}}
        data-course_num="{{$course_info.number}}"
    {{/if}}
    data-org_num="
    {{if isset($course_info) && isset($course_info.course_summary) && isset($course_info.course_summary.org_info)}}
        {{$course_info.course_summary.org_info.number}}
    {{elseif isset($org_info) && !empty($org_info)}}
        {{$org_info.number}}
    {{/if}}"
    {{if isset($tpl_data.one_on_one_teacher_mobile) && $tpl_data.one_on_one_teacher_mobile}}
        data-tel="{{$tpl_data.one_on_one_teacher_mobile}}"
    {{elseif $tel_phone && isset($org_info) && !empty($org_info)}}
        data-tel="{{$org_info.extension}}"
    {{/if}}
    {{if !empty($tpl_data.spread_info)}}
        data-spread_id="{{$tpl_data.spread_info.spread_id}}"
    {{/if}}
    data-flag="{{$consultFlag}}"
>
    <span class="icon icon-consult"></span>
    <div>咨询</div>
</div>