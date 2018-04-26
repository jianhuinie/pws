{{*
@file 组合课详情页面
@author 韩兆行
@date 16/03/21
*}}
{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$course_info = $tpl_data.course_info}}

    {{$course_detail = $course_info.course_detail}}

    {{if isset($tpl_data.favorite_info)}}
        {{if $tpl_data.favorite_info.favorite_status == 1}}
            {{$favor = 1}}
        {{else}}
            {{$favor = 0}}
        {{/if}}
    {{/if}}
    {{$voice_img = 'https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a5dcdb9fc17.png'}}
    {{$chat_img = 'https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a5dcc8be692.png'}}
    {{$favor_img = 'https://imgs.genshuixue.com/0cms/d/file/content/2015/12/5675239d770f3.png'}}
    {{$script_data.is_trial_class = false}}
    {{if !empty($course_info.course_summary.org_info)}}
        {{$org_info = $course_info.course_summary.org_info}}
        {{if $tpl_data.support_student_advisory}}
            {{$script_data.is_trial_class = true}}
        {{else}}
            {{$script_data.is_trial_class = false}}
        {{/if}}
    {{else}}
        {{$script_data.is_trial_class = true}}
    {{/if}}
    {{if isset($tpl_data.is_juhuixue) && $tpl_data.is_juhuixue == 1}}
        {{$is_jhx = 1}}
    {{else}}
        {{$is_jhx = 0}}
    {{/if}}
    {{$page_title = "组合课"}}
    {{$page_module = "page/course/comboCourse/comboCourse"}}
    {{$enable_backTopButton = true}}
{{/block}}
{{block name="data"}}
    {{$script_data.photos = $course_info.photos}}


    {{if isset($tpl_data.favorite_info)}}
        {{$script_data.favorStatus = $tpl_data.favorite_info.favorite_status}}
        {{$script_data.favor_type = $tpl_data.favorite_info.type}}
        {{$script_data.teacher_number = $tpl_data.favorite_info.number}}
    {{/if}}
    {{$script_data.teacherInfo = $course_detail.main_teacher}}
    {{$script_data.information = $tpl_data.course_info.information}}
    {{$script_data.introduction = $tpl_data.course_info.introduction}}
    {{$script_data.unfavor = 'https://imgs.genshuixue.com/0cms/d/file/content/2015/12/5675239d554c8.png'}}

    {{$script_data.share_info = json_encode($tpl_data.share_info)}}
    {{$script_data.course_type = 7}}
    {{$course_type = 7}}
    {{$script_data.class_name = $course_info.name|escape}}
    {{$script_data.classId = $course_info.number}}
    {{if !empty($course_info.course_summary.org_info)}}
        {{$script_data.tel_400 = $course_info.course_summary.org_info.extension}}
        {{$script_data.org_number = $tpl_data.course_info.course_summary.org_info.number}}
    {{/if}}
    {{$script_data.qrcodeUrl = $tpl_data.qrcode_url}}
    {{$script_data.teacherCount = $course_detail.main_teacher|count}}
    {{$script_data.favor_img = 'https://imgs.genshuixue.com/0cms/d/file/content/2015/12/5675239d770f3.png'}}
    {{$script_data.voice_img = $voice_img}}
    {{$script_data.active_voice_img = 'https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a5dcdb79aad.gif'}}
    {{*$script_data.isPreview = $tpl_data.is_preview*}}

    {{*$script_data.page_model = $course_info.template_m*}}
    {{if !empty($tpl_data.limited_discount)}}
        {{$script_data.countDownList = count($tpl_data.limited_discount)}}
        {{$script_data.start_time = $tpl_data.limited_discount.start_time}}
        {{$script_data.end_time = $tpl_data.limited_discount.end_time}}
    {{else}}
        {{$script_data.countDownList = 0}}
    {{/if}}

    {{$host = $smarty.server.HTTP_HOST}}
    {{if preg_match('/jinyou/', $host)}}
        {{$script_data.isjinyou = 1}}
    {{/if}}
{{/block}}
{{block name="style"}}
<link rel="stylesheet" href="{{$static_origin}}/src/page/course/comboCourse/comboCourse.styl"/>
{{/block}}
{{block name="content"}}
    {{if preg_match('/kaoyan/', $host)}}
        {{include file="page/_common/nav_bar/nav_bar.tpl" text="课程详情页" share_button=true}}
    {{else}}
        {{include file="page/_common/nav_bar/nav_bar.tpl" text="课程详情页"}}
    {{/if}}
