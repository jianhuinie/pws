<div class="class-course-tags">
    {{*hurry:最近课节*}}
    {{if isset($tpl_data.recent_course)}}
        <div class="class-course-recent-course">
            <div class="desc">
                <p class="title">
                    {{$tpl_data.recent_course.status}}
                </p>
                <p class="time">
                    <span>第{{$tpl_data.recent_course.schedule}}课时</span>
                    {{$tpl_data.recent_course.time}}
                </p>
            </div>
            {{if isset($tpl_data.recent_course.button)}}
            <a href="{{$tpl_data.recent_course.button.url}}" class="float-right">
                <span class="btn analysis-habo-log" data-habo-type="{{$gsType}}" data-habo-stype="Having class">
                    {{$tpl_data.recent_course.button.text}}
                </span>
            </a>
            {{/if}}
        </div>
    {{/if}}
    {{*hurry:随时可退*}}
    {{if isset($tpl_data.course_info.tags) && $tpl_data.course_info.tags|count > 0}}
        <div class="class-course-tag analysis-habo-log" data-habo-type="{{$gsType}}" data-habo-stype="service">
            <ul class="content">
                <li>
                    <ul>
                    {{foreach $tpl_data.course_info.tags as $tag}}
                        {{if $tag@index < 3}}
                        <li>
                            <span>
                                <span class="icon-focus tag-icon-color"></span>
                                {{$tag.name}}
                            </span>
                        </li>
                        {{/if}}
                    {{/foreach}}
                    </ul>
                </li>
                <li class="more">
                    <span class="icon-chevron-thin-right"></span>
                </li>
            </ul>
        </div>
    {{/if}}
    {{*hurry:优惠券*}}
    {{if $course_info.coupon_list|count > 0}}
        <div class="class-course-coupon analysis-habo-log" data-habo-type="{{$gsType}}" data-habo-stype="coupon">
            <span>
                <span class="icon-youhuijuan icon-youhuijuan2 tag-icon-color tag-icon"></span>
                <span>领取优惠券</span>
            </span>
            <span class="float-right">
                {{foreach $course_info.coupon_list as $coupon}}
                    {{if $coupon@index < 2}}
                        <span class="coupon">
                            <!--<span class="icon-serrate"></span>
                            <span class="balance">￥{{$coupon.balance}}</span>
                            <span class="icon-serrate"></span> -->
                            ￥{{$coupon.balance}}
                        </span>
                    {{/if}}
                {{/foreach}}
                
                <span class="icon-chevron-thin-right"></span>
            </span>
        </div>
    {{/if}}
    {{*hurry:分期付款*}}
    {{if isset($course_info.fenqi)}}
        <div class="class-course-staging analysis-habo-log" data-habo-type="{{$gsType}}" data-habo-stype="instalments">
            <span>
                <span class="icon-fenqi tag-icon"></span>
                <span>分期付款</span>
            </span>
            <span class="float-right">
                <span class="text">
                    {{$course_info.fenqi.desc}}
                </span>
                <span class="icon-chevron-thin-right"></span>
            </span>
        </div>
    {{/if}}
    {{*安全卫士的课显示安全卫士icon*}}
    {{if isset($tpl_data.course_info.is_safeguard) && $tpl_data.course_info.is_safeguard==1}}
        <a href="http://m.genshuixue.com/activity/fee_safe_guard">
            <div class="safe-guard analysis-habo-log" data-habo-type="{{$gsType}}" data-habo-stype="security">
                <span>
                    <span class="icon-safe-guard tag-icon"></span><span>学费卫士</span>
                </span>
                <span class="float-right">
                    <span class="text">
                        本课程由学费卫士保障资金安全
                    </span>
                    <span class="icon-chevron-thin-right"></span>
                </span>
            </div>
        </a>
    {{/if}}
</div>