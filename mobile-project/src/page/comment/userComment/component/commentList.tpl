{{foreach $tpl_data.comment_list as $list}}
    <li>
        {{if $list@index eq 0}}
            <a {{if !empty($list.user.number)}}href="/x/{{$list.user.number}}"{{/if}}>
                <div class="user-img">
                    <img width="100%" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a2315c62581.png"
                         data-src="{{$list.user.avatar_url}}">
                </div>
            </a>
        {{/if}}
        <div class="right-info">
            {{if $list@index eq 0}}
                <div class="user-name">
                    {{if !empty($list.user.number)}}
                        {{$list.user.display_name}}
                    {{else}}
                        匿名用户
                    {{/if}}
                    {{if !empty($list.fr) && $list.fr eq 2}}
                        (邀请评价)
                    {{/if}}
                    {{if isset($list.thumb_up)}}
                        <span class="like {{if $list.has_thumb_up}} isLike{{/if}}" data-comment_id="{{$list.comment_id}}" data-thumb="{{$list.thumb_up}}">
                          <i class="icon icon-like"></i>
                       <span class="like-num">{{'('|cat:$list.thumb_up|cat:')'}}</span>
                            </span>
                    {{/if}}
                </div>
            {{/if}}
            <div class="stars-info">
                评分{{include file="../../commentDetail/component/starScore.tpl" score=$list.teach_result}}
                {{if $list@index > 0}}
                    {{if isset($list.thumb_up)}}
                        <span class="like {{if $list.has_thumb_up}} isLike{{/if}}" data-comment_id="{{$list.comment_id}}" data-thumb="{{$list.thumb_up}}">
                          <i class="icon icon-like"></i>
                       <span class="like-num">{{'('|cat:$list.thumb_up|cat:')'}}</span>
                            </span>
                    {{/if}}
                {{/if}}
            </div>
        </div>
        <div class="comment-content">
            {{if $list.fr == '1'}}
                未作出评价,系统默认评价!
            {{elseif $list.fr == '0'}}
                {{$list.info}}
                {{if !empty($list.photo_list) && $list.photo_list|count > 0}}
                    <ul class="comment-photo-list" data-index="{{$list@index}}">
                        {{foreach $list.photo_list as $item}}
                            <li data-index="{{$item@index}}" >
                                <div class="img-background">
                                    <img width="100%" height="100%" data-src="{{$item.url}}">
                                </div>
                            </li>
                        {{/foreach}}
                    </ul>
                {{/if}}
            {{/if}}
        </div>
        <div class="course-info single-line">
            <span class="create-time">{{$list.create_time}}</span>
            {{if $list.course.course_name != '0'}}
                <span class="course-title ">{{$list.course.course_name}}</span>
            {{/if}}
        </div>
        {{if !empty($list.additional)}}
            {{if !empty($list.additional.student)}}
                {{$student = $list.additional.student}}
                <div class="student-additioanl">
                    <div class="additional-date">
                        {{$student.create_time}}
                    </div>
                    <div class="comment-additional comment-content">
                        {{$student.info}}
                    </div>
                </div>
            {{/if}}
            {{if !empty($list.additional.teacher)}}
                {{$teacher = $list.additional.teacher}}
                <div class="teacher-additional">
                    老师回复:{{$teacher.info}}
                    <div class="triangle"></div>
                </div>
            {{/if}}
        {{/if}}
    </li>
{{/foreach}}



