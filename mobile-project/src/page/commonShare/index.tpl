{{*
    @file 其他系统嵌入M站分享公共页面，因为native有白明白，所以使用M站页面嵌套
    @author hurry
    @date 2016-07-28
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_module = "page/commonShare/index"}}
    {{$enable_backTopButton = false}}
{{/block}}
{{block name="data"}}
    {{* 当前页面的pageTitle *}}
    {{if isset($smarty.get.pageTitle)}}
        {{$script_data.pageTitle = $smarty.get.pageTitle}}
    {{/if}}
    {{* 要打开的页面url *}}
    {{if isset($smarty.get.pageUrl)}}
        {{$script_data.pageUrl = $smarty.get.pageUrl}}
    {{/if}}
    {{* 分享title *}}
    {{if isset($smarty.get.title)}}
        {{$script_data.title = $smarty.get.title}}
    {{/if}}
    {{* 分享内容 *}}
    {{if isset($smarty.get.content)}}
        {{$script_data.content = $smarty.get.content}}
    {{/if}}
    {{* 分享链接，没有取pageUrl *}}
    {{if isset($smarty.get.url)}}
        {{$script_data.url = $smarty.get.url}}
    {{/if}}
    {{* 分享图片 *}}
    {{if isset($smarty.get.picUrl)}}
        {{$script_data.picUrl = $smarty.get.picUrl}}
    {{/if}}
{{/block}}
{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/commonShare/index.styl"/>
{{/block}}
{{block name="content"}}
    <iframe id="share-page" style="" frameborder="0" srolling="yes" width="100%"></iframe>
{{/block}}