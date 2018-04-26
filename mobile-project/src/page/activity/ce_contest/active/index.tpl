{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "赛事动态"}}

    {{$page_module = "page/activity/ce_contest/active/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/ce_contest/active/css/index.styl"/>
{{/block}}

{{block name="content"}}
    <header class="nav-bar">
        <div class="nav-wrap-left">
            <a class="nav-button" href="javascript:history.back()">
                <i class="icon icon-back"></i>
            </a>
        </div>
        <div class="nav-header h1">赛事动态</div>
    </header>
    <ul class="active-list">
        <li class="active-item">
            <div class="active-item-info">
                <div class="active-item-content double-line">陌陌私有化陌陌私有化陌陌私有化陌陌私有化陌陌私有化陌陌私有化陌陌私有化陌陌私有化</div>
                <div class="active-item-sublime clearfix">
                    <div class="active-item-date left">2016年2月10日</div>
                    <div class="active-item-title left">大赛组委</div>
                </div>
            </div>
            <div class="active-item-img">
                <img src="{{$static_origin}}/src/page/IM/imgs/expression.png">
            </div>
        </li>

        <li class="active-item">
            <div class="active-item-info">
                <a href="javascript:void(0)" class="active-item-content double-line">陌陌私有化陌陌私有化陌陌私有化陌陌私有化陌陌私有化陌陌私有化陌陌私有化陌陌私有化</a>
                <div class="active-item-sublime clearfix">
                    <div class="active-item-date left">2016年2月10日</div>
                    <div class="active-item-title left">大赛组委</div>
                </div>
            </div>
            <div class="active-item-img">
                <img src="{{$static_origin}}/src/page/IM/imgs/expression.png">
            </div>
        </li>
        <li class="active-item">
            <div class="active-item-info">
                <div class="active-item-content double-line">陌陌私有化陌陌私有化陌</div>
                <div class="active-item-sublime clearfix">
                    <div class="active-item-date left">2016年2月10日</div>
                    <div class="active-item-title left">大赛组委</div>
                </div>
            </div>
            <div class="active-item-img">
                <img src="{{$static_origin}}/src/page/IM/imgs/expression.png">
            </div>
        </li>
    </ul>
{{/block}}
