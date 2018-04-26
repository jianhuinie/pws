{{if isFirstCommentPage}}
    {{if commentTags.length > 0}}
    <div class="commentTags">
        {{foreach commentTags as $item}}
        <span class="tagItem{{if $item.selected}} on{{/if}}" data-value = "{{$item.value}}">
            {{$item.name}}
            
            {{if !($item.value === "all" || 
                    $item.value ==="classify_3002" ||
                    $item.value ==="classify_3004" ||
                    $item.value ==="classify_3003")
                    }}{{$item.count}}
            {{/if}}
            </span>
        {{/foreach}}
    </div>
    {{/if}}
{{/if}}

<div class="comment-list">
{{foreach commentList as $item index}}

    <div class="comment-item">
        <div class="first-nav">
            <img class="avatar" data-src="{{$item.user.avatar_url}}">
            <div class="name">{{$item.user.display_name}}</div>
            <div class="user-score">
                <span class="name">评分</span>
                <span class="itme-score" data-number="{{$item.total_score}}"></span>
            </div>

            <div class="trump" data-has-trump="0" data-comment-id="{{$item.comment_id}}" data-trump-number={{$item.thumb_up}}>
                <i class="icon icon-like{{if $item.has_thumb_up == true}} active{{/if}}"></i>
                <span class="number">({{$item.thumb_up}})</span>
            </div>
        </div>
        {{if $item.info}}
        <div class="info">
            {{$item.info}}
        </div>
        {{/if}}

        {{if $item.photo_list}}
        <div class="comment-photos">
            {{foreach $item.photo_list as $ite}}
            <img class="comment-photo" data-src="{{$ite.url}}">
            {{/foreach}}
        </div>
        {{/if}}
        <div class="last-nav">
            <span class="time">{{$item.create_time}}</span>
            <span class="course-title">{{$item.display_title}}</span>
        </div>
        {{if $item.additional}}
            {{if $item.additional.teacher}}
            {{$teacher = $item.additional.teacher}}
            <div class="teacher-additional">
                老师回复:&nbsp;{{$teacher.info}}
                <div class="triangle"></div>
            </div>
            {{/if}}
        {{/if}}

        {{if $item.other_comment}}
        <div class="other-comment-title">查看该用户其他{{$item.other_comment.length}}条评价</div>
        <div class="other-comment-box hide">
            {{foreach $item.other_comment as $ite index}}
            <div class="other-first-nav">
                <span class="name">评分</span>
                <span class="itme-score" data-number="{{$ite.total_score}}"></span>
                <div class="trump" data-has-trump="0" data-comment-id="{{$ite.comment_id}}" data-trump-number={{$ite.thumb_up}}>
                    <i class="icon icon-like"></i>
                    <span class="number">({{$ite.thumb_up}})</span>
                </div>
            </div>
            {{if $ite.info}}
            <div class="info">
                {{$ite.info}}
            </div>
            {{/if}}

            {{if $ite.photo_list}}
            <div class="comment-photos">
                {{foreach $ite.photo_list as $it}}
                <img class="comment-photo" data-src="{{$it}}">
            {{/foreach}}
            </div>
            {{/if}}

            <div class="last-nav" {{if index == $item.other_comment.length - 1}}style="border-bottom: none;"{{/if}}>
                <span class="time">{{$ite.create_time}}</span>
                <span class="course-title">{{$ite.display_title}}</span>
            </div>

            {{/foreach}}
        </div>
        {{/if}}
    </div>

{{/foreach}}
</div>