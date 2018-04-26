{{*
@file 高考首页（活动）超级专家落地页
@author huangshiming
@date 2016-05-16
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = "排行榜"}}
    {{$page_module = "page/activity/gaokao/rank/index"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/gaokao/rank/index.styl"/>
{{/block}}

{{block name="content"}}
    {{include file="page/_common/nav_bar/nav_bar.tpl" text="排行榜"}}

    <section class="rank-pics-1">
        <a href="http://interface.zhixue100.cn/wap/rank/salary_major.html">
            <img data-src="http://superfile.baijiahulian.com/images/rank/pic_gaoxinzhuanye.jpg">
        </a>
    </section>

    <section class="rank-pics">
        <a href="http://interface.zhixue100.cn/wap/rank/salary_career.html">
            <img data-src="http://superfile.baijiahulian.com/images/rank/pic_gaoxinzhiye.jpg">
        </a>
    </section>

    <section class="rank-pics">
        <a href="http://interface.zhixue100.cn/wap/rank/employment.html">
            <img data-src="http://superfile.baijiahulian.com/images/rank/pic_jiuyelv.jpg">
        </a>
    </section>

    <section class="rank-pics">
        <a href="http://interface.zhixue100.cn/wap/rank/master.html">
            <img data-src="http://superfile.baijiahulian.com/images/rank/pic_duyanbilv.jpg">
        </a>
    </section>

    <section class="rank-pics">
        <a href="http://interface.zhixue100.cn/wap/rank/boys_salary.html">
            <img data-src="http://superfile.baijiahulian.com/images/rank/pic_nanshengxinzi.jpg">
        </a>
    </section>

    <section class="rank-pics">
        <a href="http://interface.zhixue100.cn/wap/rank/boys_employment.html">
            <img data-src="http://superfile.baijiahulian.com/images/rank/pic_nanshengjiuyelv.jpg">
        </a>
    </section>

    <section class="rank-pics">
        <a href="http://interface.zhixue100.cn/wap/rank/girls_salary.html">
            <img data-src="http://superfile.baijiahulian.com/images/rank/pic_nvshengxinzi.jpg">
        </a>
    </section>

    <section class="rank-pics">
        <a href="http://interface.zhixue100.cn/wap/rank/girls_employment.html">
            <img data-src="http://superfile.baijiahulian.com/images/rank/pic_nvshengjiuyelv.jpg">
        </a>
    </section>

    <section class="rank-pics">
        <a href="http://interface.zhixue100.cn/wap/rank/science.html">
            <img data-src="http://superfile.baijiahulian.com/images/rank/pic_lixue.jpg">
        </a>
    </section>

    <section class="rank-pics">
        <a href="http://interface.zhixue100.cn/wap/rank/tech.html">
            <img data-src="http://superfile.baijiahulian.com/images/rank/pic_gongxue.jpg">
        </a>
    </section>

    <section class="rank-pics">
        <a href="http://interface.zhixue100.cn/wap/rank/economy.html">
            <img data-src="http://superfile.baijiahulian.com/images/rank/pic_jinjixue.jpg">
        </a>
    </section>

    <section class="rank-pics">
        <a href="http://interface.zhixue100.cn/wap/rank/law.html">
            <img data-src="http://superfile.baijiahulian.com/images/rank/pic_faxue.jpg">
        </a>
    </section>

    <section class="rank-pics">
        <a href="http://interface.zhixue100.cn/wap/rank/education.html">
            <img data-src="http://superfile.baijiahulian.com/images/rank/pic_jiaoyu.jpg">
        </a>
    </section>

    <section class="rank-pics">
        <a href="http://interface.zhixue100.cn/wap/rank/manager.html">
            <img data-src="http://superfile.baijiahulian.com/images/rank/pic_guanli.jpg">
        </a>
    </section>

    <section class="rank-pics last-one">
        <a href="http://interface.zhixue100.cn/wap/rank/medical.html">
            <img data-src="http://superfile.baijiahulian.com/images/rank/pic_yixue.jpg">
        </a>
    </section>

    <section class="share-infos">
        <p>这么好的专题，我得赶紧分享给小伙伴们!</p>
        <div class="share-button"><p>分享给小伙伴</p></div>
    </section>

    {{* 微信分享页面遮罩层 *}}
    <div class="share-mask">
        <div class="content">
            <img width="100%" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e91f33723af.png"/>
        </div>
    </div>
    {{include file="page/activity/gaokao/_part/index.tpl"}}
{{/block}}
