{{*
@file 用户全部评价
@author chenmo
@date 16/1/19
*}}
{{extends file="page/_base/base.tpl"}}
{{block name="page"}}
{{$page_title = "{{$tpl_data.user.display_name}}评价"}}
{{$page_module = "page/comment/userComment/userComment"}}
{{$enable_backTopButton = true}}
{{/block}}
{{block name="data"}}
{{$script_data.teacherNum = $tpl_data.profile.number}}
    {{if isset($smarty.get.user_id)}}
        {{$script_data.user_id = $smarty.get.user_id}}
    {{/if}}
    {{if isset($smarty.get.anonymous)}}
        {{$script_data.anonymous = $smarty.get.anonymous}}
    {{/if}}
    {{if isset($smarty.get.course_number)}}
        {{$script_data.course_number = $smarty.get.course_number}}
    {{/if}}
{{/block}}

{{block name="style"}}
<link rel="stylesheet" href="{{$static_origin}}/src/page/comment/userComment/userComment.styl"/>
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
        <div class="nav-header h1">{{$tpl_data.user.display_name}}评价</div>
        <div class="nav-wrap-right">
        <span id="comment-icon" class="nav-button">
            <i class="icon icon-edit"></i>
        </span>
        </div>
    </header>
    {{/if}}
    {{if isset($tpl_data.can_comment_list) && $tpl_data.can_comment_list|count gt 0}}
    {{$cList = $tpl_data.can_comment_list}}
    <div class="mask-p" id="comment-main">
        <div class="mask" id="comment-mask"></div>
        <div class="content-wap">
            <div class="content-panel">
                <div class="content">
                    <div class="comment-main">
                        <div class="comment-title">可评价的课程</div>
                        <div class="comment-list">
                            <ul>
                                {{foreach $cList as $cItem}}
                                <li class="comment-item">
                                    <a data-log="comment_click" href="{{$cItem.url}}">
                                        {{htmlspecialchars($cItem.course_name)}}
                                    </a>
                                </li>
                                {{/foreach}}
                            </ul>
                        </div>

                    </div>
                </div>
                <div class="bottom-corner"></div>
            </div>
        </div>
    </div>
    {{/if}}
    <div class="comment-list-wrapper">
        <ul id="comment-ul">
            {{include file="./component/commentList.tpl" list=$cList}}
        </ul>
    </div>
    {{if $tpl_data.has_more == 1}}
    <p class="more-comment has-more" data-page="2">查看更多评价</p>
    {{else}}
    <p class="more-comment no-more" data-page="nomore">没有更多评价了</p>
    {{/if}}
</div>
{{/block}}

