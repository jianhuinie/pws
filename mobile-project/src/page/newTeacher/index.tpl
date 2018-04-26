{{*
	@file 老师主页，用于非会员模板
	@author huangshiming
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}

    {{$page_title = $tpl_data.base_info.name}}
    {{$page_module = "page/newTeacher/index"}}
    {{$enable_backTopButton = true}}

    {{$script_data = $tpl_data}}
    {{*隐藏广告条*}}
    {{if isset($smarty.get.viewType) && $smarty.get.viewType == 'hide'}}
        {{$isShowAds = false}}
    {{/if}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/newTeacher/index.styl"/>
{{/block}}

{{block name="content"}}
<!-- {{include file="page/_common/nav_bar/nav_bar.tpl" text={{$tpl_data.base_info.name}}}} -->

{{if !$ext_data.is_app}}
    {{include file="page/teacherCenter/_part/top.tpl"}}
{{/if}}

{{include file="page/newTeacher/header.tpl"}}
{{include file="page/newTeacher/nav.tpl"}}
{{include file="page/newTeacher/home.tpl"}}
<div class="has-more hide" data-next-cursor="1">
    <div class="typing-loader"></div>
</div>
<div class="teacher-bottom">
{{include file="page/bottom/teacherBottom.tpl" templateMode="default"}}


{{/block}}