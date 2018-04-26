{{*
    @file 考研-线上推广
    @author chenmo
    @date 16/4/21
*}}
{{extends file="page/_base/base.tpl"}}
{{block name="page"}}
    {{$page_title = "跟谁学考研"}}

    {{$page_module = "page/kaoyan/onlineAdvert/onlineAdvert"}}

    {{$enable_backTopButton = false}}
{{/block}}
{{block name="data"}}
{{/block}}
{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/kaoyan/onlineAdvert/onlineAdvert.styl"/>
{{/block}}
{{block name="content"}}

    <div id="main">
        <div class="header">
            <img width="100%" height="100%" data-src="./images/bg_kytg_toppic.png">
            <div class="intro text-ellipse">陈正康考研英语词汇课免费送</div>
        </div>

        <div class="content">
            {{*老师信息*}}
            <div class="teacher-info">

            </div>
            {{*课程信息*}}
            <div class="course-info">

            </div>
            {{*发送手机号*}}
            <div class="send-mobile">
                <input class="input-mobile" type="text" placeholder="请输入手机号">
            </div>
            <p class="tip1">请确保手机号正确，才能收到兑换码短信</p>
            <div class="submit ">
                <span>
                     领取兑换码
                </span>
            </div>
            <p class="tip2">若兑换过程中遇到问题，请加Q群：438127278。</p>
            <div class="exchange-rule">
                <p class="rule-title">兑换说明:</p>
                <p class="rule-content line1">1.输入手机号，点击"领取兑换码"，完成活动分享。</p>
                <p class="rule-content line2">2.您分享的活动页被再次打开后，即可收到兑换码短信。</p>
                <p class="rule-content line3">3.下载跟谁学考研APP，在"我的"里进入课程兑换码完成课程兑换。</p>
                <p class="rule-content line4">先到先得，手慢无，赶快分享领取。</p>
            </div>
        </div>
        <div class="bottom">

            <div class="app-intro">
                <div class="wrap">
                    <div class="logo">
                        <img width="100%" height="100%" data-src="./images/kaoyan-icon@2x.png" >
                    </div>
                    <div class="right">
                        <p class="app-name">跟谁学考研APP</p>
                        <p class="slogan">考研人的专属神器</p>
                    </div>
                </div>
            </div>

            <div class="download">
                <a href="/download/go" target="_blank">
                    立即下载体验
                </a>

            </div>
            {{*<p class="ios-tip">iphone设备点击右上角"..."用safari打开下载</p>*}}

            <footer>
                Copyright&copy;genshuixue.com
            </footer>
        </div>
    </div>
{{/block}}