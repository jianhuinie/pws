{{$data_info = $course_list.data}}
<div class="course-card-three">
    <div class="start-title">
        <span class="icon-star_all block-line">
            <span class="line"></span>
            <span class="line line-sub"></span>
        </span>
        <div class="title">{{$data_info.title}}</div>
        <span class="icon-star_all block-line block-line-right">
            <span class="line"></span>
            <span class="line line-sub"></span>
        </span>
        <div class="start-title-sub">
                {{$data_info.sub}}
        </div>
    </div>

    <ul class="course-info clearfix">
        {{foreach $data_info.list as $item}}
        {{if $item@index == 0}}
        <li data-url="{{$item.url}}" data-type="{{$item.type}}" data-number="{{$item.course_number}}" class="course-item course-item-card logClick" data-ctype="1" data-cname="{{$course_list.report_name}}" style="width: 100%;">
        {{else}}
        <li data-url="{{$item.url}}" data-type="{{$item.type}}" data-number="{{$item.course_number}}" class="course-item course-item-card logClick" data-ctype="1" data-cname="{{$course_list.report_name}}">
        {{/if}}
            <div class="first-nav">
                {{if $item@index == 0}}
                <img class="there-big-img" data-src="{{$item.img}}">
                <p class="first-p">    已报名{{$item.total_pay}}</p>
                {{else}}
                <img data-src="{{$item.img}}">
                <p>    已报名{{$item.total_pay}}</p>
                {{/if}}
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
            {{if $item@index == 0}}
                {{if $item.price == 0}}
                <span class="price price-font" style="color:{{$color}};">免费</span>
                {{else}}
                <span class="price price-font" style="color:{{$color}};">￥{{$item.price}}</span>
                {{/if}}
            {{else}}
                {{if $item.price == 0}}
                <span class="price" style="color:{{$color}};">免费</span>
                {{else}}
                <span class="price" style="color:{{$color}};">￥{{$item.price}}</span>
                {{/if}}
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

    <div data-url="{{$course_list.more_url}}" data-ctype="2" data-cname="{{$course_list.report_name}}" data-key-word="{{$course_list.keyword}}" class="logClick class-card" data-area="{{$area}}">
        <div class="has-more" style="color:{{$color}};">更多课程 ></div>
    </div>
</div>