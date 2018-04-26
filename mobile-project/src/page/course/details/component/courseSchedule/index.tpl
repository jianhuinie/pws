{{*课程安排*}}
{{if isset($plan_list) && $plan_list|count > 0}}
    <div class="arrangement">
        <div class="arr-title">课程安排</div>
        <div class="plan-content">
            <div class="line1">
                <div class="course-plan">
                    {{$course_detail.course_plan.arrangement}}
                </div>
                <div class="course-count">
                    共{{$course_detail.course_plan.content|count}}节
                </div>

            </div>
            <div class="plan-list">
                <ul>
                    {{foreach $plan_list as $plan}}
                        {{if $plan@index lt 4}}
                            <li>
                                <div class="index">{{$plan@index + 1}}</div>
                                <div class="course-content">
                                    {{if !empty($plan.content)}}
                                        <div class="plan-title">{{$plan.content}}</div>
                                    {{/if}}

                                    <div {{if empty($plan.content)}} id="one-div"{{/if}} class="plan-time">
                                        {{$plan.title}}
                                        {{if $plan.is_finish}}
                                            <span class="finish">已结束</span>
                                        {{/if}}
                                    </div>

                                </div>
                            </li>
                        {{/if}}
                    {{/foreach}}
                </ul>
            </div>
            {{if $plan_list|count >4}}
                <div class="all-plan">
                    <div class="all-class">查看课程安排</div>
                </div>
            {{/if}}
        </div>
    </div>
{{/if}}
