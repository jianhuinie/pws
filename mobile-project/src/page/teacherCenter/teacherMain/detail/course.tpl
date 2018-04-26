<div class="teacher-course">
    {{if !empty($tpl_data.course.list)}}
    {{$moreCourse = true}}
    {{else}}
    {{$moreCourse = false}}
    {{/if}}
    {{$course_model = $tpl_data.model}}
    <div class="title">
        <span class="character {{$course_model}}">课程</span>
        <a class="title-more-course" {{if $moreCourse}}href="{{$tpl_data.base_info.course_url}}"{{else}}href="{{$tpl_data.base_info.history_course_url}}"{{/if}} class="more-course">
        查看更多{{if !$moreCourse}}历史{{/if}}课程<i class="icon icon-angle-right"></i>
        </a>
    </div>
    {{if !empty($tpl_data.course.list)}}
    <ul class="course-list">
        {{foreach $tpl_data.course.list as $course}}
        {{if !empty($course.cover_url)}}
        {{$coverUrl = $course.cover_url}}
        {{else}}
        {{$coverUrl = "https://test-imgs.genshuixue.com/358098_8q6ygue7.jpeg"}}
        {{/if }}
        <li class="course-info" data-href="{{$course.url}}" {{if $course.type == 3}} data-number="{{$course.number}}" data-force-url="{{$course.force_update_url}}" {{/if}}>
            <span class="img-background">
                <img class="class-cover" width="100%" height="100%" data-src="{{$coverUrl}}">
                {{if !empty($course.fenqi)}}
                <span class="fenqi hide" data-video="{{if $course.type == 3}}1{{else}}0{{/if}}">{{$course.fenqi.tag_name}}</span>
                {{/if}}
                {{if $course.type == 3}}
                <span class="video-play">
                    <img src="{{$static_origin}}/src/page/teacherCenter/teacherMain/image/teacher_video.png">
                </span>
                {{/if}}
            </span>
        <div class="info">
            <p>
                <span class="course-type">
                     [  {{if $course.type == 1}}
                            一对一
                        {{elseif $course.type == 2}}
                            {{if $course.is_online}}
                                直播课
                            {{else}}
                                线下班课
                            {{/if}}
                        {{elseif $course.type == 3}}
                            视频课
                        {{elseif $course.type == 13}}
                            优选1对1
                        {{/if}}]
                </span>
                <span class="course-name">
                    {{$course.name}}
                </span>
            </p>

            {{if !empty($course.discount)}}
                {{$price = $course.discount.discount_price}}
                {{$price_type = "秒杀价"}}
            {{elseif isset($course.realtime_price)}}
                {{$price = $course.realtime_price}}
                {{$price_type = "插班价"}}
            {{else}}
                {{$price = $course.price}}
                {{$price_type = ""}}
            {{/if}}

            {{if $course.price > 0}}
            <p class="course-price">
                <span class="symbol">{{if !empty($price_type)}}{{$price_type|cat:":"}}{{/if}}￥</span>
                    {{$price}} {{if $course.type == 1 || $course.type == 13}}起{{/if}}
            </p>
            {{else}}
            <p class="course-price">免费</p>
            {{/if}}
        </div>
        </li>
        {{/foreach}}
        {{if $tpl_data.course.list|count > 5}}
        <li class="more-li">
            <a href="{{$tpl_data.base_info.course_url}}">
                <img src="{{$static_origin}}/src/page/teacherCenter/teacherMain/image/ic_more_n.png">
                <span>查看更多</span>
            </a>
        </li>
        {{/if}}
    </ul>
    {{* 领取优惠券 *}}
    {{if $tpl_data.coupon}}
    <a class="coupon" href="{{$tpl_data.coupon.url}}">
        <img src="{{$static_origin}}/src/page/teacherCenter/teacherMain/image/teacher_coupon.png">
        领取优惠券
        <i class="icon icon-angle-right"></i>
    </a>
    {{/if}}
    {{/if}}
</div>