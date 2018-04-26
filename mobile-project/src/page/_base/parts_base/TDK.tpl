{{strip}}
<title>
    {{if not empty($tpl_data.page_title)}}
    {{$tpl_data.page_title}}
    {{else}}

    {{block name="title"}}
    跟谁学-找好老师，上跟谁学
    {{/block}}
    {{/if}}
</title>
{{/strip}}


{{if not empty($tpl_data.page_keywords)}}
<meta name="keywords" content="{{$tpl_data.page_keywords}}"/>
{{else}}
<meta name="keywords" content="{{block keywords}}跟谁学, {{/block}}"/>
{{/if}}


{{if not empty($tpl_data.description)}}
<meta name="description" content="{{$tpl_data.description}}"/>
{{else}}
<meta name="description" content="{{block description}}跟谁学, {{/block}}"/>
{{/if}}


