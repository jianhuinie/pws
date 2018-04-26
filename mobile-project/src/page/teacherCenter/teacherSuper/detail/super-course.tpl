{{$type_name = ['','1对1','','视频课']}}
<div class="teacher-course">
    <div class="title-coupon">
        <span class="title">推荐课程</span>
        {{* 领取优惠券 *}}
        {{if $tpl_data.coupon}}
        <a class="coupon" href="{{$tpl_data.coupon.url}}">
            <i class="icon icon-coupon-vip"></i>
            领取优惠券
            <i class="icon icon-angle-right"></i>
        </a>
        {{/if}}
    </div>

    {{if !empty($tpl_data.course.list)}}
    <ul class="course-list">
        {{foreach $tpl_data.course.list as $course}}
            {{if !empty($course.cover_url)}}
                {{$coverUrl = $course.cover_url}}
            {{else}}
                {{$coverUrl = "http://test-img.gsxservice.com/358098_8q6ygue7.jpeg"}}
            {{/if}}
        <div data-url="{{$course.url}}" data-number="{{$course.number}}" class="a-course-info" data-type="{{$course.type}}" {{if $course.type == 3}} data-force-url = "{{$course.force_update_url}}" {{/if}}>
        <li class="senior-course-info">
                <span class="img-background left-cover">
                    <img width="100%" height="100%" data-src="{{$coverUrl}}">
                    {{if !empty($course.fenqi)}}
                    <span class="fenqi hide" data-video="{{if $course.type == 3}}1{{else}}0{{/if}}">{{$course.fenqi.tag_name}}</span>
                    {{/if}}
                </span>
            <div class="right-info">
                <p class="type-name">
                    <span class="course-name">
                        <span class="course-type">
                            {{if $course.type == 2}}
                                {{if $course.is_online}}
                                    直播课
                                {{else}}
                                    线下班课
                                {{/if}}
                            {{elseif $course.type == 13}}
                                优选1对1
                            {{else}}
                                {{$type_name[$course.type]}}
                            {{/if}}
                        </span>
                        {{$course.name}}
                    </span>
                </p>
                <p class="price">
                    {{if !empty($course.limited_discount)}}
                        {{$price = $course.limited_discount.discount_price}}
                        {{$price_type = "秒杀价"}}
                    {{elseif isset($course.realtime_price)}}
                        {{$price = $course.realtime_price}}
                        {{$price_type = "插班价"}}
                    {{else}}
                        {{$price = $course.price}}
                        {{$price_type = ""}}
                    {{/if}}
                    <span class="current-price">
                        {{if $price > 0}}
                            {{if !empty($price_type)}}{{$price_type|cat:":"}}{{/if}}￥
                                {{$price}} {{if $course.type == 1 || $course.type == 13}}起{{/if}}
                        {{else}}
                        免费
                        {{/if}}
                    </span>
                    {{if isset($course.original_price) && $course.original_price neq 0}}
                    <span class="original-price">￥{{$course.original_price}} {{if $course.type == 1 || $course.type == 13}}起{{/if}}</span>
                    {{/if}}
                </p>
            </div>
        </li>
        </div>
        {{/foreach}}
    </ul>
    {{/if}}

    <div class="more-course">
        <a href="{{$tpl_data.base_info.course_url}}">
            <span>更多课程</span>
            <i class="icon icon-angle-right"></i>
        </a>
    </div>
</div>