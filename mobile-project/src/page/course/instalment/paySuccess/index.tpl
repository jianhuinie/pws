{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "跟谁学分期"}}
    {{$enable_backTopButton = true}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/course/instalment/paySuccess/css/index.styl" />
{{/block}}

{{block name="content"}}
{{strip}}
    <div class="pay-status">
        <div class="icon-success">
            <span class="icon-check-alt"></span>
        </div>
        <div class="des">
            您本期的欠款已经成功还清！
        </div>
        {{if $tpl_data.has_more}}
            <a href="/fenqi/getRefundDetail?purchase_id={{$tpl_data.purchase_id}}" class="submit">
                立即还下笔欠款
            </a>
        {{/if}}
    </div>

{{/strip}}
{{/block}}