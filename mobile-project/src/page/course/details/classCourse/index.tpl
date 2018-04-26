{{*
@file 课程详情页非会员版
@author chenmo
@date 16/2/17
*}}
{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$course_info = $tpl_data.course_info}}
    {{$course_detail = $course_info.course_detail}}
    {{$comment = $tpl_data.comment}}
    {{$plan_list = $course_detail.course_plan.content}}

    {{if isset($tpl_data.favorite_info)}}
        {{if $tpl_data.favorite_info.favorite_status == 1}}
            {{$favor = 1}}
        {{else}}
            {{$favor = 0}}
        {{/if}}
    {{/if}}
    {{$voice_img = 'https://img.genshuixue.com/0cms/d/file/content/2016/01/56a5dcdb9fc17.png'}}
    {{$chat_img = 'https://img.genshuixue.com/0cms/d/file/content/2016/01/56a5dcc8be692.png'}}
    {{$favor_img = 'https://img.genshuixue.com/0cms/d/file/content/2015/12/5675239d770f3.png'}}

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

    {{$page_title = $tpl_data.course_info.name}}

    {{if $tpl_data.course_info.course_type == 11}}
        {{$courseType = '1对1'}}
    {{else}}
        {{if $tpl_data.course_info.lesson_way == '2'}}
            {{$courseType = '直播课'}}
        {{else}}
            {{$courseType = '线下班课'}}
        {{/if}}
    {{/if}}

    {{$page_module = "page/course/details/classCourse/index"}}

    {{$enable_backTopButton = true}}
{{/block}}
{{block name="data"}}
    {{$script_data.courseStatus = $course_info.status}}
    {{$script_data.photos = $course_info.photos}}
    {{$script_data.org_number = $tpl_data.org_info.number}}
    {{if isset($tpl_data.favorite_info)}}
        {{$script_data.favorStatus = $tpl_data.favorite_info.favorite_status}}
        {{$script_data.favor_type = $tpl_data.favorite_info.type}}
        {{$script_data.teacher_number = $tpl_data.favorite_info.number}}
    {{/if}}

    {{$script_data.unfavor = 'https://img.genshuixue.com/0cms/d/file/content/2015/12/5675239d554c8.png'}}
    {{$script_data.im_data = Json_encode($tpl_data.im_data)}}
    {{$script_data.share_info = json_encode($tpl_data.share_info)}}
    {{$script_data.class_name = $course_info.name|escape}}
    {{$script_data.classId = $course_info.number}}
    {{if !empty($course_info.course_summary.org_info)}}
        {{$script_data.tel_400 = $course_info.course_summary.org_info.extension}}
        {{$script_data.org_number = $tpl_data.course_info.course_summary.org_info.number}}
    {{/if}}
    {{$script_data.qrcodeUrl = $tpl_data.qrcode_url}}
    {{$script_data.teacherCount = $course_detail.main_teacher|count}}

    {{$script_data.favor_img = 'https://img.genshuixue.com/0cms/d/file/content/2015/12/5675239d770f3.png'}}
    {{$script_data.voice_img = $voice_img}}
    {{$script_data.active_voice_img = 'https://img.genshuixue.com/0cms/d/file/content/2016/01/56a5dcdb79aad.gif'}}

    {{$script_data.page_model = $course_info.template_m}}

    {{if !empty($tpl_data.limited_discount)}}
        {{$script_data.countDownList = count($tpl_data.limited_discount)}}
        {{$script_data.start_time = $tpl_data.limited_discount.start_time}}
        {{$script_data.end_time = $tpl_data.limited_discount.end_time}}
    {{else}}
        {{$script_data.countDownList = 0}}
    {{/if}}

    {{if isset($tpl_data.staging) && $tpl_data.staging}}
        {{$script_data.staging = $tpl_data.staging}}
    {{/if}}

    {{$script_data.courseInfo = $tpl_data.course_info}}
    {{$script_data.orgInfo = $tpl_data.org_info}}
    {{$script_data.shareInfo = Json_encode($tpl_data.share_info)}}
    {{$script_data.plan_list = $course_detail.course_plan.content}}

{{/block}}
{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/course/details/classCourse/index.styl"/>
{{/block}}
{{block name="content"}}
    {{include file="page/_common/top/courseTop.tpl" type="classDetailApp"}}
    <div id="main">
        {{$orgInfo = $tpl_data.org_info}}
        {{$courseInfo = $tpl_data.course_info}}
        {{$comment = $tpl_data.comment}}
        {{$isCourseSet = false}}

        {{*头部*}}
        {{$coverInfo.photo = $courseInfo.cover}}
        {{$coverInfo.name = $orgInfo.name}}
        {{$coverInfo.price = $courseInfo.price}}
        {{$coverInfo.courseType = $courseType}}
        {{$lessonWay = $courseInfo.lesson_way}}

        {{include file="../component/cover/coverClass.tpl"}}

        {{*课程简介*}}
        {{$briefIntro.name = $courseInfo.name}}
        {{$briefIntro.courseInfo = $courseInfo.begin_time|cat:"开课"}}
        {{$briefIntro.courseInfoDetail = "共"|cat:$courseInfo.course_long|cat:"节"}}
        {{$briefIntro.lessonWay = $courseInfo.lesson_way}}
        {{$briefIntro.address = $courseInfo.address}}
        {{$briefIntro.commentRate = $comment.comment_rate}}
        {{$briefIntro.commentNumber = $comment.comment_count}}
        {{$briefIntro.commentURL = $comment.comment_url}}

        {{include file="../component/briefIntroduction/index.tpl"}}

        {{*学费卫士*}}
        {{include file="../component/safeguard/index.tpl"}}

        {{*分期*}}
        {{if isset($tpl_data.is_staging) && $tpl_data.is_staging == 1 && $tpl_data.course_info.button_info.type == 'enrolling'}}
            <div class="staging">
                {{include file="../component/staging/nav.tpl"}}
            </div>
        {{/if}}

        {{*增值服务*}}
        {{$vas = $courseInfo.increment_service}}
        {{include file="../component/valueAddedServices/valueAddedServices.tpl"}}

        {{*选择课型*}}
        {{$courses = $courseInfo.type_info}}
        {{include file="../component/chooseCourse/index.tpl"}}

        {{*课程信息*}}
        {{$courseDetails.to = $courseInfo.create_time}}
        {{$courseDetails.audition = $courseInfo.update_time}}
        {{$courseDetails.intro = $courseInfo.introduction}}
        {{include file="../component/courseDetails/index.tpl"}}

        {{*机构介绍*}}
        {{include file="../component/orgIntroduction/index.tpl"}}

        {{*课程安排*}}
        {{include file="../component/courseSchedule/index.tpl"}}

        {{*学生评价*}}
        {{include file="../component/comment/index.tpl"}}

        {{*平台保障*}}
        {{include file="../component/platformSupport/index.tpl"}}

        {{*相关课程*}}
        {{$relative.courses = $courseInfo.relative_course}}

        {{include file="../component/recommend/index.tpl"}}

        {{*分享*}}
        {{include file="../component/share/index.tpl"}}

        {{*底导*}}
        {{include file="../component/courseBottom/classDetailBottom.tpl" templateModel="default"}}

        {{*增值服务浮层*}}
        {{include file="../component/valueAddedServices/valueAddedServicesLayer.tpl"}}

        {{include file="../component/mask/index.tpl"}}

        {{include file="common/weChatLogin/weChatLogin.tpl"}}
    </div>
{{/block}}
