{{*
	@file 一对一老师主页
	@author huangshiming
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}

    {{$page_module = "page/comment/commentDetailNew/index"}}
    {{$enable_backTopButton = true}}
    {{$page_title = "全部评价"}}
    {{$script_data = $tpl_data}}
    {{*隐藏广告条*}}
    {{if isset($smarty.get.viewType) && $smarty.get.viewType == 'hide'}}
        {{$isShowAds = false}}
    {{/if}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/comment/commentDetailNew/index.styl"/>
{{/block}}

{{block name="content"}}

    {{include file="page/_common/nav_bar/nav_bar.tpl" text="全部评价"}}

    {{* 评分展示 *}}
    <div class="comment-additions"></div>

    {{* 评价标签 *}}
    <div class="comment-tags"></div>

    {{* 评价列表 *}}
    <div class="comments"></div>
{{/block}}