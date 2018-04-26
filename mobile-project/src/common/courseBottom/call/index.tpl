{{*
    @file 打电话统一处理
    @author hurry
    @date 2017/02/09
    @params $templateModel 模板类型 值：super
    @params $org_info 机构信息
*}}
<div
    class="phone {{if $templateModel == 'super'}}super{{/if}}"
    {{if isset($phoneFlag)}}
        data-flag="{{$phoneFlag}}"
    {{/if}}
    data-tel="
        {{if isset($tpl_data.one_on_one_teacher_mobile) && $tpl_data.one_on_one_teacher_mobile}}
            {{$tpl_data.one_on_one_teacher_mobile}}
        {{else}}
            {{if isset($org_info) && isset($org_info.extension)}}
                {{$org_info.extension}}
            {{else}}
                4000910910
            {{/if}}
        {{/if}}
    "
>
    <span class="icon icon-right-phone"></span>
    <div  class="title">电话</div>
</div>