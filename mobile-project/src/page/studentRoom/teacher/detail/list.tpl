{{$item = list.item}}
{{$teacherInfo = list.joined_teachers_info}}

<div class="demand-detail">

    <div class="demand-introduction">

        <div class="user-info">
            <div class="user-avator">
                <img src="{{$item.user.avatar_url_mobile}}@20w_20h_2x_70Q_0i_1e_1c_1wh_1pr.jpg">
            </div>

            <div class="user-info-detail">
                <div class="first-nav">
                    <div class="course-icon clearfix">
                        <div class="user-name">
                            {{$item.user.display_name2}}
                        </div>
                        {{if $item.display_status.name == '我要报名'}}
                            <div class="course-title  vip-exclusive" data-timer="{{$item.vip_exclusive_time}}" data-status="0">
                            </div>
                        {{/if}}
                        <span class="course-title {{if $item.status!=3}}hide{{/if}}">
                            已关闭
                        </span>
                    </div>
                </div>
                <div class="second-nav clearfix">
                    <span class="address">
                        {{$item.address}}
                    </span>
                </div>
            </div>
        </div>

        <div class="main">
            {{$item.info}}
        </div>

        <div class="second-nav">
            <span class="pay-text">{{$item.exp_price}}</span>
            <span class="pay-text">{{if $item.support_online == 0}}仅线下{{else if $item.support_online == 2}}仅线上{{else}}线上线下{{/if}}</span>
            {{if $item.sex && ($item.sex == 0 || $item.sex == 1)}}
                <span class="pay-text">{{if $item.sex == 0}}女老师{{else if $item.sex == 1}}男老师{{/if}}</span>
            {{/if}}
            {{if $item.user_role == 0}}
                <span class="pay-text own">老师代发</span>
            {{/if}}
        </div>

        <div class="footer muted">
            <span class="publish-time" data-index="1" data-time="{{$item.create_time}}">
                {{$item.create_time}}
            </span>

            <span>
                {{$item.page_view}}浏览
            </span>

            {{if $item.status!=3 && list.is_own}}
            <span class="user-cancel close-icon">
                不想找了
            </span>
            {{/if}}
        </div>
    </div>

    <div class="entered-teacher">
        <div class="title">
            <div class="teacher-name">
                报名老师
                <span>
                    ({{$teacherInfo.length}}/5)
                </span>
            </div>
        </div>
        <div class="list">
            {{foreach $teacherInfo as $teacher}}
            <div class="teacher-avator">
                <div class="teacher-introduction" data-url="{{$teacher.home_url}}">
                    <div class="left">
                        <img src="{{$teacher.avatar_url}}">
                    </div>

                    <div class="right">
                        <div class="teacher-info">
                            {{$teacher.display_name}}
                            {{if $teacher.vip_level == 3}}
                            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5d1676.png">
                            {{else if $teacher.vip_level == 2}}
                            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5aef77.png">
                            {{else if $teacher.vip_level == 1}}
                            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/02/56d3b6e867bb9.png">
                            {{/if}}
                        </div>

                        <div class="teacher-record">
                            {{if $teacher.comment_summary.avg != 0}}
                            <span class="score">
                                {{$teacher.comment_summary.avg}}分
                            </span>

                            <span class="comment">
                                {{$teacher.comment_summary.count}}评价
                            </span>
                            {{else}}
                            <span class="score-none">
                                暂无评分
                            </span>
                            {{/if}}

                            <span class="area">
                                {{$teacher.area}}
                            </span>
                        </div>
                    </div>
                    <div class="teacher-good {{if $teacher.like_status}}like{{/if}}" data-objectId="{{$teacher.user_id}}"><i class="icon-like"></i>&nbsp;(<span class="like-number">{{$teacher.like_number}}</span>)</div>
                </div>
                <div class="teacher-word">
                    {{if $teacher.join_reason}}
                        {{$teacher.join_reason}}
                    {{else}}
                        {{$teacher.short_introduce}}
                    {{/if}}
                </div>

                {{if $teacher.recommend_course.cover_url}}
                <div class="teacher-live-lesson" data-url="{{$teacher.recommend_course.url}}">
                    <div class="lesson-introduction">
                        <div class="lesson-tag">
                            {{if $teacher.recommend_course.course_type_cn}}
                            <div class="tag">
                            {{$teacher.recommend_course.course_type_cn}}
                            </div>
                            {{/if}}
                        </div>
                        <div class="lesson-title">
                            {{$teacher.recommend_course.course_name}}
                        </div>
                    </div>
                </div>
                {{/if}}
            </div>
            {{/foreach}}

            {{if $teacherInfo.length == 0}}
                {{if list.is_own}}
                <div class="none-teacher">
                    <p>
                        暂无老师报名
                    </p>
                </div>
                {{else}}
                <div class="none-teacher">
                    <p>
                        还没有报名老师，抢先报名！
                    </p>
                </div>
                {{/if}}
            {{/if}}
        </div>
    </div>

    <div class="recommend"></div>
</div>