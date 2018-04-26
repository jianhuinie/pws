{{$media_list = $tpl_data.photo.list}}
<div class="photo-panel">
    {{if count($media_list) > 0}}
    <ul class="main-content">
        {{foreach $media_list as $media}}
        {{if $media.type eq 'video'}}
        <li class="video-style {{if ($media@index+1) mod 3 == 0}} margin-edge {{/if}}" >
            <a href="{{$media.url}}"></a>
            <span class="img-background">
                <img width="100%" height="100%" class="preface-img" clip-rc="1" data-src="{{$media.img}}" >
                <img class="video-img" src="{{$static_origin}}/src/page/teacherCenter/teacherMain/image/detail_video.png">
                {{if not empty($media.name)}}<strong>{{$media.name}}</strong>{{/if}}
            </span>

        </li>
        {{elseif $media.type eq 'photo'}}
        <li class="photo-style {{if ($media@index+1) mod 3 == 0}} margin-edge {{/if}}" data-index="{{$media.index}}">
            <span class="img-background">
                <img width="100%" height="100%" class="preface-img photo" clip-rc="1" data-src="{{$media.img}}" >
                {{if not empty($media.name)}}<strong>{{$media.name}}</strong>{{/if}}
            </span>
        </li>
        {{/if}}
        {{/foreach}}
    </ul>
    {{else}}
    <div class="none-content">
        暂无相册
    </div>
    {{/if}}
</div>