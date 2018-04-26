<div class="day-good">
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

    <div class="swiper-container">
        <div class="swiper-wrapper">
        {{foreach $course_list as $item}}
            <div class="swiper-slide">
                <div class="total">
                    <div class="total-img">
                        <div class="img-phone course-item-card logClick" data-number="{{$item.course_number}}" data-url="{{$item.url}}" data-type="{{$item.type}}" data-ctype="1" data-cname="k12_jingxuan">
                            <img width="auto" height="auto"
                             src="{{$item.img}}"/>
                             {{if $item.type == 3}}
                            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/08/57a03363b7f51.png" class="item-play-icon">
                            {{/if}}
                             <div class="course-info line-clamp line-clamp-2">
                                {{if $item.type == 8}}
                                <span class="course-icon">直播课</span>
                                {{else if $item.type == 2}}
                                <span class="course-icon">线下班课</span>
                                {{else if $item.type == 3}}
                                <span class="course-icon">视频课</span>
                                {{else}}
                                <span class="course-icon">资讯</span>
                                {{/if}}

                                <span class="course-title">{{$item.title}}</span>
                             </div>
                             {{if $item.type == 10}}
                             <p class="pay-number">{{$item.from}}</p>
                             {{else}}
                             <p class="pay-number">{{$item.total_pay}}人已报名</p>
                             {{/if}}
                        </div>
                    </div>
                </div>
            </div>
            {{/foreach}}
        </div>
    </div>
</div>