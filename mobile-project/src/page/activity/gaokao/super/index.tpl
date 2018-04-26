{{*
@file 高考首页（活动）超级专家落地页
@author huangshiming
@date 2016-05-16
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = "超级专家"}}
    {{$page_module = "page/activity/gaokao/super/index"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}


{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/gaokao/super/index.styl"/>
{{/block}}

{{block name="content"}}
    {{include file="page/_common/nav_bar/nav_bar.tpl" text="超级专家"}}

    <section class="super">
        <span><h2>即将进行</h2></span>
        <ul class="super-list">
            {{foreach $tpl_data.teachers.online as $key => $item}}
            {{if $key < 3}}
                <li class="super-card">
                     <a href="{{$item.detail_url}}">
                        <i class="orange-icon">
                        </i>
                        {{$schedule = $item.class_date|cat:" "|cat:$item.class_time}}
                        <p class="super-date">{{$schedule}}
                            {{if isset($item.is_hot_teacher) && $item.is_hot_teacher == true}}
                                <img src="{{$static_origin}}/src/page/activity/gaokao/image/hot-icon.png" class="hot-teachers-icon">
                            {{/if}}
                        </p>
                        <img data-src="{{$item.teacher.avatar}}" class="super-avatar">
                        {{$display_name = $item.teacher.display_name|cn_truncate:6}}
                        <p class="super-name">{{$display_name}}</p>
                        <div class="super-text">
                            {{$item.course_name = $item.course_name|cn_truncate:20}}
                            <h1>{{$item.course_name}}</h1>
                            {{$item.information = $item.information|cn_truncate:40}}
                            <p>{{$item.information}}</p>
                        </div>
                        {{if $item.has_buy == false}}
                        <div class="super-button-unpay">
                            免费报名
                        </div>
                        {{else}}
                        <div class="super-button-haspay">
                            已报名
                        </div>
                        {{/if}}
                    </a>
                </li>
            {{else}}
                <li class="super-card hide">
                     <a href="{{$item.detail_url}}">
                        <i class="orange-icon">
                        </i>
                        {{$schedule = $item.class_date|cat:" "|cat:$item.class_time}}
                        <p class="super-date">{{$schedule}}</p>
                        <img data-src="{{$item.teacher.avatar}}" class="super-avatar">
                        {{$display_name = $item.teacher.display_name|cn_truncate:6}}
                        <p class="super-name">{{$display_name}}</p>
                        <div class="super-text">
                            {{$item.course_name = $item.course_name|cn_truncate:20}}
                            <h1>{{$item.course_name}}</h1>
                            {{$item.information = $item.information|cn_truncate:40}}
                            <p>{{$item.information}}</p>
                        </div>
                        {{if $item.has_buy == false}}
                        <div class="super-button-unpay">
                            免费报名
                        </div>
                        {{else}}
                        <div class="super-button-haspay">
                            已报名
                        </div>
                        {{/if}}
                    </a>
                </li>
            {{/if}}
            {{/foreach}}
        </ul>
        {{$length = $tpl_data.teachers.online|count}}
        {{if $length > 3}}
        <div class="has_more">
            <span><p>查看全部课程</p></span>
            <span><img src="{{$static_origin}}/src/page/activity/gaokao/image/bottom-icon.png" class="bottom-icon"></span>
        </div>
        {{/if}}
    </section>

    <section class="super back-review">
        <span><h2>往期回顾</h2></span>
        <ul class="super-list">
            {{foreach $tpl_data.teachers.video as $key => $item}}
            {{if $key < 3}}
                <li class="super-card-2">
                     <a class="video-course" data-href="{{$item.detail_url}}" data-number="{{$item.course_number}}" data-appnojump="true">
                        <i class="orange-icon">
                        </i>
                        {{$schedule = $item.class_date|cat:" "|cat:$item.class_time}}
                        <p class="super-date">{{$schedule}}</p>
                        <img data-src="{{$item.teacher.avatar}}" class="super-avatar">
                        {{$display_name = $item.teacher.display_name|cn_truncate:6}}
                        <p class="super-name">{{$display_name}}</p>
                        <div class="super-text">
                            {{$item.course_name = $item.course_name|cn_truncate:20}}
                            <h1>{{$item.course_name}}</h1>
                            {{$item.information = $item.information|cn_truncate:40}}
                            <p>{{$item.information}}</p>
                        </div>
                        <div class="super-button-video">
                            观看回放
                        </div>
                    </a>
                </li>
            {{else}}
                <li class="super-card-2 hide">
                     <a class="video-course" data-href="{{$item.detail_url}}" data-number="{{$item.course_number}}" data-appnojump="true">
                        <i class="orange-icon">
                        </i>
                        {{$schedule = $item.class_date|cat:" "|cat:$item.class_time}}
                        <p class="super-date">{{$schedule}}</p>
                        <img data-src="{{$item.teacher.avatar}}" class="super-avatar">
                        {{$display_name = $item.teacher.display_name|cn_truncate:6}}
                        <p class="super-name">{{$display_name}}</p>
                        <div class="super-text">
                            {{$item.course_name = $item.course_name|cn_truncate:20}}
                            <h1>{{$item.course_name}}</h1>
                            {{$item.information = $item.information|cn_truncate:40}}
                            <p>{{$item.information}}</p>
                        </div>
                        <div class="super-button-video">
                            观看回放
                        </div>
                    </a>
                </li>
            {{/if}}
            {{/foreach}}
        </ul>
        {{$length = $tpl_data.teachers.video|count}}
        {{if $length > 3}}
        <div class="has_more-2">
            <span><p>查看全部课程</p></span>
            <span><img src="{{$static_origin}}/src/page/activity/gaokao/image/bottom-icon.png" class="bottom-icon"></span>
        </div>
        {{/if}}
    </section>

    <section class="share-infos">
        <p>这么好的专题，我得赶紧分享给小伙伴们!</p>
        <div class="share-button"><p>分享给小伙伴</p></div>
    </section>
    {{* 微信分享页面遮罩层 *}}
    <div class="share-mask">
        <div class="content">
            <img width="100%" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e91f33723af.png"/>
        </div>
    </div>

    {{include file="page/activity/gaokao/_part/index.tpl"}}
{{/block}}