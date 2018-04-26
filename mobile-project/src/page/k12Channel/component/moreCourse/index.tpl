<div class="search-more">
    <div class="text">
        <img src="{{$static_origin}}/src/page/course/k12_search/img/search-more.png"> 都不是你想要的？
    </div>
    <div data-url="/{{$area}}/sc-{{$tpl_data.more.keyword}}.html{{if $isShare}}?s=share{{/if}}" data-jockey="bjhlstudent://o.c?a=course_search{{if $isShare}}&s=share{{/if}}" class="btn-search-more logClick" style="background: {{$color}};" data-query="{{$tpl_data.more.keyword}}" data-ctype="1" data-cname="{{$tpl_data.more.report_name}}">
        查看更多{{$grade_value}}课程
        <span class="icon-circle-right"></span>
    </div>
</div>