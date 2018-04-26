{{*
    @file 线下班课、直播课通用模板，非会员
    @author hurry
    @date 2016-12-07
    @params pageType指定页面模板，目前只能指定courseComment
*}}

<!-- (必选)引用base页面 -->
{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = $tpl_data.course_info.name}}
    {{$page_module = "page/course/classCourse/default/index"}}
    {{$enable_backTopButton = false}}
    {{$isNeedScale = false}}
    {{if $tpl_data.course_info.into_room}}
        {{$isShowAds = false}}
    {{/if}}
{{/block}}
<!-- (可选)引用php数据 -->
{{block name="data"}}
    {{$smarty.block.parent}}
    {{$course_info = $tpl_data.course_info}}
    {{$material_info = $tpl_data.material_info}}
    {{$teacher_info = $tpl_data.teacher_info}}
    {{$script_data = $tpl_data}}
    {{if isset($course_info.discount.pre_price)}}
    {{$show_price = $course_info.discount.pre_price}}
    {{else}}
        {{$show_price = $tpl_data.course_info.original_price}}
    {{/if}}
    {{$course_data = $tpl_data.material_info}}
    {{$lesson_way = $course_info.lesson_way}}
    {{$comment = $tpl_data.comment_info}}

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

    {{*
        hurry: 页面类型默认相关课程
    *}}
    {{$script_data.pageType = 'courseComment'}}

    {{$org_info = ''}}
    {{if isset($tpl_data.org_info)}}
        {{$org_info = $tpl_data.org_info}}
    {{/if}}
    {{$script_data.is_trial_class = true}}
    {{*hurry: 预约试听对所有机构开放*}}


    {{*判断跟谁学*}}
    {{$is_jhx = 0}}
    {{if isset($tpl_data.is_juhuixue) && $tpl_data.is_juhuixue == 1}}
        {{$is_jhx = 1}}
    {{/if}}

    {{* yuanye: 由于include的子模板不能修改父模板的变量,因此要在这里设置$script_data *}}
    {{* yuanye: target_price用于分期免息修改 *}}
    {{if !empty($tpl_data.course_info.discount)}}
        {{$script_data.target_price = $tpl_data.course_info.discount.discount_price}}
    {{elseif isset($course_info.chaban_price)}}
        {{$script_data.target_price = $course_info.chaban_price}}
    {{else}}
        {{$script_data.target_price = $course_info.price}}
    {{/if}}

    {{$script_data.couponList = $course_info.coupon_list}}
    {{$script_data.origin = $main_origin}}
    {{$script_data.tags = $course_info.tags}}
    {{$script_data.trial_info = $tpl_data.trial_info}}
    {{$script_data.is_sem = $course_info.is_sem}}
    {{$script_data.photos = $course_info.photos}}
    {{$script_data.button_info = $course_info.button_info}}
    {{$script_data.replay_button = $course_info.replay_button_info}}
    {{if $lesson_way.way == 4}}
        {{$script_data.lng = $lesson_way.address_url.lng}}
        {{$script_data.lat = $lesson_way.address_url.lat}}
    {{/if}}

    {{if isset($tpl_data.favorite_info)}}
        {{$script_data.favorStatus = $tpl_data.favorite_info.favorite_status}}
        {{$script_data.favor_type = $tpl_data.favorite_info.type}}
        {{$script_data.teacher_number = $tpl_data.favorite_info.number}}
    {{/if}}
    {{$script_data.teacherInfo = $tpl_data.teacher_info}}

    {{$script_data.unfavor = 'https://imgs.genshuixue.com/0cms/d/file/content/2015/12/5675239d554c8.png'}}
    {{$script_data.im_data = $tpl_data.im_info.im_data}}
    {{$script_data.im_online_status = $tpl_data.im_info.im_online_status}}
    {{$script_data.share_info = $tpl_data.share_info}}
    {{$script_data.class_name = $course_info.name|escape}}
    {{$script_data.classId = $course_info.number}}
    {{if !empty($tpl_data.org_info)}}
        {{$script_data.tel_400 = $tpl_data.org_info.extension}}
        {{$script_data.org_number = $tpl_data.org_info.number}}
    {{/if}}
    {{$script_data.teacherCount = $tpl_data.teacher_info|count}}

    {{$script_data.favor_img = 'https://imgs.genshuixue.com/0cms/d/file/content/2015/12/5675239d770f3.png'}}
    {{$script_data.voice_img = $voice_img}}
    {{$script_data.active_voice_img = 'https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a5dcdb79aad.gif'}}
    {{$script_data.isPreview = $tpl_data.is_preview}}
    {{$script_data.is_valid = $course_info.is_valid}}

    {{* yuanye: 命名有歧义,不应该叫course_type,改为lesson_way *}}
    {{$script_data.lesson_way = $lesson_way.way}}

    {{$script_data.price_origin_target = $course_info.price}}

    {{$script_data.page_model = $course_info.template_m}}
    {{if isset($tpl_data.hidden_download)}}
        {{$script_data.hidden_download = $tpl_data.hidden_download}}
    {{/if}}
    {{if isset($tpl_data.is_u_meng)}}
        {{$script_data.is_u_meng = $tpl_data.is_u_meng}}
    {{/if}}
    
    {{$script_data.into_room = $course_info.into_room}}

    {{* yuanye: 分期字段变为fenqi,去掉is_staging字段 *}}
    {{if !empty($tpl_data.course_info.fenqi)}}
        {{$script_data.fenqi = $tpl_data.course_info.fenqi}}
    {{/if}}

    {{if !empty($course_info.discount)}}
        {{$script_data.countDownList = count($course_info.discount)}}
        {{$script_data.start_time = $course_info.discount.start_time}}
        {{$script_data.end_time = $course_info.discount.end_time}}
    {{else}}
        {{$script_data.countDownList = 0}}
    {{/if}}
     {{$script_data.isOne2oneTeacher = $tpl_data.is_one_on_one_teacher}}
    {{$host = $smarty.server.HTTP_HOST}}
    {{$url = $smarty.server.REQUEST_URI}}
{{/block}}

