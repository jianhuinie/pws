{{extends file="page_app/_base/base.tpl"}}

{{*页面配置*}}
{{block name="page" append}}
    {{*标题*}}
    {{$page_title = "预览"}}
    {{*页面入口模块, 例如:page/app_teacher/vip_index/index*}}
    {{$page_module = "page_app/imgInvite/view"}}
    {{*是否使用返回顶部的按钮*}}
    {{$enable_backTopButton = true}}
{{/block}}

{{*模板数据, 需要传递到js模块中的模板数据在这里配置*}}
{{block name="data"}}
    {{$script_data["data"] = $tpl_data}}
{{/block}}

{{*页面样式*}}
{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page_app/imgInvite/view.styl"/>
{{/block}}

{{*页面内容*}}
{{block name="content"}}
    <div class="img-container" data-theme="0" data-storage-id="{{$tpl_data.storage_id}}" data-uuid="{{$tpl_data.uuid}}">
        <div>
            <img data-src="{{$tpl_data.image_url}}">
        </div>
        <div class="img-text">
            <i class="icon icon-surprise"></i>
            <span class="warn-text">
                为了学生的体验，暂不支持提前终止活动
            </span>
            <span class="change">更换主题</span>
        </div>
        <button class="create-img">发布邀请卡</button>
    </div>
{{/block}}

{{*js脚本, 有些特殊情况js需要写在页面里的时候用写在这个block里*}}
{{block name="script"}}
    {{*<script></script>*}}
{{/block}}