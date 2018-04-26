{{**
 * 停课静态提示页
 * Created by nanci on 16/12/05.
**}}

{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "停课通知"}}
    {{$page_module = "page/orgX/suspendTip/index"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}

{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/orgX/suspendTip/index.styl"/>
{{/block}}

{{block name="content"}}

<div id="main" class="main-content">
{{include file='page/_common/nav_bar/nav_bar.tpl' text='停课通知' menu_button=false}}
    <div class="img-wrapper hidden">
        <img src="https://img.genshuixue.com/0cms/d/file/content/2016/10/5813209f0b57c.png" class="bg-layer">
    </div>
    <p class="tip">您已被机构停课，不能进入教室，如有疑问请联系机构哦~</p>
</div>
{{/block}}
