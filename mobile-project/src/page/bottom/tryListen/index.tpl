{{*预约试听模板*}}

{{*从外部来判断走哪一条逻辑 1、试听课逻辑  2、机构留单  3、平台留单*}}

{{*flag 1-试听课 2-机构留单 3-平台留单*}}

<div class="tryListen analysis-habo-log {{if $tpl_data.model == 'default' || $tpl_data.model == 'orange' || $tpl_data.model == 'coffee'}}default-level{{else}}vip-level{{/if}}"
    data-flag="{{if $flag == 1}}1{{elseif $flag == 2}}2 {{elseif $flag == 3}}3{{/if}}"
    data-habo-type="t-detail-reserva"
    data-habo-stype="m_teacher_audition"
    {{if isset($tpl_data.trial_course_info) && !empty($tpl_data.trial_course_info) && $tpl_data.trial_course_info.data == true}}
        data-href="/teacher/reserveTrialCourseDetail?number={{$tpl_data.trial_course_info.data.number}}"
    {{/if}}

    {{if isset($tpl_data.trial_course_info.status)}}
        data-try-button={{$tpl_data.trial_course_info.status}}
    {{/if}}>
    <span {{if $templateMode == 'super'}}style="color: white;"{{/if}}>预约试听</span>
</div>