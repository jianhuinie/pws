<div class="gold-home" style="background: #f8f8f8">
    {{if isset($tpl_data.rotation_img) && $tpl_data.rotation_img}}
        <div class="baner-wrap">
            <div class="top-slider top-sliders-container myslider">
                <ul class="slide_group clearfix">
                    {{foreach $tpl_data.rotation_img as $item}}
                    <li class="slide" data-index="{{$item@index}}">
                        <div data-url="{{if $item.video_url}}{{$item.video_url}}{{else}}{{$item.link}}{{/if}}" class="logClick showClick">
                            <img width="100%" height="100%" class="img" data-src="{{$item.img_url}}"/>
                        </div>
                    </li>
                    {{/foreach}}
                </ul>
                {{if count($tpl_data.rotation_img) > 1}}
                <ul class="slide_position clearfix" style="left: 10px; right: 0;">
                    {{foreach $tpl_data.rotation_img as $item index}}
                        {{if index == 0}}
                            <li class="on" style="padding: 0">
                                <span></span>
                            </li>
                        {{else}}
                            <li style="padding: 0">
                                <span></span>
                            </li>
                        {{/if}}
                        {{/foreach}}
                </ul>
                {{/if}}
            </div>
        </div>
    {{/if}}

    {{if isset($tpl_data.start_screen.content) && $tpl_data.start_screen.content}}
    <div class="screenTitle">
        <div class="showClick title line-clamp" data-url="{{$tpl_data.start_screen.web_url}}">
            {{$tpl_data.start_screen.content}}
        </div>
    </div>
    {{/if}}

    {{if isset($tpl_data.liudan) && $tpl_data.liudan}}
        <div class="liudan">
            <div class="liudan-name">{{$tpl_data.liudan.title}}</div>
            <div class="one-word">{{$tpl_data.liudan.content}}</div>

            <div class="formElement student-name">
                <input type="text" pattern="name" placeholder="上课人姓名" class="name">
            </div>

            <div class="formElement student-phone">
                <input type="mobile" pattern="mobile" placeholder="手机号，用于接收上课提醒" class="mobile" maxlength="11">
            </div>

            <div class="get">
                {{if $tpl_data.liudan.button_content}}
                    {{$tpl_data.liudan.button_content}}
                {{/if}}
            </div>
        </div>
    {{/if}}

    <!-- <div class="gold-certi">
        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/12/585b7d8f2b2ea.png" width="100%">
    </div> -->

    {{if isset($tpl_data.course) && $tpl_data.course && $tpl_data.course.total > 0}}

        <div class="course-box">
            <div class="first-nav">
                <div class="box-name">推荐课程</div>
                <div class="moreCourse" data-url="{{$tpl_data.course.more_url}}">全部课程
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/582a79d0aff23.png">
                </div>
            </div>

            <div class="course-container clearfix">
                {{foreach $tpl_data.course.list as $item}}
                <div class="item showClick" data-url="{{$item.url}}">
                    <div class="cover">
                        <img class="course-cover" data-src="{{$item.preface}}">
                        {{if $item.course_type == 3}}
                            <img class="video-icon" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/08/57a03363b7f51.png">
                        {{/if}}
                        {{if $item.tag_fenqi}}
                            <span class="fenqi">分期</span>
                        {{/if}}
                    </div>

                    <div class="course-name line-clamp line-clamp-2">
                        {{$item.name}}
                    </div>

                    <!-- <div class="third-nav">
                        {{if $item.course_type == 3}}
                            <span class="tex">即时学习</span>
                        {{/if}}

                        {{if $item.origin_price}}
                            <div class="origin-price">￥{{$item.origin_price}}
                                <div class="line"></div>
                            </div>
                        {{/if}}
                    </div> -->

                    <div class="last-nav clearfix">
                        <!-- {{if isset($item.total_pay)}}
                            {{if $item.course_type == 3}}
                                <span class="tex">{{$item.total_pay}}已观看</span>
                            {{else}}
                                <span class="tex">{{$item.total_pay}}已报名</span>
                            {{/if}}
                        {{/if}} -->

                        <div class="course-type line-clamp">{{$item.course_desc}}</div>

                        {{if $item.price > 0}}
                            <div class="price">￥{{$item.price}}</div>
                        {{else}}
                            <div class="free-price">免费</div>
                        {{/if}}
                    </div>

                </div>
                {{/foreach}}
            </div>
        </div>
    {{/if}}

    {{if isset($tpl_data.banner) && count($tpl_data.banner) > 0}}
        <div class="banner showClick" data-url="{{$tpl_data.banner.web_url}}">
            <img data-src="{{$tpl_data.banner.img_url}}">
        </div>
    {{/if}}

    {{if isset($tpl_data.video) && $tpl_data.video.total_videos > 0}}
        <div class="video-container">
            <div class="first-nav">
                <div class="box-name">介绍视频</div>
                <div class="showClick moreVideo" data-url="{{$tpl_data.video.more_url}}">更多视频
                    <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/582a79d0aff23.png">
                </div>
            </div>

            <div class="video-item showClick" data-url="{{$tpl_data.video.list[0].url}}">
                <img class="cover" data-src="{{$tpl_data.video.list[0].img}}">
                 <img class="video-icon" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/08/57a03363b7f51.png">
            </div>
        </div>
    {{/if}}

    {{if $tpl_data.hot_teacher && isset($tpl_data.hot_teacher) && $tpl_data.hot_teacher.total > 0}}
        <div class="hot-teacher">
            <div class="first-nav showClick" data-url="{{$tpl_data.hot_teacher.more_url}}">

                <span class="name">推荐老师</span>
                <span class="intoNext">
                    更多老师
                    <img class="intoIcon showClick" data-url="{{$tpl_data.hot_teacher.more_url}}" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/582a79d0aff23.png">
                </span>
            </div>

            <div class="swiper-container-2">
                <div class="swiper-wrapper swiper-container-photo-2">
                    {{foreach $tpl_data.hot_teacher.list as $item index}}
                        <div class="swiper-slide showClick" data-url="{{$item.url}}">
                            <div class="photo">
                                <img src="{{$item.avatar}}@2x_70Q_1o_100w_100h_1e_1c.src">
                            </div>
                            <div class="name line-clamp">
                                {{$item.name}}
                            </div>
                            <div class="desc line-clamp">
                                {{$item.short_introduce}}
                            </div>
                        </div>
                    {{/foreach}}
                </div>
            </div>
        </div>
    {{/if}}

    {{if isset($tpl_data.custom_area) && count($tpl_data.custom_area) > 0 && $tpl_data.custom_area[0]}}
        <div class="orgInfo">
            <div class="name">图文详情</div>
            <div class="content">{{$tpl_data.custom_area[0]}}</div>
        </div>
    {{/if}}
</div>