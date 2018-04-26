{{*
    @file 新年签到活动
    @author yuanye
    @date 2016-12-19
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "2017新年签"}}

    {{$page_module = "page/activity/newYear/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/newYear/index.styl"/>
{{/block}}

{{block name="content"}}
    {{*include file="page/_common/nav_bar/nav_bar.tpl" text="2017新年签" *}}
	<section class="index">
		<img data-src="http://imgs.genshuixue.com/0cms/d/file/content/2016/12/5865fe88c9fcb.jpg">
		<div class="content">
			<img data-src="http://imgs.genshuixue.com/0cms/d/file/content/2016/12/585c909646167.png" class="open">
		</div>
	</section>
{{/block}}