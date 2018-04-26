<ul class="ten-tab clearfix">

{{foreach $course_list.data as $item}}

<li class="item-nav tab-item logClick" style="border-right:none" data-ctype="{{$item@index}}" data-cname="{{$course_list.report_name}}" data-is-search="{{$item.is_search}}" {{if isset($item.keyword)}}data-name="{{$item.keyword}}"{{/if}} data-url="{{$item.webUrl}}">
    <img data-src="{{$item.imgUrl}}">
    <p class="title">{{$item.title}}</p>
</li>
{{/foreach}}
</ul>