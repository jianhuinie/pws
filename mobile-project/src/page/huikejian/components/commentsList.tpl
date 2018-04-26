{{*
   * @file 机构的评论列表内容
   * @author peilonghui
*}}

{{strip}}
{{foreach $commentsList as $comm}}
<li>
    <div class="comment-from">
        {{include file="common/component/avatar.html" type="tiny" img=$comm.user_avatar url=$comm.url}}
        <p>{{$comm.student_name|truncate:8|escape}}</p>
    </div>
    <div class='comment-item'>
        <p>
            <strong>老师:&nbsp;{{$comm.teacher_user_name|truncate:8|escape}}</strong>
            {{if !(isset($comm.fr) and $comm.fr eq 2)}}
                {{$comm.course_name|escape}}
            {{/if}}
        </p>
        <p>
        <div class="comment-score">
            {{if !(isset($comm.fr) and $comm.fr eq 2)}}
                {{include file="common/component/starScore.html" score=$comm.teach_result}}
                <i>{{number_format($comm.teach_result, 1)}}分</i>
            {{else}}
                <i>（邀请评价）</i>
            {{/if}}

            {{$commDate = explode(' ', $comm.create_time)}}
            <span>{{$commDate[0]}}</span>
        </div>
        <p >
            {{if not empty($comm.info)}}

                {{$comm.info|escape}}
                {{if isset($comm.photo_list) && count($comm.photo_list) > 0}}
                    {{include file="common/component/comment/commentPic.html" photo_list=$comm.photo_list}}
                {{/if}}
            {{else}}
            该学生未及时做出评价，系统默认好评！
            {{/if}}
        </p>
    </div>
</li>
{{/foreach}}
{{/strip}}
