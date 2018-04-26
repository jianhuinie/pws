{{*
@file 生源大厅-接单详情页
@author huangshiming
@date 2017-04-05
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = "生源报名"}}
    {{$page_module = "page/studentRoom/signUp/index"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/studentRoom/signUp/index.styl"/>
{{/block}}

{{block name="content"}}
    {{include file="page/_common/nav_bar/nav_bar.tpl" text="生源报名"}}
    {{*报名*}}
    {{include file="page/studentRoom/signUp/_part/content.tpl"}} 

    <div class="pay-button">
        报名
    </div>    

{{/block}}