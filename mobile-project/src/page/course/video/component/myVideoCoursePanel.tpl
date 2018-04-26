<div class="my-video-course-panel">
    <div class="header">
        {{if $course.expire_tips != ''}}
        <div class="expire-tip right">
            <span>{{$course.expire_tips}}</span>
        </div>
        {{/if}}

        <div class="expire-date">
            <span>{{$course.expire_time}}</span>
        </div>
    </div>
    <div class="context">
        <div class="teacher-image">
            <a href="{{$course.url}}">
                <img data-src="{{$course.preface}}" width="110" height="80"/>
            </a>
        </div>
        <div class="course-info">
            <div class="course-name"><a href="{{$course.url}}">{{$course.title}}</a></div>
            <div class="teacher-name">
                老师： <span>{{$course.teacher.display_name}}</span>
            </div>
            <div>
                <div>学习进度</div>
                {{$progress = 'style="width:'|cat:($course.progress*100)|cat: '%"'}}
                <div class="progress-wrap">
                    <div class="progress-bg"></div>
                    <div class="progress-bar" {{$progress}}></div>
                </div>
            </div>

        </div>
    </div>
    <div class="bottom">
        <div class="right">
            {{if $course.button}}
            <a class="button {{$course.button.type}}" href="{{$course.button.url}}">{{$course.button.name}}</a>
            {{/if}}
        </div>
        <span>{{$course.course_tips}}</span>
    </div>
</div>