<!-- (未开启)页面样式，可使用@page-css模板 -->
{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/course/classCourse/default/index.styl">
{{/block}}

{{block name="content"}}
<!-- 页面内容 -->
{{if isset($tpl_data.is_u_meng) && $tpl_data.is_u_meng == true}}
{{else}}
    {{include file="common/topAction/courseTop.tpl" type="classDetailApp"}}
{{/if}}
<div id="main">
{{* 头部 *}}
<div class="head">
    <div class="top-sliders">
        {{if isset($course_info.photos) && $course_info.photos|count >0}}
        <ul class="slide-images">
            {{foreach $course_info.photos as $photo}}
            <li class="slide-images-li"> 
            <!--style="height: 180px;overflow: hidden;"-->
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
    <div class="label">
        {{if $lesson_way.way == '2'}}直播课{{else}}线下班课{{/if}}
    </div>
    {{if $is_jhx == 1}}
    <div class="jhx">
        <img width="100%" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/568cb5148ca76.png" alt=""/>
    </div>
    {{/if}}
    {{*会员或聚惠学banner*}}
    {{include file="page/course/classCourse/_parts/vipBanner/index.tpl"}}
</div>
<div class="course-container">
    <div class="course-tab">
        {{* 二级导航 *}}
            {{*课程评价*}}
            {{$gsType = 'm_courseB'}}
        {{$nav_tabs = []}}

    {{$item = []}}
    {{$item['id'] = 1}}
    {{$item['name'] = '课程详情'}}
    {{$item['class'] = 'analysis-habo-log'}}
    {{$item['type'] = $gsType}}
    {{$item['stype'] = 'home'}}
    {{$nav_tabs[] = $item}}

    {{$item = []}}
    {{$item['id'] = 2}}
    {{$item['name'] = '课程安排'}}
    {{$item['class'] = 'analysis-habo-log'}}
    {{$item['type'] = $gsType}}
    {{$item['stype'] = 'plan'}}
    {{$nav_tabs[] = $item}}

    {{if $gsType == 'm_courseC'}}
        {{$item = []}}
        {{$item['id'] = 3}}
        {{$item['name'] = '相关课程'}}
        {{$item['class'] = 'analysis-habo-log'}}
        {{$item['type'] = $gsType}}
        {{$item['stype'] = 'clcoursetab'}}
        {{$nav_tabs[] = $item}}
    {{else}}
        {{$item = []}}
        {{$item['id'] = 4}}
        {{$item['name'] = '课程评价'}}
        {{$item['class'] = 'analysis-habo-log'}}
        {{$item['type'] = $gsType}}
        {{$item['stype'] = 'comment'}}
        {{$nav_tabs[] = $item}}
    {{/if}}
    {{include file="common/smarty/navTab/index.tpl" nav_tabs=$nav_tabs}}
    </div>

    <div class="course-detail">
        {{* 课程简介 *}}
        {{include file="common/component/course/summary/index.tpl"}}
        {{* 课程标签 *}}
        {{include file="common/component/course/tags/index.tpl"}}
        {{* 分期 *}}
        {{if !empty($tpl_data.fenqi) && $tpl_data.course_info.button_info.type == 'enrolling'}}
             <div class="staging">
                 {{include file="common/staging/nav.tpl"}}
             </div>
        {{/if}}
        {{*课程信息*}}
        {{if !empty($course_info.information) || !empty($course_info.introduction)}}
            {{include file="common/component/course/courseInfo/old.tpl"}}
        {{else if isset($tpl_data.course_info.intro) && $tpl_data.course_info.intro}}
            <div class="course-info">
                {{include file="common/component/course/courseInfo/new.tpl"}}
            </div>
        {{/if}}
        {{*课程资料*}}
        {{if $lesson_way.way == 2 || $lesson_way.way == 4}}
        {{include file="common/component/course/material/index.tpl"}}
        {{/if}}
        {{if isset($tpl_data.teacher_info) && !empty($tpl_data.teacher_info)}}
            {{*老师信息*}}
            {{include file="common/component/course/teacherInfo/index.tpl"}}
        {{else}}
            {{*机构信息*}}
            {{include file="common/component/course/orgInfo/index.tpl"}}
        {{/if}}
        {{*课程评价*}}
        {{include file="common/component/course/courseComment/index.tpl"}}
        {{*相关课程*}}
        {{include file="common/component/course/relatedCourse/index.tpl"}}
        {{*上课须知*}}
        {{include file="common/component/course/notes/index.tpl"}}
        {{*平台保障*}}
        {{include file="common/component/platformSupport/index.tpl"}}
    </div>
    <!--课程安排-->
    <div class="course-plan-container"></div>
    <!--相关课程-->
    <div class="related-course-container hide"></div>
    {{*hurry: 复用课程评价*}}
    <div class="course-comment hide">
        <iframe frameborder="0" srolling="yes" width="100%"></iframe>
    </div>
</div>
{{*底部按钮*}}
{{include file="common/courseBottom/classCourseBottom/index.tpl"
    templateModel='default'
    course_lesson_way=$tpl_data.course_info.lesson_way.way
}}
{{*微信登陆*}}
{{include file="common/weChatLogin/weChatLogin.tpl"}}
{{*页面蒙版*}}
<div class="page-mask">
</div>
{{/block}}