{{foreach courses as $item}}
    <a href="{{$item.course_url}}" class="course">
        <div class="imgCtn">
            <img src="{{$item.course_cover}}" alt="{{$item.course_name}}">
            {{if $item.course_type == 3}}
                {{$courseType = "视频课"}}
                {{$status = $item.play_count+"次播放"}}
                {{$showVideoTag = true}}
            {{else if $item.course_type == 1}}
                {{$courseType = "一对一"}}
                {{$status = ""}}
                {{$showVideoTag = false}}
            {{else if $item.course_type == 2}}
                {{$courseType = "线下班课"}}
                {{$status = $item.begin_time}}
                {{$showVideoTag = false}}
            {{else if $item.course_type == 8}}
                {{$courseType = "直播课"}}
                {{$status = $item.begin_time}}
                {{$showVideoTag = false}}
            {{/if}}
        </div>

        <p class="tag">{{$courseType}}</p>
        {{if $showVideoTag}}
            <div class="videoTag">
                <i class="icon icon-ic_play"></i>
            </div>
        {{/if}}
        <p class="name">{{$item.course_name}}</p>
        <p class="teacher">
            <span class="status">{{$status}}</span>
            {{$item.teacher_name}}
        </p>
    </a>
{{/foreach}}
