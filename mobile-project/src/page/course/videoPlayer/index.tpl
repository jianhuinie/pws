{{*
    @file 云端录制的视频课播放器页面
    @anthor huangshiming
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_module = "page/course/videoPlayer/index"}}
    {{$enable_backTopButton = false}}
    {{$isNeedScale = false}}
{{/block}}

{{block name="data"}}
    {{if isset($smarty.get.number) && $smarty.get.number}}
        {{$script_data.courseNumber = $smarty.get.number}}
    {{/if}}

    {{if isset($smarty.get.section_id) && $smarty.get.section_id}}
        {{$script_data.sectionId = $smarty.get.section_id}}
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
    <!-- <link rel="stylesheet" href="{{$static_origin}}/src/page/playback/index.styl"/> -->
    {{if $env == 'test' || $env == 'env'}}
    <link href="https://test-live-m.genshuixue.com/asset/playback/main.css?v={{$smarty.now}}" rel="stylesheet" type="text/css"/>
    {{else if $env == 'beta'}}
    <link href="https://beta-live-m.genshuixue.com/asset/playback/main.css?v={{$smarty.now}}" rel="stylesheet" type="text/css"/>
    {{else}}
    <link href="https://live-m-cdns.genshuixue.com/asset/playback/main.css?v={{$smarty.now}}" rel="stylesheet" type="text/css"/>
    {{/if}}
{{/block}}

{{block name="content"}}

<div class="player-box" id="playerBox">
</div>

{{$envs = 'test'}}
{{if $env == 'beta' }}
    {{$envs = 'beta'}}
{{else if $env == 'www'}}
    {{$envs = 'www'}}
{{/if}}

<script {{if $envs == 'test'}}src="https://test-live-m.genshuixue.com/asset/playback/main.js?v={{$smarty.now}}"{{else if $envs == 'beta'}}src="https://beta-live-m.genshuixue.com/asset/playback/main.js?v={{$smarty.now}}"{{else}}src="https://live-m-cdns.genshuixue.com/asset/playback/main.js?v={{$smarty.now}}"{{/if}}></script>
{{/block}}