<li>
    <img data-src="{{$course.teacher.avatar}}" clip-rc="1" width="100" height="100">
    <strong>{{$course.course.display_name|escape}}</strong>
    <p>老师：{{$course.teacher.display_name|escape}}</p>
    <em>
        <i class="icon icon-rmb">{{$course.course.price_range[0]}}</i>
        {{if $course.course.price_range[0] neq $course.course.price_range[1]}}
        -
        <i class="icon icon-rmb">{{$course.course.price_range[1]}}</i>
        {{/if}}
    </em>
    <a href="{{$course.course.url}}"></a>
</li>