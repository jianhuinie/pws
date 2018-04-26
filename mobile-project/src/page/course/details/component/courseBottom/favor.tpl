{{if isset($tpl_data.favorite_info)}}
{{if $tpl_data.favorite_info.favorite_status == true}}
{{$favor = 1}}
{{else}}
{{$favor = 0}}
{{/if}}
{{/if}}
<div class="favor" {{if $templateModel == 'super'}}style="background: #00BCD4; color: white; border-right: 1px solid #13A7BA;"{{/if}}>
    {{if $favor == 1}}
    <img src="https://img.genshuixue.com/0cms/d/file/content/2015/12/5675239d770f3.png">
    {{else}}
    {{if $templateModel == 'super'}}
    <img src="https://img.genshuixue.com/0cms/d/file/content/2016/10/5816d8347f68a.png">
    {{else}}
     <img src="https://img.genshuixue.com/0cms/d/file/content/2015/12/5675239d554c8.png">
     {{/if}}
    {{/if}}
    <div>{{if $favor}}已收藏{{else}}收藏{{/if}}</div>
</div>