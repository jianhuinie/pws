{{*
@file 起床签到
@author hanzhaohang
@date 2016-06-17
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "每日签到"}}
    {{$page_module = "page/activity/daka/sharePage/index"}}
    {{$enable_backTopButton = false}}
{{/block}}
{{block name="data"}}

{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/daka/sharePage/index.styl"/>
{{/block}}

{{block name="content"}}
    <div class="content">
        <div class="content-box">
            <div class="t-01 tstyle"></div>
            <div class="t-02 tstyle"></div>
            <div class="detail-content">
                <div class="content-p">
                    <div class="u-img">
                        <img width="100%" height="auto" whs="1" data-src="https://imgs.genshuixue.com/30573_rq4bmwug.jpeg">
                    </div>
                </div>
                <div class="sign-time">
                    <p>起床时间</p>
                    <div class="time-line">
                        <span class="icon">
                            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/57663a7960273.png">
                        </span>
                        <span class="time">9:30</span>
                        <div class="honor">
                        你是第<span>235</span>个起床的同学，获得<span>235</span>学分
                        </div>
                    </div>
                </div>
                <div class="micro-line">
                    <p>
                        <span class="h5">
                            微知识
                        </span>
                        <span class="title">睡觉睡觉熬了打</span>
                    </p>
                    <p class="m-content">爱情是一种偏见。你爱你需要的，你爱你使你感觉好的，你爱你方便的。当你知道只要有机会认识世界上还有。</p>
                </div>
            </div>
            <div class="action-btn">我也要参加</div>
        </div>

    <script type="text/javascript">
        (function() {
            var baseFontSize = 100;
            var baseWidth = 320;
            var clientWidth = document.documentElement.clientWidth || window.innerWidth;
            var innerWidth = Math.max(Math.min(clientWidth, 480), 320);
            var rem = 100;
            if (innerWidth > 362 && innerWidth <= 375) {
                rem = Math.floor(innerWidth / baseWidth * baseFontSize * 0.9);
            }
            if (innerWidth > 375) {
                rem = Math.floor(innerWidth / baseWidth * baseFontSize * 0.84);
            }
            window.__baseREM = rem;
            document.querySelector('html').style.fontSize = rem + 'px';
        }());
    </script>

    </div>

{{/block}}