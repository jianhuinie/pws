{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "跟谁学分期"}}
    {{$page_module = "page/course/instalment/classInfo/index"}}
    {{$enable_backTopButton = true}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/course/instalment/classInfo/css/index.styl" />
{{/block}}

{{block name="data"}}
    {{$script_data.courseNumber = ""}}
    {{if isset($smarty.get.course_number)}}
        {{$script_data.courseNumber = $smarty.get.course_number}}
    {{/if}}
{{/block}}

{{block name="content"}}
{{strip}}
    <div class="banner">
        <img data-src="{{$static_origin}}/src/page/course/instalment/classInfo/img/banner.jpg" />
    </div>
    <div class="class-info">
        <div>
            课程名称：
            <span>
                {{$tpl_data.course_info.course_name}}
            </span>
        </div>
        <div>
            课程品类：
            <span>
                {{$tpl_data.course_info.subject}}
            </span>
        </div>
        <div>
            课程总价：
            <span>
                ¥ {{$tpl_data.course_info.price}}
            </span>
        </div>
        <div>
            课程课时数：
            <span>
                {{$tpl_data.course_info.length}}
            </span>
        </div>
        <div>
            课程开始时间：
            <span>
                {{$tpl_data.course_info.begin_time}}
            </span>
        </div>
        <div>
            课程结束时间：
            <span>
                {{$tpl_data.course_info.end_time}}
            </span>
        </div>
    </div>
    <div class="org-info">
        <div class="title">
            机构信息
        </div>
        <div class="info">
            <img data-src="{{$tpl_data.org_info.avata}}" />
            <div>
                <div class="company">
                    {{$tpl_data.org_info.name}}
                </div>
                <div class="iphone">
                    <span class="icon-phone"></span>
                    {{$tpl_data.org_info.phone}}
                </div>
                <div class="address">
                    <span class="icon-location2"></span>
                    {{$tpl_data.org_info.address_des}}
                </div>
            </div>
        </div>
    </div>
    <div class="instalment-info">
        <div>
            申请分期课程金额：
            <span>
                ¥ {{$tpl_data.fenqi_info.refund_money}}
            </span>
        </div>
        <div class="info">
            <div>
                分期期数：
                <span>
                    {{$tpl_data.fenqi_info.loan_amounts}}
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
                    ¥ {{$tpl_data.fenqi_info.refund_once}}
                </span>
            </div>
        </div>
        <div class="warn-info">
            <div>
                其中每期本金：
                <span>
                    ¥ {{$tpl_data.fenqi_info.refund_origin_once}}
                </span>
            </div>
            <div>
                每期手续费：
                <span>
                    ¥ {{$tpl_data.fenqi_info.refund_money_once}}
                </span>
            </div>
            <div class="warn">
                * 该课程分期手续费由机构支付！
            </div>
        </div>
    </div>
    {{if $script_data.courseNumber}}
        <a href="javascript:void(0)" class="submit">
            我要分期：¥ {{$tpl_data.course_info.price}}
        </a>
    {{/if}}
{{/strip}}
{{/block}}