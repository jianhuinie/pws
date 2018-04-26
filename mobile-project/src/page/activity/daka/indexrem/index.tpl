{{*
@file 起床签到
@author hanzhaohang
@date 2016-06-17
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "每日签到"}}
    {{$page_module = "page/activity/daka/indexrem/index"}}
    {{$enable_backTopButton = false}}
{{/block}}
{{block name="data"}}

{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/daka/indexrem/index.styl"/>
{{/block}}

{{block name="content"}}
    <div class="content">
        <div class="page_top">
            <p class="my_score">我的学分230</p>
            <p class="score_market">学分商城</p>
        </div>
        <div class="daka_btn">签到</div>
        <div class="c_m">
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/5763a84455d3f.png">
        </div>
        <div class="dialog_1">
            <div class="dialog">
            <div class="close-btn"></div>
                <div class="top_tip">
                    <span class="date">4月19日</span>
                    <span class="week">星期五</span>
                    <span class="suggestion">宜沐浴</span>
                </div>
                <div class="info-line" style="di">
                    <div class="time-line">
                        <span class="icon">
                            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/5763c0c91494d.png">
                        </span>
                        <span class="time">9:30</span>
                    </div>
                    <div class="honor">
                    你是第<span>235</span>个起床的同学，获得<span>235</span>个学分
                    </div>
                </div>

                <div class="micro-line">
                    <p class="h5">微知识</p>
                    <p>爱情是一种偏见。你爱你需要的，你爱你使你感觉好的，你爱你方便的。当你知道只要有机会认识世界上还有。</p>
                </div>
                <div class="share-line"></div>
            </div>

        </div>
        <div class="detail_content">
            <div class="top-title">
                起床签到排行榜
            </div>
            <ul class="user_items">
                <li>
                    <div class="item-info">
                        <div class="u-img">
                            <img width="100%" height="auto" whs="1" src="https://imgs.genshuixue.com/30573_rq4bmwug.jpeg@50w_50h_2x_70Q_0i_1e_1c_1o_1wh_1pr.jpg">
                        </div>
                        <div>
                            <div class="u-logined">
                                <p class="u-name">韩兆行</p>
                                <p class="u-quit">语文数学</p>
                            </div>
                        </div>
                        <div class="rank">
                            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/5763b899709de.png">
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-info">
                        <div class="u-img">
                            <img width="100%" height="auto" whs="1" src="https://imgs.genshuixue.com/30573_rq4bmwug.jpeg@50w_50h_2x_70Q_0i_1e_1c_1o_1wh_1pr.jpg">
                        </div>
                        <div>
                            <div class="u-logined">
                                <p class="u-name">韩兆行</p>
                                <p class="u-quit">语文数学</p>
                            </div>
                        </div>
                        <div class="rank">
                            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/5763b899709de.png">
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-info">
                        <div class="u-img">
                            <img width="100%" height="auto" whs="1" src="https://imgs.genshuixue.com/30573_rq4bmwug.jpeg@50w_50h_2x_70Q_0i_1e_1c_1o_1wh_1pr.jpg">
                        </div>
                        <div>
                            <div class="u-logined">
                                <p class="u-name">韩兆行</p>
                                <p class="u-quit">语文数学</p>
                            </div>
                        </div>
                        <div class="rank">
                            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/5763b899709de.png">
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-info">
                        <div class="u-img">
                            <img width="100%" height="auto" whs="1" src="https://imgs.genshuixue.com/30573_rq4bmwug.jpeg@50w_50h_2x_70Q_0i_1e_1c_1o_1wh_1pr.jpg">
                        </div>
                        <div>
                            <div class="u-logined">
                                <p class="u-name">韩兆行</p>
                                <p class="u-quit">语文数学</p>
                            </div>
                        </div>
                        <div class="rank">
                            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/5763b899709de.png">
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-info">
                        <div class="u-img">
                            <img width="100%" height="auto" whs="1" src="https://imgs.genshuixue.com/30573_rq4bmwug.jpeg@50w_50h_2x_70Q_0i_1e_1c_1o_1wh_1pr.jpg">
                        </div>
                        <div>
                            <div class="u-logined">
                                <p class="u-name">韩兆行</p>
                                <p class="u-quit">语文数学</p>
                            </div>
                        </div>
                        <div class="rank">
                            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/5763b899709de.png">
                        </div>
                    </div>
                </li>
            </ul>

        </div>

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

{{/block}}