<div id="main">
    {{*头部*}}
    <div class="head">
        <div class="top-sliders">
            {{if isset($course_info.photos) && $course_info.photos|count >0}}
            <ul class="slide-images">
                {{foreach $course_info.photos as $photo}}
                <li>
                    <img width="100%" height="100%" whs="1.78" data-src="{{$photo.url}}"/>
                </li>
                {{/foreach}}
            </ul>
            {{if $course_info.photos|count > 1}}
            <div class="slide-control">
                {{foreach $course_info.photos as $photo}}
                <span class="slide-position"></span>
                {{/foreach}}
            </div>
            {{/if}}
            {{/if}}
        </div>
        <div class="label">组合课</div>
        {{if $is_jhx == 1}}
        <div class="jhx">
            <img width="100%" height="100%"
            src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/568cb5148ca76.png" alt=""/>
        </div>
        {{/if}}
    </div>
    {{*课程安排*}}
    {{*课程简介*}}
    <div class="course-sum">
        {{if $is_jhx == 1}}
        <div class="jhx-price">
            <div class="left-part">
                <div class="price">
                    <span class="symbol">￥</span>
                    {{if !empty($tpl_data.limited_discount)}}
                    {{$tpl_data.limited_discount.discount_price}}
                    {{elseif !empty($course_info.chaban_price)}}
                    {{$course_info.chaban_price}}
                    {{else}}
                    {{$course_info.price}}
                    {{/if}}
                </div>
                <div class="text">
                    <div class="price-text">
                        {{if !empty($tpl_data.limited_discount)}}
                        秒杀价
                        {{elseif !empty($course_info.chaban_price)}}
                        插班价格
                        {{/if}}
                    </div>
                    <div class="enroll-num">
                        已报名
                        <span class="num">{{$course_info.course_detail.student.now}}
                        /{{$course_info.course_detail.student.max}}</span>
                    </div>
                </div>
            </div>
            <div class="right-part">
                <a href="http://ju.m.genshuixue.com">
                    <div class="tip">
                        <p class="line1">聚惠学</p>
                        <p class="line2">超值课程</p>
                    </div>
                    <div class="next-icon">
                        <i class="icon icon-angle-right"></i>
                    </div>
                </a>
            </div>
        </div>
        {{/if}}
        <div class="course-title">{{$course_info.name}}</div>
        {{if $is_jhx == 0}}
        <div class="price">
            <span class="current">
                {{if not empty($tpl_data.limited_discount)}}
                <span class="unit">秒杀价:￥</span>
                {{$tpl_data.limited_discount.discount_price}}
                {{else}}
                <span class="unit">￥</span>
                {{$course_info.price}}
                {{/if}}
            </span>
        </div>

        {{/if}}
        {{if !empty($tpl_data.limited_discount)}}
        <div class="countdown"></div>
        {{/if}}
        {{if $is_jhx == 0}}
            {{$courseCount = $tpl_data.course_info.course_count}}
            {{if isset($courseCount)}}
                <span class="student">
                    {{$courseCount}}门联报
                </span>
            {{/if}}
            {{if isset($course_detail.student.now)}}
                {{$now = $course_detail.student.now}}
                <span class="student">
                    {{if $now > 0}}
                    已报名{{$now}}人
                    {{else}}
                    暂无人报名
                    {{/if}}
                </span>
            {{/if}}
        {{/if}}
        {{* 判断是否有优惠券 *}}
        {{if !empty($course_info.coupon)}}
        {{$layout = "left-right"}}
        {{else}}
        {{$layout = "top-bottom"}}
        {{/if}}
        <ul class="main-info sub-icons">
            {{foreach $course_info.feature as $item}}
            <li>
                <div>
                    <img src="{{$item.icon}}">
                </div>
                <p>{{$item.name}}</p>
            </li>
            {{/foreach}}
        </ul>
    </div>
    {{if !empty($course_info.information) || !empty($course_info.introduction)}}
    <div class="course-info column">
        <div class="column-title">
            <span>课程信息</span>
        </div>
        {{if !empty($course_info.information)}}
        <div class="info">
            {{$course_info.information}}
        </div>
        {{/if}}
        {{if !empty($course_info.introduction)}}
        <div class="img-text-content">
            <div class="wrap">
                <div class="img-text clip">
                    <div class="img-intro">
                        {{$course_info.introduction}}
                    </div>
                </div>
                <div class="all-info">查看全部信息</div>
            </div>
        </div>
        {{/if}}
    </div>
    {{/if}}
    {{*老师信息*}}
    {{if !empty($course_detail.main_teacher)}}
    <div class="teacher-list{{if $course_detail.main_teacher|count == 1}} one{{/if}}">
        <ul class="teacher-ul">
            {{foreach $course_detail.main_teacher as $teacher}}
            <li class="teacher-item{{if $course_detail.main_teacher|count == 1}} one-teacher{{/if}}">
                <div class="column-title">
                    <span>老师介绍</span>
                </div>
                <div class="teacher-info">
                    <div class="avatar{{if $course_detail.main_teacher|count == 1}} w220{{/if}}">
                        <a href="{{$teacher.url}}">
                            <div class="img">
                                <img width="100%" height="100%"
                                src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a2315c62581.png"
                                data-src="{{$teacher.avatar}}" alt=""/>
                            </div>
                        </a>
                    </div>
                    <div class="right-col">
                        <div class="teacher-name">
                            <a href="{{$teacher.url}}">
                                <div class="name">
                                    <span class="name-wrap">{{$teacher.name}}</span>
                                    {{if empty($org_info) && $teacher.vip_level != 0}}
                                    {{if $teacher.vip_level == 1}}
                                    <span class="vip">
                                        <img width="100%" height="100%"
                                        src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5f02d7.png"
                                        alt=""/>
                                    </span>
                                    {{elseif $teacher.vip_level == 2}}
                                    <span class="vip">
                                        <img width="100%" height="100%"
                                        src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5aef77.png"
                                        alt=""/>
                                    </span>
                                    {{elseif $teacher.vip_level == 3}}
                                    <span class="vip senior">
                                        <img width="100%" height="100%"
                                        src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5d1676.png"
                                        alt=""/>
                                    </span>
                                    {{/if}}
                                    {{/if}}
                                </div>
                            </a>
                        </div>
                        {{if !empty($org_info)}}
                        <div class="org">
                            {{$org_info.name}}
                            {{if !empty($org_info.membership_level) && $org_info.membership_level != 1}}
                            <span class="org-vip">
                                {{if $org_info.membership_level == 2}}
                                <img width="100%" height="100%"
                                src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5f02d7.png"
                                alt=""/>
                                {{elseif $org_info.membership_level == 3}}
                                <img width="100%" height="100%"
                                src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5aef77.png"
                                alt=""/>
                                {{elseif $org_info.membership_level == 4}}
                                <img class="senior" width="100%" height="100%"
                                src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5d1676.png"
                                alt=""/>
                                {{/if}}
                            </span>
                            {{/if}}
                        </div>
                        {{/if}}
                        <div class="intro">{{$teacher.intro}}</div>
                        <ul class="certs">
                            <li class="school-age">
                                {{if $teacher.teach_age == -1}}
                                30年以上教龄
                                {{else}}
                                {{$teacher.teach_age}}年教龄
                                {{/if}}
                            </li>
                            {{if !empty($teacher.certs)}}
                            {{foreach from=$teacher.certs item=value}}
                            <li class="cert">{{$value}}</li>
                            {{/foreach}}
                            {{/if}}
                        </ul>
                        {{if isset($teacher.audio)}}
                            {{$minute = ($teacher.audio.audio_length / 60)|string_format:"%d"}}
                            {{$second = ($teacher.audio.audio_length mod 60)|string_format:"%d"}}
                            <div class="audio-icon" data-url="{{$teacher.audio.url}}"
                                data-len="{{$teacher.audio.audio_length}}">
                                <img class="static" width="100%" height="100%" src="{{$voice_img}}" alt=""/>
                                <span class="audio-long">
                                    <span class="minute">{{$minute}}</span>:
                                    <span class="second">{{$second}}</span>
                                </span>
                            </div>
                        {{/if}}
                    </div>
                </div>
            </li>
            {{/foreach}}
        </ul>
    </div>
    {{/if}}
    {{*课程安排*}}
    <div class="arrangement column">
        <div class="column-title">
            <span>课程安排</span>
        </div>
        <div class="class-items">
            {{$course_items = $course_info.course_detail.course_items}}
            <ul class="classes-count">
                {{*1-一对一 2-直播课/线下班课 3-视频课*}}
                {{$ctype[1] = "一对一"}}
                {{$ctype[2] = "直播课"}}
                {{$ctype[3] = "视频课"}}
                {{foreach $course_items as $cItem}}
                    <li class="item">
                        <a href="{{$cItem.url}}">
                            <div class="class-info">
                                {{*只有一对一课不包含展开选项*}}
                                {{if $cItem.course_type != 1}}
                                    <div class="show-class-detail">
                                        <div class="arrow-down"></div>
                                    </div>
                                {{/if}}
                                <div class="class-title single-line">
                                    {{if $cItem.course_type==2}}
                                        {{if $cItem.address!=""}}
                                            <span class="flag">线下班课</span>
                                        {{else}}
                                        <span class="flag">直播课</span>
                                        {{/if}}
                                    {{else}}
                                        <span class="flag">{{$ctype[$cItem.course_type]}}</span>
                                    {{/if}}
                                    <span>{{$cItem.name}}</span>
                                </div>
                                <p>{{$cItem.sub_info}}</p>
                                {{if isset($cItem.address)}}
                                    <p>{{$cItem.address}}</p>
                                {{/if}}
                            </div>
                        </a>
                        {{if isset($cItem.plan)}}
                            <div class="class-detail" id="class-detail-{{$cItem@index}}">
                                <ul>
                                    {{foreach $cItem.plan as $cplan}}
                                        <li>
                                            <p class="single-line">{{$cplan.title}}</p>
                                            {{if isset($cplan.content)}}
                                                <p class="single-line">{{$cplan.content}}</p>
                                            {{/if}}
                                        </li>
                                    {{/foreach}}
                                </ul>
                            </div>
                        {{/if}}
                    </li>
                {{/foreach}}
            </ul>
        </div>
    </div>

    {{*资料下载*}}
    {{if isset($course_info.document_download.documents)}}
    <div class="download-document column">
        <div class="column-title">
            <span>资料下载</span>
        </div>

            <ul class="download-item">
                {{foreach $course_info.document_download.documents as $cDtext}}
                    <li>{{$cDtext@index+1}}、{{$cDtext}}</li>
                {{/foreach}}
            </ul>

        <div >
            <a class="new-download-btn btn-download download-btn" android-key="{{$course_info.document_download.qq_info.number}}" url="{{$course_info.document_download.qq_info.link}}">下载资料</a>
        </div>
    </div>
    {{/if}}

    {{*分享*}}
    <div class="share">
        <div class="app-qrCode">
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
                        <i class="icon icon-wechat"></i>微信
                    </div>
                </li>
                <li class="list-share li-qrcode">
                    <div class="qrcode">
                        <i class="icon icon-qrcode"></i>
                        二维码
                    </div>
                </li>
            </ul>

            <div class="course-id">课程ID:{{$tpl_data.course_id}}</div>
        </div>
        <div class="m-qrcode-share">
            <div class="m-qrcode">
                <i class="icon icon-qrcode"></i>二维码
            </div>
            <div class="course-id">课程ID:{{$tpl_data.course_id}}</div>
        </div>
    </div>
    <div class="bottom bottom-class-vip">
        {{if preg_match('/kaoyan/', $host)}}
            <div class="bottom-item bottom-item-download">
                <a class="btn-download" href="http://kaoyan.m.genshuixue.com/download/kaoyan">
                    下载APP
                </a>
            </div>
        {{/if}}
        {{if preg_match('/jinyou/', $host)}}
            <div class="bottom-item bottom-item-download">
                <a class="btn-download" href="http://jinyou.m.genshuixue.com/download/jinyou">
                    下载APP
                </a>
            </div>
        {{/if}}

        {{if preg_match('/jinyou/', $host)}}
            <div class="bottom-item item-class-vip bottom-item-advisory">
                <a class="btn-download btn-appoint words btn-appoint-orange" href="tel:02164780375">
                    咨询
                </a>
            </div>
        {{else}}
            {{if !empty($course_info.document_download.qq_info.link)}}
                <div class="bottom-item item-class-vip bottom-item-advisory">
                    <a class="btn-download btn-appoint words btn-appoint-orange" android-key="{{$course_info.document_download.qq_info.number}}" url="{{$course_info.document_download.qq_info.link}}">
                        咨询
                    </a>
                    <!-- <button phone="{{$course_info.telephone}}" class="btn-appoint btn-appoint-advisory btn-appoint-orange  words ">
                        咨询
                    </button> -->
                </div>
            {{/if}}
        {{/if}}
        {{$btn[0] = ['已完结', 'grey', '', 'btn-disabled']}}
        {{$btn[1] = ['已报名', 'grey', '', 'btn-disabled']}}
        {{$btn[2] = ['立即报名', 'sign-up enrolling-orange', $tpl_data.buy_url, 'btn-enrolling']}}
        {{$btn[3] = ['已报名', 'grey', '', 'btn-disabled']}}
        {{$btn[4] = ['已满班', 'grey', '', 'btn-disabled']}}
        {{$curBtn = $btn[$tpl_data.status]}}

        <div class="bottom-item item-class-vip bottom-item-signup">
            <button id="{{$curBtn[3]}}" class="sign-up {{$curBtn[1]}}" data-course-number="160112883986" data-spread_id="" data-url="{{$curBtn[2]}}" data-ismobile="1">
                {{$curBtn[0]}}
            </button>
        </div>
    </div>
</div>

<div class="qrcode-container">
    <div class="mask">
    </div>
    <div class="front">
        <i class="icon icon-close cancel"></i>
        <div class="label-group">
            <label>课程名称：</label>
            <p>{{$tpl_data.course_info.name}}</p>
        </div>
        <div id="qrcode">
        </div>
        <p class="hint">可通过扫描二维码打开课程详情页</p>
    </div>
</div>

{{/block}}