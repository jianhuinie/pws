{{$course_list = $tpl_data.object_list}}
{{foreach item=course from=$course_list}}
<li>
    {{include file="./org-video-course.html"}}
</li>
{{/foreach}}
