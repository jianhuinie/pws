<div class="org-course-style">
    {{if !empty($course.limited_discount)}}
    <div class="countdown"
         data-start="{{$course.limited_discount.start_time}}"
         data-end="{{$course.limited_discount.end_time}}">
    </div>
    {{/if}}
    <div class="left-side">
        <span class="figure_pic img-background">
        <img data-src="{{$course.preface}}" clip-rc="1" width="420" height="240">
        </span>
    </div>
    <div class="right-side">
        <span class="big-font">{{$course.name|escape}}</span>
        {{* 3810 课程 *}}

        {{if $course.type == 4}}
        <p class="gray-font">{{$course.course_len}}次课 | {{$course.max_student}}人班 |
            {{if !empty($course.begin_time)}} {{$course.begin_time}} 开课 {{else}} 时间待定 {{/if}} </p>

        <p class="gray-font teacher-name">老师：{{if !empty($course.teacher_name)}} {{$course.teacher_name}} {{else}}
            待定 {{/if}}</p>

        {{* 正常课程 *}}
        {{else}}
        <p class="gray-font">{{$course.course_len}}小时 | {{$course.max_student}}人班 | {{$course.begin_time}}开课</p>

        <p class="gray-font teacher-name">老师：{{$course.teacher_name}}</p>
        {{/if}}


    </div>
    <div class="bottom-side">
        <div class="yi-sign">已报名{{$course.pay_student}}/{{$course.max_student}}人</div>
        <div class="course-price">

            <span class="discount-price">
                {{if !empty($course.limited_discount)}}
                    <span class="symbol">秒杀价:￥</span>{{$course.limited_discount.discount_price}}
                {{else}}
                    <span class="symbol">￥</span>{{$course.price}}
                {{/if}}

            </span>
            {{if !empty(floatval($course.original_price)) && $course.type == 0}}
            <span class="origin-price">￥{{$course.original_price}}</span>
            {{/if}}
            {{if $course.is_online eq true}}<span class="is-online">直播课</span>{{/if}}
        </div>
    </div>
    <a href="{{$course.url}}"></a>
</div>
