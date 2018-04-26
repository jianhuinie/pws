{{if data.coupon && data.coupon.total > 0}}
<div class="coupon  showClick" data-url="{{data.coupon.url}}">

    <div class="first-nav">

        <span class="name">课程优惠券</span>
        <span class="intoNext">
            全部{{data.coupon.total}}个优惠券
            <span class="intoIcon showClick" data-url="{{data.coupon.url}}">
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/582a79d0aff23.png">
            </span>
        </span>
    </div>

    <div class="coupon-content">
        {{foreach data.coupon.list as $item index}}
        {{if index < 3}}
        <div class="item">
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/581441acf0e07.png">
            <div class="coupon-ite">
                <div class="money">
                    <span class="icon">￥</span>
                    <span class="money">{{$item.value}}</span>
                </div>
                <div class="text">
                    立即领取
                </div>
            </div>
        </div>
        {{/if}}
        {{/foreach}}
    </div>

</div>
{{/if}}

{{if data.course && data.course.total > 0}}

    <div class="course">
        <div class="first-nav">
            <span class="name">机构课程</span>
        </div>

        <div class="course-content">
            {{foreach data.course.list as $item index}}
            <div class="item showClick{{if $item.course_type == 4}} isVideo{{/if}}" data-url="{{$item.url}}" {{if index == data.course.list.length - 1}}style="border-bottom:none;"{{/if}} {{if $item.course_type == 4}}data-number="{{$item.number}}"{{/if}}>
                <img data-src="{{$item.preface}}">
                <div class="name line-clamp line-clamp-2">{{$item.name}}</div>
                <div class="tag">
                    <span>{{$item.course_desc}}</span>
                </div>

                <div class="price">
                    {{if isset($item.discount) && $item.discount}}
                        秒杀价: {{$item.discount.discount_price}}
                    {{else if $item.price == 0}}
                        免费
                    {{else}}
                        ￥{{$item.price}}
                    {{/if}}
                </div>
            </div>
            {{/foreach}}
        </div>
    </div>
    <div class="more moreCourse" data-url="{{data.course.more_url}}">
            全部{{data.course.total}}门课程
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/582a79d0aff23.png">
    </div>
{{/if}}

{{if data.video && data.video.total_videos > 0}}
    <div class="baner-wrap">

        <div class="first-nav showClick" data-url="{{data.video.more_url}}">
            <span class="name">视频</span>
            <span class="intoNext">
                全部{{data.video.total_videds}}个视频
                <span class="intoIcon showClick" data-url="{{data.video.more_url}}">
                    <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/582a79d0aff23.png">
                </span>
            </span>
        </div>
        <div class="top-slider top-sliders-container" id="myslider">
            <ul class="slide_group clearfix">
                {{foreach data.video.list as $item index}}
                <li class="slide" data-index="{{index}}">
                    <div data-url="{{$item.url}}" class="logClick showClick">
                        <img width="100%" height="100%" class="img" data-src="{{$item.img}}"/>
                    </div>

                    <img data-url="{{$item.url}}" class="icon showClick" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/08/57a03363b7f51.png">
                </li>
                {{/foreach}}
            </ul>
            <ul class="slide_position clearfix">
                {{foreach data.video.list as $item index}}
                {{if index == 0}}
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

{{if data.hot_teacher && data.hot_teacher.total > 0}}
<div class="hot-teacher">
    <div class="first-nav showClick" data-url="{{data.hot_teacher.more_url}}">

        <span class="name">老师风采</span>
        <span class="intoNext">
            全部{{data.hot_teacher.total}}个老师
            <span class="intoIcon showClick" data-url="{{data.hot_teacher.more_url}}">
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/582a79d0aff23.png">
            </span>
        </span>
    </div>

    <div class="swiper-container-2">
            <div class="swiper-wrapper">
                {{foreach data.hot_teacher.list as $item index}}
                <div class="swiper-slide">
                    <div class="photo showClick" data-url="{{$item.url}}">
                        <img src="{{$item.avatar}}@2x_70Q_1o_80w_80h_1e_1c.src">
                    </div>
                    <div class="name">
                        {{$item.name}}
                    </div>
                </div>
                {{/foreach}}
            </div>
        </div>
