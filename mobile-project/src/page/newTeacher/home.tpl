<div class="container">
<div data-tab="home" class="home-tab tab-container">
{{if $tpl_data.coupon_info.coupon_list}}
<div class="coupon" data-stype="m_teacher_coupon">
<img class="coupon-icon" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/12/5847f67d7fcd6.png">
<span class="text">领取优惠券</span>
<div class="coupon-container">
{{foreach $tpl_data.coupon_info.coupon_list as $item}}
    {{if $item@index < 2}}
    <div class="coupon-item">
        <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/581441acf0e07.png">
        <div class="coupon-box">
            <div class="m-icon">￥</div>
            <div class="m-money">{{$item}}</div>
        </div>
    </div>
    {{/if}}
{{/foreach}}
</div>
<span class="next">
    <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/582a79d0aff23.png">
</span>
</div>
{{/if}}

{{if isset($tpl_data.selected_courses.list) && $tpl_data.selected_courses.list}}
<div class="selected-course-container">
<div class="title">精选课程</div>
{{foreach $tpl_data.selected_courses.list as $item}}
    {{$courseLen = $tpl_data.selected_courses.list|count}}
    <div class="course-item clickRevers" style="{{if $item@index == $courseLen - 1}}border-bottom: none;{{/if}}" data-url="{{$item.url}}" data-number="{{$item.number}}" data-type="{{$item.type}}" data-stype="m_teacher_recommend">
        <div class="img-container">
            <img data-src="{{$item.cover_url}}" class="course-avatar">
            {{if !empty($item.fenqi)}}
            <span class="fenqi">{{$item.fenqi.tag_name}}</span>
            {{/if}}
        </div>
        <div class="course-item-info">
        <div class="name line-clamp line-clamp-2">{{$item.name}}</div>
        {{$classType = '1对1'}}
        {{if $item.type == 2 || $item.type == 4}}
        {{$classType = '班课'}}
        {{else if $item.type == 3}}
        {{$classType = '视频课'}}
        {{else if $item.type == 13}}
        {{$classType = '优选1对1'}}
        {{/if}}

        {{$isOnline = ''}}
        {{if $item.type!=3}}
            {{if $item.type == 2 || $item.type == 4}}
                {{if $item.is_online}}
                    {{$isOnline = '线上课'}}
                {{else}}
                    {{$isOnline = '线下课'}}
                {{/if}}
            {{/if}}

            {{if $item.type == 1 || $item.type == 13}}
                {{if $item.is_online == 2 &&  $item.support_offline == 0}}
                    {{$isOnline = '仅线上授课'}}
                {{else if $item.is_online == 0 &&  $item.support_offline > 0}}
                    {{$isOnline = '仅线下授课'}}
                {{else if $item.is_online == 2 &&  $item.support_offline > 0}}
                    {{$isOnline = '可线上·线下授课'}}
                {{/if}}
            {{/if}}
        {{/if}}

        <div class="course-type"><span {{if $item.type == 13}}class="good-one2one-span"{{/if}}>{{$classType}}</span> {{if $isOnline}}| {{$isOnline}}{{/if}}</div>

        <div class="price{{if $item.type == 13}} good-one2one-price{{/if}}"
            {{if $item.price == 0}}
                style="color: #43B245"
            {{/if}}>

            {{if $item.price == 0}}
                免费
            {{else}}
                {{if isset($item.discount) && $item.discount && $item.discount.discount_price > 0}}
                    秒杀价：￥{{$item.discount.discount_price}}{{if $item.type == 1}} 起{{/if}}
                {{else}}
                    ￥{{$item.price}} {{if $item.type == 1 || $item.type == 13}}起{{/if}}
                {{/if}}
            {{/if}}
            </div>
            
        </div>
    </div>
{{/foreach}}
{{if count($tpl_data.selected_courses.list) >= 5}}
    <div class="has-more-tab has-tab" data-ctype="m_teacher_morecourse" data-type="course">查看更多课程</div>
{{/if}}
</div>
{{/if}}

<div class="base-info">
    <div class="title">基本资料</div>
    {{if $tpl_data.detail_info.location}}
    <div class="area{{if !$tpl_data.detail_info.country}} clickRevers{{/if}}" data-url="{{$tpl_data.detail_info.area_detail_url}}">
        <span class="name">上课地址</span>
        <span class="address">{{$tpl_data.detail_info.location}}</span>
        <span class="distance"></span>
        {{if !$tpl_data.detail_info.country}}
        <span class="next">
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/582a79d0aff23.png">
        </span>
        {{/if}}
    </div>
    {{/if}}

    {{if !empty($tpl_data.detail_info.certs)}}
    <div class="cert">
        <span class="name">个人认证</span>
        <div class="cert-container">
        {{foreach $tpl_data.detail_info.certs as $item}}
            <span class="cert-item">
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/12/5848f85fc3b20.png">
                {{$item}}
            </span>
        {{/foreach}}
        </div>
        <span class="next">
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/582a79d0aff23.png">
        </span>
    </div>
    {{/if}}

    {{if !empty($tpl_data.detail_info.skill)}}
    <div class="skills">
        <span class="name">老师特点</span>
        <div class="skills-container">
        {{foreach $tpl_data.detail_info.skill as $item}}
            <span class="cert-item">
                {{$item}}
            </span>
        {{/foreach}}
        </div>
        <span class="next">
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/582a79d0aff23.png">
        </span>
    </div>
    {{/if}}
</div>

{{if isset($tpl_data.base_info.introduce) && $tpl_data.base_info.introduce}}
<div class="introduce">
    <div class="title">自我介绍</div>
    <div class="introduce-container">
    {{$tpl_data.base_info.introduce}}
    </div>
</div>
{{/if}}

