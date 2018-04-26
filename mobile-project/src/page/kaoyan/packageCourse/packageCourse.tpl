{{*
@file 考研-组合课详情页
@author chenmo
@date 16/2/22
*}}

{{extends file="page/_base/base.tpl"}}
{{block name="page"}}
    {{$course_list = $tpl_data.list}}
    {{$page_title = "课程详情"}}

    {{$page_module = "page/kaoyan/packageCourse/packageCourse"}}

    {{$enable_backTopButton = false}}
{{/block}}
{{block name="data"}}
{{/block}}
{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/kaoyan/packageCourse/packageCourse.styl"/>
{{/block}}
{{block name="content"}}
    {{include file="page/_common/nav_bar/nav_bar.tpl" text="课程详情"}}
    <div id="main">
        <div class="head">
            <img width="100%" height="100%" data-src="{{$tpl_data.cover}}" alt="">
        </div>
        <div class="course_info">
            <div class="line1">
                <div class="course-title">{{$tpl_data.name}}</div>
                <div class="price">
                    <div class="current_price"><span class="unit">¥</span>{{$tpl_data.price}}</div>
                    <div class="original_price"><span class="unit">¥</span>{{$tpl_data.original_price}}</div>
                </div>
            </div>
            <div class="line2">

                <div class="student_count">{{$tpl_data.student_count_str}}人报名</div>
            </div>

        </div>
        {{*课程套餐*}}
        <div class="course_package">
            <div class="title">
                <span class="left">
                    <img width="16" height="5" src="./image/lace.png" alt="">
                </span>
                课程套餐
                <span class="right">
                     <img width="16" height="5" src="./image/lace.png" alt="">
                </span>
            </div>
            <div class="course-content">
                <ul>
                    {{foreach $course_list as $course}}
                        <li>
                            <a href="{{$course.detail_url}}">
                                <div class="left-cover img-background">
                                    <img width="100%" height="100%" data-src="{{$course.cover}}" alt="">
                                    <div class="teacher-name">{{$course.teacher_name}}</div>
                                </div>
                                <div class="right-info">
                                    <div class="type-name">
                                 <span class="type">
                                     {{$course.course_type_str}}
                                </span>
                                        <span class="cc-title">{{$course.name}}</span>
                                    </div>
                                    <div class="time-lesson">
                                        {{if $course.course_type == 2}}
                                            <span class="time">{{$course.time_summary}}</span>
                                        {{/if}}
                                        <span class="lesson_count">{{$course.schedule_count}}</span>
                                    </div>
                                    <div class="cc-price">
                                        {{if $course.price == 0}}
                                            <span class="free">免费</span>
                                        {{else}}
                                            <span class="unit">¥</span>
                                            {{$course.price}}
                                        {{/if}}
                                    </div>
                                </div>
                            </a>
                        </li>
                    {{/foreach}}
                </ul>

            </div>
        </div>

        <div class="course-introduce">
            <div class="title">
                <span class="left">
                     <img width="16" height="5" src="./image/lace.png" alt="">
                </span>
                课程简介
                <span class="right">
                     <img width="16" height="5" src="./image/lace.png" alt="">
                </span>
            </div>
            <div class="intro-content">
                {{$tpl_data.infomation}}
            </div>
        </div>
        {{*图文详情*}}
        {{if !empty($tpl_data.introduction)}}
            <div class="img-text">
                <div class="load-tip">查看图文详情</div>
                <div class="hide-content" style="display: none">{{$tpl_data.introduction}}</div>
            </div>
        {{/if}}
        <div class="download">
            <a href="{{$tpl_data.download_url}}">
                <span class="download-icon">
                <i class="icon icon-download"></i>
            </span>
                <span class="tip">下载跟谁学考研,看更多精品课程</span>

            </a>
        </div>

    </div>
{{/block}}