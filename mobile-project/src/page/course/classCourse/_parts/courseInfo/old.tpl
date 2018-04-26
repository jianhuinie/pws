<div class="detail-item course-info course-old">
    <div class="detail-title">课程信息</div>
    <div class="detail-content">
        {{if !empty($course_info.information)}}
            <div class="info">
                {{$course_info.information}}
            </div>
        {{/if}}
        <div class="min-student">
            成班原则：
            {{if $course_info.min_student == 1}}
                报名即开班
            {{else}}
                超过{{$course_info.min_student}}人报名即可开班
            {{/if}}
        </div>
        {{if !empty($course_info.introduction)}}
            <div class="img-text-content img-text">
                <div class="wrap">
                    <div class="img-text-intro clip">
                        <div class="img-intro">
                            {{$course_info.introduction}}
                        </div>
                    </div>
                    <div class="all-info">查看全部信息</div>
                </div>
            </div>
        {{/if}}
    </div>
</div>