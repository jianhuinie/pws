{{*
    @file 即时直播页面 H5 活动页列表页
    @author nanci
    @date 2016-10-20
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="data"}}

    {{$url = $smarty.server.REQUEST_URI}}

{{/block}}
{{block name="page"}}

    {{$page_title = "直播不能停 高手再来战"}}

    {{$page_module = "page/activity/immediateLive/rank/index"}}

    {{$enable_backTopButton = false}}

{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/immediateLive/rank/index.styl"/>
{{/block}}

{{block name="content"}}

{{if preg_match('/type=0/', $url)}}
{{include file="page/_common/nav_bar/nav_bar.tpl" text="单节学生人数排行榜"}}
{{else}}
{{include file="page/_common/nav_bar/nav_bar.tpl" text="累计学生人数排行榜"}}
{{/if}}

<div class="list">
    <div class="tab">
        <div class="icon icon-rank seperation-right">
            <img src="./image/rank-single-icon.png" class="rank-single-img hidden" alt="">
            <img src="./image/rank-total-icon.png" class="rank-total-img hidden" alt="">
        </div>
        <span class="rank seperation-right">排名</span>
        <span class="name seperation-right">老师姓名</span>
        <span class="id seperation-right">老师ID</span>
        <span class="city seperation-right">城市</span>
        <span class="single-total single-total-tab">单节人数</span>
    </div>
    {{if !(empty($tpl_data.teacher.rank) && empty($tpl_data.teacher.name) && empty($tpl_data.teacher.id) && empty($tpl_data.teacher.city))}}
    <div class="mine">
        <span class="icon icon-text">我</span>
        <span class="rank rank-num seperation-right">{{if !empty($tpl_data.teacher.student_count)}}{{$tpl_data.teacher.rank}}{{else}}-{{/if}}</span>
        <span class="name seperation-right">{{$tpl_data.teacher.name|truncate: 7}}</span>
        <span class="id seperation-right">{{$tpl_data.teacher.id}}</span>
        <span class="city seperation-right">{{$tpl_data.teacher.city}}</span>
        <span class="single-total single-total-mine">{{if !empty($tpl_data.teacher.student_count)}}{{$tpl_data.teacher.student_count}}{{else}}0{{/if}}</span>
    </div>
    {{/if}}
    {{if !empty($tpl_data.items)}}
    <div class="other">
        {{foreach $tpl_data.items as $item0}}
        {{if !empty($item0.student_count)}}
        <div class="unit{{if $item0@index eq 0 && $tpl_data.pager.current_page eq 1}} unit-first{{/if}}{{if $item0@index + 1 eq $item0|@count}} unit-last{{/if}}">
            <span class="text-ellipsis rank seperation-right">{{($tpl_data.pager.current_page - 1) * 20 + $item0@index + 1}}</span>
            <span class="text-ellipsis name seperation-right">{{if !empty($item0.student_count)}}{{$item0.name}}{{else}}---{{/if}}</span>
            <span class="text-ellipsis id seperation-right">{{if !empty($item0.student_count)}}{{$item0.id}}{{else}}-----{{/if}}</span>
            <span class="text-ellipsis city seperation-right">{{if !empty($item0.student_count)}}{{$item0.city}}{{else}}--{{/if}}</span>
            <span class="text-ellipsis single-total single-total-other">{{$item0.student_count}}</span>
        </div>
        {{/if}}
        {{/foreach}}
    </div>
    {{if !empty($tpl_data.pager)}}
    <div class="pager">
        <a href="/tcenter/live_rank/getStudentCount?type=0&page={{$tpl_data.pager.current_page - 1}}" class="prev{{if $tpl_data.pager.current_page le 1}} hidden{{/if}}">
            <img src="./image/page-prev.png" alt="">
        </a>
        <a href="/tcenter/live_rank/getStudentCount?type=0&page={{$tpl_data.pager.current_page + 1}}" class="next{{if !$tpl_data.pager.has_more}} hidden{{/if}}">
            <img src="./image/page-next.png" alt="">
        </a>
    </div>
    {{/if}}
    {{/if}}
</div>

{{/block}}