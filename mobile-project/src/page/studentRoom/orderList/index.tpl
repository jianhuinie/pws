{{*
@file 生源大厅-列表页面
@author huangshiming
@date 2017-04-05
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = "生源通"}}
    {{$page_module = "page/studentRoom/orderList/index"}}
    {{$enable_backTopButton = false}}
    <script>window.PointerEvent = void 0</script>
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/studentRoom/orderList/index.styl"/>
{{/block}}

{{block name="content"}}

    {{*include file="page/_common/nav_bar/nav_bar.tpl" text="生源大厅"*}}

    {{*页签*}}

    {{include file="page/studentRoom/orderList/_part/navBar.tpl"}}

    {{*筛选*}}

    {{include file="page/studentRoom/orderList/_part/select.tpl"}}

    {{*列表*}}

    {{include file="page/studentRoom/orderList/_part/content.tpl"}}

{{/block}}