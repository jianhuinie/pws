{{*
    @file 课程评价页
    @author wth
    @date 16/7/7
*}}

{{extends file="page/_base/base.tpl"}}
{{block name="page"}}
    {{$smarty.block.parent}}
    {{$page_title = "课程评价"}}
    {{$page_module = "page/comment/commentDetail/commentDetail"}}
    {{$enable_backTopButton = false}}
    {{$isNeedScale = false}}
{{/block}}

{{block name="data"}}
    {{*hurry: isInline = true 嵌套使用*}}
    {{$isInline=false}}
    {{if isset($smarty.get.source)}}
        {{$isInline=true}}
    {{/if}}

    {{if isset($tpl_data.additional)}}
        {{$script_data.total = $tpl_data.additional.total_number}}
    {{/if}}
    {{$script_data.teacherNum = $tpl_data.profile.number}}
    {{$script_data.comment_list = Json_encode($tpl_data.comment_list)}}
    {{$script_data.course_comment_count = $tpl_data.course_comment_count}}
    {{$script_data.course_number = $tpl_data.course_number}}
    {{$script_data.comment_type = $tpl_data.comment_type}}
    {{$script_data.face_type = $tpl_data.face_type}}
    {{$script_data.next_cursor = $tpl_data.next_cursor}}

    {{$host = $smarty.server.HTTP_HOST}}
    {{$hostArr = explode('.', $host)}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/comment/commentDetail/commentDetail.styl"/>
{{/block}}

{{block name="content"}}
    <div id="main">
        {{if !$ext_data.is_app && !$isInline}}
            <header class="nav-bar">
                <div class="nav-wrap-left">
                    <a class="nav-button" href="javascript:history.back()">
                        <i class="icon icon-back"></i>
                    </a>
                </div>
                <div class="nav-header h1">课程评价</div>
                <!--<div class="nav-wrap-right">
                    <span class="nav-button" id="comment-icon">
                        <i class="icon icon-edit"></i>
                    </span>
                </div>-->
            </header>
        {{/if}}

        {{* 评价内容 *}}
        {{include file="./main/commentList.tpl"}}

    </div>
{{/block}}