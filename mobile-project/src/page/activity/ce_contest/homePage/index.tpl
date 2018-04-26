{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = $tpl_data.name|cat:"主页"}}

    {{$page_module = "page/activity/ce_contest/homePage/index"}}

    {{$enable_backTopButton = false}}

{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/ce_contest/homePage/css/index.styl"/>
{{/block}}

{{block name="content"}}
    {{include file="page/_common/nav_bar/nav_bar.tpl" text=$page_title}}
    <div class="center-video-object" {{if $tpl_data.video_status == '70'}}style="background-color: #000;line-height: 0px;"{{/if}}>
        {{if $tpl_data.video_status == '70'}}
            <div class="mask">
                <img class="mask-dialog" src="{{$tpl_data.poster}}" />
                <img id="video-start" class="icon" src="{{$static_origin}}/src/page/activity/ce_contest/homePage/img/start.png"/>
            </div>
        <video id="video" controls="controls"
               poster="{{$tpl_data.poster}}"
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
    <div class="center-homePage">
        <div class="center center-info clearfix">
            <div class="center-info-avatar left">
                <img class="img-background" src="{{$tpl_data.avatar}}">
            </div>
            <div class="center-info-detail left">
                <div class="center-info-name">{{$tpl_data.name}}</div>
                <div>编号：{{$tpl_data.number}}</div>
                <div>组类：{{$tpl_data.grade}}</div>
                <div class="line-clamp talent">才艺：{{$tpl_data.talent}}</div>
            </div>
        </div>
        <div class="center-video-info clearfix">
            <div class="source left"><img class="single-icon" data-src="{{$static_origin}}/src/page/activity/ce_contest/homePage/img/count.png" />票数：<span class="count" data-count="{{$tpl_data.vote_count}}">{{$tpl_data.vote_count}}</span></div>
            <div class="ranking left"><img class="single-icon" data-src="{{$static_origin}}/src/page/activity/ce_contest/homePage/img/rank.png" />排名：<span>{{$tpl_data.rank}}</span></div>
        </div>
        <div class="describe">
            <div class="describe-title">个人描述</div>
            <p>{{$tpl_data.description}}</p>
        </div>

        {{if $tpl_data.frozen == '0'}}
        {{if $tpl_data.can_vote != true}}
            <div class="center-video-canvassing">已投票</div>
        {{else}}
            <div data-number="{{$tpl_data.number}}" class="center-video-canvassing center-video-canvassing-active"><span class="icon-heart"></span> 投票</div>
        {{/if}}
        {{/if}}
    </div>
{{/block}}
