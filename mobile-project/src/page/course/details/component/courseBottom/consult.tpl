{{if not empty($orgInfo.extension)}}
    {{$tel_phone = true}}
{{else}}
    {{$tel_phone = false}}
{{/if}}

<div class="consult-box" href="{{if $tel_phone}}tel:{{$orgInfo.extension|replace:"转":","}}{{else}}tel:4000910910{{/if}}" data-sku="one2one|{{$courseInfo.number}}"
    {{if isset($teacher.easemob_username)}}data-easemob="{{$teacher.easemob_username}}"{{/if}}
{{if $tel_phone}} data-tel="{{$orgInfo.extension}}" data-click="tel " {{else}} data-click="consult " {{/if}}
    data-flag="{{$consultFlag}}"
 {{if $templateModel == 'super'}}style="background: #00BCD4; color: white;border-right: 1px solid #13A7BA;"{{/if}}>

    {{if $ext_data.is_app}}
        {{if $templateModel == 'super'}}
        <img src="https://img.genshuixue.com/0cms/d/file/content/2016/09/57ea26aa44d19.png">
        {{else}}
        <img src="https://img.genshuixue.com/0cms/d/file/content/2016/09/57ea26aac1eb6.png">
        {{/if}}
    {{else}}
        {{if $templateModel == 'super'}}
        <img src="https://img.genshuixue.com/0cms/d/file/content/2016/09/57ea26816553f.png">
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
