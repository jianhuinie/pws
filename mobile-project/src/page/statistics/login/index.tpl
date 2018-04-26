{{extends file="page_app/_base/base.tpl"}}

{{*页面配置*}}
{{block name="page" append}}
    {{*标题*}}
    {{$page_title = ""}}
    {{$page_module = "page/statistics/login/index"}}
    {{*是否使用返回顶部的按钮*}}
    {{$enable_backTopButton = false}}
{{/block}}

{{*模板数据, 需要传递到js模块中的模板数据在这里配置*}}
{{block name="data"}}
    {{$script_data.url = $smarty.get.directUrl}}
{{/block}}