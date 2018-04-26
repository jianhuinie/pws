<div class="active-page" data-flag="0">
    {{if !empty($tpl_data.news_list.list)}}
    <div class="org-dynamic">
        <ul class="dynamic-list-ajax">

            {{include file="../components/org-dynamic-ajax.tpl"}}
        </ul>
        {{if !empty($tpl_data.news_list.more_url) && $tpl_data.news_list.more_url}}
        <div class="more-dynamic-ajax more-button">
            <div class="character">查看更多动态<i class="icon icon-angle-right"></i></div>
            <div class="more-loading">
                <img src="{{$static_origin}}/src/page/huikejian/img/loading.gif">
            </div>
        </div>
        {{/if}}
    </div>
    {{else}}
    <div class="no-content">暂时没有动态信息</div>
    {{/if}}
</div>
