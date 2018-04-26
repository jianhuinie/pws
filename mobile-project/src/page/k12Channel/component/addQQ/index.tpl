{{$data_info = $course_list.data}}
<div class="add-qq" id="add-qq">
    <img data-src="{{$data_info.img}}">
    <p>{{$data_info.name}}</p>
    <p>({{$data_info.number}})</p>
    <div class="add-qq-now" data-url="{{$data_info.url}}" data-andriod-key="{{$data_info.android_key}}" style="color:{{$color}};border: 1px solid {{$color}};">立即加入该群</div>
</div>