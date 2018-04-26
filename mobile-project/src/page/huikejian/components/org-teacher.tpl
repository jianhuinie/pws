<div class="org-teacher-style">
    <a href="{{$teacher.url}}"></a>
    <div class="teacher-img">
        {{include file='common/image/image.tpl' url={{$teacher.avatar}} width="210" height="210"}}
    </div>
    <div class="teacher-course cell">
        <p class="teacher-name">{{$teacher.name}}</p>
        <p class="course-name">{{$teacher.course}}</p>
        <p class="school-name">{{$teacher.short_introduce}}</p>
        <div class="course-fee fix">
            {{if !empty(floatval($teacher.price))}}
            <p class="fee"><span class="symbol">￥</span>{{$teacher.price}}<span class="hour">/小时</span></p>
            {{/if}}
            {{if $teacher.is_online eq true}}<p class="course-way">可在线授课</p>{{else}}<p class="course-way">线下授课</p>{{/if}}
        </div>
    </div>
</div>
