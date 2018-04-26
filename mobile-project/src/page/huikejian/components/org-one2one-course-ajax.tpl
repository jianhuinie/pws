{{$course_list = $tpl_data.object_list}}
{{foreach item=course from=$course_list}}
{{include file="./org-one2one-course.html"}}
{{/foreach}}
