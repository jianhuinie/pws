{{$base_info = $queryOneOnOneCourse.teacher}}
<section class="introduce">
    <div class="header-line">
        <span class="title">自我介绍</span>

        {{if $base_info.audio}}
            <span class="audio analysis-habo-log" 
                data-url="{{$base_info.audio.url}}"  
                data-length="{{$base_info.audio.length_seconds}}"
                data-habo-type=" YouXuan_Introduce_Voice" 
                data-habo-stype=" YouXuan_Introduce_Voice">
                <i class="icon icon-ic_voice"></i>
                <img class="play-icon-dynamic hide" src="https://imgs.genshuixue.com/0cms/d/file/content/2017/03/58be553807bc0.gif">
                <span class="audio-length" data-length="{{$base_info.audio.length_seconds}}"></span>
            </span>
        {{/if}}
    </div>

    <div class="cross-line"></div>

    <div class="content">
        <div class="introduction">
            {{$base_info.introduce}}
        </div>

        <div class="tags">
            {{foreach $base_info.display_skills as $item}}
                <span class="item">{{$item.title}}</span>
            {{/foreach}}
        </div>

        {{if $base_info.display_skills}}
            <div class="more-skills hide">
                <i class="icon icon-angle-down"></i>
            </div>
        {{/if}}
        {{$videoContentLength = $queryOneOnOneCourse.videos|count}}
        {{if isset($queryOneOnOneCourse.videos) && $videoContentLength > 0}}
        <div class="video-content analysis-habo-log"
            data-habo-type="YouXuan_Introduce_Video" 
            data-habo-stype="YouXuan_Introduce_Video"
        >
            {{foreach $queryOneOnOneCourse.videos as $it}}
                {{if $it@index == 0}}
                    {{$videoItem = $it}}
                {{/if}}
            {{/foreach}}
            {{if isset($videoItem) && $videoItem.play_url_m}}
                {{*<div class="cover">
                    <img class="cover-img" data-src="{{$videoItem.cover_url}}">
                    <div class="mask-icons"></div>
                    <i class="icon icon-caret-right2"></i>
                </div>*}}

                <iframe class="video-frame" frameborder="no" src="{{$videoItem.play_url_m}}"></iframe>
            {{/if}}
        </div>
        {{/if}}
        <div class="pics-content clearfix">
            {{foreach $queryOneOnOneCourse.photos as $ite}}
                {{if $ite@index < 4}}
                    <img class="retina analysis-habo-log" 
                        data-src="{{$ite.image_url}}" 
                        data-index="{{$ite@index}}" 
                        data-habo-type="YouXuan_Introduce_Pic" 
                        data-habo-stype="YouXuan_Introduce_Pic"
                        {{if $ite@index === 0}}style="margin: none;"{{/if}}
                        {{if isset($ite.title) && $ite.title}}data-title="{{$ite.title}}{{/if}}"
                        >
                {{/if}}
            {{/foreach}}
        </div>
    </div>
</section>