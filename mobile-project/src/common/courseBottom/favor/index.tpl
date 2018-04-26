{{*
    @file 收藏
    @date 2017-01-07
*}}
{{$favor = 0}}
{{if isset($tpl_data.favorite_info)}}
    {{if $tpl_data.favorite_info.favorite_status == true}}
        {{$favor = 1}}
    {{else}}
        {{$favor = 0}}
    {{/if}}
{{/if}}

<div class="favor hide {{$templateModel}}" data-status="{{$favor}}">
    {{if $favor == 1}}
        <span class="icon icon-star-full"></span>
    {{else}}
        <span class="icon icon-unfavor"></span>
    {{/if}}
    <div 
        class="analysis-habo-log title" 
        {{if isset($gsType)}}
            data-habo-type="{{$gsType}}" 
        {{/if}}
        data-habo-stype="collect">
    {{if $favor}}已收藏{{else}}收藏{{/if}}
    </div>
</div>