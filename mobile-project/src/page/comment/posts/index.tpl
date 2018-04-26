{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = ""}}

    {{$page_module = "page/comment/posts/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/comment/posts/index.styl"/>
{{/block}}

{{block name="content"}}
    <header class="nav-bar">
        <div class="nav-wrap-left">
            <a class="nav-button" href="javascript:history.back()">
                <i class="icon icon-back"></i>
            </a>
        </div>
        <div class="nav-header h1">发布话题</div>
        <div class="nav-wrap-right">
        <span class="nav-button">
            发布
        </span>
        </div>
    </header>
    <div class="container">
        <div class="title">
            <input type="text" id="titleInfo" placeholder="标题（4到24个字）" />
        </div>
        <div class="text">
            <textarea id="textInfo" placeholder="请输入帖子内容（1-10000）字"></textarea>
        </div>
    </div>
    <div class="upload" id="upload"></div>
{{/block}}
