<div class="dialog">
    <div class="mask"></div>

    <div class="enter-reason">
        <div class="title">
            <div>
                报名理由
            </div>
            {{if hasRecommendCourse}}
            <div class="next-button next-step" data-value="next">
                下一步
            </div>
            {{else}}
            <div class="next-button confirm" data-value="0" data-submitting="0">
                确认报名
            </div>
            {{/if}}
        </div>

        <div class="input">
            <textarea class="enter-reason-text" rows="5" placeholder="填写一段令人信服的报名理由，会增加学生对您的信任!  (15-150字)"></textarea>
        </div>
    </div>
    <div class="choose-course-wrapper"></div>
</div>