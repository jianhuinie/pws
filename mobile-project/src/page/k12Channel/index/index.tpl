{{*
@file 频道模板
@author huangshiming
@date 2016-08-02
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$area="bj"}}
    {{if isset($ext_data.curr_city) && !empty($ext_data.curr_city.domain)}}
    {{$area = $ext_data.curr_city.domain}}
    {{/if}}

    {{if empty($smarty.get.grade)}}
        {{$grade=''}}
    {{else}}
        {{$grade=($smarty.get.grade|escape:'url')}}
    {{/if}}

    {{$isShare = false}}
    {{if isset($smarty.get.s) && $smarty.get.s=='share'}}
        {{$isShare=true}}
    {{/if}}

    {{$grade_value = $tpl_data.channel_name}}
    {{$search_button="/{{$area}}/st-.html{{if $isShare}}?s=share{{/if}}"}}

    {{$page_title = $grade_value}}
    {{$page_module = "page/k12Channel/index/index"}}
    {{$enable_backTopButton = true}}

    {{$color="#ff9100"}}
    {{if $tpl_data.color}}
        {{$color = $tpl_data.color}}
    {{/if}}

    {{$script_data = $tpl_data}}
    {{$script_data.grade = $grade}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/k12Channel/index/index.styl"/>
{{/block}}

{{block name="content"}}

{{include file="page/_common/nav_bar/nav_bar.tpl" text={{$grade_value}}}}

{{$data_list = $tpl_data.list}}

{{foreach $data_list as $item}}
    {{*$templat = "page/k12Channel/component/"|cat:$item.template|cat:"/index.tpl"}}
    {{include file=$templat course_list=$item*}}

    {{if $item.template == 'fourTab'}}
        {{include file='page/k12Channel/component/fourTab/index.tpl' course_list=$item}}
    {{else if $item.template == 'addQQ'}}
        {{include file='page/k12Channel/component/addQQ/index.tpl' course_list=$item}}
    {{else if $item.template == 'banner'}}
        {{include file='page/k12Channel/component/banner/index.tpl' course_list=$item}}
    {{else if $item.template == 'courseCardFour'}}
        {{include file='page/k12Channel/component/courseCardFour/index.tpl' course_list=$item}}
    {{else if $item.template == 'courseCardThree'}}
        {{include file='page/k12Channel/component/courseCardThree/index.tpl' course_list=$item}}
    {{else if $item.template == 'dailySelection'}}
        {{include file='page/k12Channel/component/dailySelection/index.tpl' course_list=$item}}
    {{else if $item.template == 'fiveTab'}}
        {{include file='page/k12Channel/component/fiveTab/index.tpl' course_list=$item}}
    {{else if $item.template == 'orgSelection'}}
        {{include file='page/k12Channel/component/orgSelection/index.tpl' course_list=$item}}
    {{else if $item.template == 'selectedTeacher'}}
        {{include file='page/k12Channel/component/selectedTeacher/index.tpl' course_list=$item}}
    {{else if $item.template == 'tenTab'}}
        {{include file='page/k12Channel/component/tenTab/index.tpl' course_list=$item}}
    {{/if}}

{{/foreach}}

{{include file="page/k12Channel/component/moreCourse/index.tpl" course_list=$item}}

{{if $tpl_data.bubble_url}}

<div class="bubble">
    <a href="#add-qq" data-appnojump='true'>
        <img src="{{$tpl_data.bubble_url}}">
    </a>
</div>
{{/if}}

{{/block}}