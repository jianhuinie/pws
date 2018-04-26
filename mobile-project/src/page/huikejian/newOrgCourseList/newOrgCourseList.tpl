{{*

@file 汇课间首页
@author niumeng

*}}

{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "课程列表"}}

    {{$page_module = "page/huikejian/newOrgCourseList/newOrgCourseList"}}

    {{$enable_backTopButton = true}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/huikejian/newOrgCourseList/newOrgCourseList.styl"/>
{{/block}}

{{block name="content"}}
{{include file="../../_common/nav_bar/nav_bar.tpl" no_back_button=true text=$tpl_data.pages.course_class|escape menu_button=false}}

<div id="main">
    {{include file="../detail/courseList.tpl" courses=$tpl_data.courses}}

    <div class="active-page" data-flag="0">
        <div class="org-dynamic">
            {{if !empty($tpl_data.pages.has_more) && $tpl_data.pages.has_more}}
            <div class="more-dynamic-ajax more-button">
                <div class="character">查看更多课程<i class="icon icon-angle-right"></i></div>
                <div class="more-loading">
                    <img src="{{$static_origin}}/src/page/huikejian/img/loading.gif">
                </div>
            </div>
            {{/if}}
        </div>
    </div>
</div>

{{/block}}
