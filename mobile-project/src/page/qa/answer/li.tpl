{{$hot_answer = list}}
<div class="hot-answer">
    <div class="item-nav clearfix">
            {{if $hot_answer.user_role == 0}}
            <img src="{{$hot_answer.teacher.avatar_url}}" class="item-nav-avatar" data-number="{{$hot_answer.user_id}}">
            {{else if $hot_answer.user_role == 2}}
            <img src="{{$hot_answer.student.avatar_url}}" class="item-nav-avatar" data-number="{{$hot_answer.user_id}}">
            {{/if}}
            <span class="item-nav-content" style="margin-top:0px;">
            {{if $hot_answer.user_role == 0}}
                <span class="item-nav-name">{{$hot_answer.teacher.display_name}}</span>
                <span class="item-nav-role">老师</span>
                <p class="item-nav-address" style="margin-top: 4px;">{{$hot_answer.teacher.short_introduce}}</p>
            {{else if $hot_answer.user_role == 2}}
                <span class="item-nav-name">{{$hot_answer.student.display_name}}</span>
                <span class="item-nav-role">学生</span>
                <p class="item-nav-address" style="margin-top: 4px;">{{$hot_answer.student.short_introduce}}</p>
            {{/if}}
            </span>
        </div>

        <div class="answer-show">
            {{if $hot_answer.content}}
            <p class="answer-show-text">
            {{$hot_answer.content}}
            </p>
            {{/if}}
            {{if $hot_answer.pic_url}}
            <img data-src="{{$hot_answer.pic_url}}" class="answer-show-img">
            {{/if}}
            {{if $hot_answer.audio_url}}
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