{{*
    @file 分享
    @date 2017-01-07
*}}
<div class="shares hide {{$templateModel}}"
    data-click="share"
    data-sku="class|{{if isset($course_info)}}{{$course_info.number}}{{/if}}"
>
    <div class="share-reward hide">
        <span class="title" style="display:inline;">分享有奖</span>
        <div class="triangle-down"></div>
    </div>
    <i class="icon icon-open-webpage" {{if $templateModel == 'super'}}style="color: white;"{{/if}}></i>
    <div>分享</div>
</div>