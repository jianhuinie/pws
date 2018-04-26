{{$data_info = $course_list.data}}
{{$teacher = $data_info.list}}

        <div class="block sel-teacher bottom">
            <div class="start-title">
                <span class="icon-star_all block-line">
                    <span class="line"></span>
                    <span class="line line-sub"></span>
                </span>
                <div class="title">{{$data_info.title}}</div>
                <span class="icon-star_all block-line block-line-right">
                    <span class="line"></span>
                    <span class="line line-sub"></span>
                </span>
                <div class="start-title-sub">{{$data_info.sub}}</div>
            </div>
            <a class="sel-teacher-content logClick" data-ctype="1" data-cname="{{$course_list.report_name}}" href="{{$teacher.top.url}}">
                <div class="avatar">
                    <img data-src="{{$teacher.top.avatar}}" width="100%" height="100%"/>
                </div>
                <div class="sel-teacher-text" style="border: 1px solid {{$color}}">
                    <div class="label-text single-line">
                        <p class="name" style="color:{{$color}};">{{$teacher.top.name}}</p>
                        <p class="teacherlength">
                            {{$teacher.top.subject}}
                            {{if $teacher.top.school_age == -1}}
                            30年以上教龄
                            {{else}}
                            {{$teacher.top.school_age}}
                            年教龄
                            {{/if}}
                            {{$teacher.top.student_count}}名学生</p>
                    </div>
                    <div class="describe line-clamp line-clamp-2">
                        {{$teacher.top.desc}}
                    </div>
                </div>
            </a>
            {{if isset($teacher.list) && $teacher.list|count}}
                <div class="land-list">
                    <div class="list-container">
                        <div class="list">
                            {{foreach $teacher.list as $item}}
                                <a href="{{$item.url}}" class="logClick" data-ctype="2" data-cname="k12_teacher">
                                    <div class="avatar">
                                        <img data-src="{{$item.avatar}}" width="100%" height="100%"/>
                                    </div>
                                    <div class="name line-clamp">{{$item.name}}</div>
                                    <div class="sel-teacher-text">
                                        <p class="text-info line-clamp">{{$item.subject}}</p>
                                        <p class="text-info line-clamp">
                                            {{if $item.school_age == -1}}
                                            30年以上教龄
                                            {{else}}
                                            {{$item.school_age}}年教龄
                                            {{/if}}
                                            {{$item.student_count}}名学生</p>
                                    </div>
                                </a>
                            {{/foreach}}
                        </div>
                    </div>
                </div>
                <a class="label-text more logClick" data-ctype="3" data-cname="k12_teacher" href="{{$course_list.more_url}}" style="color: {{$color}};">更多老师></a>
            {{/if}}
        </div>