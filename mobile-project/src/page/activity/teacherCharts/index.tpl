{{*
@file 名师排行榜页面
@author shubaiqiao
@date 2016-11-28
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "会员老师排行榜"}}

    {{$page_module = "page/activity/teacherCharts/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
    {{$teacher = $tpl_data.teacher}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/teacherCharts/index.styl"/>
{{/block}}

{{block name="content"}}

{{include file="page/_common/nav_bar/nav_bar.tpl" text="会员老师排行榜"}}
<div class="container">
    <div class="tab">
        <div class="change {{if $tpl_data.pager.type == 0}}active{{/if}}" data-type="0">本月榜单</div>
        <div class="change {{if $tpl_data.pager.type == 1}}active{{/if}}" data-type="1">累计榜单</div>
    </div>
    <div class="content">
        {{if empty($tpl_data.items)}}
            {{include file="./empty.tpl"}}
        {{else}}
            {{include file="./content.tpl"}}
        {{/if}}
    </div>
</div>

{{/block}}