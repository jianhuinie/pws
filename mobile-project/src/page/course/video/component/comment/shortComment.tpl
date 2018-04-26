<div class="comment-list-box">
    {{foreach list as $item}}
    <div class="comment-item">
        <div class="header-content">
            <img class="avatar" data-src="{{$item.user.avatar_url}}">
            <div class="name">{{$item.user.display_name}}</div>
            <div class="time">{{$item.create_time}}</div>
        </div>

        <div class="main-content">
            {{$item.info}}
        </div>
    </div>
    {{/foreach}}
</div>