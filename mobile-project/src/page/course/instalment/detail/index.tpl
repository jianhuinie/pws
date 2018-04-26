{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "跟谁学分期"}}
    {{$page_module = "page/course/instalment/detail/index"}}
    {{$enable_backTopButton = true}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/course/instalment/detail/css/index.styl" />
{{/block}}

{{block name="data"}}
    {{$refund_detail = $tpl_data.refund_detail}}
    {{$script_data.termNo = $refund_detail.termNo}}
    {{$script_data.purchaseId = $tpl_data.purchase_id}}
{{/block}}

{{block name="content"}}
{{strip}}
    {{include file="page/_common/nav_bar/nav_bar.tpl" text="课程分期详情"}}
    <div class="instalment-detail">
        <div class="info">
            <div>
                {{$tpl_data.course_name}}
            </div>
            <div>
                申请时间：{{$tpl_data.create_time}}
            </div>
            <div>
                申请金额：¥ {{$tpl_data.loan_amounts}}
            </div>
            <div>
                分期时间：{{$tpl_data.loan_stages}} 个月
            </div>
            <div>
                还款状态：已还 {{$refund_detail.hasRefund}} 期，未还
                     <span class="warn">
                         &nbsp;{{$refund_detail.noRefund}}&nbsp;
                    </span>
                 期
            </div>
        </div>
        <div class="status">
            <div>
                期数：{{$tpl_data.loan_stages}} 期
            </div>
            {{if $refund_detail.status == 'OVERDUE'}}
                <div>
                    已逾期 {{$refund_detail.daysLeftToRefund}} 天！
                </div>
                <div>
                    本期应还款金额：¥ {{$refund_detail.shouldRefundMoney}}
                </div>
                <div class="space-top">
                    其中本期本金：¥ {{$refund_detail.capitalAmount}}
                </div>
                <div>
                    本期逾期手续费：¥ {{$refund_detail.feeAmount}}
                </div>
                <div>
                    逾期罚款：¥ {{$refund_detail.overdueFine}}
                </div>
            {{else}}
                {{if $refund_detail.is_current && ($refund_detail.status == 'INPROGRESS' || $refund_detail.status == 'FINISH')}}
                    <div class="success">
                        本期欠款已还清
                    </div>
                    <div>
                        本期应还款金额：¥ {{$refund_detail.shouldRefundMoney}}
                    </div>
                    <div class="space-top muted">
                        温馨提示：下期欠款请在本期还款日结束之后偿还
                    </div>
                {{else}}
                    <div>
                        距还款日 {{$refund_detail.daysLeftToRefund}} 天
                    </div>
                    <div>
                        本期应还款金额：¥ {{$refund_detail.shouldRefundMoney}}
                    </div>
                {{/if}}
            {{/if}}
            <a class="submit{{if $refund_detail.status == 'OVERDUE' || $refund_detail.status == 'NEEDREFUND'}} to-submit{{else}} btn-muted{{/if}}" href="javascript:void(0)">
                立即还款
            </a>
        </div>
    </div>
    {{if $refund_detail|count}}
        <div class="instalment-list">
            <div class="title">
                还款记录
            </div>
            <div class="header">
                <div>
                    期数
                </div>
                <div>
                    还款日
                </div>
                <div>
                    金额
                </div>
                <div>
                    状态
                </div>
            </div>
            <div class="container">
                {{foreach $refund_detail.details as $item}}
                    <div class="item{{if $item.is_current}} current-item{{/if}}">
                        <div>
                            {{$item.termNo}}
                        </div>
                        <div>
                            {{$item.dueDate}}
                        </div>
                        <div>
                            ¥{{$item.dueAmount}}
                        </div>
                        <div{{if $item.status == 'OVERDUE'}} class="warn"{{elseif $item.status == 'INPROGRESS' || $item.status == 'FINISH'}} class="success"{{/if}}>
                            {{$item.display_status_name}}
                        </div>
                    </div>
                {{/foreach}}
            </div>
        </div>
    {{/if}}
{{/strip}}
{{/block}}