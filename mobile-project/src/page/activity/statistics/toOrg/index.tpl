{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "致机构用户的一封信"}}
    {{$page_module = "page/activity/statistics/toOrg/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/statistics/toOrg/index.styl"/>
{{/block}}

{{block name="content"}}
    <div class="container">
        <img data-src="{{$static_origin}}/src/page/activity/statistics/toOrg/image/banner.jpg" width="100%" class="banner-show">
        <img data-src="{{$static_origin}}/src/page/activity/statistics/toOrg/image/content.jpg" width="100%" class="content-show">
        <img data-src="{{$static_origin}}/src/page/activity/statistics/toOrg/image/bottom.jpg" width="100%" class="content-bottom">
    </div>
{{/block}}
