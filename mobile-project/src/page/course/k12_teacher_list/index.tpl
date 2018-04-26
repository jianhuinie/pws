{{extends file="page/_base/base.tpl"}}
{{block name="page"}}

    {{$area="bj"}}
    {{if isset($ext_data.curr_city) && !empty($ext_data.curr_city.domain)}}
        {{$area = $ext_data.curr_city.domain}}
    {{/if}}

    {{$isShare = false}}
    {{if isset($smarty.get.s) && $smarty.get.s=='share'}}
        {{$isShare=true}}
    {{/if}}

    {{if empty($smarty.get.grade)}}
        {{$grade=''}}
    {{else}}
        {{$grade=$smarty.get.grade}}
    {{/if}}

    {{$catname_value = ""}}
    {{if !empty($smarty.get.catname)}}
        {{if $smarty.get.catname=='shuxue'}}
            {{$catname_value = "数学"}}
        {{elseif $smarty.get.catname=='yingyu'}}
            {{$catname_value = "英语"}}
        {{elseif $smarty.get.catname=='yuwen'}}
            {{$catname_value = "语文"}}
        {{elseif $smarty.get.catname=='wuli'}}
            {{$catname_value = "物理"}}
        {{elseif $smarty.get.catname=='huaxue'}}
            {{$catname_value = "化学"}}
        {{/if}}
    {{/if}}

    {{$grade_value=''}}
    {{if $grade=='gaozhong'}}
        {{$grade_value='高中'|cat:{{$catname_value}}}}
    {{/if}}
    {{if $grade=='chuzhong'}}
        {{$grade_value='初中'|cat:{{$catname_value}}}}
    {{/if}}

    {{$page_title = "优选名师"}}

    {{$page_module = "page/course/k12_teacher_list/index"}}
    {{$enable_backTopButton = true}}

    {{$search_button="/{{$area}}/st-{{$grade_value}}.html{{if $isShare}}?s=share{{/if}}"}}
{{/block}}

