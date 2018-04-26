{{*
    @file 会员权益
    @author wangtianhua
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "会员权益"}}
    {{$page_module = "page/activity/vip/index"}}
    {{$enable_backTopButton = true}}
{{/block}}
{{block name="data"}}
    {{if isset($smarty.get.user_number)}}
        {{$script_data["user_number"] = $smarty.get.user_number}}
    {{/if}}
    {{if isset($smarty.get.user_channel)}}
        {{$script_data["user_channel"] = $smarty.get.user_channel}}
    {{/if}}


{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/vip/index.styl"/>
{{/block}}

{{block name="content"}}
    <div class="main">
        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/57708efd9ed22.jpg">
        <div class="fames-teacher">
            <a class="top-left" href="http://www.genshuixue.com/gaofenlaocao"></a>
            <a class="top-right" href="http://www.genshuixue.com/wenkuidanao"></a>
            <a class="bottom-left" href="https://lasedu.genshuixue.com/"></a>
            <a class="bottom-right" href="http://www.genshuixue.com/542078438"></a>
            <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/57708efe3d6c0.jpg">
        </div>
        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/57708efe74d09.jpg">
        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/57708eff02b13.jpg">

        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/57721d6c79edc.png">

        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/57721d6cc4e99.png">

        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/57721d6d0b6e2.png">
{{/block}}