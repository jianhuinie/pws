<div class="list" data-url="{{$list.url}}">
    <div class="img">
        <img data-src="{{$list.img}}">
        {{if $list.icon != 0}}
            <div class="play-icon">
                <span class="mask"></span>
                <span class="icon-ic_play"></span>
            </div>
        {{/if}}
    </div>
    <div class="right">
        <p class="title line-clamp">{{$list.title}}</p>
        <p class="pre line-clamp">{{$list.desc}}</p>
        <div class="info">
            <p class="read">{{$list.show_count}}人已看</p>
        </div>
    </div>
</div>