{{*
    @file 课程资料
    @author hurry
    @date 2017/1/13
*}}
{{if $material_info}}
    <a name="course-material"> </a>
    <a class="data-list analysis-habo-log" data-habo-type="{{$gsType}}" data-habo-stype="material"
       data-url="bjhlstudent://o.c?a=class_material_list&course_number={{$course_info.number}}&course_type={{$course_info.course_type}}"
       data-href="{{$material_info.detail_url}}"
       href="javascript:void(0);"
       style="display: none">
        <div class="course-material detail-item">
            <div class="detail-title">课程资料</div>
            <div class="data-info detail-content">
                <ul>
                    {{foreach $material_info.material as $item}}
                    <li class="single-line">
                        {{$item@index + 1}}、{{$item.name}}
                    </li>
                    {{/foreach}}
                </ul>
                {{if $material_info.total_count gt 5}}
                    <div class="total-data">
                        <span class="to-more">查看资料</span>
                    </div>
                {{/if}}
            </div>
        </div>
    </a>
{{/if}}