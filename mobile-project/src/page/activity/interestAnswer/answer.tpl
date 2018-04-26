{{*
@file 答题页面（活动）
@author caoying
@date 2016-03-08
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = "2016让你顺利脱单的音乐秘籍"}}
    {{$page_module = "page/activity/interestAnswer/answer"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data.shareInfo = json_encode($tpl_data.share_info)}}
    {{$script_data["page_type"] = $ext_data.page}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/interestAnswer/answer.styl"/>
{{/block}}

{{block name="content"}}
    <div id="main">
        <div class="auto-block">
            <span class="icon-music"></span>
            <audio autoplay="autoplay" loop="loop" src="{{$static_origin}}/src/page/activity/interestAnswer/image/music.mp3"></audio>
        </div>
        <div class="cover active">

            <img width="100%" height="100%" data-src="{{$static_origin}}/src/page/activity/interestAnswer/image/back_ground.jpg">
            <span class="change-page">
                <img src="{{$static_origin}}/src/page/activity/interestAnswer/image/nextPage.png"/>
            </span>
        </div>
        <div class="question">
            <div class="first-content parent" data-next="second-content">
                <div class="home-outer">
                    <img width="100%" height="100%" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e677b083869.png">
                    <div class="figure">
                        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e677c17c326.jpg">
                    </div>
                    <div class="first-button" data-name="first" data-value="E">

                    </div>
                    <div class="second-button" data-name="second" data-value="I">

                    </div>
                    <img class="choose" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e6b3a3183f0.png">
                </div>
            </div>
            <div class="second-content parent" data-next="third-content">
                <div class="taste-feel">
                    <img width="100%" height="100%" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e77ee092ebe.png">
                    <div class="figure">
                        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e77b254cef1.jpg">
                    </div>
                    <div class="first-button" data-name="first" data-value="S">

                    </div>
                    <div class="second-button" data-name="second" data-value="N">

                    </div>
                    <img width="200px" class="choose" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e6b3a3183f0.png">
                </div>
            </div>

            <div class="third-content parent" data-next="forth-content">
                <div class="happy-logic">
                    <img width="100%" height="100%" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e782f88d41a.png">
                    <div class="figure">
                        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e78651675c5.jpg">
                    </div>
                    <div class="first-button" data-name="first" data-value="F">

                    </div>
                    <div class="second-button" data-name="second" data-value="T">

                    </div>
                    <img width="200px" class="choose" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e6b3a3183f0.png">
                </div>
            </div>

            <div class="forth-content parent" data-next="answer-content">
                <div class="order-activate">
                    <img width="100%" height="100%" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e7868730484.png">
                    <div class="figure">
                        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e78686d4b62.jpg">
                    </div>
                    <div class="first-button" data-name="first" data-value="J">

                    </div>
                    <div class="second-button" data-name="second" data-value="P">

                    </div>
                    <img width="200px" class="choose" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e6b3a3183f0.png">
                </div>
            </div>
        </div>

        <div class="result">
            <div class="result-info">
            </div>
            <div class="bottom">
                <img width="100%" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e7b1dc937b3.jpg">
            </div>
            <div class="repeat-test">

            </div>
            <div class="share-friend">

            </div>
            <div class="find-teacher">

            </div>
        </div>
    </div>

    {{* 微信分享页面遮罩层 *}}
    <div class="share-mask">
        <div class="content">
            <img width="100%" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e91f33723af.png"/>
        </div>
    </div>
{{/block}}