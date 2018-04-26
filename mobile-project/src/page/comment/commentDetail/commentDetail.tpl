{{*
@file 评价详情页
@author chenmo
@date 16/1/15
*}}
{{extends file="page/_base/base.tpl"}}
{{block name="page"}}
    {{$page_title = "评价"}}
    {{$page_module = "page/comment/commentDetail/commentDetail"}}
    {{$enable_backTopButton = false}}
    {{$isNeedScale = false}}
{{/block}}

{{block name="data"}}
    {{if isset($smarty.get.comment_type)}}
        {{$comment_type = $smarty.get.comment_type}}
        {{$script_data.commentType = $smarty.get.comment_type}}
    {{else}}
        {{$comment_type = "0"}}
        {{$script_data.commentType = "0"}}
    {{/if}}
    {{if isset($tpl_data.additional)}}
        {{$script_data.total = $tpl_data.additional.total_number}}
    {{/if}}
    {{$script_data.teacherNum = $tpl_data.profile.number}}
    {{$script_data.comment_list = Json_encode($tpl_data.comment_list)}}
    {{$host = $smarty.server.HTTP_HOST}}
    {{$hostArr = explode('.', $host)}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/comment/commentDetail/commentDetail.styl"/>
{{/block}}

{{block name="content"}}
    <div id="main">
        {{if !$ext_data.is_app}}
            <header class="nav-bar">
                <div class="nav-wrap-left">
                    <a class="nav-button" href="javascript:history.back()">
                        <i class="icon icon-back"></i>
                    </a>
                </div>
                <div class="nav-header h1">评价</div>
                <!--<div class="nav-wrap-right">
                    <span class="nav-button" id="comment-icon">
                        <i class="icon icon-edit"></i>
                    </span>
                </div>-->
            </header>
        {{/if}}

        {{* 评价内容 *}}
        {{include file="./main/comment-main.tpl"}}

    </div>
{{/block}}