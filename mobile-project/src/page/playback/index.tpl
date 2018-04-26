{{*
    @file 观看回放
    @author huangshiming
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = $tpl_data.title}}
    {{$page_module = "page/playback/index"}}
    {{$enable_backTopButton = false}}
    {{$isNeedScale = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
    {{$type = 0}}
    {{if $smarty.get.type}}
        {{$type = 1}}
    {{/if}}

     {{if $env == 'www'}}
     {{$script_data.env = 'production'}}
     {{else if $env == 'test'}}
     {{$script_data.env = 'test'}}
     {{else}}
     {{$script_data.env = 'beta'}}
     {{/if}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/playback/index.styl"/>
    {{if $env == 'test' || $env == 'env'}}
    <link href="https://test-live-m.genshuixue.com/asset/playback/main.css?v={{$smarty.now}}" rel="stylesheet" type="text/css"/>
    {{else if $env == 'beta'}}
    <link href="https://beta-live-m.genshuixue.com/asset/playback/main.css?v={{$smarty.now}}" rel="stylesheet" type="text/css"/>
    {{else}}
    <link href="https://live-m-cdns.genshuixue.com/asset/playback/main.css?v={{$smarty.now}}" rel="stylesheet" type="text/css"/>
    {{/if}}
{{/block}}

{{block name="content"}}

{{*include file="page/_common/nav_bar/nav_bar.tpl" text={{$tpl_data.latest_encode.title}}*}}

{{if !($tpl_data.is_finish == true || $type == 1)}}
<div class="header" id="header">
    <img class="cover" data-src="{{$tpl_data.play_background}}">
    <div class="cover-mask"></div>
    <div class="header-content" data-room="{{$tpl_data.pre_item.room_no}}">
        <div class="title">第{{$tpl_data.pre_item.pre_id}}节课已经结束</div>
        {{$playBackStatus = $tpl_data.pre_item.replay_status}}
        {{$isHisotryPlayBack = 1}}
        {{if $playBackStatus == 1}}
            {{if isset($tpl_data.latest_encode) && $tpl_data.latest_encode}}
                {{if $tpl_data.latest_encode.exp_finsh_time}}
                <div class="toast">预计{{$tpl_data.latest_encode.exp_finsh_time}}生成回放</div>
                {{else}}
                <div class="toast">回放生成中，请耐心等待</div>
                {{/if}}
            {{else}}
            {{$isHisotryPlayBack = 0}}
            <div class="toast">你可以观看回放了</div>
            {{/if}}
        {{else}}
            <div class="toast">该节课未录制视频，请观看历史回放</div>
        {{/if}}

        {{if !empty($tpl_data.playback_list)}}
        <div class="buttons playBackMainButton clickWat" data-roomno="{{$tpl_data.pre_item.room_no}}" data-stype="HistoryReplay_click">
            <span class="toast">
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/58343576b031f.png">{{if $isHisotryPlayBack == 1}}观看历史回放{{else}}观看回放{{/if}}
            </span>
        </div>
        {{/if}}

        <div class="next">第{{$tpl_data.next_item.next_id}}节课将在{{$tpl_data.next_item.time}}上课</div>
    </div>
</div>
{{/if}}

<div class="videoContent" id="videoContent"  data-status="0"></div>

<div class="nav">
    <div class="talk"><div>聊天</div></div>
    <div class="list"><div class="active">目录</div></div>
</div>

<div class="content-box">
    <div class="content" id="content">

        {{$playListLength = $tpl_data.playback_list|count}}
        {{foreach $tpl_data.playback_list as $item}}
        <div class="item clickWat  playBackButton" data-status="3" data-stype="Catalog_Click" data-roomno="{{$item.room_no}}" data-url="{{$item.play_url}}">
            <div class="index{{if $item.room_no == $tpl_data.pre_item.room_no}} active{{/if}}" data-index="{{$item@index}}">{{$item@index + 1}}</div>
            <div class="infos">
                {{if $item.title}}
                    <div class="title line-clamp line-clamp-2{{if $item.room_no == $tpl_data.pre_item.room_no}} active{{/if}}">{{$item.title}}</div>
                {{else}}
                    <div class="title{{if $item.room_no == $tpl_data.pre_item.room_no}} active{{/if}}">第{{$item.index}}节课</div>
                {{/if}}
                <div class="time-line">
                    <div class="time line-clamp{{if $item.room_no == $tpl_data.pre_item.room_no}} active{{/if}}">{{$item.time}}</div>
                    {{if isset($item.expire_time) && $item.expire_time}}
                    <div class="time line-clamp{{if $item.room_no == $tpl_data.pre_item.room_no}} active{{/if}}">有效期至{{$item.expire_time}}</div>
                    {{/if}}
                </div>
            </div>
            <div class="play-butons clickWat" data-stype="CatalogReplay_Click"><img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/12/5845213942143.png">看回放</div>
        </div>
        {{/foreach}}


        {{$playEncodeListLength = $tpl_data.encoding|count}}
        {{foreach $tpl_data.encoding as $item}}
        <div class="item encoding-room clickWat" data-status="2" data-number="{{$item.room_no}}" data-stype="Catalog_Click">
            <div class="index" data-index="{{$item@index}}">{{$item@index + $playListLength + 1}}</div>
            <div class="infos">
                {{if $item.title}}
                    <div class="title line-clamp line-clamp-2">{{$item.title}}</div>
                {{else}}
                    <div class="title">第{{$item.index}}节课</div>
                {{/if}}
                <div class="time">{{$item.time}}</div>
            </div>
            <div class="play-text">回放生成中</div>
        </div>
        {{/foreach}}

        {{foreach $tpl_data.unstart_courses as $item}}
        <div class="item unstart-room clickWat" data-status="1" data-stype="Catalog_Click">
            <div class="index" data-index="{{$item@index}}">{{$item@index + $playListLength + $playEncodeListLength + 1}}</div>
            <div class="infos">
                {{if $item.title}}
                    <div class="title line-clamp line-clamp-2">{{$item.title}}</div>
                {{else}}
                    <div class="title">第{{$item.index}}节课</div>
                {{/if}}
                <div class="time">{{$item.time}}</div>
            </div>
            <div class="play-text un-start">未开始</div>
        </div>

        {{/foreach}}

    </div>

    <div class="talk-content" id="talk"></div>
</div>

<div class="bottom clickWat" data-stype="Download_Click">
    <span class="text">使用跟谁学APP，下载回放随时看</span>
    <img class="close" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/5836ba7ac01fb.png">
</div>

{{$envs = 'test'}}
{{if $env == 'beta' }}
    {{$envs = 'beta'}}
{{else if $env == 'www'}}
    {{$envs = 'www'}}
{{/if}}
<script {{if $envs == 'test'}} 
        src="https://test-live-m.genshuixue.com/asset/playback/main.js?v={{$smarty.now}}"
    {{else if $envs == 'beta'}} 
        src="https://beta-live-m.genshuixue.com/asset/playback/main.js?v={{$smarty.now}}"
    {{else}} 
        src="https://live-m-cdns.genshuixue.com/asset/playback/main.js?v={{$smarty.now}}"
    {{/if}}
></script>
{{/block}}

