<div class="course-sum">
    {{$price_origin_target = $course_info.price}}
    {{$target_price = $course_info.price}}
    <div class="course-title">{{$course_info.name}}</div>

    <div class="label-cps">
        {{if isset($tpl_data.course_info.cashback) && $tpl_data.course_info.cashback}}
            <div class="cps-label">
                <span class="cps-jxj">返奖学金：￥{{$tpl_data.course_info.cashback}}</span>
            </div>
        {{/if}}
        <!--hurry: cps已下线-->
        <!--
        {{if isset($tpl_data.is_cps) && $tpl_data.is_cps==true}}
            <div class="jifen-box">
                <span class="jifen-nav-1">上课送学分</span>
                <span class="jifen-nav-2">支持学分抵学费</span>
            </div>
        {{/if}}
        -->
    </div>
    {{if $is_jhx == 1}}
        <br>
    {{/if}}
    {{if $is_jhx == 0}}
        <div class="price">
            <span class="current">
            {{$target_desc = "￥"}}
            {{if not empty($tpl_data.course_info.discount)}}
                {{$target_desc = "秒杀价:￥"}}
                {{$target_price = $tpl_data.course_info.discount.discount_price}}
            {{elseif isset($course_info.chaban_price)}}
                {{$target_desc = "插班价:￥"}}
                {{$target_price = $course_info.chaban_price}}
            {{/if}}

            {{if $target_price == '0.00'}}
            免费
            {{else}}
            <span class="unit">{{$target_desc}}</span>{{$target_price}}
            {{/if}}
            </span>
            {{if !empty($course_info.original_price) || !empty($course_info.price)}}
                <span class="original"><span class="unit">￥</span>
                {{if !empty($course_info.original_price) && $course_info.original_price}}
                    {{if not empty($course_info.discount)}}
                        {{if $course_info.chaban_price == null}}
                            {{$course_info.price|string_format:'%.2f'}}
                        {{else}}
                            {{$course_info.chaban_price|string_format:'%.2f'}}
                        {{/if}}
                    {{else}}
                        {{$course_info.original_price}}
                    {{/if}}
                {{else}}
                    {{if $course_info.chaban_price && !empty($course_info.chaban_price)}}
                        {{$course_info.chaban_price}}
                    {{else}}
                        {{$course_info.price}}
                    {{/if}}
                {{/if}}</span>
            {{/if}}
        </div>
    {{/if}}
    
    {{$script_data.target_price = $target_price}}
    {{$script_data.price_origin_target = $price_origin_target}}
    {{if !empty($course_info.discount) && $course_info.discount.type == 2}}
        <div class="countdown"></div>
    {{/if}}
    {{if !empty($course_info.discount) && $course_info.discount.type == 1}}
        <div class="amount-discount">
            <i class="icon icon-shijian"></i>
            <span>剩余<span style="color: red;">{{$course_info.discount.remain_amount}}</span>个优惠名额</span>
        </div>
    {{/if}}
    {{if $is_jhx == 0}}
        {{if !empty($course_info.min_student)}}
            <div class="student">
                {{if $course_info.total_pay < $course_info.min_student}}
                    班级人数{{$course_info.max_student}}人，已报名{{$course_info.total_pay}}人，{{$course_info.min_student}}人起开班
                {{else}}
                    班级人数{{$course_info.max_student}}人，已报名{{$course_info.total_pay}}人
                {{/if}}
            </div>
        {{/if}}
    {{/if}}
    {{$layout = "top-bottom"}}
    <ul class="main-info">
        {{*开课信息*}}
        <li class="open open-{{$layout}}">
            <div class="inner-content">
                <div class="open-img img">
                    <span class="icon icon-shijian"></span>
                </div>
                <div class="title">{{$course_info.begin_time}}开课</div>
                <div class="text">共{{$course_info.schedule_count}}节</div>
            </div>
        </li>
        {{*位置*}}
        {{if $lesson_way.way == 4}}
        <li class="address address-{{$layout}}">
            <div class="inner-content ">
                <div class="address-icon img">
                    <span class="icon icon-ditu"></span>
                </div>
                <div class="title">
                    {{if !empty($lesson_way.area_name)}}
                    {{$lesson_way.area_name}}
                    {{else}}
                    暂无地址
                    {{/if}}
                </div>
                <div class="text">
                </div>
            </div>
        </li>
        {{else}}
            <li class="online online-{{$layout}}">
                <div class="inner-content">
                    <div class="online-img img">
                        <span class="icon icon-diannian"></span>
                    </div>
                    <div class="title">在线授课</div>
                    <div class="text">支持手机观看</div>
                </div>
            </li>
        {{/if}}
        {{*评价数*}}
        <li class="comment comment-{{$layout}}">
            <div class="inner-content">
                <div class="comment-icon img">
                    <span class="icon icon-xiaolian"></span>
                </div>
                {{if !empty($comment.comment_list) && $comment.comment_number>0}}
                    <div class="title">
                        {{if $comment.user_comment_number != 0}}
                        {{$comment.great_percent}}%好评
                        {{else}}
                        {{$comment.comment_number}}条邀请评价
                        {{/if}}
                    </div>
                    {{if $comment.user_comment_number != 0}}
                    <div class="text">{{$comment.comment_number}}条</div>
                    {{/if}}
                {{else}}
                <div class="title">暂无评价</div>
                {{/if}}
            </div>
        </li>
    </ul>
</div>