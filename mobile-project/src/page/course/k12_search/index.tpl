
{{extends file="page/_base/base.tpl"}}
{{block name="page"}}

    {{$area="bj"}}
    {{if isset($ext_data.curr_city) && !empty($ext_data.curr_city.domain)}}
    {{$area = $ext_data.curr_city.domain}}
    {{/if}}

    {{if empty($smarty.get.grade)}}
        {{$grade=''}}
    {{else}}
        {{$grade=($smarty.get.grade|escape:'url')}}
    {{/if}}

    {{$grade_value=''}}
    {{if $grade=='gaozhong'}}
        {{$grade_value='高中'}}
    {{/if}}
    {{if $grade=='chuzhong'}}
        {{$grade_value='初中'}}
    {{/if}}

    {{if $grade=='xiaoxue'}}
        {{$grade_value='小学'}}
    {{/if}}

    {{$isShare = false}}
    {{if isset($smarty.get.s) && $smarty.get.s=='share'}}
        {{$isShare=true}}
    {{/if}}

    {{$search_button="/{{$area}}/sc-.html{{if $isShare}}?s=share{{/if}}"}}

    {{$page_title = $grade_value}}
    {{$page_module = "page/course/k12_search/index"}}
    {{$enable_backTopButton = true}}

{{/block}}

