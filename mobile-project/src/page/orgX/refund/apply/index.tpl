{{**
 * 退款申请页
 * Created by nanci on 16/11/14.
**}}

{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "申请退款"}}
    {{$page_module = "page/orgX/refund/apply/index"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}

    {{if !empty($smarty.get.purchase_id)}}
    {{$purchase_id = $smarty.get.purchase_id}}
    {{/if}}

{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/orgX/refund/apply/index.styl"/>
{{/block}}

{{block name="content"}}

{{include file='page/_common/nav_bar/nav_bar.tpl' text='申请退款' menu_button=false}}
    <div id="main" class="main-content" data-purchase-id="{{$purchase_id}}" data-action="{{if !empty($smarty.get.action)}}1{{/if}}">
        <div class="apply-service">
            <span class="must-fill">*</span>
            <span class="desc">申请服务</span>
            <select name="apply-service" id="">
                {{foreach $tpl_data.apply_service as $item}}
                <option value="{{$item}}" class="service">{{$item}}</option>
                {{/foreach}}
            </select>
            <!-- <span class="icon icon-angle-down"></span> -->
        </div>
        <div class="refund-reason">
            <span class="must-fill">*</span>
            <span class="desc">退款原因</span>
            <select name="refund-reason" id="refund-reason" value>
                {{foreach $tpl_data.reason as $key => $val}}
                <option value="{{$val}}" data-reason-id="{{$key}}" class="reason">{{$val}}</option>
                {{/foreach}}
            </select>
            <!-- <span class="icon icon-angle-down"></span> -->
        </div>
        <div class="refund-num">
            <span class="must-fill">*</span>
            <span class="desc">退款金额</span>
            <select name="refund-num" id="">
                <option value="{{$tpl_data.total_price}}" class="num">{{$tpl_data.total_price}}</option>
            </select>
            <!-- <span class="icon icon-angle-down"></span> -->
        </div>
        <p class="money-ps">（最多{{$tpl_data.total_price}}元，已消课酬{{$tpl_data.class_fire_price}}元）</p>
        <div class="action">
            <span class="submit-apply">提交申请</span>
        </div>
    </div>
{{/block}}
