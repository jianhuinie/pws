{{*
@file 吸顶控件
@author huangshiming
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}

    {{$page_title = "demo"}}
    {{$page_module = "page/demo/wxMask/index"}}
    {{$enable_backTopButton = false}}

    {{$script_data = $tpl_data}}

{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/demo/wxMask/index.styl"/>
{{/block}}


{{block name="content"}}
<div class="share-button">点我分享</div>
<div class="open-button">点我打开</div>
{{/block}}