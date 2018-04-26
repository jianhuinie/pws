{{$item = $tpl_data.item}}
{{$teacherInfo = $tpl_data.joined_teachers_info}}
<div id="wrapper">
    <div id="scroller">
        <div class="pull-to-refresh">
            <div class="refresh-wrap">
                <span class="pull-indicator">
                    <div class="arrow-body"></div>
                    <div class="triangle-down"></div>
                </span>
                <span class="pull-text">下拉刷新</span>
                <div class="pull-spinner" style="display:none"></div>
            </div>
        </div>


        <div class="list-box" data-user-number="{{$item.number}}">
            <div class="demand-detail">
                <div class="demand-introduction">
                    <!-- <div class="header">

                        <div class="user-image">
                            <img src="{{$item.student.avatar_url}}@25w_25h_2x_70Q_0i_1e_1c_1wh_1pr.jpg">
                        </div>

                        <div class="header-rows">
                            <div class="header-row">
                                <div class="user-name">
                                    {{$item.student.display_name2}}
                                </div>

                                {{if $item.display_status.name == '我要报名'}}
                                <div class="course-title  vip-exclusive" data-timer="{{$item.vip_exclusive_time}}" data-status="0"
                                >
                                </div>
                                {{/if}}
                            </div>

                            <div class="header-row">
                                <div class="address">
                                    {{$item.address}}
                                </div>
                                <div class="payment">
                                    课时费{{$item.exp_price}}
                                    {{if $item.support_online == 0}}
                                        线下
                                    {{else}}
                                        线上线下
                                    {{/if}}
                                </div>

                            </div>
                        </div>
                    </div> -->

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
                        <span class="pay-text">{{if $item.support_online == 0}}线下{{else if $item.support_online == 2}}线下{{else}}线上线下{{/if}}</span>
                        {{if isset($item.sex) && ($item.sex == 0 || $item.sex == 1)}}
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
                        {{if $item.status!=3 && $tpl_data.is_own}}
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
                                ({{$teacherInfo|count}}/5)
                            </span>
                        </div>
                    </div>
                    <div class="list">
                        {{foreach $teacherInfo as $teacher}}
                        {{if $teacher@index < 5}}
                        <div class="teacher-avator">
                            <div class="teacher-introduction" data-url="{{$teacher.home_url}}">
                                <div class="left">
                                    <img src="{{$teacher.avatar_url}}@25w_25h_2x_70Q_0i_1e_1c_1wh_1pr.jpg">
                                </div>

                                <div class="right">
                                    <div class="teacher-info">
                                        {{$teacher.display_name|cn_truncate:8}}
                                        {{if $teacher.vip_level == 3}}
                                        <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5d1676.png">
                                        {{elseif $teacher.vip_level == 2}}
                                        <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5aef77.png">
                                        {{elseif $teacher.vip_level == 1}}
                                        <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/02/56d3b6e867bb9.png">
                                        {{/if}}
                                    </div>

                                    <div class="teacher-record">
                                        {{if empty($teacher.comment_summary.avg)}}
                                        <span class="score-none">
                                            暂无评分
                                        </span>
                                        {{else}}
                                        <span class="score">
                                            {{$teacher.comment_summary.avg}}分
                                        </span>

                                        <span class="comment">
                                            {{$teacher.comment_summary.count}}评价
                                        </span>
                                        {{/if}}

                                        <span class="area">
                                            {{$teacher.area}}
                                        </span>
                                    </div>
                                </div>
                                <div class="teacher-good {{if $teacher.like_status}}like{{/if}}" data-objectId="{{$teacher.user_id}}">
                                    <div class="good-container">
                                        <span class="like-number" {{if $teacher.like_number == 0}}style="display:none"{{/if}}>{{$teacher.like_number}}</span>&nbsp;<i class="icon-like"></i>
                                    </div>
                                </div>
                            </div>


                            <div class="teacher-word">
                                {{if isset($teacher.join_reason) && !empty($teacher.join_reason)}}
                                    {{$teacher.join_reason}}
                                {{else}}
                                    {{$teacher.short_introduce}}
                                {{/if}}
                            </div>

                            {{if !!$teacher.recommend_course}}
                            <div class="teacher-live-lesson" data-url="{{$teacher.recommend_course.url}}">
                                <div class="lesson-introduction">
                                    <div class="lesson-tag">
                                        {{if isset($teacher.recommend_course.course_type_cn) && !empty($teacher.recommend_course.course_type_cn)}}
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
                        {{/if}}
                        {{/foreach}}
                    </div>
                    {{if !$teacherInfo|count}}
                        {{if $tpl_data.is_own}}
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

                <div class="recommend"></div>
            </div>
        </div>

        {{*iscroll bug 内容过少时，warapper比scroller高度高，从而滑动失效，所以当scroller的高度不够时，要使用一个div进行填充*}}
        <div class="full-box" style="width: 100%;"></div>

    </div>
</div>

<div id="wrapper-footer">
    <div class="recommend-box recommend">
        <div class="recommend-image"></div>
        <p>
            我要推荐
        </p>
    </div>
    <div class="enter-status {{if !$tpl_data.is_own && $item.display_status.name == '已报名'}}twoButton{{/if}}">

    {{if $tpl_data.is_own}}
        <div class="buttons">
            <div class="button contactTeacher {{if !$teacherInfo|count}}no-teacher {{/if}}contact" data-number="{{$item.user_number}}">
                联系老师
            </div>
        </div>
    {{else}}
        {{if $item.display_status.name == '已报名'}}
        <div class="buttons">
            {{if $item.user_role != 0}}
            {{if $item.im_online_status == '0'}}
                <div class="button contactStudent muted" data-number="{{$item.user_number}}" data-click="imchat">
                    <div class="message-image"></div>
                    离线留言
                </div>
            {{else}}
                <div class="button contactStudent success" data-number="{{$item.user_number}}">
                    <div class="message-image"></div>
                    发消息
                </div>
            {{/if}}
            {{/if}}
            <div class="button student-phone primary" data-number="{{$item.user_number}}" data-selfMobile="{{$tpl_data.user_mobile}}">
                <div class="mobile-image"></div>
                打电话
            </div>
        </div>
        {{else}}
            <div class="enter-button {{if $item.display_status.name == '我要报名'}}enter-button-available{{/if}}" data-valid="{{$tpl_data.teacher.is_valid}}" style="background-color: {{$item.display_status.color}}"
            >
                {{$item.display_status.name}}
            </div>
        {{/if}}
    {{/if}}
    </div>
</div>

<div id="wrapper-dialog">
</div>

<div class="share-mask">
    <div class="content">
        <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e91f33723af.png"/>
    </div>
</div>
