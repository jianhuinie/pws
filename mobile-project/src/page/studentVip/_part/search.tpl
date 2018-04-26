
<div class="search-back">
    <div class="search-panel">
        <form action="" onsubmit="return false;" autocomplete="on">
            {{if isset($text) && $text=="child"}}
                <input type="text" placeholder="输入课程名称或课程ID" id="search">
            {{else}}
                <input type="text" placeholder="输入活动名称或活动ID" id="search">
            {{/if}}
            <img src="{{$static_origin}}/src/page/studentVip/image/ic_close.png" alt="" class="delete">
        </form>
    </div>
</div>