{{$bar = ['待响应', '已报名', '已成单', '全部']}}
<div class="list-bar">
    {{foreach $bar as $item index}}
    <div class="item {{if $item@index > 0}}normal{{else}}active{{/if}}" data-index="{{$item@index-1}}">
        {{$item}}
        {{if $item@index == 0}}
            <span class="warn hide"></span>
        {{/if}}
    </div>
    {{/foreach}}
</div> 