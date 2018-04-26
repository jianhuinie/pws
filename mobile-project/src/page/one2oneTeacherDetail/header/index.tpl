{{$base_info = $queryOneOnOneCourse.teacher}}
<section class="avatar-mask">
    <img data-src="">
</section>
<section class="base-info-box">
    <div class="avatar">
        <img class="avatar-index retina" data-src="{{$base_info.avatar_url}}">
        <div class="tag">优选</div>
    </div>

    <div class="box">
        <div class="header-line">
            <span class="name">{{$base_info.display_name}}</span>
            {{if $base_info.sex === 'MALE'}}
                <i class="icon icon-ic_male"></i>
            {{else}}
                <i class="icon icon-ic_female"></i>
            {{/if}}

            {{*if isset($queryOneOnOneCourse.teach_length_hours) && $queryOneOnOneCourse.teach_length_hours < 5}}
            <span class="new-in">新入驻</span>
            {{/if*}}
        </div>

        <div class="second-line short-introduce line-clamp">
            {{$base_info.short_introduce}}
        </div>

        <div class="third-line display_price">
            ￥{{$queryOneOnOneCourse.price_range.min|string_format:"%d"}}
            {{if $queryOneOnOneCourse.price_range.min != $queryOneOnOneCourse.price_range.max}}
                -
                ￥{{$queryOneOnOneCourse.price_range.max|string_format:"%d"}}
            {{/if}}
            /小时
        </div>

        {{$comment_addition = $tpl_data.comment_summary}}
        {{if $comment_addition.count > 0}}
        <div class="last-line">
            <span class="stars clearfix" data-scores="{{$comment_addition.score}}"></span>
            <span class="number">({{$comment_addition.count}})</span>
        </div>
        {{/if}}
    </div>
</section>

<section class="databus">

    {{if isset($base_info.display_school_age)}}
        <div class="item">
            {{if $base_info.display_school_age > 30}}
            <div class="text">30+</div>
            {{else }}
            <div class="text">{{$base_info.display_school_age}}</div>
            {{/if}}
            <div class="text-r">老师教龄</div>
        </div>
        <div class="line"></div>
    {{/if}}

    {{if isset($queryOneOnOneCourse.student_count)}}
        <div class="item">
            <div class="text">{{$queryOneOnOneCourse.student_count}}</div>
            <div class="text-r">学生数</div>
        </div>
        <div class="line"></div>
   {{/if}}

   {{if isset($queryOneOnOneCourse.teach_length_hours)}}
        <div class="item">
            <div class="text">{{$queryOneOnOneCourse.teach_length_hours}}</div>
            <div class="text-r">教学时长</div>
        </div>
        <div class="line"></div>
   {{/if}}

   {{if isset($comment_addition.favorable_count)}}
        <div class="item">
                <div class="text">{{$comment_addition.favorable_count}}</div>
                <div class="text-r">好评数</div>
        </div>
   {{/if}}
</section>

<div class="cross-line"></div>

{{$ensures = ['平台优选', '资金保障', '随时可退', '分期支付']}}
<section class="platform-ensure analysis-habo-log" 
        data-habo-type="YouXuan_Service" 
        data-habo-stype="YouXuan_Service_Up">
    <div class="info">
        {{foreach $ensures as $item}}
            <span class="item">
                <i class="icon icon-focus"></i>
                <span class="text">{{$item}}</span>
            </span>
        {{/foreach}}
    </div>

    <span class="next">
        <i class="icon icon-chevron-thin-right"></i>
    </span>
</section>