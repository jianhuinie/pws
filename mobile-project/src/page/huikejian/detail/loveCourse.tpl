{{* 推荐课程 *}}
{{if !empty($tpl_data.board_course)}}
{{$board_course = $tpl_data.board_course}}
<div class="love-course">
    <div class="back-img">
        <img src="/src/page/huikejian/img/love_back.png"/>
        <span class="course-character">推荐课程</span>
    </div>
    <a href="{{$board_course.url}}" class="love-course-detail">
        <div class="course-img">
            <img width="100%" height="100%" src="{{$board_course.preface}}"/>
        </div>
        <div class="course-detail">
            <div class="course-name">{{$board_course.name}}</div>
            <div class="course-time">
                <span class="item"> {{$board_course.course_len}}小时 </span>
                <span class="item"> {{$board_course.max_student}}人班 </span>
                <span class="item"> {{$board_course.begin_time}}开课 </span>
            </div>
            <div class="course-teacher">
                <span class="item"> 老师:{{$board_course.teacher_name}}</span>
            </div>
            <div class="course-price">
                <span class="price">￥{{$board_course.price}}</span>
                <span class="sign-max">已报名{{$board_course.pay_student}}/{{$board_course.max_student}}</span>
            </div>
        </div>
    </a>
</div>
{{/if}}
