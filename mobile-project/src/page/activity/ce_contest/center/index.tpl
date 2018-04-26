{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "个人中心"}}

    {{$page_module = "page/activity/ce_contest/center/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/ce_contest/center/css/index.styl"/>
{{/block}}

{{block name="content"}}
    {{include file="page/_common/nav_bar/nav_bar.tpl" text="个人中心"}}

    {{if $tpl_data.has_pay=='1'}}
        <div class="center center-info clearfix">
            <div class="center-info-avatar left">
                <img class="img-background" src="{{$tpl_data.avatar}}">
            </div>
            <div class="center-info-detail left">
                <div class="center-info-name">{{$tpl_data.name}}</div>
                <div>编号：{{$tpl_data.number}}</div>
                <div>组类：{{$tpl_data.grade}}</div>
                <div class="line-clamp">才艺：{{$tpl_data.talent}}</div>
            </div>
        </div>
        <div class="center center-plan">
            <h2 class="title center-plan-title">我的进度</h2>

            <div class="plan-list">
                {{foreach $tpl_data.process as $item}}
                    <div class="plan-item plan-item-color{{$item.color}}">
                        <div class="plan-item-icon">
                            <div class="plan-item-icon-sub">&nbsp;</div>
                        </div>
                        <div class="plan-item-text">{{$item.title}} {{$item.time}}<span
                                    class="plan-item-status">{{$item.text}}</span>
                        </div>
                    </div>
                {{/foreach}}
            </div>
        </div>
        <div class="center center-video">
            <h2 class="title center-video-title">我的参赛视频</h2>

        </div>
        <div class="center-video-object" {{if $tpl_data.video_status == '70'}}style="background-color: #000;line-height: 0px;"{{/if}}>
            {{if $tpl_data.video_status == '70'}}
                <div class="mask">
                    <img class="mask-dialog" src="{{$tpl_data.poster}}" />
                    <img id="video-start" class="icon" src="{{$static_origin}}/src/page/activity/ce_contest/center/img/start.png"/>
                </div>
                <video id="video" controls="controls"
                       poster=""
                       preload="meta"
                       src="{{$tpl_data.video_addr}}"></video>
            {{elseif $tpl_data.video_status == '0'}}

                <div style="line-height: 20px;padding-top:60px;">
                    请在电脑上登录，查看活动介绍并上传视频<br/>网页地址：2016.genshuixue.com
                </div>

            {{else}}
                暂时无法播放
            {{/if}}
        </div>
        <div class="center center-video">
            <div class="center-video-info clearfix">
                <div class="source left"><img class="single-icon" data-src="{{$static_origin}}/src/page/activity/ce_contest/center/img/count.png" />票数：<span class="count">{{$tpl_data.vote_count}}</span></div>
                <div class="ranking left"><img class="single-icon" data-src="{{$static_origin}}/src/page/activity/ce_contest/center/img/rank.png">排名：<span>{{$tpl_data.rank}}</span></div>
            </div>
        </div>

    {{else}}
        <div class="container">
            <p>{{$tpl_data.nickname}},您好～</p>
            <p>您尚未报名，请先</p>

            <div class="submit"><a href="/uk/edit">前往报名</a></div>
        </div>
    {{/if}}
{{/block}}
