{{foreach data as $item index}}
<div class="unit">
    <div class="head">
        <div class="rank-no tac">{{$item.rank}}</div>
        <a href="{{$item.home_url}}" class="teacher-mainpage">
            <img data-src="{{$item.avatar_url}}" alt="" class="avatar">
            <div class="text">
                <span class="name">{{$item.display_name}}</span>
                {{if $item.vip_level == 3}}
                 <img class="logo-vip" width="17" height="17" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5d1676.png">
                {{else if $item.vip_level == 2}}
                 <img class="logo-vip" width="17" height="17" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5aef77.png">
                {{else if $item.vip_level == 1}}
                 <img class="logo-vip" width="17" height="17" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/02/56d3b6e867bb9.png">
                {{else}}
                {{/if}}
                <br>
                <span class="teach-type">{{$item.subject_name}}</span>
            </div>
        </a>
        <a href="{{$item.comment_link}}" class="teacher-comment dib tar">
            <span class="comment-no">{{$item.comment_no}}条评论</span>
            <span class="icon icon-chevron-thin-right"></span>
        </a>
    </div>
    <div class="comment-first">
        <div class="name">{{$item.student_name}}</div>
        <p class="content ovh">{{$item.comment_content}}</p>
        <div class="time tar">{{$item.comment_time}}</div>
    </div>
</div>
{{/foreach}}