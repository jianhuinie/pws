{{$teacher_list = $tpl_data.hot_teacher.list}}
{{$more_url = $tpl_data.hot_teacher.more_url}}

{{if $teacher_list|count != 0}}
<div class="org-teacher">
    <h3>机构推荐</h3>
    <ul class="teacher-list">
        {{foreach name=teacher_list item=teacher from=$teacher_list}}
        <li>
            {{include file="../components/org-teacher.tpl"}}
        </li>
        {{/foreach}}
    </ul>
    <a href="{{$tpl_data.page_url.teacher}}" class="more-teacher">
        <div>查看全部老师 <i class="icon icon-angle-right"></i></div>
    </a>
</div>
{{/if}}
