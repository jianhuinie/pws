<ul class="five-tab">

{{foreach $course_list.data as $item}}

{{if $item@index < 3}}
{{if $item@index == 2}}
<li class="item-first-nav tab-item logClick" style="border-right:none" data-ctype="{{$item@index}}" data-cname="{{$course_list.report_name}}" data-is-search="{{$item.is_search}}" {{if isset($item.keyword)}}data-name="{{$item.keyword}}"{{/if}} data-url="{{$item.webUrl}}">
{{else}}
<li class="item-first-nav tab-item logClick" data-ctype="{{$item@index}}" data-cname="{{$course_list.report_name}}" data-is-search="{{$item.is_search}}" {{if isset($item.keyword)}}data-name="{{$item.keyword}}"{{/if}} data-url="{{$item.webUrl}}">
{{/if}}
    <p class="title">{{$item.title}}</p>
    <p class="sub line-clamp">{{$item.sub}}</p>
    <img src="{{$item.imgUrl}}">
</li>
{{else}}

{{if $item@index == 4}}
<li class="item-second-nav tab-item logClick" style="border-right:none" data-ctype="{{$item@index}}" data-cname="{{$course_list.report_name}}" data-is-search="{{$item.is_search}}" {{if isset($item.keyword)}}data-name="{{$item.keyword}}"{{/if}} data-url="{{$item.webUrl}}">
{{else}}
<li class="item-second-nav tab-item logClick" data-ctype="{{$item@index}}" data-cname="{{$course_list.report_name}}" data-is-search="{{$item.is_search}}" {{if isset($item.keyword)}}data-name="{{$item.keyword}}"{{/if}} data-url="{{$item.webUrl}}">
{{/if}}
    <p class="title2">{{$item.title}}</p>
    <p class="sub sub-other line-clamp">{{$item.sub}}</p>
    <img src="{{$item.imgUrl}}" class="second-nav-avart">
</li>
{{/if}}
{{/foreach}}
</ul>