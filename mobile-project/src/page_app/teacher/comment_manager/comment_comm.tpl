{{extends file="page_app/_base/base.tpl"}}

{{*页面配置*}}
{{block name="page" append}}
{{*标题*}}
{{$page_title = "推荐新客户"}}
{{*页面入口模块, 例如:page/app_teacher/vip_index/index*}}
{{$page_module = "page_app/teacher/comment_manager/comment_comm"}}
{{*是否使用返回顶部的按钮*}}
{{$enable_backTopButton = false}}
{{/block}}

{{*模板数据, 需要传递到js模块中的模板数据在这里配置*}}
{{block name="data"}}
{{*{{$script_data["key"] = "value"}}*}}
{{/block}}

{{*页面样式*}}
{{block name="style"}}
<link rel="stylesheet" href="{{$static_origin}}/src/page_app/teacher/comment_manager/comment_comm.styl"/>
{{/block}}

{{*页面内容*}}
{{block name="content"}}
<div class="container">
    <p class="title">
        请花1分钟填写以下信息，稍后会有服务人员联系您。
    </p>
    <div class="question">
        <div class="question-item question_1">
           <p>被推荐人姓名：</p>
           <div class="input-i">
               <input type="text" placeholder="请输入被推荐人姓名（20字以内）" name="name" class="name" maxlength="20">
           </div>
        </div>
        <div class="question-item question_2">
            <p>联系方式：</p>
            <div class="input-i">
                <input type="text" placeholder="请输入联系方式（30字以内）" name="cel-phone" class="cel-phone" maxlength="30">
            </div>
        </div>
        <div class="question-item question_3">
            <p>推荐原因：</p>
            <div class="input-t">
                <textarea class="reason" placeholder="请输入推荐原因（5000字以内）" name="reason" type="text" maxlength="5000"></textarea>
            </div>
        </div>
    </div>
    <div class="description">
        轻触提交即表示您已了解此活动的规则，确保所提交信息的真实准确，不侵犯被推荐人的合法权益，并同意跟谁学将您的信息告知被推荐人。
    </div>
    <div class="submit" data-click="41007">提交</div>
</div>

{{/block}}

{{*js脚本, 有些特殊情况js需要写在页面里的时候用写在这个block里*}}
{{block name="script"}}

{{/block}}