{{block name="data"}}
    {{$script_data.grade = $grade_value}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/course/k12_search/css/index.styl"/>
{{/block}}

{{block name="content"}}

    {{include file="page/_common/nav_bar/nav_bar.tpl" text={{$grade_value}}}}
    {{include file="page/course/k12_search/_part/classfix_nav.tpl" area={{$area}} isShare={{$isShare}}}}
    <div class="baner-wrap bottom">
        <div class="top-slider top-sliders-container" id="myslider">
            <ul class="slide_group clearfix">
                {{foreach $tpl_data.lunbo as $item}}
                <li class="slide" data-index="{{$item@index}}">
                    <a href="{{$item.webUrl}}" class="logClick" data-ctype="1" data-cname="k12_banner">
                        <img width="100%" height="100%" data-src="{{$item.imgUrl}}"/>
                    </a>
                </li>
                {{/foreach}}
            </ul>
            <ul class="slide_position clearfix">
                {{foreach $tpl_data.lunbo as $item}}
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


    {{if isset($tpl_data.mrtj) && $tpl_data.mrtj}}
    {{include file="page/course/component/dayGood/index.tpl" text="每日精选" sub="为您精选最优课程" course_list=$tpl_data.mrtj}}
    {{/if}}

    {{if isset($tpl_data.whk) && $tpl_data.whk}}
    {{include file="page/course/component/courseCard/course_card.tpl" text="优质文化课" sub="数学、语文、英语" course_list=$tpl_data.whk ctype=1}}
    {{/if}}

    {{if isset($tpl_data.jyz) && $tpl_data.jyz}}
    {{include file="page/course/component/courseCard/course_card.tpl" text="课外加油站" sub="小学课外拓展课程、赢在起跑线" course_list=$tpl_data.jyz ctype=3}}
    {{/if}}

    {{if isset($tpl_data.math) && $tpl_data.math}}
        {{if $grade == 'xiaoxue'}}
    {{include file="page/course/component/courseCard/course_card.tpl" text="数学" sub="精选小学优质课程" course_list=$tpl_data.math ctype=1}}
        {{else}}
    {{include file="page/course/component/courseCard/course_card.tpl" text="数学" sub="精选最优数学课程" course_list=$tpl_data.math ctype=1}}
        {{/if}}
    {{/if}}

    {{if isset($tpl_data.english) && $tpl_data.english}}
    {{include file="page/course/component/courseCard/course_card.tpl" text="英语" sub="精选最优英语课程" course_list=$tpl_data.english ctype=3}}
    {{/if}}

    {{if isset($tpl_data.chinese) && $tpl_data.chinese}}
    {{include file="page/course/component/courseCard/course_card.tpl" text="语文" sub="精选最优语文课程" course_list=$tpl_data.chinese ctype=5}}
    {{/if}}


    {{if isset($tpl_data.science) && $tpl_data.science}}
    {{include file="page/course/component/courseCard/course_card.tpl" text="理综" sub="物理、化学、生物" course_list=$tpl_data.science ctype=7}}
    {{/if}}

    {{if isset($tpl_data.literature) && $tpl_data.literature}}
    {{include file="page/course/component/courseCard/course_card.tpl" text="文综" sub="历史、地理、政治" course_list=$tpl_data.literature ctype=9}}
    {{/if}}

    {{if isset($tpl_data.wuhua) && $tpl_data.wuhua}}
    {{include file="page/course/component/courseCard/course_card.tpl" text="物化" sub="物理、化学" course_list=$tpl_data.wuhua ctype=7}}
    {{/if}}

    {{if isset($tpl_data.xingainian) && $tpl_data.xingainian}}
    {{include file="page/course/component/courseCard/course_card.tpl" text="新概念英语" sub="听说读写成绩提升" course_list=$tpl_data.xingainian ctype=7}}
    {{/if}}

    {{if isset($tpl_data.memory) && $tpl_data.memory}}
    {{include file="page/course/component/courseCard/course_card.tpl" text="记忆力" sub="深度理解益智开发" course_list=$tpl_data.memory ctype=9}}
    {{/if}}

    {{if isset($tpl_data.home_education) && $tpl_data.home_education}}
    {{include file="page/course/component/courseCard/course_card.tpl" text="家庭教育" sub="亲子沟通爸妈充电" course_list=$tpl_data.home_education ctype=11}}
    {{/if}}

    {{if isset($tpl_data.seyt) && $tpl_data.seyt}}
    {{include file="page/course/component/courseCard/course_card.tpl" text="少儿艺体" sub="培养爱好与兴趣、全面发展" course_list=$tpl_data.seyt ctype=5}}
    {{/if}}

    {{if isset($tpl_data.yxms)}}
        {{$teacher = $tpl_data.yxms.teacher}}
        <div class="block sel-teacher bottom">
            <div class="start-title">
                    <span class="icon-star_all block-line">
                        <span class="line"></span>
                        <span class="line line-sub"></span>
                    </span>
                    <div class="title">优选名师</div>
                    <span class="icon-star_all block-line block-line-right">
                        <span class="line"></span>
                        <span class="line line-sub"></span>
                    </span>
                <div class="start-title-sub">专家名师阵容，为您严选，助学事半功倍</div>
            </div>
            <a class="sel-teacher-content logClick" data-ctype="1" data-cname="k12_teacher" href="{{$teacher.top.url}}">
                <div class="avatar">
                    <img data-src="{{$teacher.top.avatar}}" />
                </div>
                {{if $grade == 'xiaoxue'}}
                <div class="sel-teacher-text" style="border-color: #FF9100;">
                {{else}}
                <div class="sel-teacher-text">
                {{/if}}
                    <div class="label-text single-line">
                        {{if $grade=='xiaoxue'}}
                        <span class="name" style="color: #FF9100;">
                        {{else}}
                        <span class="name">
                        {{/if}}
                            {{$teacher.top.name}}
                        </span>
                        {{$teacher.top.subject}}/
                        {{if $teacher.top.school_age == -1}}
                        30年以上教龄
                        {{else}}
                        {{$teacher.top.school_age}}年教龄
                        {{/if}}
                    </div>
                    <div class="describe line-clamp line-clamp-3">{{$teacher.top.desc}}</div>
                </div>
            </a>
            {{if isset($teacher.list) && $teacher.list|count}}
                <div class="land-list">
                    <div class="list-container">
                        <div class="list">
                            {{foreach $teacher.list as $item}}
                                <a href="{{$item.url}}" class="logClick" data-ctype="2" data-cname="k12_teacher">
                                    <div class="avatar">
                                        <img data-src="{{$item.avatar}}" />
                                    </div>
                                    <div class="name line-clamp">{{$item.name}}</div>
                                    <div class="sel-teacher-text line-clamp">
                                        {{$item.subject}}
                                        {{if $item.school_age == -1}}
                                        30年以上教龄
                                        {{else}}
                                        {{$item.school_age}}年教龄
                                        {{/if}}
                                    </div>
                                </a>
                            {{/foreach}}
                        </div>
                    </div>
                </div>
                {{if $grade=='xiaoxue'}}
                <a class="label-text more logClick" data-ctype="3" data-cname="k12_teacher" href="/k12/choseBetterTeacher?grade={{$grade}}&catname=all{{if $isShare}}&s=share{{/if}}"  style="color:#ff9100;">
                {{else}}
                <a class="label-text more logClick" data-ctype="3" data-cname="k12_teacher" href="/k12/choseBetterTeacher?grade={{$grade}}&catname=all{{if $isShare}}&s=share{{/if}}">
                {{/if}}
                    更多老师></a>
            {{/if}}
        </div>
    {{/if}}

    {{if isset($tpl_data.org) && $tpl_data.org}}
    {{include file="page/course/component/nearbyOrg/org.tpl" text="附近机构" sub="为你推荐最优质的机构" org_list=$tpl_data.org}}
    {{/if}}

    {{if isset($tpl_data.zsdjj)}}
        {{$xueke=$tpl_data.zsdjj.xueke}}
        {{$data=$tpl_data.zsdjj.data}}
        <div class="block bottom knowledge">
            <div class="start-title">
                    <span class="icon-star_all block-line">
                        <span class="line"></span>
                        <span class="line line-sub"></span>
                    </span>
                <div class="title">知识视频库</div>
                    <span class="icon-star_all block-line block-line-right">
                        <span class="line"></span>
                        <span class="line line-sub"></span>
                    </span>
                <div class="start-title-sub">涵盖所有知识点的精讲视频，10分钟攻克一个考点</div>
            </div>
            <ul class="panel clearfix">
                {{foreach $xueke as $item}}
                    {{if !($item.name == '语文' && $grade=='xiaoxue')}}
                    <li>
                        <div class="item" style="background-color: #{{$item.bg_color}}">
                            <a href="{{$item.url}}" class="logClick" data-ctype="1" data-cname="k12_knowledge">
                                {{if $grade == 'xiaoxue'}}
                                <div class="name" style="height:40px; line-height: 40px;">{{$item.name}}</div>
                                {{else}}
                                <div class="name">{{$item.name}}</div>
                                {{/if}}


                                {{if $grade=='gaozhong' || $grade=='chuzhong'}}
                                <div class="num">{{$item.num}}个知识点</div>
                                {{/if}}
                            </a>
                        </div>
                    </li>
                    {{/if}}
                {{/foreach}}
            </ul>
            {{if !empty($data.list)}}
                <div class="suggest-list">
                    <div class="title">今日推荐：<span class="label-text">{{$data.class_name}}</span></div>
                    <ul class="clearfix panel">
                        {{foreach $data.list as $item}}
                            <li>
                                <div class="item">
                                    <a href="{{$item.url}}" class="logClick" data-ctype="2" data-cname="k12_knowledge" data-jockey='urlSchemeRoute|{"url":"bjhlstudent://o.c?a=video_course&number={{$item.number}}"}'>
                                        <div class="avatar">
                                            <img data-src="{{$item.img}}" />

                                            <img class="video-img" src="{{$static_origin}}/src/page/course/k12_search/img/start.png">
                                        </div>
                                        <div class="info">
                                            <div class="describe line-clamp">{{$item.name}}</div>
                                            <div class="learning line-clamp">{{$item.learn_num}}人正在学习</div>
                                        </div>
                                    </a>
                                </div>
                            </li>
                        {{/foreach}}
                    </ul>
                    {{if $grade=='xiaoxue'}}
                    <a class="label-text more logClick" data-ctype="3" data-cname="k12_knowledge" href="{{$tpl_data.zsdjj.more_url}}" style="color:#ff9100;">
                    {{else}}
                    <a class="label-text more logClick" data-ctype="3" data-cname="k12_knowledge" href="{{$tpl_data.zsdjj.more_url}}">
                    {{/if}}
                        更多讲解>
                    </a>
                </div>
            {{/if}}
        </div>
    {{/if}}
    {{if isset($tpl_data.ztjj)}}
        <div class="block gre bottom">
            <div class="start-title">
                    <span class="icon-star_all block-line">
                        <span class="line"></span>
                        <span class="line line-sub"></span>
                    </span>
                <div class="title">真题视频库</div>
                    <span class="icon-star_all block-line block-line-right">
                        <span class="line"></span>
                        <span class="line line-sub"></span>
                    </span>
                <div class="start-title-sub">深度解析历年高考试卷，专家点拨决胜高考</div>
            </div>
            <ul class="gre-list clearfix">
                {{foreach $tpl_data.ztjj as $item}}
                    <li>
                        <a href="{{$item.url}}" class="logClick" data-ctype="1" data-cname="k12_zhenti">
                            <div class="item">
                                <div class="avatar">
                                    <img data-src="{{$item.icon}}" />
                                </div>
                                <div class="info">
                                    <div class="subject">{{$item.name}}</div>
                                    <div class="subject-more">{{$item.num}}套视频讲解</div>
                                </div>
                            </div>
                        </a>
                    </li>
                {{/foreach}}
            </ul>
            <a class="label-text more logClick" data-ctype="2" data-cname="k12_zhenti" href="/video_course/zhenti{{if $grade=='chuzhong'}}?condition=-2743-0-2901{{/if}}">更多讲解></a>
        </div>

    {{/if}}

    {{include file="page/course/k12_search/_part/gaokao.tpl"}}


    {{if isset($tpl_data.local_course)}}
    {{$local_course=$tpl_data.local_course.list}}
    <div class="block local-lesson bottom">
        <div class="start-title">
            <span class="icon-star_all block-line">
                <span class="line"></span>
                <span class="line line-sub"></span>
            </span>
            <div class="title">本地好课</div>
            <span class="icon-star_all block-line block-line-right">
                <span class="line"></span>
                <span class="line line-sub"></span>
            </span>
            <div class="start-title-sub">
                {{$tpl_data.lbs.city}}本地精选课程
            </div>
        </div>
        <div class="good-lessons">
            <ul class="good-lesson lists clearfix">
                {{foreach $local_course as $item}}
                <li class="items">
                    <div class="item">
                        <a href="{{$item.url}}" class="logClick" data-ctype="1" data-cname="k12_Location">
                            <div class="avatar">
                                <img data-src="{{$item.img}}" />
                                <div class="mold"></div>
                                <div class="report-status">
                                    {{$item.img_desc}}
                                </div>
                            </div>
                            <div class="info">
                                <div class="course-name line-clamp">
                                    {{$item.course_name}}
                                </div>
                                <div class="description line-clamp">
                                    {{if $item.price == 0}}
                                        <span class="free price">
                                            免费
                                        </span>
                                    {{else}}
                                        <span class="price">
                                            ¥ {{$item.price}}
                                        </span>
                                    {{/if}}
                                    <span class="position">
                                        {{$item.address}}
                                    </span>
                                </div>

                            </div>
                        </a>
                    </div>
                </li>
                {{/foreach}}
            </ul>
        </div>
        {{if isset($tpl_data.local_course.more_url)}}
            <a class="label-text more logClick" href="{{$tpl_data.local_course.more_url}}" data-ctype="2" data-cname="k12_Location">更多本地课程&gt;</a>
        {{/if}}
    </div>
    {{/if}}

    <div class="block bottom search-more">
        <div class="text"><img src="{{$static_origin}}/src/page/course/k12_search/img/search-more.png"> 都不是你想要的？</div>
        {{if $grade=='xiaoxue'}}
        <a href="/{{$area}}/sc-{{$grade_value}}.html{{if $isShare}}?s=share{{/if}}" data-jockey='urlSchemeRoute|{"url":"bjhlstudent://o.c?a=course_search&q={{$grade_value}}{{if $isShare}}&s=share{{/if}}"}' class="btn-search-more" style="background: #ff9100;border: 1px solid #ff9100;">
        {{else}}
        <a href="/{{$area}}/sc-{{$grade_value}}.html{{if $isShare}}?s=share{{/if}}" data-jockey='urlSchemeRoute|{"url":"bjhlstudent://o.c?a=course_search&q={{$grade_value}}{{if $isShare}}&s=share{{/if}}"}' class="btn-search-more">
        {{/if}}
            查看更多{{$grade_value}}课程 <span class="icon-circle-right"></span></a>

    </div>
    {{if !$ext_data.is_app && !$ext_data.is_tapp && $isShare}}
    <div class="support bottom">
        <a href="/app" class="app-down"><span class="icon-mobile2"></span> APP下载</a>
        <a id="phone" href="tel:4000910910" data-tel="4000910910" class="app-phone"><span class="icon-phone"></span> 4000-910-910</a>
    </div>
    {{/if}}


    <div class="tanchuang-mask hide"></div>
    <div class="tanchuang hide">
        <img src="{{$static_origin}}/src/page/course/k12_search/img/img_update.png">
        <div class="tc-content">
            <p>同学，你当前版本比较低哟，赶快去升级吧！
                升级后进入初高中学习频道，点击更流畅，推荐更精准。
                请前往‘我的－设置’进行升级</p>
        </div>
        <img src="{{$static_origin}}/src/page/course/k12_search/img/ic_close.png"  class="close_button">
    </div>
{{/block}}