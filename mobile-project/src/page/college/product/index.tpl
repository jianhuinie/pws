{{*
    @file 跟谁学大学二级页面
    @author shubaiqiao
    @date 16/10/9
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{if $smarty.get.type == "star_share"}}
        {{$page_title = "大咖分享"}}
    {{else if $smarty.get.type == "product_letter"}}
        {{$page_title = "产品快报"}}
    {{else if $smarty.get.type == "function_cheats"}}
        {{$page_title = "功能秘籍"}}
    {{else if $smarty.get.type == "market_strategy"}}
        {{$page_title = "营销攻略"}}
    {{else if $smarty.get.type == "vip_area"}}
        {{$page_title = "会员专享"}}
    {{else if $smarty.get.type == "live_zone"}}
        {{$page_title = "直播专区"}}
    {{else}}
        {{$page_title = "搜索结果"}}
    {{/if}}

    {{$page_module = "page/college/product/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/college/product/index.styl"/>
{{/block}}

{{block name="content"}}

    <div class="container">
        <div class="search">
            {{include file="page/college/ui/search/index.tpl"}}
        </div>
        <ul class="catalogue">
            <li class="border-cata recomment"><a class="head-font" href="javascript:go('#0');">推荐</a></li>
            <li class="border-cata newest"><a href="javascript:go('#1');">最新</a></li>
            <li class="border-cata hotest"><a href="javascript:go('#2');">最热</a></li>
        </ul>
        <script type="text/javascript">
            function go(hr) {
                location.href = hr;
            }
        </script>
        <div class="content">
            {{foreach $tpl_data.info as $list}}
                <div class="list" data-url="{{$list.url}}">
                    <div class="img">
                        <img data-src="{{$list.img}}">
                        {{if $list.icon != 0}}
                            {{include file="page/college/home/_part/playIcon/index.tpl"}}
                        {{/if}}
                    </div>
                    <div class="right">
                        <p class="title line-clamp">{{$list.title}}</p>
                        <p class="pre line-clamp">{{$list.desc}}</p>
                        <div class="info">
                            <p class="read">{{$list.show_count}}人已看</p>
                        </div>
                    </div>
                </div>
            {{/foreach}}
            <div class="has-more">
                <div class="typing-loader"></div>
            </div>
            <div class="no-more">
                <div>没有更多了</div>
            </div>
            <div class="more-flag"></div>
        </div>
    </div>
{{/block}}




