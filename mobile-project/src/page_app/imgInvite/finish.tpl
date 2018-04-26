{{extends file="page_app/_base/base.tpl"}}

{{*页面配置*}}
{{block name="page" append}}
    {{*标题*}}
    {{$page_title = "课程已领取"}}
    {{$page_module = "page_app/imgInvite/finish"}}
    {{*是否使用返回顶部的按钮*}}
    {{$enable_backTopButton = false}}
{{/block}}

{{*模板数据, 需要传递到js模块中的模板数据在这里配置*}}
{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{*页面样式*}}
{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page_app/imgInvite/finish.styl"/>
{{/block}}

{{*页面内容*}}
{{block name="content"}}
    <div class="container">
        <div class="img-content">
            <img class="empty-img" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2015/06/5577f4561f155.png">
            <div class="empty-text">
                免单链接已经被使用了哦～
            </div>
        </div>

        <div class="cross-line">
            <div class="left-line"></div>
            <div class="cross-text">看看谁领到了课程</div>
            <div class="rightee-line"></div>
        </div>
        <div class="user-content">
            <img class="user-avtar" data-src="{{$tpl_data.avatar}}">
            <div class="user-infos">
                <div class="user-info">
                    <span class="user-name">{{$tpl_data.name}}</span>
                    <span class="user-tag" data-phone="{{$tpl_data.mobile}}">
                        {{if isset($tpl_data.mobile) && $tpl_data.mobile}}
                            {{$tpl_data.mobile}}
                        {{else}}
                            微信用户
                        {{/if}}
                    </span>
                </div>
                <div class="user-date">{{$tpl_data.time}}</div>
            </div>
        </div>
    </div>
{{/block}}


