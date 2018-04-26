<div class="course-content clearfix">
    {{foreach $coupon.course_list as $item}}
        <div class="course-card" data-url="{{$item.url}}">
            <div class="logo-content">
                <div class="logo-mask"></div>
                <img class="logo" data-src="{{$item.logo_url}}">
                <div class="logo-text hide">马上使用</div>
            </div>
            <div class="line-clamp line-clamp-2 course-name">
                {{$item.name}}
            </div>
        </div>
    {{/foreach}}
</div>