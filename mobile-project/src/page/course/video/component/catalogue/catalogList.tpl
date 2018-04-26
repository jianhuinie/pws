{{if !empty($videoCourse.video_items)}}
<div class="tabs class-catalogue" data-tab="class-catalogue">
    <div class="class-sum">
        共{{$videoCourse.video_items|count}}节课
    </div>
    {{foreach $videoCourse.video_items as $item}}

    {{if  $videoCourse.price > 0}}
        {{if $item.pay_status == 3}}
            {{$li_width = "65%"}}
            {{$able = "listen-able"}}
        {{else if $item.can_access}}
            {{$li_width = "100%"}}
            {{$able = "listen-able"}}
        {{else}}
            {{$li_width = "100%"}}
            {{$able = "listen-unable"}}
        {{/if}}
    {{else}}
        {{$li_width = "100%"}}
        {{$able = "listen-able"}}
    {{/if}}
    <ul class="class-sections {{$able}}" data-section-id="{{$item.section_id}}">
        <li class="item-title" style="width:{{$li_width}};">
            <p class="video-title">{{$item.index}}.{{$item.title}}</p>
            <p class="class-long">{{$item.long}}</p>
        </li>
        {{if $videoCourse.price > 0 && $item.pay_status == 3}}
        <li class="item-listen-play">
            <div>
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2015/12/5684e697971ab.png">
                <span class="character">免费试听</span>
            </div>
        </li>
        {{/if}}
    </ul>
    {{/foreach}}
</div>
{{else}}
<div class="no-class-catalogue">
    暂无目录信息
</div>
{{/if}}