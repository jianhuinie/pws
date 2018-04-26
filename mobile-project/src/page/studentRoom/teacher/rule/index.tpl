{{*
@file 亲子课堂（活动）
@author huangshiming
@date 2016-05-16
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = "生源大厅"}}
    {{$page_module = "page/studentRoom/teacher/rule/index"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}


{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/studentRoom/teacher/rule/index.styl"/>
{{/block}}

{{block name="content"}}

    {{include file="page/_common/nav_bar/nav_bar.tpl" text="生源大厅说明"}}
    <div class="box">
        <div class="title">生源大厅是做什么的？</div>
        <div class="content">生源大厅是跟谁学为老师和机构提供的一个生源获取工具。老师和机构可以根据自己的条件、要求，学生的需求来进行选择报名，报名后学生可主动联系老师或机构进行后续的沟通选择。</div>
    </div>

    <div class="box">
        <div class="title">生源大厅的生源真实么？</div>
        <div class="content">跟谁学平台的生源大厅中每一个生源都是经过人工审核并验证过的，真实有效。</div>
    </div>

    <div class="box">
        <div class="title">如何获取生源？</div>
        <div class="content">在跟谁学上注册并生效的老师或机构，进入商机大厅后可浏览所有的最新生源信息，可以对“主营科目”下未报满的生源需求进行报名，报名后学生将可以与老师机构进行联系。</div>
    </div>

    <div class="box">
        <div class="title">什么是主营科目？</div>
        <div class="content">老师的主营科目是指在老师个人资料中设置的“主营科目”；</div>
    </div>

    <div class="box">
        <div class="title">为什么有的生源不能报名？</div>
        <div class="content">
        1) 生源卡片显示“会员专享时间”，仅限会员老师和机构才能够报名。“会员专享时间”的时长为30分钟。<br>
        2）生源卡片显示“报名已满”，是指每个生源同时报名老师已达5位的上限，暂不可报名。<br>
        3）生源卡片显示“已结束”，发布生源信息的学生已经关闭生源需求或生源发布的时间已经超过7天。<br>
        </div>
    </div>

     <div class="box">
        <div class="title">报名后学生为什么没有联系我？</div>
        <div class="content">报名后学生可以通过跟谁学平台提供的免费通话功能与老师通话联系，请老师注意接听来自“010-86448910”的电话。如果学生没有联系您，您也可以点击“立即联系”按钮来主动联系学生。</div>
    </div>

{{/block}}