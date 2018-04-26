{{foreach list as $item}}
    <div class="comment-list">
        <div class="info">
            <img class="avatar" data-src="{{$item.user.avatar_url}}">
            <div class="name line-clamp">{{$item.user.display_name}}</div>
            <div class="point">
                <span class="stars" data-scores="{{$item.score}}"></span>
            </div>

            <div class="trump"
                data-id="{{$item.id}}" 
                data-can-trump="1" 
                data-status="0"
                data-count="{{$item.thumb_count}}"
            >
                <i class="icon icon-like"></i>
                <span class="trump-count">{{$item.thumb_count}}</span>
            </div>
        </div>

        <div class="detail">
            <div class="content">
                {{$item.content}}
            </div>

            {{foreach $item.addition_comments as $it}}
                <div class="addition-content" data-id="{{$it.id}}">
                    追加评论:{{$it.content}}
                </div>
            {{/foreach}}

            {{foreach $item.reply_comments as $ite}}
                <div class="replay-content">
                    老师回复: {{$ite.content}}
                </div>
            {{/foreach}}

            <div class="date">
                {{$item.create_time}}
            </div>
        </div>

        {{if $item.fold_comments.length > 0}}
            <div class="check-more">
                查看更多{{$item.fold_comments.length}}条评价
            </div>

            <div class="additions hide">
                {{foreach $item.fold_comments as $it}}
                    <div class="fold-content">
                        <div class="header-line">
                            <span class="fold-score">
                                <span class="text">评分</span>
                                <span class="fold-stars" data-scores="{{$it.score}}"></span>
                            </span>

                            <span class="trump"
                                data-id="{{$it.id}}" 
                                data-can-trump="1" 
                                data-status="0"
                                data-count="{{$it.thumb_count}}"
                            >
                                    <i class="icon icon-like"></i>
                                    <span class="trump-count">{{$it.thumb_count}}</span>
                            </span>
                        </div>
                        <div class="contents">{{$it.content}}</div>
                        <div class="fold-time">{{$it.create_time}}</div>
                    </div>
                {{/foreach}}
            </div>
        {{/if}}

    </div>
{{/foreach}}