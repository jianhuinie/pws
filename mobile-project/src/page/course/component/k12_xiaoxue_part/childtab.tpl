<div class="child-list">
    <div class="list-container-child">
        <div class="list">
            <p class="list-item-intro">课程类型:</p>
                <p class="list-item {{if $tpl_data.selected.course_type == 'all'}}on{{/if}} course-tag" data-url="/k12/getClassifyCourses?grade={{$grade}}&class_name={{$class_name}}&course_type=all"
                data-name="all">全部</p>

                <p class="list-item {{if $tpl_data.selected.course_type == 'online'}}on{{/if}} course-tag" data-url="/k12/getClassifyCourses?grade={{$grade}}&class_name={{$class_name}}&course_type=online"
                data-name="online">直播课</p>

                <p class="list-item {{if $tpl_data.selected.course_type == 'offline'}}on{{/if}} course-tag" data-url="/k12/getClassifyCourses?grade={{$grade}}&class_name={{$class_name}}&course_type=offline"
                data-name="offline">线下班课</p>

                <p class="list-item {{if $tpl_data.selected.course_type == 'video'}}on{{/if}} course-tag" data-url="/k12/getClassifyCourses?grade={{$grade}}&class_name={{$class_name}}&course_type=video"
                data-name="video">视频课</p>

        </div>
    </div>
</div>