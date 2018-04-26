{{extends file="page_app/_base/base.tpl"}}

{{*页面配置*}}
{{block name="page" append}}
    {{*标题*}}
    {{$page_title = "优惠券"}}
    {{$page_module = "page_app/statistics/coupon/index"}}
    {{*是否使用返回顶部的按钮*}}
    {{$enable_backTopButton = false}}
{{/block}}

{{*模板数据, 需要传递到js模块中的模板数据在这里配置*}}
{{block name="data"}}
{{/block}}

{{*页面样式*}}
{{block name="style"}}
<link rel="stylesheet" href="{{$static_origin}}/src/page_app/statistics/coupon/index.styl"/>
{{/block}}

{{*页面内容*}}
{{block name="content"}}
<div class="container">
</div>
{{/block}}

{{*js脚本, 有些特殊情况js需要写在页面里的时候用写在这个block里*}}
{{block name="script"}}

{{/block}}