</div>
{{/if}}
{{if data.org_info && data.org_info.content}}
    <div class="detail">
        <div class="first-nav showClick" data-url="{{data.org_info.url}}">
            <span class="name">机构介绍</span>
        </div>
        <div class="info"></div>
    </div>
    <div class="into-more showClick" data-url="data.org_info.url">
        详细图文介绍
        <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/582a79d0aff23.png">
    </div>
{{/if}}

{{if data.area.count > 0}}
    <div class="area">
        <div class="first-nav showClick" data-url="{{data.area.more_url}}">
            <span class="name">机构校区</span>
            <span class="intoNext">
                全部{{data.area.count}}个校区
                <span class="intoIcon showClick" data-url="{{data.area.more_url}}">
                    <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/582a79d0aff23.png">
                </span>
            </span>
        </div>
    </div>
{{/if}}

{{if data.comment}}
<div class="comment">
    <div class="first-nav">
        <span class="name">学员评价</span>
    </div>

    {{if data.comment.addition.total > 0}}
    <div class="content">
        {{foreach data.comment.comment_list as $item}}
        <div class="box">
        <div class="first-content">
            <div class="avatar showClick" data-url="{{$item.user.detail_url}}">
                <img data-src="{{$item.user.avatar_url}}">
            </div>

            <div class="header">
                <div class="name line-clamp">{{$item.user.display_name}}</div>
                <div class="type">
                    {{if $item.total_score > 3}}
                    <img class="face" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5816e701a135c.png">
                    {{else if $item.total_score == 2 || $item.total_score == 3 }}
                    <img class="face" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5816e7822bc2c.png">
                    {{else}}
                    <img class="face" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5816e7016db5f.png">
                    {{/if}}
                    <span class="score_desc">{{$item.total_score_desc}}</span>
                    <span class="star" data-socre="{{$item.total_score}}">

                        {{if $item.total_score == 1}}
                            <span><img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5816ee8e34109.png"></span>
                        {{else if $item.total_score == 2}}
                            <span><img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5816ee8e34109.png"></span>
                            <span><img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5816ee8e34109.png"></span>
                        {{else if $item.total_score == 3}}
                            <span><img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5816ee8e34109.png"></span>
                            <span><img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5816ee8e34109.png"></span>
                            <span><img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5816ee8e34109.png"></span>
                        {{else if $item.total_score == 4}}
                            <span><img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5816ee8e34109.png"></span>
                            <span><img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5816ee8e34109.png"></span>
                            <span><img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5816ee8e34109.png"></span>
                            <span><img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5816ee8e34109.png"></span>
                        {{else}}
                            <span><img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5816ee8e34109.png"></span>
                            <span><img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5816ee8e34109.png"></span>
                            <span><img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5816ee8e34109.png"></span>
                            <span><img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5816ee8e34109.png"></span>
                            <span><img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5816ee8e34109.png"></span>
                        {{/if}}

                    </span>
                </div>
            </div>
        </div>
        <div class="second-course">
            {{$item.course}}
        </div>

        <div class="third-content">
            {{$item.info}}
        </div>

        {{if $item.photo_list && $item.photo_list.length}}
        <div class="photots">
            {{foreach $item.photo_list as $it index}}
            <img data-src="{{$it}}" class="comment-photo" data-index="index">
            {{/foreach}}
        </div>
        {{/if}}

        <div class="last-content">
            <span class="time">
            {{$item.create_time}}
            </span>
        </div>
        {{if $item.additional && $item.additional.length > 0}}
        <div class="additional">
            {{foreach $item.additional as $it index}}
            <div class="item">
                <div class="narrow"></div>
                <div class="content">
                    {{if $it.type == 1}}
                    <div class="title">学生追评:</div>
                    {{else if $it.type == 3}}
                    <div class="title">机构回复:</div>
                    {{/if}}
                    <div class="info">
                        {{$it.info}}
                    </div>
                    <div class="time">
                        {{$it.create_time}}
                    </div>
                </div>
            </div>
            {{/foreach}}
        </div>
        {{/if}}

        </div>
        {{/foreach}}
    </div>

    <div class="more moreComment" data-url="{{data.comment.more_url}}">
            全部{{data.comment.addition.total}}个评价
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/582a79d0aff23.png">
    </div>
    {{else}}
    <div class="empty-comment">暂无评价</div>
    {{/if}}
</div>
{{/if}}