{{block name="data"}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/course/k12_teacher_list/css/index.styl"/>
{{/block}}

{{block name="content"}}
{{strip}}
    {{include file="page/_common/nav_bar/nav_bar.tpl" text="优选名师"}}
    {{if empty($smarty.get.grade)}}
        {{$grade=''}}
    {{else}}
        {{$grade=$smarty.get.grade}}
    {{/if}}

    {{if empty($smarty.get.catname)}}
        {{$catname=''}}
    {{else}}
        {{$catname=$smarty.get.catname}}
    {{/if}}
    {{$nav_list=[[
        "catname"=>"all",
        "value"=>"全部"
    ],[
        "catname"=>"shuxue",
        "value"=>"数学"
    ],[
        "catname"=>"yingyu",
        "value"=>"英语"
    ],[
        "catname"=>"yuwen",
        "value"=>"语文"
    ],[
        "catname"=>"wuli",
        "value"=>"物理"
    ],[
        "catname"=>"huaxue",
        "value"=>"化学"
    ]]}}

    {{*肖锋逻辑：初中和高中写死，然后小学以后的都进行配置*}}
    {{if $grade == 'gaozhong' || $grade == 'chuzhong'}}
    <div class="nav clearfix bottom">
        {{foreach $nav_list as $item}}
            <div>
                <a data-appnojump="true" href="/k12/choseBetterTeacher?grade={{$grade}}&catname={{$item.catname}}{{if $isShare}}&s=share{{/if}}" {{if $catname==$item.catname}}class="active"{{/if}}>{{$item.value}}</a>
            </div>
        {{/foreach}}
    </div>
    {{else}}
    <div class="nav clearfix bottom">
        {{foreach $tpl_data.title.list as $item}}
        {{if $item.subject_name == '全部'}}
            {{$catname = 'all'}}
        {{else}}
            {{$catname = 'key'}}
        {{/if}}
            <div>
                <a data-appnojump="true" href="/k12/choseBetterTeacher?grade={{$grade}}&catname={{$catname}}&subject_name={{$item.subject_name}}{{if $isShare}}&s=share{{/if}}" {{if $item.selected==1}}class="active"{{/if}}>{{$item.subject_name}}</a>
            </div>
        {{/foreach}}
    </div>
    {{/if}}


{{if isset($tpl_data.teacher_info_courses)}}
    <div class="container" id="container">
    {{foreach $tpl_data.teacher_info_courses as $teacher_info_courses}}
        {{$teacher_info = $teacher_info_courses.teacher_info}}
        <div class="block bottom">
            <div class="head-img" >
                <a href="{{$teacher_info.teacher_detail_url}}">
                    <img class="head-img-band" data-src="{{$teacher_info.background_img}}" />
                    <div class="mask"></div>
                    <div class="info">
                        <div class="avatar">
                            <img data-src="{{$teacher_info.avator}}" />
                        </div>

                        <div class="name line-clamp">{{$teacher_info.teacher_name}}</div>
                        <div class="text">{{$teacher_info.catname}}<span class="between"></span>{{$teacher_info.school_age}}年教龄<span class="between"></span><span class="icon-location2"></span>{{$teacher_info.city}}</div>
                        <div class="summary line-clamp">{{$teacher_info.short_introduce}}</div>
                    </div>
                </a>
                {{if $teacher_info.video_introduce}}
                    <a href="{{$teacher_info.video_introduce_url}}" class="icon-video video"></a>
                {{/if}}
                <div class="triangle-up"></div>
            </div>
            <div class="desc">{{$teacher_info.xiaobian_intro}}</div>
            {{if isset($teacher_info_courses.courses)}}
                <ul class="list clearfix">
                    {{foreach $teacher_info_courses.courses as $courses}}
                        {{if $courses.course_type == "video"}}
                            {{$type="视频课"}}
                        {{elseif $courses.course_type == "one2one"}}
                            {{$type="一对一"}}
                        {{elseif $courses.course_type == "offline"}}
                            {{$type="线下班课"}}
                        {{else}}
                            {{$type="直播课"}}
                        {{/if}}
                        <li>
                            <a href="{{$courses.course_url}}" {{if $courses.course_type == "video"}}data-jockey='urlSchemeRoute|{"url":"bjhlstudent://o.c?a=video_course&number={{$courses.course_number}}"}'{{/if}}>
                                <div class="item">
                                    <div class="avatar">
                                        <img data-src="{{$courses.course_avatar}}" />
                                        <span class="tips">{{$type}}</span>
                                        {{if $courses.course_type == "video"}}
                                            <img class="video-start" data-src="{{$static_origin}}/src/page/course/k12_teacher_list/img/start.png" />
                                        {{/if}}
                                    </div>
                                    <div class="info line-clamp line-clamp-2">{{$courses.course_name}}</div>
                                </div>
                            </a>
                        </li>
                    {{/foreach}}
                </ul>
            {{/if}}

        </div>
    {{/foreach}}
    {{if $tpl_data.teacher_count|string_format:"%d" >6}}
        <div class="block bottom">
            <a class="suggest-search" href="/recommend/fill_info?source=searchbottom&amp;page_type=teacher-courseSearch">
                <div class="avatar">
                    <img class="image" data-src="{{$static_origin}}/src/page/course/k12_teacher_list/img/consultant.png" alt="">
                </div>
                <div class="describe">
                    <div class="label-text label-text-large">不会挑？课程顾问帮您找</div>
                    <div>15分钟帮您推荐好老师</div>
                    <span class="icon-chevron-thin-right"></span>
                </div>
            </a>
        </div>
    {{/if}}
    </div>
    {{if $tpl_data.page.has_more}}
        <div id="more-button" data-page="{{$tpl_data.page.curr_page}}" class="more-button">
            <div class="text">点击查看更多</div>
            <div class="typing_loader"></div>
        </div>
    {{/if}}
{{/if}}
{{/strip}}
{{/block}}
