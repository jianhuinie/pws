{{extends file="page/_base/base.tpl"}}

{{block name="page"}}

    {{$page_module = "page/activity/statistics/update/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/statistics/update/index.styl"/>
{{/block}}

{{block name="content"}}
    {{include file="page/activity/statistics/update/img.tpl"}}
{{/block}}