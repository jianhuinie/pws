{{*
    @file 分期详情页
    @author huangshiming
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = "花呗分期"}}
    {{$page_module = "page/staging/index"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/staging/index.styl"/>
{{/block}}

{{block name="content"}}

{{include file="page/_common/nav_bar/nav_bar.tpl" text="花呗分期"}}
<div class="main-container">

    <div class="box">
    <div class="first-nav">
        <p>订单编号: {{$tpl_data.purchase_id}}</p>
        <p>购买课程: {{$tpl_data.course_name}}</p>
        <p class="fenqi-total-money">分期金额: ￥{{$tpl_data.chosed_fenqi_type.fenqi_total_money}} (含手续费)</p>
    </div>
    {{if $tpl_data.can_use_fenqi == true}}
    <div class="second-nav">
        <div class="title">
            <div class="title-box clearfix">
                <span class="text">分期方式</span>
                <span class="fenqi-need-all-money">
                    {{if $tpl_data.can_use_fenqi == true}}
                    应还总额￥{{$tpl_data.chosed_fenqi_type.fenqi_need_all_money}}(含利息￥{{$tpl_data.chosed_fenqi_type.fenqi_need_all_rate_fee}})
                    {{else}}
                    应还总额￥{{$tpl_data.purchase_money}}
                    {{/if}}
                </span>
            </div>

            <div class="stagingBox">
            {{foreach $tpl_data.fenqi_detail as $item}}
                <div class="staging-item {{if $item.periods == $tpl_data.chosed_fenqi_type.periods}}active{{/if}}" data-periods = "{{$item.periods}}" data-repayment="{{$item.every_periods_repayment}}" data-total="{{$item.fenqi_total_money}}" data-need-money="{{$item.fenqi_need_all_money}}" data-fee="{{$item.fenqi_need_all_rate_fee}}">
                    <p class="money">￥ {{$item.every_periods_repayment}} x {{$item.periods}}期</p>
                    <p class="fee">含利息￥{{$item.every_period_fee}}/期</p>
                </div>
            {{/foreach}}
            </div>
        </div>
    </div>
    {{else}}
    <div class="second-nav-unable">
        <p>{{$tpl_data.fenqi_message}}</p>
    </div>
    {{/if}}
    </div>

    {{if $tpl_data.can_use_fenqi == true}}
    <div class="button">分期支付</div>
    {{else}}
    <div class="other-button">其他支付方式</div>
    {{/if}}
</div>


<div class="mask hide">
    <img src="https://img.genshuixue.com/0cms/d/file/content/2016/08/57c553cdc7b48.png">
</div>

{{/block}}

