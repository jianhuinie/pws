<div class="org-dynamic-style">
    <p><span>{{$dynamic.type}}</span>{{$dynamic.title}}</p>

    <div class="dynamic-detail">
        <div class="l">
            <img width="auto" height="auto" clip-rc="1" data-src="{{$dynamic.preface}}">
        </div>
        <div class="cell">
            <p>{{$dynamic.brief|truncate:60:"..."}}</p>
        </div>
    </div>
    <div class="dynamic-extra">
        <div class="post-time">
            {{$dynamic.create_time}}
        </div>
    </div>
    <a href="{{$dynamic.url|regex_replace:"/activityDetail/":"new_activity_detail"|regex_replace:"/blackDetail/":"new_black_detail"}}"></a>
</div>