{{if isset($tpl_data.photos) && $tpl_data.photos}}
<div class="photo">
    <div class="first-nave">
        <div class="title">相册</div>
        <div class="more-photo has-more-tab" data-type="dynamic" data-stype="photo" data-url="/teacher/photos_ajax" data-ctype="m_teacher_morephoto">
            查看更多图片
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/582a79d0aff23.png">
        </div>
    </div>

    <div class="photo-container">
        {{foreach $tpl_data.photos as $item}}
        {{if $item@index < 4}}
        <img data-src="{{$item.img}}" data-index="{{$item@index}}" data-stype="m_teacher_photo">
        {{/if}}
        {{/foreach}}
    </div>
</div>
{{/if}}

{{if isset($tpl_data.videos) && $tpl_data.videos}}
<div class="video">
    <div class="first-nave">
        <div class="title">视频</div>
        <div class="more-photo has-more-tab" data-type="dynamic" data-stype="video" data-url="/teacher/videos_ajax" data-ctype="m_teacher_morevideo">
            查看更多视频
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/582a79d0aff23.png">
        </div>
    </div>

    <div class="top-slider top-sliders-container myslider">
            <ul class="slide_group clearfix">
                {{foreach $tpl_data.videos as $item}}
                <li class="slide" data-index="{{$item@index}}" data-stype="m_teacher_video">
                    <div data-url="{{$item.url}}" class="clickRevers">
                        <img width="100%" height="100%" class="img" data-src="{{$item.img}}"/>
                    </div>

                    <img data-url="{{$item.url}}" class="clickRevers icon" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/08/57a03363b7f51.png">
                </li>
                {{/foreach}}
            </ul>
            <ul class="slide_position clearfix">
                {{foreach $tpl_data.videos as $item}}
                {{if $item@index == 0}}
                <li class="on">
                    <span></span>
                </li>
                {{else}}
                <li>
                    <span></span>
                </li>
                {{/if}}
                {{/foreach}}
            </ul>
        </div>
</div>
{{/if}}

{{if isset($tpl_data.relation_cases) && $tpl_data.relation_cases.list}}
<div class="case">
    <div class="title">相关案例</div>
    {{foreach $tpl_data.relation_cases.list as $item}}
        <div class="case-container{{if $item@index > 1}} hide{{/if}} exp-relative-box">
            <div>{{$item.content|replace:"\n":"</br>"}}</div>
        </div>
    {{/foreach}}
    {{$relativeCount = $tpl_data.relation_cases.list|count}}
    {{if $relativeCount > 2}}
    <div class="short-icon">
        <i class="icon icon-angle-down"></i>
    </div>
    {{/if}}
</div>
{{/if}}

{{if isset($tpl_data.past_experiences) && $tpl_data.past_experiences.list}}
<div class="past_experiences">
    <div class="title">过往经历</div>
    {{foreach $tpl_data.past_experiences.list as $item}}
    <div class="experiences-container{{if $item@index > 1}} hide{{/if}} exp-relative-box">
        <div class="time">{{$item.start_date}} -- {{$item.end_date}}</div>
        <div class="info">
            {{$item.content|replace:"\n":"</br>"}}
        </div>
    </div>
    {{/foreach}}
    {{$pastExperiencesCounts = $tpl_data.past_experiences.list|count}}
    {{if $pastExperiencesCounts > 2}}
    <div class="short-icon">
        <i class="icon icon-angle-down"></i>
    </div>
    {{/if}}
</div>
{{/if}}

{{if isset($tpl_data.students_comments) && !empty($tpl_data.students_comments.list)}}
<div class="comment">
    <div class="title">学生评价</div>
    {{$score=$tpl_data.students_comments.total_score}}
    {{if $score > 0}}
    {{for $i = 1 to 5}}
        {{if $score >= $i}}
            <i class="icon icon-star_all star-shine"></i>
        {{else if $i - $score >= 0.5 && $i - $score < 1}}
            <i class="icon icon-star_all" style="color: #dcddde;"></i>
        {{else if $i - $score < 0.5}}
        <b class="star-half">
                <i class="icon icon-star_half half"></i>
                <i class="icon icon-star_all" style="color: #dcddde;"></i>
            </b>
        {{else}}
            <i class="icon icon-star_all" style="color: #dcddde;"></i>
        {{/if}}
    {{/for}}
    <span class="score">{{$score}}分</span>
    {{else}}
    <span class="empty-comment">暂无评分</span>
    {{/if}}

    {{foreach $tpl_data.students_comments.list as $item}}
    {{$commentLen = $tpl_data.students_comments.list|count}}
    <div class="comment-item" {{if $commentLen - 1  == $item@index}}style="border-bottom: none;"{{/if}}>
        <div class="first-nav">
            <img class="avatar" data-src="{{$item.student_avatar}}">
            <div class="name">{{$item.student_name}}</div>
            <div class="time">{{$item.create_time}}</div>
        </div>
        <div class="info">
            {{$item.info}}
        </div>
    </div>
    {{/foreach}}

    <div class="has-more-tab has-tab" data-type="comment" data-url="{{$tpl_data.students_comments.more_url}}" data-ctype="m_teacher_morecomment">查看{{$tpl_data.students_comments.comment_count}}条评价</div>
</div>
{{/if}}

{{if isset($tpl_data.other_info) && $tpl_data.other_info}}
<div class="other-info">
    <div class="title">更多详情</div>
    <div class="info">{{$tpl_data.other_info}}</div>
</div>
{{/if}}
</div>

<div data-tab="course" class="course-tab tab-container" style="display: none"></div>
<div data-tab="comment" class="comment-tab tab-container" style="display: none"></div>
<div data-tab="dynamic" class="dynamic-tab tab-container" style="display: none"></div>
</div>