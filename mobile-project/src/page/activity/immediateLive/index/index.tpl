{{*
    @file 即时直播页面 H5 活动页
    @author nanci
    @date 2016-11-04
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "直播不能停 高手再来战"}}

    {{$page_module = "page/activity/immediateLive/index/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/immediateLive/index/index.styl"/>
{{/block}}

{{block name="content"}}

{{include file="page/_common/nav_bar/nav_bar.tpl" text="直播不能停 高手再来战"}}

    <header class="block-header">
        <img data-src="{{$static_origin}}/src/page/activity/immediateLive/index/image/top.png" alt="" class="img">
        <p class="guide">
            继续挑战，成为网络大咖老师！
        </p>
    </header>
    <div class="rank-links">
        <a href="/tcenter/live_rank/getStudentCount?type=1&page=1" class="total-entry">
            <img data-src="{{$static_origin}}/src/page/activity/immediateLive/index/image/rank-total-entry.png" alt="">
        </a>
        <a href="/tcenter/live_rank/getStudentCount?type=0&page=1" class="single-entry">
            <img data-src="{{$static_origin}}/src/page/activity/immediateLive/index/image/rank-single-entry.png" alt="">
        </a>
    </div>
    <div class="block-rule">
        <div class="title title-rule">活动规则</div>
        <img class="prize-img" data-src="{{$static_origin}}/src/page/activity/immediateLive/index/image/rule.png">
        <a href="https://m.genshuixue.com/forum/postBrowse/58380" target="_blank" class="activity-guide">活动攻略</a>
    </div>
    <footer class="block-footer">
        <p>
            Copyright @ 2014-2017 北京百家互联科技有限公司版权所有.
        </p>
        <p>
            京公网安备11010802015210号|京ICP备14027590号-1
        </p>
    </footer>

{{/block}}