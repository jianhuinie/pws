{{if not empty($orgInfo.extension)}}
    {{$tel_phone = true}}
{{else}}
    {{$tel_phone = false}}
{{/if}}

<div class="consult-box" href="{{if $tel_phone}}tel:{{$orgInfo.extension|replace:"转":","}}{{else}}tel:4000910910{{/if}}"
    data-sku="class|{{$course_info.number}}"
    {{if isset($course_info.easemob)}}data-easemob="{{$course_info.easemob}}"{{/if}}
    data-course_num="{{$course_info.number}}"
    data-org_num="{{$course_info.course_summary.org_info.number}}"

    {{if $tel_phone}}
        data-tel="{{$org_info.extension}}" data-click="tel"
    {{else}}
        data-click="consult"
    {{/if}}

    {{if !empty($tpl_data.spread_info)}}
        data-spread_id="{{$tpl_data.spread_info.spread_id}}"
    {{/if}}
    data-flag="{{$consultFlag}}"
    {{if $templateModel == 'super'}}
        style="background: #00BCD4; color: white;border-right: 1px solid #13A7BA;"
    {{/if}}
>

    {{if $templateModel == 'super'}}
        {{if $ext_data.is_app}}
        <img src="https://img.genshuixue.com/0cms/d/file/content/2016/09/57ea26aa44d19.png">
        {{else}}
        <img src="https://img.genshuixue.com/0cms/d/file/content/2016/09/57ea26816553f.png">
        {{/if}}
    {{else}}
        {{if $ext_data.is_app}}
        <img src="https://img.genshuixue.com/0cms/d/file/content/2016/09/57ea26aac1eb6.png">
        {{else}}
        <img src="https://img.genshuixue.com/0cms/d/file/content/2016/09/57ea2681ad95a.png">
        {{/if}}
    {{/if}}
    {{if $consultFlag == 1}}
        <div>咨询客服</div>
    {{else}}
        <div>咨询</div>
    {{/if}}
</div>
