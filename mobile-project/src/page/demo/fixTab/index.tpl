{{*
@file 吸顶控件
@author huangshiming
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}

    {{$page_title = "demo"}}
    {{$page_module = "page/demo/fixTab/index"}}
    {{$enable_backTopButton = false}}

    {{$script_data = $tpl_data}}

{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/demo/fixTab/index.styl"/>
{{/block}}


{{block name="content"}}
<div style="height:100px; width: 100%; background: black">

</div>

<div class="tab" style="width: 100%; height: 45px; background: red;"></div>


<div style="height: 100px; width: 100%; background: yellow;"></div>
<div style="height: 800px; width: 100%; background: green;"></div>
{{/block}}