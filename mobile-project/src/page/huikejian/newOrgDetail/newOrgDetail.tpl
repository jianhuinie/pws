{{*

@file 汇课间首页
@author niumeng

*}}

{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "主页"}}

    {{$page_module = "page/huikejian/newOrgDetail/newOrgDetail"}}

    {{$enable_backTopButton = true}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/huikejian/newOrgDetail/newOrgDetail.styl"/>
{{/block}}

{{block name="content"}}
<div id="main">
    {{$base_info = $tpl_data.base_info}}

    {{include file="../../_common/nav_bar/nav_bar.tpl" no_back_button=true text=$tpl_data.base_info.name|escape menu_button=true}}

    {{* 头图 *}}
    {{include file="../detail/header.tpl" type="index"}}

    {{$news_list = $tpl_data.news_list}}
    <div class="main-page" {{if not empty($smarty.get.tab)}} style="display: none" {{/if}}>
        {{* 动态 *}}
        {{if $news_list|count != 0}}
        <a href="{{$news_list[0].url|regex_replace:"/activityDetail/":"new_activity_detail"|regex_replace:"/blackDetail/":"new_black_detail"}}">
            <div class="first-msg">
                <div class="title">
                    动态
                </div>
                <div class="content">
                    <span>{{$news_list[0].title}}</span>

                    <i class="icon icon-angle-right"></i>

                </div>
            </div>
        </a>
        {{/if}}
    </div>

    {{if isset($tpl_data.our_school_courses)}}
        {{$our_school_courses = $tpl_data.our_school_courses}}
        {{$moreBaseURL = "/i/huike_courses/{{$tpl_data['base_info']['number']}}?page=1"}}
        {{if $our_school_courses|count != 0}}
            <div class="courseCard">
                <div class="courseTitle">
                    本校课程
                    <a href="/i/new_course/{{$tpl_data['base_info']['number']}}">
                        更多>
                    </a>
                </div>
                {{include file="../detail/courseList.tpl" courses=$our_school_courses}}
            </div>
        {{/if}}
    {{/if}}

    {{if isset($tpl_data.famous_school_courses)}}
        {{$famous_school_courses = $tpl_data.famous_school_courses}}
        {{if $famous_school_courses|count != 0}}
            <div class="courseCard">
                <div class="courseTitle">
                    名校精品课
                    <a href="{{$moreBaseURL}}&course_type=famous">
                        更多>
                    </a>
                </div>
                {{include file="../detail/courseList.tpl" courses=$famous_school_courses}}
            </div>
        {{/if}}
    {{/if}}

    {{if isset($tpl_data.out_school_courses)}}
        {{$out_school_courses = $tpl_data.out_school_courses}}
        {{if $out_school_courses|count != 0}}
            <div class="courseCard">
                <div class="courseTitle">
                    校外优选
                    <a href="{{$moreBaseURL}}&course_type=out">
                        更多>
                    </a>
                </div>
                {{include file="../detail/courseList.tpl" courses=$out_school_courses}}
            </div>
        {{/if}}
    {{/if}}
</div>

{{/block}}
