<div style="margin-top: 10px;"></div>

{{foreach data.news_list.list as $item}}

<div class="dynamic showClick" data-url="{{$item.url}}">
    <div class="first-nav">
        <div class="avatar">
            <img data-src="{{img}}">
        </div>
        <div class="infos">
            <div class="name">{{orgName}}</div>
            <div class="def">发布了{{$item.type}}</div>
        </div>
    </div>

    <div class="title line-clamp" style="font-weight: bold;">
        {{$item.title}}
    </div>
    <div class="infos line-clamp line-clamp-2 line-clamp-3">
        {{$item.brief}}
    </div>

    {{if $item.course_info.name}}
    <div class="content">
        <img data-src="{{$item.course_info.preface}}">
        <div class="box">
            <div class="name line-clamp">{{$item.course_info.name}}</div>
            <div class="type">{{$item.course_info.course_type}}</div>
            <div class="price">￥{{$item.course_info.price}}</div>
        </div>
    </div>
    {{/if}}

    <div class="last-nav clearfix">
        <span class="times">{{$item.create_time}}</span>
        <span class="like">喜欢{{$item.support_num}}</span>
        <span class="reads">阅读{{$item.read_times}}</span>
    </div>

</div>

{{/foreach}}