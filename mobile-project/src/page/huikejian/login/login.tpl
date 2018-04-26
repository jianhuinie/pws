{{*

@file 汇课间首页
@author niumeng

*}}

{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "汇课间登录"}}

    {{$page_module = "page/huikejian/login/login"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data.pageData = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/huikejian/login/login.styl"/>
{{/block}}

{{block name="content"}}
    <div class="logo"></div>

    <div class="login">
        <input id="j_mobile" type="number" name="mobile" value="" maxlength="11" placeholder="请输入手机号">
        <input id="j_password" type="password" name="password" value="" placeholder="请输入密码" class="password">

        <input id="j_submit" type="button" name="name" value="登录" class="submit">

        <a href="/static/forget_password?from=huikejian" class="forgot">忘记密码</a>
    </div>
{{/block}}
