{{*
@file 亲子课堂（活动）
@author huangshiming
@date 2016-05-16
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = "会员俱乐部 · 精彩主题"}}
    {{$page_module = "page/studentVip/parentClass/index"}}
    {{$enable_backTopButton = true}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/studentVip/parentClass/index.styl"/>
{{/block}}

{{block name="content"}}
    <!-- {{include file="page/studentVip/_part/topNav.tpl" text1='会员俱乐部 ' text2 =' 精彩主题'}} -->
    {{include file="page/studentVip/_part/tab.tpl"}}
    <div class="lunbo">
        {{include file="page/studentVip/_part/lunbo.tpl"}}
    </div>
    {{include file="page/studentVip/_part/list.tpl"}}


    <div class="has-more hide" data-next-cursor="1">
        <div class="typing-loader"></div>
    </div>
    <div class="show-margin-bottom hide"></div>
    {{include file="page/studentVip/_part/bottomNav.tpl"}}



{{/block}}