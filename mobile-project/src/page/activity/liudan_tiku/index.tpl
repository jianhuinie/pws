{{*
    @file 留单
    @author wuxuelan
    @date 2016-02-28
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "跟谁学 - 找好老师，上跟谁学"}}

    {{$page_module = "page/activity/liudan_tiku/index"}}

    {{$enable_backTopButton = true}}
{{/block}}
{{block name="_data"}}
<!-- adhoc sdk -->
<script src=http://www.appadhoc.com/downloads/sdk/ab.js></script>
<script>
    adhoc.init('ADHOC_0d4ee230-4a96-4af6-a89e-0f457b478eff');
</script>
<!-- adhoc sdk end -->
{{/block}}

{{block name="data"}}

{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/liudan_tiku/index.styl"/>
{{/block}}

{{block name="content"}}
<script type="text/javascript">
    function go(hr) {
        location.href = hr;
    }
</script>

{{*include file="page/_common/nav_bar/nav_bar.tpl" text="【你的名字】写在手心里的秘密"*}}
    <div class="container">
        <a name="0" class="aClass"></a>
        {{* 留单form *}}
        {{include file="page/activity/liudan_tiku/_part/header.tpl"}}
        {{* 留单-为什么到跟谁学找好老师 *}}
        {{include file="page/activity/liudan_tiku/_part/case.tpl"}}
        {{* 留单-我们的愿景 *}}
        {{include file="page/activity/liudan_tiku/_part/video.tpl"}}
        {{* 留单-我们的承诺 *}}
        {{include file="page/activity/liudan_tiku/_part/promise.tpl"}}
        {{* 留单-footer *}}
        {{include file="page/activity/liudan_tiku/_part/footer.tpl"}}
        <div class="mask-container" style="display:none;">
            <div class="success-dialog">
                <p class="title center">您已预约成功</p>
                <p class="content center">
                    扫一扫下方二维码或添加学习顾问微信号<span>gsxptlaoshi</span>，优先安排试听
                </p>
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2017/03/58be26cc5d760.jpeg"
                     alt="" class="q-card">
                <span class="icon icon-close"></span>
            </div>
        </div>
    </div>
{{/block}}