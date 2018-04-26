{{*
    @file 金牌机构宣传页
    @author wuxuelan
    @date 2017-2-20
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "金牌机构宣传页"}}

    {{$page_module = "page/activity/liudanActivity/jinpai/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/liudanActivity/jinpai/index.styl"/>
{{/block}}

{{block name="data"}}
    {{$script_data.type = "jinpai"}}
{{/block}}

{{block name="content"}}

<script type="text/javascript">
    function go(hr) {
        location.href = hr;
    }
</script>

{{*include file="page/_common/nav_bar/nav_bar.tpl" text="金牌机构宣传页"*}}
    <div class="container">
        
        {{*头部*}}
        {{include file="page/activity/liudanActivity/common/header/index.tpl" value="jinpai"}}

        {{*什么是金牌机构*}}
        {{include file="page/activity/liudanActivity/common/second/index.tpl" value="jinpai"}}
        
        {{*适合哪些品类*}}
        {{include file="page/activity/liudanActivity/common/third/index.tpl" value="jinpai"}}

        {{*如何助力*}}
        {{include file="page/activity/liudanActivity/common/fourth/jinpai.tpl"}}
        
        {{*成功案例*}}
        {{include file="page/activity/liudanActivity/common/fifth/index.tpl" value="jinpai"}}

        {{*立即申请*}}
        {{include file="page/activity/liudanActivity/common/sixth/index.tpl" value="jinpai"}}

        {{*脚注*}}
        {{include file="page/activity/liudanActivity/common/footer/index.tpl" value="jinpai"}}
    </div>

{{/block}}