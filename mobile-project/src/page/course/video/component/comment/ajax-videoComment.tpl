{{if !empty($tpl_data.comment_info)}}
    {{$comment_data = $tpl_data.comment_info}}
{{else}}
    {{$comment_data = $tpl_data}}
{{/if}}

{{foreach $comment_data.comment_list as $comment}}
<li class="analysis-habo-log" data-habo-type="{{$gsType}}" data-habo-stype="comment">
    <div class="comment-from">
        {{if isset($comment.user) && isset($comment.user.url) && !empty($comment.user.url)}}
            <a href="{{$comment.user.url}}">
                <div class="user-img">
                    <img width="30" height="30" src="{{$comment.user.avatar_url}}@2x_70Q_1o_30w_30h_1e_1c.src">
                </div>
            </a>
        {{else}}
            <div class="user-img">
                <img width="30" height="30" src="https://imgs.genshuixue.com/0common/ic_anonymous_user_n.png@2x_70Q_1o_30w_30h_1e_1c.src">
            </div>
        {{/if}}
        <span class="user-name single-line">{{$comment.user.display_name}}</span>
        <div class="stars-info">
            <div class="stars">
                {{include file="common/starScore/starScore.tpl" score=$comment.teach_result}}
                <p class="comment-praise" data-id="{{$comment.comment_id}}">
                    {{if $comment.is_my_comment && !$comment.anonymous && empty($comment.additional.student)}}
                    <span class="add-comment">
                        <i class="icon icon-edit"></i>
                        追评
                    </span>
                    {{else if !empty($comment.additional.student)}}
                    <span class="has-add-comment">
                        <i class="icon icon-edit"></i>
                        已追评
                    </span>
                    {{/if}}
                    <span class="praise-info" data-thumb-flag="{{$comment.has_thumb_up}}" data-count="{{$comment.thumb_up}}">
                        <i class="icon icon-like {{if $comment.has_thumb_up}} has-praise {{/if}}"></i>
                        <span class="thumb_count">{{$comment.thumb_up}}</span>
                    </span>
                </p>
                <!-- <span class="time">{{$comment.create_time}}</span> -->
            </div>
        </div>
    </div>
    <div class="comment-detail">
        <p class="detail">
            {{$comment.info}}
        </p>
        {{if !empty($comment.additional.student)}}
        <div class="add-comment-info">
            <p class="add-time">
                <span class="type">学生追评</span>
                <span class="time">{{$comment.additional.student.create_time}}</span>
            </p>
            <p class="comment-info">
                {{$comment.additional.student.info}}
            </p>
        </div>
        {{/if}}

    </div>
    <span class="time">{{$comment.create_time}}</span>
    {{if isset($comment.schedule)}}
        <span class="vedioCourse-info">{{$comment.course.course_name}}
            {{if $comment.schedule == 0}}
                （直播回放）
            {{else}}
                第{{$comment.schedule}}节
            {{/if}}
        </span>
    {{/if}}
</li>
{{/foreach}}