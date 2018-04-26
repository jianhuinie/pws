{{*
@file 问答大厅
@author huangshiming
@date 2016-06-22
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = {{$tpl_data.header_area.nick_name}}}}
    {{$page_module = "page/qa/teacherList/index"}}
    {{$enable_backTopButton = true}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}

    {{$teacher_number = ''}}
    {{if $smarty.get.teacher_number}}
        {{$teacher_number = $smarty.get.teacher_number}}
    {{/if}}

    {{$login_user_number = 0}}
    {{if $tpl_data.loginuser.user_number}}
        {{$login_user_number = $tpl_data.loginuser.user_number}}
    {{/if}}

    {{*登录者的身份判断是不是老师 0是老师 2是学生 is_teacher 0不是老师 1是老师*}}
    {{$is_teacher = 1}}
    {{if $tpl_data.loginuser.user_role == 2}}
        {{$is_teacher = 0}}
    {{/if}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/qa/teacherList/index.styl"/>
{{/block}}

{{block name="content"}}
    {{$user_info = $tpl_data.header_area}}
    {{include file="page/_common/nav_bar/nav_bar.tpl" text={{$user_info.nick_name}}}}

    <div class="header">
        <div class="user-setting">
            {{if $user_info.icon_one == 1 && $tpl_data.loginuser.user_role == 0}}
            <div class="left-icon">
                <img src="{{$static_origin}}/src/page/qa/image/ic_what.png">
                <p class="icon-text">这是什么</p>
            </div>
            {{/if}}
            {{if ($teacher_number == $tpl_data.loginuser.user_number
                    && $tpl_data.loginuser.user_role == 0)}}
            <div class="right-icon" data-set="{{$user_info.icon_two}}">
                <img src="{{$static_origin}}/src/page/qa/image/ic_set.png">
                <p class="icon-text">设置</p>
            </div>
            {{/if}}
        </div>
        <a href="/{{$teacher_number}}">
            <img data-src="{{$user_info.avatar_url}}" class="user-avatar">
        </a>
        <a href="/{{$teacher_number}}">
            <p class="user-name line-clamp">{{$user_info.nick_name}}</p>
        </a>
            <p class="user-detail line-clamp">
                {{$user_info.teacher_intro}}
            </p>
        <div class="comment-info">
            <span>{{$user_info.question_count}} </span>个问题
            <span style="margin-right: 10px;"></span>
            <span>{{$user_info.zan_count}} </span>个赞
        </div>
        <div class="teacher-box">
            {{if $is_teacher == 0 || $tpl_data.loginuser.user_role == null}}
            <span class="ask-current-teacher" data-teacher-number="{{$teacher_number}}">向TA提问</span>
            {{/if}}
            <a href="{{$user_info.detail_page}}">
                <span class="teacher-detail">老师主页</span>
            </a>
        </div>
    </div>

    {{if $user_info.icon_two == 1 || ($user_info.icon_two == 0 && $teacher_number == $tpl_data.loginuser.user_number)}}
    {{include file="page/qa/_part/teacherList.tpl"}}

    <div class="more-button hide" data-next-cursor="1">
        <div class="typing_loader"></div>
    </div>

    {{/if}}

    {{if $is_teacher == 0 || $tpl_data.loginuser.user_role == null}}
    <div class="ask-for-teacher-bottom"></div>
    <div class="ask-for-teacher ask-current-teacher" data-href="/Wenda/askQuestion" data-appnojump="true">
        <div class="ask-teacher">
            <img class="ask-teacher-icons" src="{{$static_origin}}/src/page/qa/image/ic_tiwen.png">
            <span class="ask-teacher-text">向老师提问</span>
        </div>
    </div>
    {{/if}}
{{/block}}

