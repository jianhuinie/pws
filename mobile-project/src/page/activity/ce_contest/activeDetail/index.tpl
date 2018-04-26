{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "动态详情"}}

    {{$page_module = "page/activity/ce_contest/activeDetail/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/ce_contest/activeDetail/css/index.styl"/>
{{/block}}

{{block name="content"}}
    <header class="nav-bar">
        <div class="nav-wrap-left">
            <a class="nav-button" href="javascript:history.back()">
                <i class="icon icon-back"></i>
            </a>
        </div>
        <div class="nav-header h1">动态详情</div>
    </header>
    <div class="detail">
        <h2 class="detail-title one-line">陌陌么有化遇到失败风险有化遇到失败风险有化遇到失败风险</h2>
        <div class="detail-sublime clearfix">
            <div class="detail-date left">2016年2月10日</div>
            <div class="left">大赛组组委</div>
        </div>
        <div class="detail-info">
            摘要：5世纪初摘要：5世纪初摘要：5世纪初摘要：5世纪初摘要：5世纪初摘要：5世纪初摘要：5世纪初摘要：5世纪初摘要：5世纪初摘要：5世纪初摘要：5世纪初摘要：5世纪初
        </div>
        <div class="detail-img">
            <img src="{{$static_origin}}/src/page/IM/imgs/expression.png">
        </div>
    </div>
{{/block}}
