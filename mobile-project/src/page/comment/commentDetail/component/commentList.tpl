{{if $page_module == 'main'}}
<li class="main-course-comment"
    {{if !empty($list.user_id)}}data-user_num="{{$list.user_id}}"{{/if}} data-index="{{$index}}">
{{elseif $page_module == 'other'}}
<li class="other-course-comment"  data-index="{{$uIndex}}">
{{/if}}
<a
        {{if $hostArr && $hostArr[0] != 'kaoyan' && !empty($list.user.number)}}
            href="/x/{{$list.user.number}}"
        {{else}}
            href="javascript:void(0);"
        {{/if}}>
    <div class="user-img">
        {{$avatar = 'https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a2315c62581.png'}}
        {{if !empty($list.user.avatar_url)}}
            {{$avatar = $list.user.avatar_url}}
        {{/if}}
        <img width="100%" height="100%" data-src="{{$avatar}}">
    </div>
</a>

<div class="right-info">

    <div class="user-name">
        {{if !empty($list.user.number)}}
            {{$list.user.display_name}}
        {{else}}
            匿名用户
        {{/if}}
        {{if isset($list.fr) and ($list.fr eq 2)}}
            (邀请评价)
        {{/if}}
        {{if isset($list.thumb_up) && $page_module == 'main'}}
        <span class="like {{if $list.has_thumb_up}} isLike{{/if}}" data-comment_id="{{$list.comment_id}}" data-thumb="{{$list.thumb_up}}">
              <i class="icon icon-like"></i>
            <span class="like-num">({{$list.thumb_up}})</span>
        </span>
        {{/if}}
    </div>
    {{if isset($list.fr) and ($list.fr neq 2)}}
    <div class="stars-info">
        评分{{include file="./starScore.tpl" score=$list.teach_result}}
        {{if isset($list.thumb_up) && $page_module == 'other'}}
            <span class="like {{if $list.has_thumb_up}} isLike{{/if}}" data-comment_id="{{$list.comment_id}}" data-thumb="{{$list.thumb_up}}">
              <i class="icon icon-like"></i>
            <span class="like-num">({{$list.thumb_up}})</span>
        </span>
        {{/if}}
    </div>
    {{/if}}
</div>
<div class="comment-content">
    {{if $list.fr == '1'}}
        未作出评价,系统默认评价!
    {{elseif $list.fr == '0'}}
        {{htmlspecialchars($list.info)}}
        {{if !empty($list.photo_list) && $list.photo_list|count > 0}}
            <ul class="comment-photo-list" data-index="{{$index}}">
                {{foreach $list.photo_list as $item}}
                    <li data-index="{{$item@index}}">
                        <div class="img-background">
                            <img width="100%" height="auto" whs="1.0" data-src="{{$item.url}}">
                        </div>
                    </li>
                {{/foreach}}
            </ul>
        {{/if}}
    {{elseif $list.fr == '2'}}
        {{htmlspecialchars($list.info)}}
        {{if !empty($list.photo_list) && $list.photo_list|count > 0}}
            <ul class="comment-photo-list" data-index="{{$index}}">
                {{foreach $list.photo_list as $item}}
                    <li data-index="{{$item@index}}">
                        <div class="img-background">
                            <img width="100%" height="auto" whs="1.0" data-src="{{$item.url}}">
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
                {{htmlspecialchars($student.info)}}
            </div>
        </div>
    {{/if}}
    {{if !empty($list.additional.teacher)}}
        {{$teacher = $list.additional.teacher}}
        <div class="teacher-additional">
            老师回复:{{htmlspecialchars($teacher.info)}}
            <div class="triangle"></div>
        </div>
    {{/if}}
{{/if}}
</li>



