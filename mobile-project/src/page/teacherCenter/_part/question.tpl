{{$question_list = $tpl_data.question_list}}
{{if $question_list.is_show}}
{{$question = $question_list.question}}
{{$answer = $question_list.answer_list}}
<div class="question" data-number="{{$tpl_data.base_info.number}}">
    {{if $tpl_data.model == 'green'}}
    <p class="question-count" style="color:#0097a7;">问老师({{$question_list.list_length}}条)</p>
    {{else if $tpl_data.model == 'red'}}
    <p class="question-count" style="color:red;">问老师({{$question_list.list_length}}条)</p>
    {{else}}
    <p class="question-count">问老师({{$question_list.list_length}}条)</p>
    {{/if}}
    <div class="question-list clearfix">
        <p class="question-icon">问</p>
        {{if $question.content}}
        <p class="question-content">{{$question.content}}</p>
        {{/if}}

        {{if $question.pics_url}}
            <ul class="ask-img clearfix">
                {{$pic_len = $question.pics_url|count}}
                {{if $pic_len == 1}}
                <li class="ask-img-item-single" data-index="0">
                    <img data-src="{{$question.pics_url[0]}}" width="100%" height="100%" class="ask-single-img">
                </li>
                {{else}}
                {{foreach $question.pics_url as $ke => $ite}}
                    <li class="ask-img-item" data-index="{{$ke}}">
                        <img data-src="{{$ite}}" width="100%" height="100%" class="ask-single-img">
                    </li>
                {{/foreach}}
                {{/if}}
            </ul>
        {{/if}}
    </div>

    <div class="answer-list clearfix">
        <p class="answer-icon">答</p>
        {{if $answer.content}}
        <p class="answer-content">{{$answer.content}}</p>
        {{/if}}

        {{if $answer.pic_url}}
            <img data-src="{{$answer.pic_url}}" class="answer-img">
        {{/if}}

        {{if $answer.audio_url}}
            <div class="answer-audio-show">
                <div class="answer-audio" data-url="{{$answer.audio_url}}" data-length="{{$answer.audio_length}}">
                </div>
                <p class="answer-audio-lenth" data-length="{{$answer.audio_length}}">
                </p>
                <img src="{{$static_origin}}/src/page/qa/image/voice_gray.png" class="answer-audio-icon">
            </div>
        {{/if}}
    </div>

    <div class="more-question-tab" data-href="/wenda/teacherAnswer?teacher_number={{$tpl_data.base_info.number}}">
        <p class="more-detail">查看{{$question_list.list_length}}个问题</p>
    </div>
</div>
{{/if}}