{{*
@file 学生频道列表页
@author huangshiming
@date 2016-05-16
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = {{$tpl_data.title}}}}
    {{$page_module = "page/course/k12_xiaoxue_list/index"}}
    {{$enable_backTopButton = true}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
    {{$class_name = ''}}
    {{if isset($smarty.get.class_name) && $smarty.get.class_name}}
        {{$class_name = $smarty.get.class_name}}
    {{/if}}

    {{$catid = 'all'}}
    {{if isset($smarty.get.catid) && $smarty.get.catid}}
        {{$catid = $smarty.get.catid}}
    {{/if}}

    {{$subject_name = '全部'}}
    {{if isset($smarty.get.subject_name) && $smarty.get.subject_name}}
        {{$subject_name = $smarty.get.subject_name}}
    {{/if}}

    {{$grade = ''}}
    {{if isset($smarty.get.grade) && $smarty.get.grade}}
        {{$grade = $smarty.get.grade}}
    {{/if}}

{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/course/k12_xiaoxue_list/index.styl"/>
{{/block}}

{{block name="content"}}
    {{include file="page/_common/nav_bar/nav_bar.tpl" text={{$tpl_data.title}}}}

    {{$tablen = $tpl_data.catnames|count}}
    {{if $tablen > 2}}
    {{include file="page/course/component/k12_xiaoxue_part/tab.tpl"}}

    {{include file="page/course/component/k12_xiaoxue_part/childtab.tpl"}}
    {{/if}}

    {{include file="page/course/component/k12_xiaoxue_part/teacherList.tpl"}}


{{/block}}