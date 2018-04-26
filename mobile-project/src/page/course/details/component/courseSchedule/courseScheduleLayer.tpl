{{* 课程安排 浮层*}}
<div id="plan-dialog">
    <div class="title">
        <span>课程安排</span>
        <span class="long">（共{{$course_plan.course_long}}小时）</span>
    </div>
    <div class="title-content">
        <div class="title-content-panel">
            {{if $course_plan.content|count != 0}}
            {{foreach $course_plan.content as $content}}
            <div class="content">
                <div class="circle">{{$content@index+1}}</div>
                <div class="time-detail">
                    <div class="time">{{$content.title}}</div>
                    <div class="plan-detail">{{$content.content}}</div>
                </div>
            </div>
            {{/foreach}}
            {{/if}}
        </div>
    </div>
    <div class="button-know close">
        <span>知道了</span>
    </div>
</div>
