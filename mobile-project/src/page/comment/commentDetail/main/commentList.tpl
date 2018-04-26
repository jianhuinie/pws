{{$commentAdditional = $tpl_data.additional.face_type}}
<div class="tab-list comments-filter">
    <ul class="tab-title">
        <li class="tab-item {{if $tpl_data.face_type == '0'}} active{{/if}}" data-face-type="0">
            <div>全部评价</div>
        </li>
        <li class="tab-item {{if $tpl_data.face_type == '1'}} active{{/if}}" data-face-type="1">
            <div>好评({{$commentAdditional.great}})</div>
        </li>
        <li class="tab-item {{if $tpl_data.face_type == '2'}} active{{/if}}" data-face-type="2">
            <div>中评({{$commentAdditional.middle}})</div>
        </li>
        <li class="tab-item {{if $tpl_data.face_type == '3'}} active{{/if}}" data-face-type="3">
            <div>差评({{$commentAdditional.lower}})</div>
        </li>
    </ul>
    <section class="course-tab">
        <div class="comment-panel">
            {{include file="page/comment/commentDetail/component/comment-pannel.tpl" comment_list = $tpl_data.comment_list relate = false}}
        </div>

        {{if isset($tpl_data.related_comment_list) && $tpl_data.related_comment_list}}
            <div class="relate-title">
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/07/577dd1ea28782.png">
                相关课程评价
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/07/577dd1ea55b7b.png">
            </div>
            <div class="comment-panel">
                {{include file="page/comment/commentDetail/component/comment-pannel.tpl" comment_list = $tpl_data.related_comment_list relate = true}}
            </div>
        {{/if}}

        {{if $tpl_data.has_more == 1}}
            <p class="course-more-comment has-more" data-page="2">
                查看更多评价
            </p>
        {{/if}}

        {{if isset($tpl_data.view_all_url)}}
            <a href="{{$tpl_data.view_all_url}}" class="teacher-more-comment">
                查看老师全部评价 >
            </a>
        {{/if}}
    </section>

</div>