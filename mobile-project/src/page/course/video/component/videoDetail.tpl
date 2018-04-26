{{* 课程详情 *}}
<div class="tabs class-introduce" data-tab="class-introduce">
    <div class="college-tip">
        <div class="logo">
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/57ff25fbec197.png">
        </div>
        <span class="c-title">
            跟谁学大学
        </span>
        <span class="description">
            <span class="character">互联网教育的西点军校</span>
        </span>
        <a href="javascript:void(0)" class="college-link">
            <p class="big" style="text-align:center;">点击进入</p>
            <i class="icon icon-angle-right"></i>
        </a>
    </div>
    <div class="base-info">
        <h1 class="v-title ">{{$videoCourse.name}}</h1>
        {{if !isset($tpl_data.is_juhuixue) || !$tpl_data.is_juhuixue}}
            {{$price_show = "display-show"}}
        {{else}}
            {{$price_show = "display-hidden"}}
        {{/if}}
        <div class="money-rent {{$price_show}}">
            {{if !empty($tpl_data.course.limited_discount)}}
                <span style="font-size:14px;">秒杀价:￥{{$tpl_data.course.limited_discount.discount_price}}</span>
                <span class="original"><span class="unit">￥</span>{{$videoCourse.price}}</span>
                <div class="countdown" style="font-size:14px;"></div>
            {{else}}
                {{if $videoCourse.price > 0}}
                <span class="symbol">￥</span>{{$videoCourse.price}}
                {{else}}
                免费
                {{/if}}
            {{/if}}

        </div>
        <div class="label-cps">
            {{if isset($videoCourse.cashback) && $videoCourse.cashback}}
                <div class="cps-label">
                    <span class="cps-jxj">返奖学金：￥{{$videoCourse.cashback}}</span>
                </div>
            {{/if}}

            {{if $tpl_data.is_cps==true}}
                <div class="jifen-box">
                    <span class="jifen-nav-1">上课送学分</span>
                    <span class="jifen-nav-2">支持学分抵学费</span>
                </div>
            {{/if}}
        </div>
        <ul class="course-comment">
            <li class="comment">
                {{if $tpl_data.comment_data.additional.great_rate > 0}}
                    {{round($tpl_data.comment_data.additional.great_rate)}}% 好评
                {{else}}
                    暂无评价
                {{/if}}
            </li>
            <li class="line"></li>
            <li class="study-info">{{$videoCourse.student_count}}人正在学习</li>
        </ul>
    </div>

    {{if isset($tpl_data.is_staging) && $tpl_data.is_staging == 1}}
         <div class="staging">
             {{include file="common/component/staging/nav.tpl"}}
         </div>
     {{/if}}
    {{*
    <div class="class-info" style="display: none;">
        <div class="class-name">
            {{$videoCourse.name}}
        </div>
        {{if !isset($tpl_data.is_juhuixue) || !$tpl_data.is_juhuixue}}
            {{$price_show = "display-show"}}
        {{else}}
            {{$price_show = "display-hidden"}}
        {{/if}}
        <div class="price {{$price_show}}">
            <span class="current-price">
                {{if !empty($tpl_data.course.limited_discount)}}
                <span style="font-size:14px;">秒杀价:￥{{$tpl_data.course.limited_discount.discount_price}}</span>
                <span class="original"><span class="unit">￥</span>{{$videoCourse.price}}</span>
                <div class="countdown" style="font-size:14px;"></div>
                {{else}}
                    {{if $videoCourse.price > 0}}
                <span class="symbol">￥</span>{{$videoCourse.price}}
                {{else}}
                免费
                {{/if}}
                {{/if}}

            </span>
        </div>
        <ul class="course-comment">
            <li class="comment">
                {{if $tpl_data.comment_data.additional.great_rate > 0}}
                {{round($tpl_data.comment_data.additional.great_rate)}}% 好评
                {{else}}
                暂无评价
                {{/if}}
            </li>
            <li class="line"></li>
            <li class="study-info">{{$videoCourse.student_count}}人正在学习</li>
        </ul>
    </div>
    *}}
    {{*页面来自只是视频库，则加上返回视频库的链接*}}
    {{*图片URL为固定URL，PM说不会变，所以写死了*}}
    {{if !empty($tpl_data.video_store_url)}}
         <div class="video-courses-link">
             <a href="{{$tpl_data.video_store_url}}" data-log="video-class-redirect" data-type="redirect-video-course">
                 <img width="100%" height="auto" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/04/57183eb9c4ade.jpg">
            </a>
         </div>
    {{/if}}
    {{if !empty($tpl_data.zhenti_store_url)}}
         <div class="video-courses-link">
             <a href="{{$tpl_data.zhenti_store_url}}" data-log="video-class-redirect" data-type="redirect-zhenti-course">
                 <img width="100%" height="auto" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/05/574bf4ed800e7.jpg">
            </a>
         </div>
    {{/if}}
    {{$introduceStyle = "style='display: block'"}}
    {{$catalogueStyle = "style='display: none'"}}
    {{* 试听课 *}}
    {{if !empty($tpl_data.trial_course_able)}}
    <div class="listen-course">
        {{foreach $tpl_data.trial_course_able as $trial}}
        <ul class="listen-item" data-section-id="{{$trial.section_id}}" data-number="{{$trial.section_id}}">
            <li class="item-name">{{$trial.course_name}}</li>
            <li class="item-play">
                <div>
                    <img src="https://imgs.genshuixue.com/0cms/d/file/content/2015/12/5684e697971ab.png">
                    <span class="character">免费试听</span>
                </div>
            </li>
        </ul>
        {{/foreach}}
    </div>
    {{/if}}

    {{* 课程详情 *}}
    <div class="class-detail panel">
        <h2>课程信息</h2>

        <div class="panel-block">
            <div class="introduce-panel-block">
                {{$videoCourse.introduce}}
                {{if $videoCourse.expire_hours > 0}}
                <p>
                    观看有效期：
                <span class="video-limit">
                    付款后{{ceil($videoCourse.expire_hours/24)}}天内有效
                </span>
                </p>
                {{/if}}
            </div>
        </div>
    </div>

    {{* 学生评价 *}}
    {{if isset($videoCourse.comment_count) && $videoCourse.comment_count > 0}}
    <div class="detail-class-comment panel">
        <h2>学生评价</h2>
        {{include file="../../common/component/starScore.tpl" score=$tpl_data.comment_data.additional.average}}
        <span class="comment-score">{{$tpl_data.comment_data.additional.average}}</span>
        {{if !empty($tpl_data.comment_data.additional.comment_tag)}}
        <div class="comment-tag">
            {{foreach $tpl_data.comment_data.additional.comment_tag as $tag}}
            <span class="tag">{{$tag.name}}({{if $tag.count > 999}}999+{{else}}{{$tag.count}}{{/if}})</span>
            {{/foreach}}
        </div>
        {{/if}}
        <div class="more-comment">
            查看{{$videoCourse.comment_count}}条评价
        </div>
    </div>
    {{/if}}
    {{*价值主张-平台保障*}}
    {{include file="common/course/platform-support.tpl" retire_flag = 1}}
    {{* 老师详情 *}}
    {{if !empty($videoCourse.organization)}}
    <div class="org-detail panel">
        <h2>机构详情</h2>
        <div class="org-block">
            <a href="{{$videoCourse.organization.url}}" class="avatar org-avatar">
            {{if !empty($videoCourse.organization.avatar_url)}}
            {{$avatar_url = $videoCourse.organization.avatar_url}}
            {{else}}
            {{$avatar_url = "https://imgs.genshuixue.com/75733_myznirk9.jpg"}}
            {{/if}}
            {{include file='../../common/component/image.tpl' url={{$avatar_url}} width="220" height="220"}}
        </a>
        <p class="name">
            {{$videoCourse.organization.name}}
            {{* vip 标识*}}
            {{if !empty( $tpl_data.organization.membership_level) &&  $tpl_data.organization.membership_level != 1}}
            {{* 机构vip分为1、2、3、4 4个等级，分别与老师会员的0、1、2、3相对应，因此机构的会员等级做了减1的处理*}}
            {{$vip_level =  $tpl_data.organization.membership_level - 1}}
            {{else}}
            {{$vip_level = ""}}
            {{/if}}
            {{if !empty($vip_level)}}
             <span class="teacher-vip level{{$vip_level}}">
                {{if $vip_level == 3}}
                 <img width="100%" height="auto" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5d1676.png">
                {{else if $vip_level == 2}}
                 <img width="100%" height="auto" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5aef77.png">
                {{else}}
                 <img width="100%" height="auto" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/02/56d3b6e867bb9.png">
                {{/if}}
            </span>
            {{/if}}
            {{if $videoCourse.organization.is_gold_certification == true}}
                <span class="teacher-gold">
                    <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/12/585a61ba767e1.png">
                </span>
            {{/if}}
        </p>
        <p class="intro">{{$videoCourse.organization.brief}}</p>
        </div>
    </div>
    {{else}}
    <div class="teacher-detail panel">
        <h2>老师详情</h2>
        <div class="org-block">
            <a href="{{$videoCourse.teacher.url}}" data-app="teacher|{{$videoCourse.teacher.number}}" class="avatar">
            <img width="100%" height="100%" data-src="{{$videoCourse.teacher.avatar}}">
        </a>
        <p class="name">
            {{$videoCourse.teacher.name}}
            {{* vip 标识*}}
            {{if !empty( $videoCourse.teacher.vip_level) &&  $videoCourse.teacher.vip_level != 0}}
            {{$vip_level =  $videoCourse.teacher.vip_level}}
            {{else}}
            {{$vip_level = ""}}
            {{/if}}
            {{if !empty($vip_level)}}
             <span class="teacher-vip level{{$vip_level}}">
                {{if $vip_level == 3}}
                 <img width="100%" height="auto" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5d1676.png">
                {{else if $vip_level == 2}}
                 <img width="100%" height="auto" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5aef77.png">
                {{else}}
                 <img width="100%" height="auto" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5f02d7.png">
                {{/if}}
            </span>
            {{/if}}
        </p>
        <p class="intro">{{$videoCourse.teacher.intro}}</p>
        <div class="teacher-certs">
            {{if !empty($videoCourse.teacher.age) && $videoCourse.teacher.age != -1}}
            <span class="tag">{{$videoCourse.teacher.age}}年教龄</span>
            {{/if}}
            {{if !empty($videoCourse.teacher.certs)}}
            {{foreach $videoCourse.teacher.certs as $cert}}
            <span class="tag">{{$cert}}</span>
            {{/foreach}}
            {{/if}}
        </div>
        </div>

    </div>
    {{/if}}

    {{* 相关课程 *}}
    {{if !empty($tpl_data.recommend_course)}}
    {{$type_name = ['','一对一','班课','视频课','机构班课','试听课']}}
    <div class="relative-title">相关课程</div>
    <ul class="recommend-list panel">
        {{foreach $tpl_data.recommend_course as $list}}
        {{if !empty($list.cover_url)}}
        {{$coverUrl = $list.cover_url}}
        {{else}}
        {{$coverUrl = "https://test-img.genshuixue.com/358098_8q6ygue7.jpeg"}}
        {{/if}}
        <li class="recommend-item {{if $list@index > 3}}display-none{{/if}}" data-href="{{$list.detail_url}}" data-number="{{$list.number}}" data-type="{{$list.course_type}}">
            <div class="course-cover">
                <span class="img-background">
                    <img width="100%" height="100%" data-src="{{$coverUrl}}"/>
                    {{if $list.try_flag}}
                    <span class="play-icon">
                        <i class="icon icon-play"></i>
                    </span>
                    {{/if}}
                </span>

            </div>
            <div class="item-right">
                <p class="course-name">
                    <span class="course-type">{{$type_name[$list.course_type]}}</span>
                    {{$list.course_name}}
                </p>
                <p class="course-tag">
                    {{if $list.try_flag}}
                    <span class="student-tag">免费试听</span>
                    {{/if}}
                </p>
                <p class="price-comment">



                    <span class="price{{if empty($list.price) || $list.price eq 0.0}} price-free{{/if}}">
                    {{if !empty($list.limited_discount)}}
                    <span class="symbol">秒杀价:￥</span>{{$list.limited_discount.discount_price}}
                    {{else}}
                        {{if !empty($list.price) && $list.price neq 0.0}}￥{{$list.price}}{{else}}免费{{/if}}
                    {{/if}}


                    </span>
                    {{if $list.comment_num > 0}}
                    <span class="comment">{{round($list.great_rate)}}% 好评({{$list.comment_num}})</span>
                    {{else}}
                    <span class="comment">暂无评价</span>
                    {{/if}}
                </p>
            </div>
        </li>
        {{/foreach}}

        <a href="{{$tpl_data.recommend_more_url}}" class="more-recommend-btn">
            查看更多课程
        </a>
    </ul>
    {{/if}}

    {{* 分享 *}}
    <div class="share-course">
        <div class="app-share display-none">
            <ul>
                <li class="list-share li-friends">
                    <div class="friends">
                        <img width="14" height="14"
                             src="https://imgs.genshuixue.com/0cms/d/file/content/2015/11/564b26ad93caf.png" alt=""/>
                        朋友圈
                    </div>
                </li>
                <li class="list-share li-weixin">
                    <div class="weixin">
                        <i class="icon icon-weixin"></i>微信
                    </div>

                </li>
                <li class="list-share li-qrcode">
                    <div class="qrcode">
                        <i class="icon icon-qrcode"></i>
                        二维码
                    </div>
                </li>
            </ul>
            <div class="tip">分享给小伙伴，一起进步涨知识！</div>
        </div>
        <div class="m-share display-none">
            <div class="m-qrcode">
                <i class="icon icon-qrcode"></i>二维码
            </div>
            <div class="course-id">课程ID:{{$tpl_data.course.number}}</div>
        </div>
    </div>

    <!-- {{if !empty($tpl_data.course.detail)}}
    <div class="load-detail-tip">
        点击查看图文详情
    </div>
    {{/if}}
    <div id="detail-container">
        <a name="course-detail" style="height:0"></a>
        <div class="title">
            <i class="icon icon-image-o"></i>
            课程图文详情
        </div>
        <div id="class-detail">
        </div>
    </div> -->
</div>