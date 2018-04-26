
    {{foreach list as $item}}
    <li class="list-item-it" data-number="{{$item.course_number}}" data-type="{{$item.course_type}}" data-url="{{$item.course_url}}">
        <img data-src="{{$item.cover_url}}" class="item-cover">
        {{if $item.course_type == 'video'}}
        <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/08/57a03363b7f51.png" class="item-play-icon">
        {{/if}}
        <div class="list-info">
            <div class="list-first-nav">
                <span class="list-title line-clamp">
                <span class="list-icon">
                {{if $item.course_type == 'online'}}
                    直播课
                {{else if $item.course_type == 'offline'}}
                    线下班课
                {{else}}
                    视频课
                {{/if}}
                </span>
                {{$item.course_name}}
                </span>
            </div>

            {{if $item.course_type == 'video'}}
                <p class="list-time">共{{$item.course_items_count}}课节</span>
            {{else}}
                <p class="list-time">{{$item.course_time}}</p>
            {{/if}}

            <div class="list-last-nav">
                {{if $item.price > 0}}
                <span class="price">￥{{$item.price}}</span>
                {{else}}
                <span class="price" style="color: #43B244;">免费</span>
                {{/if}}

                <span>{{$item.student_count}}人已报名</span>

                {{if $item.course_type == "offline"}}
                    <span class="distance">{{$item.distance}}</span>
                {{/if}}
            </div>
        </div>
    </li>
    {{/foreach}}
