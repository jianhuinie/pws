{{if data.length > 0}}
{{foreach data as $course}}
<div class="course" data-url="{{$course.m_detail_url}}" data-number="{{$course.number}}" data-type="{{$course.type}}">
    <img data-src="{{$course.cover_url_for_mobile}}" class="course-img">
    <div class="right-info">
        <div class="title">
            <span class="tag">{{if $course.type == 2}}班课{{else if $course.type == 3}}视频课{{/if}}</span>
            <p class="course-name">{{$course.display_name}}</p>
        </div>
        <p class="middle">
            <img src="{{$static_origin}}/src/page_app/imgInvite/img/ic_selected.png" class="icon">
        </p>
        <p class="price">¥&nbsp;{{$course.price}}</p>
    </div>
</div>
{{/foreach}}
{{else}}
<div class="tips">您还没有开设该课程</div>
{{/if}}

