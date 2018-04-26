{{$question_user = $tpl_data.question.user}}
<div class="head-nav">
        <div class="asker clearfix">
            {{if $question_user.usertype == 2}}
            <a href="\x\{{$question_user.number}}">
            {{else}}
            <a href="\{{$question_user.number}}">
            {{/if}}
            <img data-src="{{$tpl_data.question.user.avatar_url}}" class="asker-img">
            </a>
            <div class="asker-info">
                <p class="asker-name">{{$tpl_data.question.user.nickname}}</p>
                {{if isset($tpl_data.question.user.location)}}
                <p class="asker-details">
                    {{$tpl_data.question.user.location}}
                </p>
                {{/if}}
            </div>
        </div>
        <div class="asker-content">
            {{if isset($tpl_data.question.ques_invalid) && $tpl_data.question.ques_invalid}}
                <img src="{{$static_origin}}/src/page/qa/image/ic_invalid_q.png" class="invalid-question">
            {{/if}}
            <p class="asker-text">{{$tpl_data.question.content}}</p>
            {{if $tpl_data.question.pics_url}}
            {{$pics_items = $tpl_data.question.pics_url}}
            {{$pics_len = $pics_items|count}}
            <ul class="ask-img clearfix">
                {{if $pics_len == 1}}
                <li class="ask-img-item" data-index="0" style="width:80%; height: 200px">
                    <img data-src="{{$pics_items[0]}}" width="100%" height="100%" class="ask-single-img">
                </li>
                {{else}}
                {{foreach $pics_items as $key => $item}}
                <li class="ask-img-item" data-index="{{$key}}">
                    <img data-src="{{$item}}" width="100%" height="100%" class="ask-single-img">
                </li>
                {{/foreach}}
                {{/if}}
            </ul>
            {{/if}}
        </div>
        <div class="bottom-nav">
            <div class="answer-score">
                <span class="bottom-item head-score">悬赏:</span><span class="head-score" style="margin-left:4px;">{{$tpl_data.question.integral}}分</span>
            </div>
            <span class="bottom-item head-subject"><img src="{{$static_origin}}/src/page/qa/image/ic_course.png" class="subject-icon">{{$tpl_data.question.subject_name}}</span>
            <span class="bottom-item head-time">
                {{include file="page/qa/_part/leastTime.tpl" date=$tpl_data.question.create_time}}
            </span>
            {{if $showComment==true}}
            <span class="head-read" ><img src="{{$static_origin}}/src/page/qa/image/ic_reply.png" class="head-read-icon"><p>{{$tpl_data.question.answer_users}}</p></span>
            {{/if}}
        </div>
    </div>