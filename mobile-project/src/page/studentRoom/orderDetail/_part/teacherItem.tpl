<div class="teacher-item">
    {{if $type=='cammend'}}
        <img class="cammend-tag" src="https://imgs.genshuixue.com/0cms/d/file/content/2017/04/5901636407dd4.png">
    {{/if}}
    <img class="avatar" src="{{$item.avatar_url_mobile}}@2x_70Q_1o_60w_60h_1e_1c.src">
    <div class="first-head">
        <div class="first-content">
            <span class="name line-clamp">
                {{$item.display_name}}
            </span>
            {{if $item.vip_level == 3}}
                <img width="100%" height="auto" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5d1676.png">
            {{elseif $item.vip_level == 2}}
                <img width="100%" height="auto" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5aef77.png">
            {{elseif $item.vip_level == 1}}
                <img width="100%" height="auto" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/02/56d3b6e867bb9.png">
            {{/if}}
        </div>
    </div>

    <div class="second-round">
        <span class="stars" data-scores="{{$item.comment_score}}"></span>
        <span class="stars-number">{{$item.comment_score}}分</span>
        <span class="comment-number">{{$item.comment_count}}条评价</span>
    </div>

    <div class="last-line">
        {{if $item.audio_url}}
            <span class="audio">
                <i class="icon icon-ic_audio"></i>
                <span class="tex">音频介绍</span>
            </span>
        {{/if}}

        {{if $item.video_url}}
            <span class="video">
                <i class="icon icon-video"></i>
                <span class="tex">视频介绍</span>
            </span>
        {{/if}}
    </div>
</div>