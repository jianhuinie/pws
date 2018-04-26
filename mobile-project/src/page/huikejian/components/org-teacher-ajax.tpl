{{$teacher_list = $tpl_data.hot_teacher.list}}
{{foreach name=teacher_list item=teacher from=$teacher_list}}
<li>
    {{include file="./org-teacher.html"}}
</li>
{{/foreach}}
