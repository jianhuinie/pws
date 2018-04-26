{{$data_info = $course_list.data}}
<div class="day-good">
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

    <div class="swiper-container">
        <div class="swiper-wrapper">
        {{foreach $data_info.list as $item}}
            <div class="swiper-slide">
                <div class="total">
                    <div class="total-img">
                        <div class="img-phone course-item-card" data-number="{{$item.number}}" data-url="{{$item.url}}" data-type="{{$item.type}}">
                            <img width="auto" height="auto"
                             src="{{$item.img}}"/>
                             <div class="course-info line-clamp line-clamp-2">
                                {{if $item.type == 8}}
                                <span class="course-icon" style="color:{{$color}};border:1px solid {{$color}};">直播课</span>
                                {{else if $item.type == 2}}
                                <span class="course-icon" style="color:{{$color}};border:1px solid {{$color}};">线下班课</span>
                                {{else if $item.type == 3}}
                                <span class="course-icon" style="color:{{$color}};border:1px solid {{$color}};">视频课</span>
                                {{else}}
                                <span class="course-icon" style="color:{{$color}};border:1px solid {{$color}};">资讯</span>
                                {{/if}}

                                <span class="course-title">{{$item.title}}</span>
                             </div>
                             <p class="pay-number">
                                {{if $item.type == 10}}
                                {{$item.from}}
                                {{else}}
                                {{$item.total_pay}}人已报名
                                {{/if}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {{/foreach}}
        </div>
    </div>
</div>