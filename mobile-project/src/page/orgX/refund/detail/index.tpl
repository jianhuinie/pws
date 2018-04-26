{{**
 * 退款详情页
 * Created by nanci on 16/11/14.
**}}

{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "退款详情"}}
    {{$page_module = "page/orgX/refund/detail/index"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}

    {{if !empty($smarty.get.purchase_id)}}
    {{$purchase_id = $smarty.get.purchase_id}}
    {{/if}}

{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/orgX/refund/detail/index.styl"/>
{{/block}}

{{block name="content"}}

{{include file='page/_common/nav_bar/nav_bar.tpl' text='退款详情' menu_button=false}}
    <div id="main" class="main-content" data-purchase-id="{{$purchase_id}}">
    <div class="block-status">
        {{if $tpl_data.status eq 1}}
        <img src="/src/page/share/invite_teacher/register/images/success.png" alt="" class="img-success">
        <p class="desc">退款成功</p>
        <p class="tip gray6">课酬已退回原路，预计3-5个工作日到账，请您注意查收</p>
        {{else}}
        <div class="head-tip">
            <span class="icon icon-icon-warning"></span><span class="title">等待机构处理您的退款申请</span>
        </div>
        <p class="two-way gray6">
            如果机构同意：课酬原路退回<br>如果机构未处理：<span class="time-remain">{{$tpl_data.time_desc}}</span>后将为您自动退款
        </p>
        <div class="actions">
            <span class="mod gray3">修改退款申请</span>
            <span class="undo gray3">撤回退款申请</span>
        </div>
        {{/if}}
    </div>
    <div class="block-detail">
        <div class="title gray3">申请详情</div>
        <div class="name">
            <span class="desc gray9">机构名称</span>
            <span class="gray3 content">{{$tpl_data.org_name}}</span>
             <span class="contact-phone gray6" data-mobile="{{$tpl_data.extension}}">联系机构</span>
        </div>
        <div class="type">
            <span class="desc gray9">退款类型</span>
            <span class="gray3 content">{{$tpl_data.refund_type}}</span>
        </div>
        <div class="money">
            <span class="desc gray9">退款金额</span>
            <span class="gray3 content">{{$tpl_data.refund_price}}</span>
        </div>
        <div class="reason">
            <span class="desc gray9">退款原因</span>
            <span class="gray3 content">{{$tpl_data.refund_reason}}</span>
        </div>
        <div class="num">
            <span class="desc gray9">退款编号</span>
            <span class="gray3 content">{{$tpl_data.refund_code}}</span>
        </div>
        <div class="time hidden">
            <span class="desc gray9">申请时间</span>
            <span class="gray3 content">{{$tpl_data.apply_time}}</span>
        </div>
        <div class="more">
            <span class="desc gray9">更多</span>
            <span class="gray3 icon icon-angle-down"></span>
        </div>
    </div>
    </div>
{{/block}}
