<div class="dynamic-child-box" data-type="wenda">
{{foreach wendaList as $item}}
    <div class="wenda-item" data-url="/wenda/questionDetail?number={{$item.question.number}}">
        <div class="first-nav">
            <img class="avatar" data-src="{{wendaBasic.avatar_url}}">
            <div class="name">{{wendaBasic.nick_name}}</div>
            <div class="text">回答了问题</div>
        </div>

        <div class="ask-content">
            <div class="ask">问</div>
            {{if $item.question.content}}
                <p class="question-content">{{$item.question.content}}</p>
            {{/if}}

            {{if $item.question.pics_url}}
                <ul class="ask-img clearfix">
                    {{if $item.question.pics_url.length == 1}}
                    <li class="ask-img-item-single" data-index="0">
                        <img data-src="{{$item.question.pics_url[0]}}" width="100%" height="100%" class="ask-single-img">
                    </li>
                    {{else}}
                    {{foreach $item.question.pics_url as $ite index}}
                    <img class="ask-img-item" data-src="{{$ite}}" data-index="{{index}}" width="100%" height="100%" class="ask-single-img">
                    {{/foreach}}
                    {{/if}}
                </ul>
            {{/if}}
        </div>

        <div class="answer-content">
            <div class="answer">答</div>
            <div class="answer-show">
                {{if $item.answer_list[0].content}}
                <p class="answer-show-text">
                {{$item.answer_list[0].content}}
                </p>
                {{/if}}

                {{if $item.answer_list[0].pic_url}}
                    <img data-src="{{$item.answer_list[0].pic_url}}" class="answer-show-img">
                {{/if}}

                {{if $item.answer_list[0].audio}}
                    <div class="audio-show" data-url="{{$item.answer_list[0].audio_url}}" data-length="{{$item.answer_list[0].audio_length}}">
                        <span class="audio-lenth" data-length="{{$item.answer_list[0].audio_length}}">
                        </span>
                        <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/569ee8d2bf4e1.png" class="audio-icon play-icon">
                    </div>
                {{/if}}


            </div>
        </div>

        <div class="last-nav">
            <div class="time">{{$item.question.time_desc}}</div>

            <div class="backup-number">
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/12/5850b498d0550.png">
                {{$item.question.answer_count}}
            </div>
        </div>
    </div>
{{/foreach}}
</div>