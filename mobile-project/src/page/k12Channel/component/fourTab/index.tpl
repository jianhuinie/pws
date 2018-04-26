<div class="four-tab">
    {{$tab_data = $course_list.data}}
    <div class="four-tab-one tab-item logClick" data-url="{{$tab_data[0].webUrl}}" data-is-search="{{$tab_data[0].is_search}}" data-ctype="0" data-cname="{{$course_list.report_name}}" {{if isset($tab_data[0].keyword)}}data-name="{{$tab_data[0].keyword}}"{{/if}}>
        <p class="title">{{$tab_data[0].title}}</p>
        <p class="sub" style="margin-bottom: 27px;">{{$tab_data[0].sub}}</p>
        <img src="{{$tab_data[0].imgUrl}}" class="tab-avart-one">
    </div>

    <div class="four-tab-two tab-item logClick" data-url="{{$tab_data[1].webUrl}}" data-is-search="{{$tab_data[1].is_search}}" data-ctype="1" data-cname="{{$course_list.report_name}}" {{if isset($tab_data[1].keyword)}}data-name="{{$tab_data[1].keyword}}"{{/if}}>
        <p class="title" style="width:65%;">{{$tab_data[1].title}}</p>
        <p class="sub line-clamp" style="width:65%;">{{$tab_data[1].sub}}</p>
        <img src="{{$tab_data[1].imgUrl}}" class="tab-avart-two">
    </div>

    <div class="four-tab-three tab-item logClick" data-url="{{$tab_data[2].webUrl}}" data-is-search="{{$tab_data[2].is_search}}" data-ctype="2" data-cname="{{$course_list.report_name}}" {{if isset($tab_data[2].keyword)}}data-name="{{$tab_data[2].keyword}}"{{/if}}>
        <p class="title line-clamp line-clamp-2">{{$tab_data[2].title}}</p>
        <p class="sub line-clamp">{{$tab_data[2].sub}}</p>
        <img src="{{$tab_data[2].imgUrl}}" class="tab-avart-other">
    </div>

    <div class="four-tab-four tab-item logClick" data-url="{{$tab_data[3].webUrl}}" data-is-search="{{$tab_data[3].is_search}}" data-ctype="3" data-cname="{{$course_list.report_name}}" {{if isset($tab_data[3].keyword)}}data-name="{{$tab_data[3].keyword}}"{{/if}}>
        <p class="title line-clamp line-clamp-2">{{$tab_data[3].title}}</p>
        <p class="sub line-clamp">{{$tab_data[3].sub}}</p>
        <img src="{{$tab_data[3].imgUrl}}" class="tab-avart-other">
    </div>

</div>