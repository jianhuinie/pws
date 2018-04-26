{{$honorL = $queryOneOnOneCourse.honors|count}}
{{if $honorL > 0}}
<div class="honors">

    <div class="honors-text">荣誉奖励</div>
    <div class="honors-pics">
    {{foreach $queryOneOnOneCourse.honors as $item}}
        {{if $item@index < 4}}
            <img class="retina" data-src="{{$item.image_url}}" data-index="{{$item@index}}" {{if $item@index === 0}}style="margin: none;"{{/if}}>
        {{/if}}
    {{/foreach}}
    </div>
</div>
{{/if}}