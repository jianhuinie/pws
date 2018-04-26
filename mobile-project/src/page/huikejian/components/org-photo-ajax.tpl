{{$photo_list = $tpl_data.list}}

{{foreach $photo_list as $media}}
    {{if $media.type eq 'video'}}
    <li class="video-style" >
        <a href="{{$media.url}}"></a>
        <div class="occupy"><img src=""></div>
        <img class="video-img" src="https://imgs.genshuixue.com/0cms/d/file/content/2015/08/55cff0b52469c.png">
        <img class="preface-img" data-src="{{$media.img}}" />
        {{if not empty($media.name)}}<strong>{{$media.name}}</strong>{{/if}}
    </li>
    {{elseif $media.type eq 'photo'}}
    <li class="photo-style" data-index="{{$media.index}}">
        <div class="occupy"><img src=""></div>
        <img  class="preface-img photo" data-src="{{$media.img}}">
        {{if not empty($media.name)}}<strong>{{$media.name}}</strong>{{/if}}
    </li>
    {{/if}}
{{/foreach}}