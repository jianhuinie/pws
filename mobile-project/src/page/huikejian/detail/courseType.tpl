
{{* 课程分类 *}}
{{if !empty($tpl_data.classify_class_course)}}
{{foreach $tpl_data.classify_class_course as $courseType}}
<div class="org-recommend org-courses" id="{{$courseType.group_id}}">

    <h3>{{$courseType.classify_name}}</h3>
    <ul class="recommend-list course-list-ajax">
        {{$course_list = $courseType.object_list}}
        {{foreach item=course from=$course_list}}
        <li>
            {{include file="../components/org-course.tpl"}}
        </li>
        {{/foreach}}
    </ul>

    {{if $courseType.pager.has_more}}
    <a href="{{$tpl_data.page_url.course}}" class="more-course-ajax more-button" data-id="{{$courseType.group_id}}" data-pager="{{$courseType.pager.offset}},{{$courseType.pager.row_count}}">
        <div class="character">查看更多课程<i class="icon icon-angle-right"></i></div>
    </a>
    {{/if}}
</div>
{{/foreach}}
{{/if}}
