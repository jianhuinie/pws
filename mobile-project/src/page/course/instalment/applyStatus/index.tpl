{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "跟谁学分期"}}
    {{$page_module = "page/course/instalment/applyStatus/index"}}
    {{$enable_backTopButton = true}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/course/instalment/applyStatus/css/index.styl" />
{{/block}}

{{block name="content"}}
{{strip}}
    <div class="apply-nav">
        <img data-src="{{$static_origin}}/src/page/course/instalment/applyStatus/img/ic_hc_apply.png" />
        申请进度
    </div>
    {{foreach $tpl_data as $item}}
        <ul class="apply-detail">
            <li>
                <div class="notice">
                    您有一笔分期申请
                    <span {{if
                          $item.display_status == 0
                          || $item.display_status == 1
                          || $item.display_status == 2
                         }}class="success"{{/if}}>
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
                    申请金额：¥ {{$item.course_price}}
                </div>
                <div>
                    分期时间：{{$item.loan_stages}} 个月
                </div>
            </li>
        </ul>
    {{/foreach}}
{{/strip}}
{{/block}}