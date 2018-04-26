{{if !empty($tpl_data.teacher_info)}}
    <div class="teacher-list{{if $tpl_data.teacher_info|count == 1}} one{{/if}} analysis-habo-log-scroll" data-habo-type="{{$gsType}}" data-habo-stype="stteacher">
        <ul class="teacher-ul">
            {{foreach $tpl_data.teacher_info as $teacher}}
            <li class="detail-item teacher-item{{if $tpl_data.teacher_info|count == 1}} one-teacher{{/if}}">
                <div class="detail-title analysis-habo-log" data-habo-type="{{$gsType}}" data-habo-stype="teacher">老师介绍</div>
                <div class="detail-content">
                    <div class="teacher-info clearfix">

                        <div class="avatar{{if $tpl_data.teacher_info|count == 1}} w220{{/if}}">

                            <a href="{{$teacher.homepage_url}}">
                                <div class="img">
                                    <img width="100%" height="100%"  src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a2315c62581.png"
                                         data-src="{{$teacher.avatar}}" alt=""/>
                                </div>
                            </a>

                        </div>
                        <div class="right-col">
                            <div class="teacher-name">
                                <a href="{{$teacher.homepage_url}}">
                                    <div class="name">
                                        <span class="name-wrap">{{$teacher.name}}</span>
                                        {{if !empty($org_info)}}
                                        <span class="org">
                                            {{$org_info.name}}
                                        </span>
                                        {{/if}}
                                        {{if empty($org_info) && $teacher.vip_level != 0}}
                                        {{if $teacher.vip_level == 1}}
                                        <span class="vip">
                                            <img width="100%" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/02/56d3b6e867bb9.png" alt=""/>
                                        </span>
                                        {{elseif $teacher.vip_level == 2}}
                                        <span class="vip">
                                            <img width="100%" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5aef77.png" alt=""/>
                                        </span>
                                        {{elseif $teacher.vip_level == 3}}
                                        <span class="vip senior">
                                            <img width="100%" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5d1676.png" alt=""/>
                                        </span>
                                        {{/if}}
                                        {{/if}}
                                    </div>
                                </a>

                            </div>
                            <div class="intro">{{$teacher.intro}}</div>
                        </div>
                    </div>
                    <div class="summary">
                        <ul>
                            <li>
                                <p class="num">{{$teacher.teach_time}}</p>
                                <p>教学时长</p>
                            </li>
                            <li>
                                <p class="num">{{$teacher.great_rate|string_format:'%.2f' * 100}}%</p>
                                <p>好评率</p>
                            </li>
                            <li>
                                <p class="num">{{$teacher.student_count}}</p>
                                <p>学生数</p>
                            </li>
                        </ul>
                    </div>
                    <div class="more">
                        <a href="{{$teacher.course_list_url}}">
                            <span class="btn analysis-habo-log" data-habo-type="{{$gsType}}" data-habo-stype="course">TA的课程</span>
                        </a>
                        <a href="{{$teacher.homepage_url}}">
                            <span class="btn analysis-habo-log" data-habo-type="{{$gsType}}" data-habo-stype="detailclick">TA的详情</span>
                        </a>
                    </div>
                </div>
            </li>
            {{/foreach}}
        </ul>
    </div>
    {{/if}}