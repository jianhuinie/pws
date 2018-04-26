{{*
@file 问答详情
@author huangshiming
@date 2016-06-22
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$name=$tpl_data.question.user.display_name}}
    {{if isset($tpl_data.teacher.number) && $tpl_data.teacher.number}}
    {{$name=$tpl_data.teacher.display_name}}
    {{/if}}

    {{$name = $name|cn_truncate:8}}
    {{$page_title = $name|cat: '的回答'}}
    {{$page_module = "page/qa/answer/index"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
    {{$script_data.user_number = $smarty.get.user_number}}
    {{$script_data.user_role = $smarty.get.user_role}}
    {{*判断登录的是否是提问者本人*}}
    {{if $tpl_data.loginuser.user_number == $tpl_data.question.user.number}}
        {{$time_flag = 1}}
    {{else}}
        {{$time_flag = 0}}
    {{/if}}

{{/block}}

{{block name="style"}}

     <link rel="stylesheet" href="{{$static_origin}}/src/page/qa/answer/index.styl"/>

{{/block}}

{{block name="content"}}
    {{$ask_button = false}}
    {{include file="page/_common/nav_bar/nav_bar.tpl" text=$name|cat: '的回答'}}

    {{include file="page/qa/_part/question.tpl" showComment=true}}

    {{if $tpl_data.comment_list|count>0}}
        <div class="question-comments" data-has-count="1" style="padding-bottom: 50px;">
        {{include file="page/qa/_part/answerComment.tpl"}}
        </div>
    {{else}}
        <div class="empty">
            {{if $ext_data.is_tapp}}
            <p>学生正在等待回答</p>
            {{else}}
            <p>学生正在等待回答</p>
            {{/if}}
        </div>
        <div class="question-comments hide" data-has-count="0" style="padding-bottom: 50px;">

        </div>
    {{/if}}
{{/block}}