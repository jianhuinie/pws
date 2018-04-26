{{*
    @file 你的名字（活动）结果页
    @author shubaiqiao
    @date 2016-12-08
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "【你的名字】写在手心里的秘密"}}

    {{$page_module = "page/activity/yourName/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/yourName/index.styl"/>
{{/block}}

{{block name="content"}}

{{*include file="page/_common/nav_bar/nav_bar.tpl" text="【你的名字】写在手心里的秘密"*}}
    <div class="container">
        <img data-src="{{$static_origin}}/src/page/activity/yourName/img/background_blue.png">
        <div class="content">
            <div class="title result"><p>这是你</p><p>&nbsp;&nbsp;&nbsp;&nbsp;写在手心里的秘密。</p></div>
            <div class="banner">
                <img src="">
            </div>
            <div class="tip1">长按图片可以保存哦</div>
            <div class="tip2">分享到朋友圈看大家如何评论你的秘密</div>
            <div class="try-again">再玩一次</div>
        </div>
    </div>


{{/block}}