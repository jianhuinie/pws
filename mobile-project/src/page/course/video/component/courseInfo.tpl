<div class="detail-item course-info course-old">
    <div class="detail-title">课程信息</div>
    <div class="detail-content">
        {{if !empty($course_info.introduce)}}
            <div class="info">
                {{$course_info.introduce}}
            </div>
        {{/if}}
        {{if isset($course_info.expire_hours) && $course_info.expire_hours > 0}}
        <div class="expire">
            观看有效期：
            <span>
                {{if $course_info.expire_hours > 24}}
                    付款后{{$course_info.expire_hours / 24}}天内有效
                {{else}}
                    付款后{{$course_info.expire_hours}}小时内有效
                {{/if}}
            </span>
        </div>
        {{/if}}
        {{if !empty($course_info.detail)}}
            <div class="img-text-content img-text">
                <div class="wrap">
                    <div class="img-text-intro clip">
                        <div class="img-intro">
                            {{$course_info.detail}}
                        </div>
                    </div>
                </div>
            </div>
        {{/if}}
    </div>
</div>