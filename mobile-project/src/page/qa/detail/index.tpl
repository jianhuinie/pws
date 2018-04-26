{{*
@file 问答详情
@author huangshiming
@date 2016-06-22
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "问题详情"}}
    {{$page_module = "page/qa/detail/index"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
    {{*判断登陆者是不是提问者本人*}}
    {{if $tpl_data.loginuser.user_number == $tpl_data.question.user.number}}
        {{$time_flag = 1}}
    {{else}}
        {{$time_flag = 0}}
    {{/if}}

    {{*判断有没有题主接纳*}}
    {{$question_good = 0}}
    {{if $tpl_data.question.best_answer_id}}
        {{$question_good = 1}}
    {{/if}}

    {{*判断登录者是不是老师*}}
    {{$is_teacher = 1}}
    {{if $tpl_data.loginuser.user_role == 2}}
        {{$is_teacher = 0}}
    {{/if}}

    {{*判断有没有老师回答*}}
    {{$teacher_answer = 0}}

    {{$ask_button = false}}
    {{if !$ext_data.is_tapp && $is_teacher == 0}}
        {{$ask_button = true}}
    {{/if}}

{{/block}}


{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/qa/detail/index.styl"/>
{{/block}}

{{block name="content"}}

    {{include file="page/_common/nav_bar/nav_bar.tpl" text="问题详情" type="askDetail"}}
    {{include file="page/qa/_part/question.tpl" showComment=true}}

    {{if $tpl_data.question.ans_filter}}
        <p class="ans-filter">已自动过滤无效回答</p>
    {{/if}}
    {{if $tpl_data.answer_list_hot}}
    <div class="hot-answer">
        <img src="{{$static_origin}}/src/page/qa/image/ic_hotanswer.png" class="hot-answer-icon">
        {{foreach $tpl_data.answer_list_hot as $item}}
        {{$boolFlag = 0}}
        {{if $item.user_can_enter_answer == true}}
            {{$boolFlag = 1}}
        {{/if}}
        <div class="answer-items answer-link" data-answer-id="{{$item.question_id}}" data-answer-number="{{$item.user_number}}" data-user-role="{{$item.user_role}}" data-app-number="{{$item.app_teacher_number}}" data-can-enter="{{$boolFlag}}">
            <div class="hot-answer-show clearfix">
                {{if $item.user_role == 0}}
                <a href = '/{{$item.teacher.domain}}'>
                    <img data-src="{{$item.teacher.avatar_url}}" class="answer-avart">
                </a>
                {{$teacher_answer = 1}}
                {{elseif $item.user_role == 2}}
                <a href='/x/{{$item.student.number}}'>
                    <img data-src="{{$item.student.avatar_url}}" class="answer-avart">
                </a>
                {{/if}}
                <div class="answer-contents">
                <div class="answer-first-content">
                    <div class="answer-first-item">
                        {{if $item.user_role == 0}}
                        <span class="answer-name">
                            {{$item.teacher.display_name|cn_truncate:6}}
                        </span>
                        <span class="answer-shenfen">老师</span>
                        <p class="answer-intro line-clamp">
                            {{$item.teacher.short_introduce}}
                        </p>
                        {{else}}
                        <span class="answer-name">
                            {{$item.student.display_name|cn_truncate:8}}
                        </span>
                        <span class="answer-shenfen">学生</span>
                        <p class="answer-intro line-clamp">{{$item.student.location}}</p>
                        {{/if}}
                    </div>
                </div>
                </div>

                {{*题主才能见采纳与非采纳*}}
                <div class="answer-right-tab">
                {{if isset($item.ans_invalid) && $item.ans_invalid}}
                <a href="https://m.genshuixue.com/forum/postBrowse/24636">
                    <span class="invalid-answer">无效回答<img src="{{$static_origin}}/src/page/qa/image/ic_invalid_a.png" class="invalid-answer-icon"></span>
                </a>
                {{else}}
                    {{if $question_good == 1 && $tpl_data.question.best_answer_id == $item.id}}
                        <span class="answer-get">题主采纳</span>
                    {{/if}}
                    {{if ($time_flag == 1 && $item.user_role == 0)}}
                        {{if ($question_good == 1 && !$ext_data.is_tapp && $is_teacher == 0)}}
                        <div data-href="/Wenda/askQuestion" class="answer-tobe-ask" data-user-number="{{$item.teacher_id}}" data-appnojump="true">
                            <span class="answer-unget">向TA提问</span>
                        </div>
                        {{elseif ($question_good == 0 && !$ext_data.is_tapp && $is_teacher == 0)}}
                        <span class="answer-unget answer-tobe-get" data-answer-id="{{$item.id}}">采纳</span>
                        {{/if}}
                    {{*非题主可见的是向TA提问*}}
                    {{elseif ($time_flag == 0 && $item.user_role == 0 && !$ext_data.is_tapp && $is_teacher == 0) || $tpl_data.loginuser.user_number == null}}
                    <div data-href="/Wenda/askQuestion" class="answer-tobe-ask" data-user-number="{{$item.teacher_id}}" data-appnojump="true">
                        <span class="answer-unget">向TA提问</span>
                    </div>
                    {{/if}}
                {{/if}}
                </div>
            </div>

            <div class="answer-show">
                {{if $item.content}}
                <p class="answer-show-text">
                {{$item.content}}
                </p>
                {{/if}}
                {{if $item.pic}}
                <img data-src="{{$item.pic_url}}" class="answer-show-img">
                {{/if}}
                {{if $item.audio_url}}
                <div class="audio-show">
                    <div class="audio" data-url="{{$item.audio_url}}" data-length="{{$item.audio_length}}">
                    </div>
                    <p class="audio-lenth" data-length="{{$item.audio_length}}">
                    </p>
                    <img src="{{$static_origin}}/src/page/qa/image/voice_gray.png" class="audio-icon">
                </div>
                {{/if}}
            </div>

            {{if $item.content_ext}}
            <a href="{{$item.content_ext.m_url}}">
                <div class="answer-class">
                    <img data-src="{{$item.content_ext.thumb}}" class="answer-class-img">
                    <div class="answer-class-item answer-class-width">
                        <p class="answer-class-name line-clamp">
                        {{$item.content_ext.title}}
                        </p>
                        <p class="answer-learn-times">{{$item.content_ext.course_info.pay_number}}人学过</p>
                    </div>
                </div>
            </a>
            {{/if}}
            <div class="answer-bottom">
                <span class="answer-bottom-time">
                    {{include file="page/qa/_part/leastTime.tpl" date=$item.create_time}}
                </span>
                <span class="answer-bottom-comment">
                    {{$is_support=0}}
                    {{if $item.is_support}}
                    {{$is_support=1}}
                    {{/if}}
                    <span class="zan-action" data-answer-id="{{$item.id}}" data-support ="{{$is_support}}" data-good-number="{{$item.support_count}}">
                    {{if $is_support==1}}
                        <img src="{{$static_origin}}/src/page/qa/image/ic_zan_good.png" class="answer-comment-icon answer-good-icon">
                        <span class="answer-comment-space answer-support-number" style="color: #ff9100;">
                        {{if $item.support_count}}
                            {{$item.support_count}}
                        {{else}}
                            赞
                        {{/if}}
                        </span>
                    {{else}}
                        <img src="{{$static_origin}}/src/page/qa/image/ic_zan.png" class="answer-comment-icon answer-good-icon">
                        <span class="answer-comment-space answer-support-number">
                        {{if $item.support_count}}
                            {{$item.support_count}}
                        {{else}}
                            赞
                        {{/if}}
                        </span>
                    {{/if}}
                    </span>
                    {{if $item.user_can_comment}}
                    <span>
                        <img src="{{$static_origin}}/src/page/qa/image/ic_reply.png" class="answer-comment-icon">
                        <span class="answer-comment-number">
                        {{if $item.comment_count}}
                            {{$item.comment_count}}
                        {{else}}
                            回复
                        {{/if}}
                        </span>
                    </span>
                    {{/if}}
                </span>
            </div>
        </div>
        {{/foreach}}
    </div>
    {{/if}}

    {{if $tpl_data.answer_list_teacher}}
    {{$teacher_answer = 1}}
    <div class="hot-answer hot-answer-bottom">
        {{$teacher_len = $tpl_data.answer_list_teacher|count}}
        <div class="teacher-nav">
            <span class="teacher-nav-color"></span>
            <span class="teacher-nav-text">老师({{$teacher_len}})</span>
        </div>
        {{foreach $tpl_data.answer_list_teacher as $item}}
        {{$boolFlag = 0}}
        {{if $item.user_can_enter_answer == true}}
            {{$boolFlag = 1}}
        {{/if}}
        {{if $item@index == $teacher_len-1}}
        <div class="answer-items answer-link" data-answer-id="{{$item.question_id}}" data-answer-number="{{$item.user_number}}" data-user-role="{{$item.user_role}}" data-app-number="{{$item.app_teacher_number}}" data-can-enter="{{$boolFlag}}" style="border-bottom: none;">
        {{else}}
        <div class="answer-items answer-link" data-answer-id="{{$item.question_id}}" data-answer-number="{{$item.user_number}}" data-user-role="{{$item.user_role}}" data-app-number="{{$item.app_teacher_number}}" data-can-enter="{{$boolFlag}}">
        {{/if}}
            <div class="hot-answer-show clearfix">
                <a href="/{{$item.teacher.domain}}">
                    <img data-src="{{$item.teacher.avatar_url}}" class="answer-avart">
                </a>
                <div class="answer-contents">
                <div class="answer-first-content">
                    <div class="answer-first-item">
                        <span class="answer-name">
                            {{$item.teacher.display_name|cn_truncate:6}}</span>
                        <p class="answer-intro line-clamp">{{$item.teacher.short_introduce}}</p>
                    </div>
                </div>
                </div>
                {{*题主才能见采纳与非采纳*}}
                <div class="answer-right-tab">
                {{if isset($item.ans_invalid) && $item.ans_invalid}}
                <a href="https://m.genshuixue.com/forum/postBrowse/24636">
                    <span class="invalid-answer">无效回答<img src="{{$static_origin}}/src/page/qa/image/ic_invalid_a.png" class="invalid-answer-icon"></span>
                </a>
                {{else}}
                    {{if $question_good == 1 && $tpl_data.question.best_answer_id == $item.id}}
                        <span class="answer-get">题主采纳</span>
                    {{/if}}

                    {{if $time_flag == 1 && !$ext_data.is_tapp && $is_teacher == 0}}
                    {{*题主的问题被解决后，题主可见像TA提问以及题主采纳*}}

                        {{if $question_good == 1}}
                        <div data-href="/Wenda/askQuestion" class="answer-tobe-ask" data-user-number="{{$item.teacher_id}}" data-appnojump="true">
                            <span class="answer-unget">向TA提问</span>
                        </div>
                        {{elseif $question_good == 0}}
                        <span class="answer-unget answer-tobe-get" data-answer-id="{{$item.id}}">采纳</span>
                        {{/if}}

                    {{*非题主可见的可以对老师发起向TA提问*}}

                    {{elseif (!$ext_data.is_tapp && $is_teacher == 0) || $tpl_data.loginuser.user_number == null}}
                        <div data-href="/Wenda/askQuestion" class="answer-tobe-ask" data-user-number="{{$item.teacher_id}}" data-appnojump="true">
                            <span class="answer-unget">向TA提问</span>
                        </div>
                    {{/if}}

                {{/if}}
                </div>
            </div>

            <div class="answer-show">
                {{if $item.content}}
                <p class="answer-show-text">
                {{$item.content}}
                </p>
                {{/if}}
                {{if $item.pic_url}}
                <img data-src="{{$item.pic_url}}" class="answer-show-img">
                {{/if}}
                {{if $item.audio_url}}
                <div class="audio-show">
                    <div class="audio" data-url="{{$item.audio_url}}" data-length="{{$item.audio_length}}">
                    </div>
                    <p class="audio-lenth" data-length="{{$item.audio_length}}">
                    </p>
                    <img src="{{$static_origin}}/src/page/qa/image/voice_gray.png" class="audio-icon">
                </div>
                {{/if}}
            </div>

            {{if $item.content_ext}}
            <a href="{{$item.content_ext.m_url}}">
                <div class="answer-class">
                    <img data-src="{{$item.content_ext.thumb}}" class="answer-class-img">
                    <div class="answer-class-item answer-class-width">
                        <p class="answer-class-name line-clamp">
                        {{$item.content_ext.title}}
                        </p>
                        <p class="answer-learn-times">{{$item.content_ext.course_info.pay_number}}人学过</p>
                    </div>
                </div>
            </a>
            {{/if}}
            <div class="answer-bottom">
                <span class="answer-bottom-time">
                    {{include file="page/qa/_part/leastTime.tpl" date=$item.create_time}}
                </span>
                <span class="answer-bottom-comment">
                    {{$is_support=0}}
                    {{if $item.is_support}}
                    {{$is_support=1}}
                    {{/if}}
                    <span class="zan-action" data-answer-id="{{$item.id}}" data-support ="{{$is_support}}" data-good-number="{{$item.support_count}}">
                    {{if $is_support==1}}
                        <img src="{{$static_origin}}/src/page/qa/image/ic_zan_good.png" class="answer-comment-icon answer-good-icon">
                        <span class="answer-comment-space answer-support-number" style="color: #ff9100;">
                        {{if $item.support_count}}
                            {{$item.support_count}}
                        {{else}}
                            赞
                        {{/if}}
                        </span>
                    {{else}}
                        <img src="{{$static_origin}}/src/page/qa/image/ic_zan.png" class="answer-comment-icon answer-good-icon">
                        <span class="answer-comment-space answer-support-number">
                        {{if $item.support_count}}
                            {{$item.support_count}}
                        {{else}}
                            赞
                        {{/if}}
                        </span>
                    {{/if}}
                    </span>
                    {{if $item.user_can_comment}}
                    <span>
                        <img src="{{$static_origin}}/src/page/qa/image/ic_reply.png" class="answer-comment-icon">
                        <span class="answer-comment-number">
                        {{if $item.comment_count}}
                            {{$item.comment_count}}
                        {{else}}
                            回复
                        {{/if}}
                        </span>
                    </span>
                    {{/if}}
                </span>
            </div>
        </div>
        {{/foreach}}
        {{*在学生APP中并且不是老师登录并且登陆者为提问者本人且没有老师回答时才展示"我也要请教老师这个标签"*}}
        {{if (!$ext_data.is_tapp && $is_teacher == 0) && !(($time_flag == 1) && ($teacher_answer == 1)) || $tpl_data.loginuser.user_number == null}}
        <div data-href="/Wenda/askQuestion" class="answer-tobe-ask" data-user-number="" data-appnojump="true" style="display: block">
            <p class="hot-teacher-ask">我也要请教老师</p>
        </div>
        {{/if}}
    </div>
    {{/if}}

    {{if $tpl_data.answer_list_student}}
    <div class="hot-answer">
        {{$student_len = $tpl_data.answer_list_student|count}}
        <div class="teacher-nav">
            <span class="student-nav-color"></span>
            <span class="teacher-nav-text">学生({{$student_len}})</span>
        </div>
        {{foreach $tpl_data.answer_list_student as $item}}
        {{$boolFlag = 0}}
        {{if $item.user_can_enter_answer == true}}
            {{$boolFlag = 1}}
        {{/if}}
        {{if $item@index == $student_len-1}}
        <div class="answer-items answer-item-no-border answer-link" data-answer-id="{{$item.question_id}}" data-answer-number="{{$item.user_number}}" data-user-role="{{$item.user_role}}" data-app-number="{{$item.app_teacher_number}}" data-can-enter="{{$boolFlag}}">
        {{else}}
        <div class="answer-items answer-link" data-answer-id="{{$item.question_id}}" data-answer-number="{{$item.user_number}}" data-user-role="{{$item.user_role}}" data-app-number="{{$item.app_teacher_number}}" data-can-enter="{{$boolFlag}}">
        {{/if}}
            <div class="hot-answer-show clearfix">
                <a href="\x\{{$item.student.number}}">
                    <img data-src="{{$item.student.avatar_url}}" class="answer-avart">
                </a>
                <div class="answer-contents">
                <div class="answer-first-content">
                    <div class="answer-first-item">
                        <span class="answer-name">
                            {{$item.student.display_name|cn_truncate:8}}
                        </span>
                        <p class="answer-intro line-clamp">{{$item.student.location}}</p>
                    </div>
                </div>
                </div>
                <div class="answer-right-tab">
                {{if isset($item.ans_invalid) && $item.ans_invalid}}
                <a href="https://m.genshuixue.com/forum/postBrowse/24636">
                    <span class="invalid-answer">无效回答<img src="{{$static_origin}}/src/page/qa/image/ic_invalid_a.png" class="invalid-answer-icon"></span>
                </a>
                {{/if}}
                </div>
            </div>

            <div class="answer-show">
                {{if $item.content}}
                <p class="answer-show-text">
                {{$item.content}}
                </p>
                {{/if}}
                {{if $item.pic_url}}
                <img data-src="{{$item.pic_url}}" class="answer-show-img">
                {{/if}}
                {{if $item.audio_url}}
                <div class="audio-show">
                    <div class="audio" data-url="{{$item.audio_url}}" data-length="{{$item.audio_length}}">
                    </div>
                    <p class="audio-lenth" data-length="{{$item.audio_length}}" >
                    </p>
                    <img src="{{$static_origin}}/src/page/qa/image/voice_gray.png" class="audio-icon">
                </div>
                {{/if}}
            </div>

            {{if $item.content_ext}}
            <a href="{{$item.content_ext.m_url}}">
                <div class="answer-class">
                    <img data-src="{{$item.content_ext.thumb}}" class="answer-class-img">
                    <div class="answer-class-item answer-class-width">
                        <p class="answer-class-name line-clamp">
                        {{$item.content_ext.title}}
                        </p>
                        <p class="answer-learn-times">{{$item.content_ext.course_info.pay_number}}人学过</p>
                    </div>
                </div>
            </a>
            {{/if}}
            <div class="answer-bottom">
                <span class="answer-bottom-time">
                    {{include file="page/qa/_part/leastTime.tpl" date=$item.create_time}}
                </span>
                <span class="answer-bottom-comment">
                    {{$is_support=0}}
                    {{if $item.is_support}}
                    {{$is_support=1}}
                    {{/if}}
                    <span class="zan-action" data-answer-id="{{$item.id}}" data-support ="{{$is_support}}" data-good-number="{{$item.support_count}}">
                    {{if $is_support==1}}
                        <img src="{{$static_origin}}/src/page/qa/image/ic_zan_good.png" class="answer-comment-icon answer-good-icon">
                        <span class="answer-comment-space answer-support-number" style="color: #ff9100;">
                        {{if $item.support_count}}
                            {{$item.support_count}}
                        {{else}}
                            赞
                        {{/if}}
                        </span>
                    {{else}}
                        <img src="{{$static_origin}}/src/page/qa/image/ic_zan.png" class="answer-comment-icon answer-good-icon">
                        <span class="answer-comment-space answer-support-number">
                        {{if $item.support_count}}
                            {{$item.support_count}}
                        {{else}}
                            赞
                        {{/if}}
                        </span>
                    {{/if}}
                    </span>
                    {{if $item.user_can_comment}}
                    <span>
                        <img src="{{$static_origin}}/src/page/qa/image/ic_reply.png" class="answer-comment-icon">
                        <span class="answer-comment-number">
                        {{if $item.comment_count}}
                            {{$item.comment_count}}
                        {{else}}
                            回复
                        {{/if}}
                        </span>
                    </span>
                    {{/if}}
                </span>
            </div>
        </div>
        {{/foreach}}
    </div>
    {{/if}}

    {{*问题number answer-id 回答者number answer-number 回答者身份*}}
        <div data-href="" class="answer-link-all" data-answer-id="{{$tpl_data.question.number}}" data-answer-number="{{$tpl_data.loginuser.user_number}}" data-user-role="{{$tpl_data.loginuser.user_role}}" data-app-number="{{$tpl_data.my_app_teacher_number}}" data-appnojump="true">
            <p class="hot-student-ask">我要回答</p>
        </div>

{{/block}}