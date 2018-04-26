{{*
@file 商学院（活动）
@author huangshiming
@date 2016-06-02
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "跟谁学商学院"}}
    {{$page_module = "page/activity/shangxueyuan/index/index"}}
    {{$enable_backTopButton = true}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/shangxueyuan/index/index.styl"/>
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="content"}}
    {{include file="page/_common/nav_bar/nav_bar.tpl" text="跟谁学商学院"}}

    <div class="baner-wrap">
        <div class="top-slider top-sliders-container" id="myslider">
            <ul class="slide_group clearfix">
                {{foreach $tpl_data.hot_course_banners as $item}}
                <li class="slide" data-index="{{$item@index}}">
                    <a href="{{$item.webUrl}}">
                        <img width="100%" data-src="{{$item.imgUrl}}"/>
                    </a>
                </li>
                {{/foreach}}
            </ul>
            <ul class="slide_position clearfix">
                {{foreach $tpl_data.hot_course_banners as $item}}
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

    <div>
        <img src="{{$static_origin}}/src/page/activity/shangxueyuan/image/recent-title.jpg" class="recent-title">
        <img data-src="{{$tpl_data.recent_courses.imgUrl}}" class="recent-img">
    </div>

    <div class="hot-course">
        <img src="{{$static_origin}}/src/page/activity/shangxueyuan/image/hot_course.png" class="hot-course-icon">
        <ul class="hot-course-box clearfix">
            {{foreach $tpl_data.hot_courses as $key => $item}}
            {{if $key < 4}}
            <a href="{{$item.webUrl}}?img={{$key+1}}">
                <li class="hot-course-list">
                    <img data-src="{{$item.imgUrl}}" class="hot-course-img">
                </li>
            </a>
            {{/if}}
            {{/foreach}}
        </ul>
    </div>

    <div class="good-teacher">
        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/5769270ca277c.jpg" class="good-teacher-img">
    </div>

    <div class="student-comment">
        <img src="{{$static_origin}}/src/page/activity/shangxueyuan/image/xueyuan.png" class="hot-course-icon">
        <div class="baner-wrap">
            <div class="top-slider top-sliders-container2" id="myslider2">
                <ul class="slide_group clearfix">
                {{foreach $tpl_data.student_photos as $item}}
                    <li class="slide" data-index="{{$item@index}}">
                        <img width="100%" height="100%" data-src="{{$item.imgUrl}}"/>
                    </li>
                {{/foreach}}
                </ul>
                <ul class="slide_position clearfix">
                {{foreach $tpl_data.student_photos as $item}}
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
        <div class="student-com">
            <ul>
            {{foreach $tpl_data.student_docs as $key => $item}}
            {{if $key < 2}}
            <li>
            {{else}}
            <li class="hide">
            {{/if}}
                <div class="comment-content">
                    <p>{{$item.content}}</p>
                </div>
                <div class="comment-text">
                    <span>——</span>
                    <span class="comment-name">{{$item.org}}</span>
                    <span>{{$item.name}}</span>
                </div>
            </li>
            {{/foreach}}
            </ul>
        </div>
        {{$len = $tpl_data.student_docs|count}}
        {{if $len > 2}}
        <div class="has-more">
            <p class="has-more-detail">更多评价</p>
            <img src="{{$static_origin}}/src/page/activity/shangxueyuan/image/ic_more.png" class="more-icon">
        </div>
        {{/if}}
    </div>

    <div class="coorp">
        <img src="{{$static_origin}}/src/page/activity/shangxueyuan/image/jigou.png" class="hot-course-icon">
        <ul class="jigou-list">
            {{foreach $tpl_data.cooper_partners as $item}}
            <li class="jigou-item">
                <img data-src="{{$item.imgUrl}}" class="org-icon">
            </li>
            {{/foreach}}
            {{*$len2 = $tpl_data.cooper_partners|count}}
            {{if $len2%4!=0}}
            {{$len3 = 4-$len2%4}}
            {{foreach $len3 as $item}}
            <li class="jigou-item">
                <div class="blank-coop"></div>
            </li>
            {{/foreach}}
            {{/if*}}
        </ul>
        <div class="backup">
            <p>Copyright © 2014 - 2017 北京百家互联科技有限公司版权所有</p>
            <p>京公网安备11010802015210号 | 京ICP备14027590号-1</p>
        </div>
    </div>

    {{include file="page/activity/shangxueyuan/_part/liudan.tpl"}}
    {{include file="page/activity/shangxueyuan/_part/bottom.tpl" index='1'}}
{{/block}}