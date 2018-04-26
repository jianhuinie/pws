{{$question_list = list}}
{{if $question_list.is_show}}
<div class="question" data-number="{{teacherNumber}}">
    {{if model == 'green'}}
    <p class="question-count" style="color:#0097a7;">问老师({{$question_list.list_length}}条)</p>
    {{else if model == 'red'}}
    <p class="question-count" style="color:red;">问老师({{$question_list.list_length}}条)</p>
    {{else}}
    <p class="question-count">问老师({{$question_list.list_length}}条)</p>
    {{/if}}
    <div class="question-list clearfix">
        <p class="question-icon">问</p>
        {{if $question_list.question.content}}
        <p class="question-content">{{$question_list.question.content}}</p>
        {{/if}}

        {{if $question_list.question.pics_url}}
            <ul class="ask-img clearfix">
                {{if $question_list.question.pics_url.length == 1}}
                <li class="ask-img-item-single" data-index="0">
                    <img data-src="{{$question_list.question.pics_url[0]}}" width="100%" height="100%" class="ask-single-img">
                </li>
                {{else}}
                {{foreach $question_list.question.pics_url as $ite}}
                    <li class="ask-img-item" data-index="{{$index}}">
                        <img data-src="{{$ite}}" width="100%" height="100%" class="ask-single-img">
                    </li>
                {{/foreach}}
                {{/if}}
            </ul>
        {{/if}}
    </div>

    <div class="answer-list clearfix">
        <p class="answer-icon">答</p>
        {{if $question_list.answer_list.content}}
        <p class="answer-content">{{$question_list.answer_list.content}}</p>
        {{/if}}

        {{if $question_list.answer_list.pic_url}}
            <img data-src="{{$question_list.answer_list.pic_url}}" class="answer-img">
        {{/if}}

        {{if $question_list.answer_list.audio_url}}
            <div class="answer-audio-show">
                <div class="answer-audio" data-url="{{$question_list.answer_list.audio_url}}" data-length="{{$question_list.answer_list.audio_length}}">
                </div>
                <p class="answer-audio-lenth" data-length="{{$question_list.answer_list.audio_length}}">
                </p>
                <img src="{{$static_origin}}/src/page/qa/image/voice_gray.png" class="answer-audio-icon">
            </div>
        {{/if}}
    </div>

    <div data-href="/wenda/teacherAnswer?teacher_number={{teacherNumber}}">
        <p class="more-detail">查看{{$question_list.list_length}}个问题</p>
    </div>

</div>
{{/if}}