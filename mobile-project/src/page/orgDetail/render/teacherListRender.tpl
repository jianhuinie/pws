    {{foreach data.hot_teacher.list as $item}}
        <div class="item" data-url="{{$item.url}}">
            <img data-src="{{$item.avatar}}">
            <div class="infos">
                <div class="name">{{$item.name}}</div>
                <div class="subject line-clamp">{{$item.course}}</div>
                <div class="detail line-clamp">{{$item.short_introduce}}</div>
                {{if $item.price > 0}}
                <div class="price">￥ {{$item.price}}</div>
                {{/if}}
            </div>
        </div>
    {{/foreach}}