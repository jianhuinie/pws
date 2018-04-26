{{*
@file 生源大厅-接单详情页
@author huangshiming
@date 2017-04-05
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = {{$tpl_data.order.subject_name}}}}
    {{$page_module = "page/studentRoom/orderDetail/index"}}
    {{$enable_backTopButton = false}}
    <script>window.PointerEvent = void 0</script>
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
    {{$order = $tpl_data.order}}
    {{$teacherSelf = $tpl_data.teacher_self}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/studentRoom/orderDetail/index.styl"/>
{{/block}}

{{block name="content"}}
    {{*include file="page/_common/nav_bar/nav_bar.tpl" text=$order.subject_name*}}

    {{*内容*}}
        {{include file="page/studentRoom/orderDetail/_part/content.tpl"}}
    {{*报名*}}

    <div class="pay-button">
        {{if $teacherSelf.display_status == 0 
            || $teacherSelf.display_status == 1
            || $teacherSelf.display_status == 4
        }}
            {{if $teacherSelf.display_status == 0}}
                <div class="pay tempary-no-pay">暂不报名</div>
            {{/if}}
            <div class="pay do-pay">我要报名</div>
        {{else if $teacherSelf.display_status == 2}}
            <div class="pay cancel-pay">取消报名</div>
        {{/if}}
    </div>
{{/block}}