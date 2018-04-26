<div
    class="focus hide {{$templateMode}}"
    data-focus="{{$tpl_data.base_info.focus_flag}}"
    data-click="follow"
    data-stype="m_teacher_attention"
    data-sku="teacher|{{$tpl_data.base_info.number}}"
    >
    
    {{if $tpl_data.base_info.focus_flag == 1}}
        <span class="icon icon-focus"></span>
        <div class="item-box">已关注</div>
    {{else}}
        <span class="icon icon-unfocus"></span>
        <div class="item-box">关注</div>
    {{/if}}

</div>