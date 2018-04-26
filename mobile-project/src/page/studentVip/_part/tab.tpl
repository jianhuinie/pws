{{if $tpl_data.pager.has_more}}
    {{$has_more = 1}}
{{else}}
    {{$has_more = 0}}
{{/if}}
{{if isset($text) && $text=="child"}}
<div class="land-list" style="background: #3EBA65">
{{else}}
<div class="land-list">
{{/if}}
    <div class="list-container">
        <div class="list">
            {{foreach $tpl_data.class_name as $item}}
            {{if $item.checked == true}}
            <p class="list-item on" data-url="{{$item.url}}" data-has-more="{{$has_more}}" data-page="{{$tpl_data.pager.current_page}}">
            {{else}}
            <p class="list-item" data-url="{{$item.url}}">
            {{/if}}
                {{$item.name}}
            </p>
            {{/foreach}}
        </div>
        {{if isset($text) && $text=="child"}}
            <a href="/student/vip/childClassSearch">
        {{else}}
            <a href="/student/vip/topicSearch">
        {{/if}}
                {{if isset($text) && $text=="child"}}
                <div class="search" style="background: #3EBA65">
                {{else}}
                <div class="search" style="background: #954ba8">
                {{/if}}
                    <span class="line"></span>
                    <img class="ic-search" src="{{$static_origin}}/src/page/studentVip/image/ic_search.png">
                </div>
            </a>
    </div>
</div>