{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "咨询客服"}}

    {{$page_module = "page/IM/index"}}

    {{$enable_backTopButton = false}}
    {{$isNeedScale = false}}
{{/block}}

{{block name="data"}}{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/IM/css/index.styl"/>
{{/block}}

{{block name="content"}}
    <div id="header">
        <header class="nav-bar" id="nav-bar">
            <div class="nav-wrap-left">
                <a class="nav-button" href="javascript:history.back()"> <i class="icon icon-back"></i> </a>
            </div>
            <div class="nav-header h1">跟谁学客服</div>
        </header>
        <div class="loginNotice">
            <a href="/static/login?next=%2Fim%2Fmain">当前您是访客，聊天内容无法保存，点击注册<img src="{{$static_origin}}/src/page/IM/imgs/zhucn.png"></a>
        </div>
    </div>

    <div id="container" class="container"></div>
    <div class="bottom clearfix" id="bottom">
        <div class="input">
            <textarea type="text" id="sendMes" class="sendMes"></textarea>
        </div>

        <div class="btn">
            <div class="sendMesBtn" id="sendMesBtn">发送</div>
            <div class="upload btn-item" id="upload">
                <img src="{{$static_origin}}/src/page/IM/imgs/picture.png">
                <input type="file" class="sendImage" id="sendImage">
            </div>
            {{*<span id="emoji" class="emoji btn-item">*}}
                {{*<img src="{{$static_origin}}/src/page/IM/imgs/expression.png">*}}
            {{*</span>*}}
        </div>
    </div>
{{/block}}
