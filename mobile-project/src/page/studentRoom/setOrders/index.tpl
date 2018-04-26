{{*
@file 生源大厅-接单设置
@author huangshiming
@date 2017-04-05
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = "接单设置"}}
    {{$page_module = "page/studentRoom/setOrders/index"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/studentRoom/setOrders/index.styl"/>
{{/block}}

{{block name="content"}}

    {{include file="page/_common/nav_bar/nav_bar.tpl" text="接单设置"}}

    <img class="banner" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/04/58e48db11b6ee.png">

    {{*价格设置*}}
    {{include file="page/studentRoom/setOrders/_part/setOrderPrice.tpl"}}

    {{*地点设置*}}
    {{include file="page/studentRoom/setOrders/_part/setOrderDistance.tpl"}}

    {{*时间表设置*}}
    {{include file="page/studentRoom/setOrders/_part/setOrderTime.tpl"}}

    {{*保存*}}
    {{include file="page/studentRoom/setOrders/_part/saveButton.tpl"}}
{{/block}}
