{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "个人中心"}}

    {{$page_module = "page/activity/ce_contest/success/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/ce_contest/success/css/index.styl"/>
{{/block}}

{{block name="content"}}
    {{include file="page/_common/nav_bar/nav_bar.tpl" text="个人中心"}}
    <div class="container">
        <h2>报名成功！</h2>
        <p>请在电脑上登录，查看活动介绍并上传视频</p>
        <p class="mail">网页地址：2016.genshuixue.com</p>

        <div class="submit"><a href="/uk/profile">确定</a></div>
    </div>

{{/block}}
