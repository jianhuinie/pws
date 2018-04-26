{{*
@file 亲子课堂（活动）
@author huangshiming
@date 2016-05-16
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = "会员俱乐部 · 亲子课堂"}}
    {{$page_module = "page/studentVip/parentList/index"}}
    {{$enable_backTopButton = true}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/studentVip/parentList/index.styl"/>
{{/block}}

{{block name="content"}}
    <!-- {{include file="page/studentVip/_part/topNav.tpl" text1='会员俱乐部 ' text2 =' 亲子课堂'}} -->
    {{include file="page/studentVip/_part/tab.tpl" text="child"}}
    {{include file="page/studentVip/_part/list.tpl" text="child"}}

    <div class="has-more hide" data-next-cursor="1">
        <div class="typing-loader"></div>
    </div>
    <div class="show-margin-bottom hide"></div>
    {{include file="page/studentVip/_part/bottomNav.tpl" text="child"}}


{{/block}}