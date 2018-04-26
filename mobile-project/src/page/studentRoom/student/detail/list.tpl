<div class="box">
    <div class="user-info">
        <div class="user-avator">
            <img src="{{item.user.avatar_url_mobile}}@20w_20h_2x_70Q_0i_1e_1c_1wh_1pr.jpg">
        </div>
        <div class="user-info-detail">
            <div class="first-nav">
                <div class="course-icon clearfix">
                    <div class="user-name">
                        {{item.user.display_name2}}
                    </div>
                    {{if item.vip_exclusive_time && item.vip_exclusive_time > 0}}
                        <div class="course-title  vip-exclusive" data-timer="{{item.vip_exclusive_time}}" data-status="0">
                        </div>
                    {{/if}}
                    <span class="course-title {{if item.status!=3}}hide{{/if}}">
                        已关闭
                    </span>
                </div>
            </div>

            <div class="second-nav clearfix">
                <span class="address">
                    {{item.address}}
                </span>

            </div>
        </div>
    </div>

    <div class="text">
        {{item.info}}
    </div>

    <div class="second-nav">
        <span class="pay-text">{{item.exp_price}}</span>
        <span class="pay-text">{{if item.support_online == 0}}线下{{else if item.support_online == 2}}线上{{else}}线上线下{{/if}}</span>
        {{if item.sex == 0 || item.sex == 1}}
            <span class="pay-text">{{if item.sex == 0}}女老师{{else if item.sex == 1}}男老师{{/if}}</span>
        {{/if}}
        {{if item.user_role == 0}}
            <span class="pay-text own">老师代发</span>
        {{/if}}
    </div>

    <div class="user-footer">
        <span class="timer">
            {{item.create_time}}
        </span>
        <span class="page-viewers">
            {{item.page_view}}次浏览
        </span>
        {{if item.status!=3 && is_own}}
        <span class="user-cancel close-icon">
            不想找了
        </span>
        {{/if}}
    </div>

    {{if (item.verify_status == 0 || item.verify_status == 2 ) && item.status < 3}}
        <div class="last-nav">
            {{if item.verify_status == 0}}
                <div class="verify">审核中</div>
                <div class="time">跟谁学平台会帮您检查您的需求是否填写准确以便能快速、准确的找到您需要的老师</div>
            {{else if item.verify_status == 2}}
                <div class="verify">审核不通过</div>
                <div class="time">抱歉，您的找老师需求审核不通过，还请您重新提交新的找老师需求，多谢！</div>
            {{/if}}
        </div>
    {{/if}}
</div>


{{if item.verify_status != 2 && item.verify_status != 0 && item.status != 3}}
<div class="last-nav-has-teacher">
    <div class="first">
        <span>报名老师  ({{teacherInfos.length}}/5)</span>
    </div>
    {{each teacherInfos as $teacher}}
    <div class="teacher-infos" data-url="{{$teacher.home_url}}" data-number="{{$teacher.user_id}}" data-index="1">
        <div class="teacher-box">
            <div class="avatar">
                <img data-src="{{$teacher.avatar_url}}" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a2315c62581.png" class="avatar-image">
            </div>
            <div class="teacher-info">
                <div class="title">
                    <span>
                        {{$teacher.display_name}}
                    </span>
                    {{if $teacher.vip_level == 3}}
                    <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5d1676.png">
                    {{else if $teacher.vip_level == 2}}
                    <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5aef77.png">
                    {{else if $teacher.vip_level == 1}}
                    <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/02/56d3b6e867bb9.png">
                    {{/if}}
                </div>
                <div class="last clearfix">
                    {{if $teacher.comment_summary}}
                        <span class="score">
                        {{$teacher.comment_summary.avg}}分
                        </span>
                        <span class="comment">
                        {{if $teacher.comment_summary.count > 0}}
                            {{$teacher.comment_summary.count}}评价
                        {{else}}
                            暂无评价
                        {{/if}}
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
            <!-- <div class="teacher-delete not-suit" data-number="{{$teacher.teacher_number}}"></div> -->
            <!-- 生源大厅3.0需求 改为点赞按钮 -->
            <div class="teacher-good {{if $teacher.like_status}}like{{/if}}" data-objectId="{{$teacher.user_id}}">
                <div class="good-container">
                    <span class="like-number" {{if $teacher.like_number == 0}}style="display:none"{{/if}}>{{$teacher.like_number}}</span>&nbsp;<i class="icon-like"></i>
                </div>
            </div>
        </div>

        <div class="short-intro">
            {{if $teacher.join_reason}}
                {{$teacher.join_reason}}
            {{else}}
                {{$teacher.short_introduce}}
            {{/if}}
        </div>

        {{if $teacher.recommend_course.length != 0}}
        <div class="teacher-live-lesson" data-url="{{$teacher.recommend_course.url}}">
            <div class="lesson-introduction">
                <div class="lesson-tag">
                    <div class="tags" data-type="{{$teacher.recommend_course.course_type_cn}}">
                        {{$teacher.recommend_course.course_type_cn}}
                    </div>
                </div>
                <div class="lesson-title">
                    {{$teacher.recommend_course.course_name}}
                </div>
            </div>
        </div>
        {{/if}}
    </div>
    {{/each}}
    <div class="none-teacher {{if teacherInfos.length != 0}} hide{{/if}}">
        {{if is_own}}
            <p>
                正在为您智能匹配老师，
            </p>
            <p>
                先看看推荐课程吧！
            </p>
        {{else}}
            <p>
                暂无老师报名
            </p>
        {{/if}}
    </div>
</div>
{{/if}}

{{if recommendCourses.length > 0 && item.status != 3 && item.verify_status != 0 && item.verify_status != 2}}
<div class="recommend-courses">
    <div class="title">
        猜你想学
    </div>
    <div class="courses">
        {{foreach recommendCourses as $course}}
            <div class="course">
                <div class="image" data-url="{{$course.course_url}}">
                    {{if $course.course_type}}
                    <div class="tag" data-type="{{$course.course_type}}"></div>
                    {{/if}}
                    <div>
                        <img src="{{$course.cover_url}}@87w_52h_2x_70Q_0i_1e_1c_1wh_1pr.jpg">
                    </div>
                    {{if $course.course_type == 3}}
                    <div class="play-image"></div>
                    {{/if}}
                </div>
                <div class="course-info">
                    <p class="course-name">
                        {{$course.course_name}}
                    </p>
                    <div>
                        <div class="price" data-price="{{$course.price}}">
                            ￥{{$course.price}}
                        </div>
                        <div class="student-count">
                            {{$course.student_count}}人学习
                        </div>
                    </div>
                </div>
            </div>
        {{/foreach}}
        {{if is_own}}
            <div class="fill-box" style="width: 100%; height: 50px; float: left;"></div>
        {{/if}}
    </div>
</div>
{{/if}}