{{**
 * Created by niumeng on 25/10/2016.
 *}}

{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "邀请关注"}}
    {{$page_module = "page/invite/target/index"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/invite/target/index.styl"/>
{{/block}}

{{block name="content"}}
    {{if $tpl_data.user_role eq 2}}
        {{$role = "student"}}
    {{else}}
        {{$role = "teacher"}}
    {{/if}}

    <div id="j_teacherInfoCtn"></div>
    <div id="first-title" class="{{$role}}-title">
        {{if $role == "student"}}
            邀请您加入跟谁学
        {{else}}
            邀请您成为跟谁学老师
        {{/if}}
    </div>

    {{if $role == "student"}}
        <img class="student-signboard" src="/src/page/invite/target/img/img_yqgz_appjt@3x.png" alt="" />
    {{else}}
        <img class="teacher-signboard" src="/src/page/invite/target/img/ic_t_appicon@4x.png" alt="" />
    {{/if}}

    {{if $role == "student"}}
        <p class="advertisement">
            跟谁学是人人乐用的学习服务平台。在这里，你可以方便的找到<span class="student-highlight">合适</span>的老师，<span class="student-highlight">高效</span>的学习各类课程，并可享受平台提供的<span class="student-highlight">支付安全</span>保障。
        </p>
        <p class="advertisement">
            你能想到的课程，都在这里；最牛、最有趣、最有范儿的老师，也在这里。跟谁学，让学习成为一件有趣儿的事。
        </p>
    {{else}}
        <p class="advertisement">
            跟谁学平台是8000万学生信赖的教育服务平台，在这里可以跟<span class="teacher-highlight">60万</span>老师交流线上教学心得、共享高效招生秘籍。
        </p>
        <p class="advertisement">
            立即注册获得跟谁学平台放送的<span class="teacher-highlight">三重好礼</span>：10GB云储存空间、300学分、200短信。
        </p>
        <p class="advertisement">
            加入跟谁学，开启线上名师之旅。
        </p>
    {{/if}}

    <div class="{{$role}}-title">
        填写手机号立即完成注册
    </div>

    {{include file="./register.tpl"}}

    <p class="contact">
        客服热线：4000910910
    </p>

    {{if $role == "student"}}
        <img class="student-slogon" src="/src/page/invite/target/img/img_logo_st_grey@3x.png" alt="" />
    {{else}}
        <img class="teacher-slogon" src="/src/page/invite/target/img/img_logo_t_grey@4x.png" alt="" />
    {{/if}}
{{/block}}
