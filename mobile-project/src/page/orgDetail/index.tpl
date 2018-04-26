{{*
@file 机构主页
@author huangshiming
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}

    {{$page_title = $tpl_data.base_info.name}}
    {{$page_module = "page/orgDetail/index"}}
    {{$enable_backTopButton = true}}

    {{$script_data = $tpl_data}}

{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/orgDetail/index.styl"/>
{{/block}}

{{block name="content"}}

{{include file="page/_common/nav_bar/nav_bar.tpl" text={{$tpl_data.base_info.name}}}}

{{*头部*}}
{{if $tpl_data.base_info.is_gold_certification}}
    {{include file="page/orgDetail/gold/header.tpl"}}
{{else}}
    {{include file="page/orgDetail/board/board.tpl" text={{$tpl_data.base_info.name}}}}
{{/if}}

{{*切tab*}}
{{include file="page/orgDetail/nav.tpl"}}

{{*切tab后ajax加载的容器*}}
<div class="container">
    {{*吸顶的时候需要占位*}}
    {{*<div class="pull-content hide"></div>*}}
    <div class="container-box">
        <div class="tab-container-box home-container-box" data-type="home">
        {{if $tpl_data.base_info.is_gold_certification 
             && $tpl_data.base_info.template_id == 2}}
            {{include file="page/orgDetail/homeGold.tpl"}}
        {{else}}
            {{include file="page/orgDetail/home.tpl"}}
        {{/if}}
        </div>
        <div class="tab-container-box course-container-box hide" data-type="course"></div>
        <div class="tab-container-box comment-container-box hide" data-type="comment"></div>
        <div class="tab-container-box dynamic-container-box hide" data-type="dynamic"></div>

    </div>
<div class="container-mask hide"></div>
</div>

<div class="has-more hide" data-next-cursor="2">还有更多</div>
<div class="padding-box"></div>

{{*底部bottom*}}
{{include file="page/orgDetail/bottom.tpl"}}

<div class="weixinMask hide">
    <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a87d1c87cf3.png">
</div>



{{/block}}