{{*
    @file 即时直播页面
    @author hurry
    @date 2016-11-06
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = $tpl_data.room.title}}
    {{$page_module = "page/immediateLive/index"}}
    {{$enable_backTopButton = false}}
    {{$isNeedScale = false}}
{{/block}}
{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}
{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/immediateLive/index.styl"/>
{{/block}}
{{block name="content"}}
    <iframe id="share-page" style="" frameborder="0" srolling="yes" width="100%"></iframe>
{{/block}}