{{if !isset($comment_list)}}
    {{$comment_list = $tpl_data.comment_list }}
{{/if}}

{{if $comment_list|count gt 0}}
    <ul class="comment-list-wrapper {{if isset($relate) && $relate == 'true'}}related-comment-list{{else}}comment-list{{/if}}">
        {{foreach $comment_list as $ul}}

            {{include file="./commentList.tpl" list=$ul index=$ul@index page_module=main}}

            {{if $ul.can_open}}
                <ul class="other-comment-list" data-user-type="{{$ul.anonymous}}" data-course-number="{{$ul.course_number}}" {{if !empty($ul.user_id)}}data-user_num="{{$ul.user_id}}"{{/if}}
                    style="display: none">
                    {{foreach $ul.other_comment as $cl}}
                        {{if $cl@index >= 0 && $cl@index < 4}}
                            {{include file="./commentList.tpl" list=$cl uIndex=$ul@index index=$cl@index page_module=other}}
                        {{/if}}
                    {{/foreach}}
                </ul>
                <div class="user-more-comment" data-user-type="{{$ul.anonymous}}" data-course-number="{{$ul.course_number}}" {{if !empty($ul.user_id)}}data-user_num="{{$ul.user_id}}"{{/if}}
                     data-comment_num="{{$ul.other_comment|count}}">
                    查看该用户其他{{$ul.other_comment|count}}条评价
                </div>
            {{/if}}
        {{/foreach}}

    </ul>
    <!--{{if $tpl_data.page == 1}}
        {{if $tpl_data.has_more == 1}}
            <p class="more-comment has-more" data-page="2">查看更多评价</p>
        {{else}}
            <p class="more-comment no-more" data-page="nomore">没有更多评价了</p>
        {{/if}}
    {{/if}}-->
    <!-- 课程评价页用 relate 区分 表示相关的评价 -->
    <!--{{if isset($relate) && $relate == 'true'}}

    {{else}}
        {{if $tpl_data.has_more == 1}}
            <p class="more-comment has-more" data-page="2">查看更多评价</p>
        {{else}}
            <p class="more-comment no-more" data-page="nomore">没有更多评价了</p>
        {{/if}}
    {{/if}}-->

{{else}}
    <div class="no-comment">
        <img src="https://img.genshuixue.com/0cms/d/file/content/2015/09/55e58e64b2c1e.png" alt="">
        <p>暂无评价数据</p>
    </div>
{{/if}}