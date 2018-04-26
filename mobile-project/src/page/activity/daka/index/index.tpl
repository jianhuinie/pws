{{*
@file 起床签到
@author hanzhaohang
@date 2016-06-17
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "每日签到"}}
    {{$page_module = "page/activity/daka/index/index"}}
    {{$enable_backTopButton = false}}
    {{$isNeedScale = false}}
{{/block}}
{{block name="data"}}
    {{$script_data["shareInfo"] = $tpl_data["share_info"]}}

{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/daka/index/index.styl"/>
{{/block}}
{{block name="content"}}
    {{$td = $tpl_data}}
    <div class="content">
        <div class="page_top">
            {{if isset($td.total_credit)}}
                <p class="my_score" style="display:none;">我的学分&nbsp;{{$td.total_credit}}</p>
            {{/if}}
            <a href="{{$td.score_market}}" id="score_market">
                <p class="score_market">学分商城</p>
            </a>
        </div>
        {{if !$td.has_sign}}
            <div class="daka_btn">签到</div>
        {{/if}}
        <div class="content-panel">
        {{$si = $tpl_data.sign_info}}
        {{if isset($si)}}
            <div class="card_parent">
                <div class="sign_card">
                    <div class="content-box">
                        <div class="t-01 tstyle"></div>
                        <div class="t-02 tstyle"></div>
                        <div class="detail-content">
                            <div class="content-p">
                                <div class="up-img">
                                    <img width="100%" height="auto" whs="1" data-src="{{$si.my_info.avatar}}">
                                </div>
                            </div>
                            <div class="sign-time">
                                <p class="should-do">
                                    <span class="date">{{$si.now_day}}</span>
                                    <span class="week">{{$si.now_week}}</span>
                                    <span class="suggestion">{{$si.fit_tag}}</span>
                                </p>
                                <div class="time-parent" style="padding: 12px 0">
                                <div class="time-line" id="time-line-1" style="display:none">
                                    <span class="sign_tip">签到成功</span>
                                    <div class="honor">
                                        {{if $si.is_mine}}你{{else}}{{$si.my_info.name}}{{/if}}获得<span class="w_score">{{$si.integral}}</span>学分
                                    </div>
                                </div>
                                <div class="time-line" id="time-line-2" style="display:none">
                                    <div style="height: 54px;">
                                        <span class="icon">
                                            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/57663a7960273.png">
                                        </span>
                                        <span class="time">{{$si.now_time}}</span>
                                    </div>
                                    <div class="honor">
                                        {{if $si.is_mine}}你{{else}}<span>{{$si.my_info.name}}</span>{{/if}}是第<span>{{$si.get_up_num}}</span>个起床的同学，获得<span>{{$si.integral}}</span>学分
                                    </div>
                                </div>
                                </div>
                                <script type="text/javascript">
                                    var cTime = parseInt('{{$si.now_time}}');
                                    if (cTime >= 5 && cTime < 10) {
                                        document.getElementById('time-line-2').style.display="block";
                                    } else {
                                        document.getElementById('time-line-1').style.display="block";
                                    }
                                </script>
                            </div>
                            <div class="micro-line">
                                <p>
                                    <span class="h5">
                                    微知识
                                </span>
                                <span class="title">{{$si.knowledge.title}}</span>
                                </p>
                                <p class="m-content">{{$si.knowledge.content}}</p>
                            </div>
                            <div class="share-line">
                                <div class="icon-line">
                                    <div>
                                        晒一晒
                                    </div>
                                </div>
                                <div class="action-line">
                                    <p class="share-icon" type="hy"></p>
                                    <p class="share-icon" type="pyq"></p>
                                    <p class="share-icon" type="pyq"></p>
                                    <p class="share-icon" type="pyq"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        {{/if}}

                <div class="sign_card" style="display:none;">
                    <div class="content-box">
                        <div class="t-01 tstyle"></div>
                        <div class="t-02 tstyle"></div>
                        <div class="detail-content">
                            <div class="content-p">
                                <div class="up-img">
                                    <img width="100%" height="auto" whs="1" data-src="https://imgs.genshuixue.com/30573_rq4bmwug.jpeg">
                                </div>
                            </div>
                            <div class="sign-time">
                                <p>起床时间</p>
                                <div class="time-line">
                                    <span class="time">签到成功</span>
                                </div>
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
                    </div>
                </div>


            <div style="height:30px;"></div>
            <div class="c_m">
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/5763a84455d3f.png">

            </div>
            <div class="detail_content">
                <div class="top-title">
                    起床签到排行榜
                </div>
                {{function getIndexIcon}}
                    {{if $cIndex == 0}}
                        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/5763b899709de.png">
                    {{else if $cIndex == 1}}
                        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/5763b8992f14a.png">
                    {{else if $cIndex == 2}}
                        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/5763b8990e299.png">
                    {{else if $cIndex > 2 && $cIndex <= 9}}
                        <span style="color:#f57c00;">{{$cIndex+1}}</span>
                    {{else}}
                        <span style="color:#6d6d6e;">{{$cIndex+1}}</span>
                    {{/if}}
                {{/function}}
                {{function getItems}}
                    <li {{if $needNum == true}}style="background: rgba(247,208,105,0.1);"{{/if}}>
                        <a href="{{$cItem.url}}">
                            <div class="item-info">
                                <div class="u-img">
                                    <img width="100%" height="auto" whs="1" src="{{$cItem.avatar}}">
                                </div>
                                <div>
                                    <div class="u-logined">
                                        <p class="u-name">
                                            {{$cItem.name}}
                                        </p>
                                        <p class="u-quit">{{$cItem.tag}}</p>
                                    </div>
                                </div>
                                <div class="rank">
                                    {{if $needNum == true}}
                                        {{$cIndex}}
                                    {{else}}
                                        {{getIndexIcon cIndex=$cIndex}}
                                    {{/if}}
                                </div>
                            </div>
                        </a>
                    </li>
                {{/function}}
                <ul class="user_items">
                {{if isset($td.sign_info) && !empty($td.sign_info.my_info)}}
                    {{getItems cItem = $td.sign_info.my_info cIndex = $td.sign_info.get_up_num needNum=true}}
                {{/if}}
                {{foreach $td.list as $cItem}}
                    {{getItems cItem = $cItem cIndex = $cItem@index  needNum=false}}
                {{/foreach}}
                <span id="list_count" style="display:none;">{{count($td.list)}}</span>
                {{if count($td.list) == 0}}
                <li class="none-data">
                    <p class="none-img">
                        <img src="https://imgs.genshuixue.com/0cms/d/file/content/2015/09/55f8e0dbd6576.png">
                    </p>
                    <p class="nont-text">
                        还没有人签到哦，快来抢沙发吧
                    </p>
                </li>
                {{/if}}
                </ul>
                {{if $tpl_data.pager.has_more}}
                     <div id="more-button" class="more-button" style="" next_cursor="1">
                            <div class="text">点击查看更多</div>
                            <div class="typing_loader"></div>
                        </div>
                {{/if}}

            </div>
            </div>
        </div>

    </div>
    <div class="share-mask" style="display: none;"> <div class="content"> <img width="100%" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/03/56e91f33723af.png"> </div> </div>

{{/block}}