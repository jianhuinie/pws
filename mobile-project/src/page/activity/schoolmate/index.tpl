{{*
@file 校友汇招募页面（活动）
@author shubaiqiao
@date 2016-08-16
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "校友汇招募"}}

    {{$page_module = "page/activity/schoolmate/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/schoolmate/index.styl"/>
{{/block}}

{{block name="content"}}

{{*include file="page/_common/nav_bar/nav_bar.tpl" text="校友汇招募"*}}

    <div class="header">
        <img src="{{$static_origin}}/src/page/activity/schoolmate/image/head.png">
    </div>
    <div class="image">
        <img data-src="{{$static_origin}}/src/page/activity/schoolmate/image/privilege.png">
    </div>
    <div class="image">
        <img data-src="{{$static_origin}}/src/page/activity/schoolmate/image/routine.png">
    </div>
    <div class="image join">
        <img data-src="{{$static_origin}}/src/page/activity/schoolmate/image/join.png">
        <div class="arrow">
            <img data-src="{{$static_origin}}/src/page/activity/schoolmate/image/arrow.png">
        </div>
        <div class="button">
            <img data-src="{{$static_origin}}/src/page/activity/schoolmate/image/button.png">
        </div>
        <p class="leftNumber">限量200，先到先得</p>
    </div>
    <p class="right">校友汇首次招募将采取内部邀请制，请勿私自分享链接。<br>
        本活动最终解释权归跟谁学所有。
    </p>


{{/block}}