{{foreach $list as $item}}
<div class="block card course-card">
    <a class="acard" href="{{$item.url}}">
        <div class="course-pic">
            <a class="taga" href="{{$item.url}}">
                <img src="{{$item.img}}">
                <div class="mold"></div>
                <div class="report-status">
                    {{$item.img_desc}}
                </div>
            </a>
        </div>
        <div class="course-detail">
            <div class="top">
                <div class="title">{{$item.course_name}}</div>
                <div class="course-org">{{$item.teacher_name}}</div>
                <div class="course-descrition">
                    {{if $item.price == 0}}
                        <span class="free price">
                            免费
                        </span>
                    {{else}}
                        <span class="price">
                            ¥ {{$item.price}}
                        </span>
                    {{/if}}
                   <span class="address"> {{$item.address}}</span>
                </div>
            </div>
            <div class="times">{{$item.time_desc}}, {{$item.schedule_count}}课节</div>
        </div>
    </a>
</div>
{{/foreach}}