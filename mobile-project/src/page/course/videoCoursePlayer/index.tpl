{{*
    @file 普通视频课的承载页面
    @anthor huangshiming
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_module = "page/course/videoCoursePlayer/index"}}
    {{$enable_backTopButton = false}}
    {{$isNeedScale = false}}
{{/block}}

{{block name="data"}}
    <!-- {{if isset($smarty.get.token) && $smarty.get.token}}
        {{$script_data.token = $smarty.get.token}}
    {{/if}}

    {{if isset($smarty.get.vid) && $smarty.get.vid}}
        {{$script_data.vid = $smarty.get.vid}}
    {{/if}} -->

    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link href="https://www.baijiacloud.com/m/asset/playback/player.css?v={{$smarty.now}}"
          rel="stylesheet">
    <link rel="stylesheet" href="{{$static_origin}}/src/page/course/videoCoursePlayer/index.styl">
    <style>
        html,
        body {
            height: 100%;
            width: 100%;
            margin: 0;
        }
    </style>    
{{/block}}


{{block name="content"}}
    <div class="video-container" style="width: 100%; height: 100%;">
    </div>
    {{if $env == 'test' || $env == 'env'}}
    <script src="https://test-api.baijiacloud.com/m/playback/asset/playSDK/player.js?v={{$smarty.now}}"></script>
    {{else}}
    <script src="https://www.baijiacloud.com/m/asset/playback/player.js?v={{$smarty.now}}"></script>
    {{/if}}
{{/block}}

