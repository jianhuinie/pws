<div class="course-card">
    <div class="start-title">
        <span class="icon-star_all block-line">
            <span class="line"></span>
            <span class="line line-sub"></span>
        </span>
        <div class="title">{{$text}}</div>
        <span class="icon-star_all block-line block-line-right">
            <span class="line"></span>
            <span class="line line-sub"></span>
        </span>
        <div class="start-title-sub">
                {{$sub}}
        </div>
    </div>

    <ul class="course-info clearfix">
        {{foreach $course_list.list as $item}}
        <li data-url="{{$item.url}}" data-type="{{$item.type}}" data-number="{{$item.course_number}}" class="course-item course-item-card logClick" data-ctype="{{$ctype}}" data-cname="k12_course">
            <div class="first-nav">
                <img data-src="{{$item.img}}" class="item-cover">
                {{if $item.type == 3}}
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/08/57a03363b7f51.png" class="item-play-icon">
                {{/if}}
                <p>    已报名{{$item.total_pay}}人</p>
            </div>
            <div class="second-nav">
                <span class="title line-clamp">
                    {{if $item.type == 8}}
                    <span class="type-icon">直播课</span>
                    {{else if $item.type == 2}}
                    <span class="type-icon">线下班课</span>
                    {{else}}
                    <span class="type-icon">视频课</span>
                    {{/if}}
                {{$item.title}}
                </span>
            </div>
            <div class="last-nav">
                {{if $item.price == 0}}
                <span class="price" style="color: #43B244;">免费</span>
                {{else}}
                <span class="price">￥{{$item.price}}</span>
                {{/if}}

                {{if $item.type == 2}}
                <span class="other-info">{{$item.distance}}</span>
                {{else}}
                <span class="other-info">{{$item.begin_time_desc}}</span>
                {{/if}}
            </div>
        </li>
        {{/foreach}}
    </ul>

    {{$moreNumber = $ctype + 1}}
    <a href="{{$course_list.more_url}}" class="logClick" data-ctype="{{$moreNumber}}" data-cname="k12_course">
        <p class="has-more">更多课程 ></p>
    </a>
</div>