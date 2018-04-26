{{*
@file 亲子课堂search（活动）
@author wuxuelan
@date 2016-07-27
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = "搜索精彩主题"}}
    {{$page_module = "page/studentVip/parentList/search/index"}}
    {{$enable_backTopButton = true}}
{{/block}}

{{block name="data"}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/studentVip/_part/search.styl"/>

{{/block}}

{{block name="content"}}
<div class="main">
    {{include file="page/studentVip/_part/search.tpl"}}
    <ul class="main-list"></ul>
    <div class="none-course">
        <img src="{{$static_origin}}/src/page/studentVip/image/ic_none.png" alt="">
        <p>无相关课程，请重新输入关键词</p>
    </div>
    <div class="has-more hide" data-next-cursor="1">
        <div class="typing-loader"></div>
    </div>
</div>

{{/block}}