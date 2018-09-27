{{*
@file 问答大厅
@author huangshiming
@date 2016-06-22
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "你问我答"}}
    {{$page_module = "page/qa/askRoom/index"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
    {{if $tpl_data.loginuser.user_number}}
        {{$login_user_number = $tpl_data.loginuser.user_number}}
    {{/if}}

    {{$is_teacher = 1}}
    {{if $tpl_data.loginuser.user_role == 2}}
        {{$is_teacher = 0}}
    {{/if}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/qa/askRoom/index.styl"/>
{{/block}}

{{block name="content"}}
    {{$askRoom = false}}
    {{$questionNumber = 0}}
    {{include file="page/_common/nav_bar/nav_bar.tpl" text="你问我答" questionNumber = $questionNumber}}

    {{if $tpl_data.hot_question}}
    {{$hot_list = $tpl_data.hot_question[0]}}
    <div class="hot-nav clearfix">
            <img src="{{$static_origin}}/src/page/qa/image/label_hot.png" class="hot-nav-label">
        <a href="{{$hot_list.url}}">
            <span class="hot-nav-text line-clamp">{{$hot_list.title}}</span>
            <img class="hot-nav-icon" src="{{$static_origin}}/src/page/qa/image/ic_more.png">
        </a>
    </div>
    {{/if}}

    <div class="main-nav">
        {{$len = $tpl_data.question_list|count}}
        {{foreach $tpl_data.question_list as $item}}
            {{$question = $item.question}}
            {{if $item@index == $len-1}}
            <div class="main-item" data-number = "{{$question.number}}" style="margin-bottom: 0px;">
            {{else}}
            <div class="main-item" data-number = "{{$question.number}}">
            {{/if}}
                <div class="item-nav clearfix">
                    <a href='\x\{{$question.user.number}}'>
                        <img src="{{$question.user.avatar_url}}" class="item-nav-avatar">
                    </a>
                    <span class="item-nav-content">
                        <p class="item-nav-name">{{$question.user.nickname}}</p>

                        {{if isset($question.user.location) && $question.user.location}}
                            <p class="item-nav-address">{{$question.user.location}}</p>
                        {{/if}}

                    <span>
                </div>
                <div class="asker-content">
                    <p class="asker-text">{{$question.content}}</p>
                    {{if $question.pics_url}}
                    <ul class="ask-img clearfix">
                        {{$pic_len = $question.pics_url|count}}
                        {{if $pic_len == 1}}
                        <li class="ask-img-item-single" data-index="0">
                            <img data-src="{{$question.pics_url[0]}}" width="100%" height="100%" class="ask-single-img" style="max-height: 200px;">
                        </li>
                        {{else}}
                        {{foreach $question.pics_url as $ke => $ite}}
                        <li class="ask-img-item" data-index="{{$ke}}">
                            <img data-src="{{$ite}}" width="100%" height="100%" class="ask-single-img" style="max-height: 200px;">
                        </li>
                        {{/foreach}}
                        {{/if}}
                    </ul>
                    {{/if}}
                </div>
                <div class="bottom-nav">
                    {{if $question.integral>0 && ($login_user_number==$question.user_id || $ext_data.is_tapp)}}
                    <div class="answer-score" style="display:inline-block">
                        <span class="bottom-item head-score">悬赏:</span>
                        <span class="head-score" style="margin-left:4px;">{{$question.integral}}分</span>
                    </div>
                    {{/if}}
                    <span class="bottom-item head-subject"><img src="{{$static_origin}}/src/page/qa/image/ic_course.png" class="subject-icon">{{$question.subject_name}}</span>
                    <span class="bottom-item head-time">
                        {{*include file="page/qa/_part/leastTime.tpl" date=$item.create_time*}}
                        {{$question.time_desc}}
                    </span>
                    <span class="head-read" >
                        <p>
                            <img src="{{$static_origin}}/src/page/qa/image/ic_reply.png" class="head-reply">
                            {{if $question.answer_users>0}}
                                {{$question.answer_users}}
                            {{else}}
                                回答
                            {{/if}}

                        </p>
                    </span>
                </div>

                {{if $item.answer_list}}
                <div class="hot-answer">
                    {{$hot_answer = $item.answer_list[0]}}
                    <div class="hot-answer-narrow"></div>
                    <div class="item-nav clearfix">
                        {{if $hot_answer.user_role == 0}}
                        <a href="{{$hot_answer.teacher.detail_url}}">
                            <img src="{{$hot_answer.teacher.avatar_url}}" class="item-nav-avatar">
                        </a>
                        {{elseif $hot_answer.user_role == 2}}
                        <a href="/x/{{$hot_answer.student.number}}">
                            <img src="{{$hot_answer.student.avatar_url}}" class="item-nav-avatar">
                        </a>
                        {{/if}}
                        <span class="item-nav-content" style="margin-top:0px;">
                            {{if $hot_answer.user_role == 0}}
                            <a href="{{$hot_answer.teacher.detail_url}}">
                                <span class="item-nav-name">{{$hot_answer.teacher.display_name}}</span>
                            </a>
                                <span class="item-nav-role">老师</span>
                                <p class="item-nav-address" style="margin-top: 4px;">{{$hot_answer.teacher.short_introduce}}</p>
                            {{elseif $hot_answer.user_role == 2}}
                            <a href="/x/{{$hot_answer.student.number}}">
                                <span class="item-nav-name">{{$hot_answer.student.display_name}}</span>
                            </a>
                                <span class="item-nav-role">学生</span>
                                {{if isset($hot_answer.student.location) && $hot_answer.student.location}}
                                <p class="item-nav-address" style="margin-top: 5px;">
                                    {{$hot_answer.student.location}}
                                </p>
                                {{/if}}
                            {{/if}}
                        </span>
                    </div>

                    <div class="answer-show">
                        {{if $hot_answer.content}}
                        <p class="answer-show-text line-clamp line-clamp-3">
                        {{$hot_answer.content}}
                        </p>
                        {{/if}}
                        {{if $hot_answer.pic_url}}
                        <img data-src="{{$hot_answer.pic_url}}" class="answer-show-img">
                        {{/if}}
                        {{if $hot_answer.audio}}
                        <div class="audio-show">
                            <div class="audio" data-url="{{$hot_answer.audio_url}}" data-length="{{$hot_answer.audio_length}}">
                            </div>
                            <p class="audio-lenth" data-length="{{$hot_answer.audio_length}}">
                            </p>
                            <img src="{{$static_origin}}/src/page/qa/image/voice_gray.png" class="audio-icon">
                        </div>
                        {{/if}}
                    </div>
                </div>

                <p class="has-more">
                    更多回答
                <span style="margin-left:2px;"></span>
                <img class="has-more-icon" src="{{$static_origin}}/src/page/qa/image/ic_more.png">
                </p>
                {{/if}}
            </div>
        {{/foreach}}
    </div>

    {{if $is_teacher == 0 || $tpl_data.loginuser.user_role == null}}
    <div style="margin-bottom:58px;"></div>
    <div class="ask-for-teacher" data-href="/Wenda/askQuestion" data-appnojump="true">
        <div class="ask-teacher">
            <img src="{{$static_origin}}/src/page/qa/image/ic_tiwen.png">
            <span class="ask-teacher-text">向老师提问</span>
        </div>
    </div>
    {{/if}}
{{/block}}
