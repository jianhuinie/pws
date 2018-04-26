{{if $lesson_way.way == 2 || $lesson_way.way == 4}}
    {{if $course_data}}
        <a name="course-material"> </a>
        <a class="data-list"
           data-url="bjhlstudent://o.c?a=class_material_list&course_number={{$course_info.number}}&course_type={{$course_info.course_type}}"
           data-href="{{$course_data.detail_url}}"
           href="javascript:void(0);"
           style="display: none">
            <div class="course-material detail-item">
                <div class="detail-title">课程资料</div>
                <div class="data-info detail-content">
                    <ul>
                        {{foreach $course_data.material as $item}}
                        <li class="single-line">
                            {{$item@index + 1}}、{{$item.name}}
                        </li>
                        {{/foreach}}
                    </ul>
                    {{if $course_data.total_count gt 5}}
                        <div class="total-data">
                            <span class="to-more">查看资料</span>
                        </div>
                    {{/if}}
                </div>
            </div>
        </a>
    {{/if}}
{{/if}}