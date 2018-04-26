{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "跟谁学分期"}}
    {{$page_module = "page/course/instalment/audit/index"}}
    {{$enable_backTopButton = true}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/course/instalment/audit/css/index.styl" />
{{/block}}

{{block name="content"}}
{{strip}}
    {{if $tpl_data.purchse_info.confirm_status == 0}}
        <div class="audit-confirm">
            <div class="icon-success">
                <span class="icon-check-alt"></span>
            </div>
            <div class="confirm">
                恭喜,您的分期申请已审核通过, 具备放款资格，请您再次确认立即放款？
            </div>
            <div class="instalment-info">
                <div>
                    机构名称：
                    <span>
                        {{$tpl_data.org_info.name}}
                    </span>
                </div>
                <div>
                    课程名称：
                <span>
                    {{$tpl_data.course_info.course_name}}
                </span>
                </div>
                <div>
                    申请分期课程金额：
                <span>
                    ￥{{$tpl_data.fenqi_info.loan_amounts}}
                </span>
                </div>
                <div class="info">
                    <div>
                        分期期数：
                    <span>
                        {{$tpl_data.fenqi_info.loan_stages}}
                    </span>
                    </div>
                    <div>
                        分期费率：
                    <span>
                        {{$tpl_data.fenqi_info.loan_rate}}
                    </span>
                    </div>
                    <div>
                        每期应还金额：
                    <span>
                        ¥ {{$tpl_data.fenqi_info.refund_origin_once}}
                    </span>
                    </div>
                </div>
                <div>
                    其中每期本金：
                <span>
                    {{$tpl_data.fenqi_info.refund_once}}
                </span>
                </div>
                <div>
                    每期手续费：
                <span>
                    {{$tpl_data.fenqi_info.refund_money_once}}
                </span>
                </div>
                <div class="warn">
                    * 该课程的分期手续费由机构支付！
                </div>
            </div>
            {{if isset($smarty.get.course_number)}}
                <form action="/fenqi/checkAuth" method="get">
                    <input type="hidden" name="course_number" value="{{$smarty.get.course_number}}">
                    <div class="submit-wrapper">
                        <input type="submit" class="submit" value="确认放款">
                    </div>
                </form>
            {{/if}}
        </div>
    {{elseif $tpl_data.purchse_info.confirm_status == 1}}
        <div class="audit-status">
            <div class="icon-right">
                <img data-src="{{$static_origin}}/src/page/course/instalment/audit/img/right.png">
            </div>
            <div>
                您的分期贷款已放款，请关注 【跟谁学分期】服务号查询还款计划
            </div>
        </div>
    {{/if}}
{{/strip}}
{{/block}}