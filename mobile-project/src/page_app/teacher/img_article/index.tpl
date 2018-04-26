{{extends file="page_app/_base/base.tpl"}}

{{*页面配置*}}
{{block name="page" append}}
    {{*标题*}}
    {{$page_title = "预览"}}
    {{*页面入口模块, 例如:page/app_teacher/vip_index/index*}}
    {{$page_module = "page_app/teacher/img_article/index"}}
    {{*是否使用返回顶部的按钮*}}
    {{$enable_backTopButton = true}}
{{/block}}

{{*模板数据, 需要传递到js模块中的模板数据在这里配置*}}
{{block name="data"}}
    {{$script_data["data"] = $tpl_data}}
    {{$color = ""}}
    {{if isset($tpl_data.style) && $tpl_data.style}}
        {{$color = $tpl_data.style}}
    {{else}}
        {{$color = "white"}}
    {{/if}}
{{/block}}

{{*页面样式*}}
{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page_app/teacher/img_article/index.styl"/>
{{/block}}

{{*页面内容*}}
{{block name="content"}}

<div class="main main-{{$color}}">
    {{foreach $tpl_data.items as $item}}
        {{if $item.type == "title"}}
            <div class="title title-{{$color}}">{{$item.text}}</div>
        {{else if $item.type == "body"}}
            <div class="body" style="font-weight: {{$item.font_weight}}; font-size:{{$item.font_size}};
            text-align: {{$item.text_align}}; color:{{$item.color}};">{{$item.text}}</div>
        {{else if $item.type == "image"}}
            <div class="image img-{{$color}}">
                <img data-src="{{$item.url}}" alt="" style="width:100%; display: inherit;">
            </div>
        {{else if $item.type == "video"}}
            <div class="video-player" data-src="{{$item.url}}"
                 data-cover="{{$item.cover}}" data-id="{{$item.video_id}}">
                <div class="video-poster">
                    <div class="play-wrapper play-icon"></div>
                </div>
                <iframe style="display:none; border:0; background:#000;" src="" class="player-frame"></iframe>
            </div>
        {{else if $item.type == "audio"}}
            <div class="teacher-audio">
                <img class="audio-border" src="{{$static_origin}}/src/page_app/teacher/img_article/img/Rectangle.png">
                <img src="{{$static_origin}}/src/page_app/teacher/img_article/img/voice.png" alt="" class="audio-wave">
                <div audioplayer class="audio audio-player" data-play="0"
                     data-url="{{$item.url}}" data-length="{{$item.length}}"
                     data-wave="https://imgs.genshuixue.com/0cms/d/file/content/2016/07/579ac8fbb08ce.gif"
                     data-voice="https://imgs.genshuixue.com/0cms/d/file/content/2016/07/579ac8fb740f4.png">
                </div>
                {{if $item.length && $item.length > 0}}
                    <span class="audio-length">
                        {{if $item.length >= 60}}
                            {{floor($item.length/60)}}'{{$item.length%60}}"
                        {{else}}
                            {{$item.length}}"
                        {{/if}}
                    </span>
                {{/if}}
            </div>
        {{/if}}
    {{/foreach}}
</div>
<div class="bottom">
    <span class="style-title">样式：</span>
    <ul class="circle-ul">
        <li class="circle-li on" data-class="white">
            <span class="circle circle-none">
            <img src="{{$static_origin}}/src/page_app/teacher/img_article/img/check_gray.png" alt="" class="check">
            </span>
        </li>
        <li class="circle-li" data-class="black">
            <span class="circle circle-black">
            <img src="{{$static_origin}}/src/page_app/teacher/img_article/img/checked.png" alt="" class="check">
            </span>
        </li>
        <li class="circle-li" data-class="brown">
            <span class="circle circle-brown">
            <img src="{{$static_origin}}/src/page_app/teacher/img_article/img/checked.png" alt="" class="check">
            </span>
        </li>
        <li class="circle-li" data-class="pink">
            <span class="circle circle-pink">
            <img src="{{$static_origin}}/src/page_app/teacher/img_article/img/checked.png" alt="" class="check">
            </span>
        </li>
        <li class="circle-li" data-class="green">
            <span class="circle circle-green">
            <img src="{{$static_origin}}/src/page_app/teacher/img_article/img/checked.png" alt="" class="check">
            </span>
        </li>
        <li class="circle-li" data-class="blue">
            <span class="circle circle-blue">
            <img src="{{$static_origin}}/src/page_app/teacher/img_article/img/checked.png" alt="" class="check">
            </span>
        </li>
    </ul>


</div>
{{/block}}

{{*js脚本, 有些特殊情况js需要写在页面里的时候用写在这个block里*}}
{{block name="script"}}
    {{*<script></script>*}}
{{/block}}