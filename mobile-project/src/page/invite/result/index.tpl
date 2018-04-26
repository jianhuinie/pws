{{**
 * Created by niumeng on 25/10/2016.
 *}}

{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "邀请关注"}}
    {{$page_module = "page/invite/result/index"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/invite/result/index.styl"/>
{{/block}}

{{block name="content"}}
    {{if $tpl_data.app_type == 'student_app'}}
        {{$role = "student"}}
    {{else}}
        {{$role = "teacher"}}
    {{/if}}

    <img class="status" src="/src/page/invite/result/img/ic_ payment success@4x.png" alt="" />

    <div class="remind">
        {{if $tpl_data.result == 0}}
            <p>
                恭喜您注册成功
            </p>
        {{else if $tpl_data.result == 1}}
            <p>
                您已经绑定过{{if $role == "student"}}学生{{else}}老师{{/if}}帐号啦～
            </p>
        {{else}}
            <p>
                您已经登录过啦～
            </p>
            <p>
                快下载跟谁学APP，和好友一起吧！
            </p>
        {{/if}}
    </div>

    <div class="next">
        接下来您可以
    </div>

    <a class="goto" href="{{$tpl_data.detail_url}}">
        {{if $role == "student"}}
            <img id="j_avatar" src="/src/page/invite/result/img/ic_s_appicon@4x.png" alt="" />
        {{else}}
            <img id="j_avatar" src="/src/page/invite/result/img/ic_t_appicon@4x.png" alt="" />
        {{/if}}
        访问老师的主页
        <img src="/src/page/invite/target/img/Rectangle_217.png" class="arrow" alt="" />
    </a>

    <a class="goto" href="{{$tpl_data.index_url}}">
        <img src="/src/page/invite/result/img/ic_s_appicon@4x.png" alt="" />
        访问跟谁学首页
        <img src="/src/page/invite/target/img/Rectangle_217.png" class="arrow" alt="" />
    </a>

    <p class="download-remind">
        {{if $role == "student"}}
            如果你还没有下载跟谁学APP，可以点这里下载
        {{else}}
            心动不如行动，三步生效再送奖！
        {{/if}}
    </p>

    {{if $role == "student"}}
        <a id="j_download" href="http://m.genshuixue.com/app/dw?t=s&ct=GenShuiXue_M2100013" class="student-download">
            <img src="/src/page/invite/result/img/ic_video_down_orange@4x.png" alt="" />
            <span>下载跟谁学APP</span>
        </a>
    {{else}}
        <a id="j_download" href="http://m.genshuixue.com/app/dw?t=t&ct=GenShuiXue_M2100013" class="teacher-download">
            <img src="/src/page/invite/result/img/ic_video_down_blue.png" alt="" />
            <span>下载跟谁学老师版APP</span>
        </a>
    {{/if}}

{{/block}}
