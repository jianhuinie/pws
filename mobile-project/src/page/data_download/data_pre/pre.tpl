{{*

@file 资料下载列表
@author wuxl
@date 16/9/07
*}}
{{extends file="page/_base/base.tpl"}}
{{block name="page"}}
    {{$page_title = $tpl_data.head_info.title}}
    {{$page_module = "page/data_download/data_pre/pre"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}

    {{$course_info = $tpl_data.course_info}}
    {{$file_info = $tpl_data.material_info}}

    {{$teacher_url = $course_info.detail_url}}
    {{$is_end = $course_info.is_end}}
    {{$is_open = $file_info.is_open}}
    {{$is_login = $tpl_data.user_login_status}}
    {{$is_join = $tpl_data.is_join}}

    {{$script_data['share_info'] = $tpl_data.head_info.share_info}}
    {{$script_data['course_info'] = $tpl_data.course_info}}
    {{$script_data['file_info'] = $tpl_data.material_info}}
    {{if ($is_open && $is_login) || (!$is_open && $is_login && $is_join) || ($is_end && $is_join)}}
    {{$script_data['new_window'] = $file_info.preview_url}}
    {{/if}}

    {{$browser = "https://imgs.genshuixue.com/0cms/d/file/content/2016/09/57d64b631040b.png"}}

    {{$data_type = ["pdf", "word", "excel", "ppt", "jpg", "jpeg", "png", "gif", "txt"]}}


{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/data_download/data_pre/pre.styl"/>
{{/block}}

{{block name="content"}}
{{strip}}
{{include file="page/_common/nav_bar/nav_bar.tpl" text={{$tpl_data.head_info.title}} menu_button=true}}

<div class="container">
    <div class="course-info">
        <a href="{{$course_info.course_url}}">
            <div class="avatar">
                <img height="100%"
                     width="100%"
                     data-src="{{$course_info.cover}}"
                     alt="">
            </div>
            <div class="intro">
                <p class="data-course-title double-line">{{$course_info.course_name}}</p>
                <p class="course-teacher">讲师：{{$course_info.display_name}}</p>
            </div>
        </a>
        {{if $file_info.can_downlaod}}
            <span class="download">立即下载</span>
        {{else}}
            <span class="no-download">该资料老师未提供下载</span>
        {{/if}}
    </div>
    {{if !in_array($file_info.type,$data_type)}}
        <div class="login-mask" style="display: block;">
            <div class="login-box">
                <p>该文件暂不支持预览，请下载后查看</p>
            </div>
        </div>
    {{else if $is_end && !$is_open && $is_login && !$is_join}}
        <div class="teacher-mask" style="display: block;">
            <div class="teacher-box">
                <p>该课程已结束，可咨询老师获取资料</p>
                <a href="{{$teacher_url}}">
                    <span class="to-teacher">联系老师</span>
                </a>
            </div>
        </div>
    {{else if ($is_open && !$is_login) || ($is_end && !$is_open && !$is_login)}}
        <div class="login-mask" style="display: block;">
            <div class="login-box">
                <p>登录后即可查看资料</p>
                <span class="to-login">立即登录</span>
            </div>
        </div>
    {{else if ($is_open && $is_login) || (!$is_open && $is_login && $is_join) || ($is_end && $is_join)}}
        <!--<div class="file-info">
            <iframe id="frame-pre" style="display:none; width:900px;" src="{{$file_info.preview_url}}" frameborder="0"></iframe>
        </div>-->
        <div class="teacher-mask" style="display: block;">
            <div class="teacher-box">
                <p>{{$file_info.name}}</p>
                <a data-href="{{$file_info.preview_url}}"
                   href="javascript:void(0);"
                   data-type="{{$file_info.type}}"
                   data-fid="{{$file_info.fid}}"
                   data-ctype="2"
                   data-cname="course_material"
                   class="to-preview logClick">
                    <span class="to-teacher">立即预览</span>
                </a>
            </div>
        </div>
    {{else if (!$is_open && !$is_login) || (!$is_open && $is_login && !$is_join)}}
        <div class="enter-mask" style="display: block;">
            <div class="enter-box">
                <p>报名后即可查看完整资料</p>
                <a href="javascript:void(0);">
                    <span data-href="{{$course_info.course_url}}" class="to-enter">立即报名</span>
                </a>
            </div>
        </div>
    {{/if}}

</div>
<div class="browser-mask" style="display: none">
    <img src="{{$browser}}" alt="">
</div>
<div class="app-mask" style="display: none;">
    <div class="app-box">
        <p>可使用跟谁学客户端下载此资料</p>
        <span class="to-app">打开客户端</span>
    </div>
</div>



{{/strip}}
{{/block}}