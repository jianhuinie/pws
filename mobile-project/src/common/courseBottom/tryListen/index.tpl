{{*
    @file 分享
    @date 2017-01-07
*}}
<div
    class="tryListen {{$orangeModel}}"
    data-flag="{{$tryFlag}}"
    data-click="
    {{if $tryFlag == 1}}
        reserve
    {{elseif $tryFlag == 2}}
        advisory
    {{else}}
        cs
    {{/if}}"
    data-sku="one2one|{{$course_info.number}}"
    {{if $tryFlag == 1}}
        data-href="/teacher/reserveTrialCourseDetail?number={{$tpl_data.trial_course_info.data.number}}"
    {{/if}}
    {{if $templateModel == 'super'}}style="background: #1F7C88; color: white;"{{/if}}
>
    <span>预约试听</span>
</div>