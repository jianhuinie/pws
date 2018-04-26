{{foreach $teacher_info_courses as $teacher_info_courses}}
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

                    <div class="name">{{$teacher_info.teacher_name}}</div>
                    <div class="text">{{$teacher_info.catname}}<span class="between"></span>{{$teacher_info.school_age}}年教龄<span class="between"></span><span class="icon-location2"></span>{{$teacher_info.city}}</div>
                    <div class="summary">{{$teacher_info.short_introduce}}</div>
                </div>
            </a>
            {{if $teacher_info.video_introduce}}
                <a href="{{$teacher_info.video_introduce_url}}" class="icon-video video"></a>
            {{/if}}
            <div class="triangle-up"></div>
        </div>
        <div class="desc">{{$teacher_info.xiaobian_intro}}</div>
        {{if $teacher_info_courses.courses}}
            <ul class="list clearfix">
                {{foreach $teacher_info_courses.courses as $courses}}

                    <li>
                        <a href="{{$courses.course_url}}" {{if $courses.course_type == "video"}}data-jockey='urlSchemeRoute|{"url":"bjhlstudent://o.c?a=video_course&number={{$courses.course_number}}"}'{{/if}}>
                            <div class="item">
                                <div class="avatar">
                                    <img data-src="{{$courses.course_avatar}}" />
                                    <span class="tips">
                                        {{if $courses.course_type == "video"}}
                                            视频课
                                        {{/if}}
                                        {{if $courses.course_type == "one2one"}}
                                            一对一
                                        {{/if}}
                                        {{if $courses.course_type == "offline"}}
                                            线下班课
                                        {{/if}}
                                        {{if $courses.course_type == "online"}}
                                            直播课
                                        {{/if}}
                                    </span>
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