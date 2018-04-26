<div id="fixed-top">
    <div id="video-wrap">
        <div id="video-image-panel">
            <img class="preface" width="100%" height="100%" data-src="{{$course_info.portrait}}">
            <i class="play-icon icon-ic_play  {{*未购买或有试听*}}
            {{if ($course_info.price > 0 && !$course_info.has_buy_course) || count($tpl_data.can_trial_items) > 0}}
                hide
            {{/if}}"></i>
        </div>
        <div id="video-container">
            {{if $tpl_data.course_info.video_play_url}}
                <iframe style="display: none;" id="player-frame" src=""></iframe>
            {{/if}}
        </div>
        {{if isset($tpl_data.is_juhuixue) && $tpl_data.is_juhuixue}}
            <div class="juhuixue-img">
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/568cb5148ca76.png">
            </div>
            <div class="juhuixue-tip" data-log="video-class-redirect" data-type="redirect-video-juhuiuxue">
                <span class="price">
                    {{if $onlyOnePrice > 0}}
                    <span class="symbol">￥</span>
                    <span class="price-detail">
                        {{$onlyOnePrice}}
                    </span>
                    {{else}}
                    <span class="price-detail">
                        免费
                    </span>
                    {{/if}}
                </span>
                <span class="sign-up">
                    <span class="character">已报名</span>
                    {{$course_info.payer_count}}
                </span>
                <p>
                    <span class="title"></span>
                </p>
                <a href="http://ju.m.genshuixue.com" class="class-link">
                    <p class="big" style="text-align:center;">聚惠学</p>
                    <p class="cheap">超值名师课</p>
                    <i class="icon icon-angle-right"></i>
                </a>
            </div>
        {{/if}}
        <div id="pay-tip"
            class="
            {{*未购买或有试听*}}
            {{if ($course_info.price > 0 && !$course_info.has_buy_course) || count($tpl_data.can_trial_items) > 0}}
            {{else}}
                hide
            {{/if}}
            "
        >
            <div class="tip-container">
                <div class="btn">
                    {{if count($tpl_data.can_trial_items) > 0}}
                        <a class="try-listen-button analysis-habo-log" data-habo-type="{{$gsType}}" data-habo-stype="caudition">免费试听</a>
                    {{elseif !$course_info.has_buy_course}}
                        <a class="pay-button analysis-habo-log" data-habo-type="{{$gsType}}" data-habo-stype="cbuy">前往购买</a>
                    {{/if}}
                </div>
                <div class="tips">购买后可学习整个课程</div>
            </div>
        </div>
    </div>
    <a style="display:none" id="video-download-wrap"
       href="{{if !preg_match('/jinyou/', $host)}}
                javascript:void(0);
              {{else}} http://jinyou.m.genshuixue.com/download/jinyou
              {{/if}}">
        <!--只有u盟为false-->
        {{if isset($tpl_data.is_u_meng) && $tpl_data.is_u_meng == true}}
        {{else}}
        <div class="video-download">
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/5768ade321704.png"/>
                提升3倍流畅度，安装跟谁学客户端
        </div>
        {{/if}}
    </a>
</div>