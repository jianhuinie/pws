{{*

@file 汇课间首页
@author niumeng

*}}

{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "动态"}}

    {{$page_module = "page/huikejian/newOrgNews/newOrgNews"}}

    {{$enable_backTopButton = true}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/huikejian/newOrgNews/newOrgNews.styl"/>
{{/block}}

{{block name="content"}}
<div id="main">
    {{$base_info = $tpl_data.base_info}}

    {{include file="../../_common/nav_bar/nav_bar.tpl" no_back_button=true text=$tpl_data.base_info.name|escape menu_button=true}}

    {{* 头图 *}}
    {{include file="../detail/header.tpl" type="news"}}

    {{include file="./dynamicList.tpl"}}
</div>

{{/block}}
