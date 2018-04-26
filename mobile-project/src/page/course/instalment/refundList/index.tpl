{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "跟谁学分期"}}
    {{$page_module = "page/course/instalment/refundList/index"}}
    {{$enable_backTopButton = true}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/course/instalment/refundList/css/index.styl" />
{{/block}}

{{block name="content"}}
{{strip}}
    <div class="refund-nav">
        <img data-src="{{$static_origin}}/src/page/course/instalment/refundList/img/ic_hc_repayment.png" />
        还款计划
    </div>
    {{if $tpl_data|count}}
        <ul class="refund-detail">
            {{foreach $tpl_data as $item}}
                {{$refund_detail = $item.refund_detail}}
                <li>
                    <div class="info">
                        <div class="notice">
                            <div class="title">
                                您有一笔分期贷款需还款
                            </div>
                            <span{{if $refund_detail.status == 'INPROGRESS' || $refund_detail.status == 'FINISH'}} class="success"{{elseif $refund_detail.status == 'OVERDUE'}} class="warn"{{/if}}>
                                {{$item.display_status_name}}
                            </span>
                        </div>
                        <div>
                            {{$item.course_name}}
                        </div>
                        <div>
                            申请时间：{{$item.create_time}}
                        </div>
                        <div>
                            申请金额：¥ {{$item.loan_amounts}}
                        </div>
                        <div>
                            分期时间：{{$item.loan_stages}} 个月
                        </div>
                        <div>
                            还款状态：已还 {{$refund_detail.hasRefund}} 期，未还
                            <span class="warn">
                                &nbsp;{{$refund_detail.noRefund}}&nbsp;
                            </span>
                            期
                        </div>
                    </div>
                    {{if $refund_detail.status == 'NEEDREFUND' || $refund_detail.status == 'OVERDUE'}}
                        <div class="status">
                            <div>
                                本期还款日：{{$refund_detail.shouldRefundDay}}
                            </div>
                            {{if $refund_detail.status == 'OVERDUE'}}
                                <div class="warn">
                                    已逾期 {{$refund_detail.daysLeftToRefund}} 天！
                                </div>
                            {{else}}
                                <div>
                                    距还款日 {{$refund_detail.daysLeftToRefund}} 天
                                </div>
                            {{/if}}

                            <div class="refund-money">
                                本期应还款金额：¥ {{$refund_detail.shouldRefundMoney}}元
                                {{if $item.display_status == '1'}}
                                    <a href="/fenqi/getRefundDetail?purchase_id={{$item.purchase_id}}">
                                        去还款
                                    </a>
                                {{/if}}
                            </div>
                        </div>
                    {{/if}}
                </li>
            {{/foreach}}
        </ul>
    {{else}}
        <div class="refund-no-data">
            <img data-src="{{$static_origin}}/src/page/course/instalment/refundList/img/ic_hc_waitting_n.png" />
            您的贷款尚未发放, 请您耐心等待..
        </div>
    {{/if}}
{{/strip}}
{{/block}}