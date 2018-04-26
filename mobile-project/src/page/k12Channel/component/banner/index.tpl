<div class="baner-wrap bottom">
    <div class="top-slider top-sliders-container myslider">
        <ul class="slide_group clearfix">
            {{foreach $course_list.data as $item}}
                <li class="slide" data-index="{{$item@index}}">
                    <a href="{{$item.webUrl}}" class="logClick" data-ctype="1" data-cname="{{$course_list.report_name}}">
                        <img width="100%" height="100%" data-src="{{$item.imgUrl}}"/>
                    </a>
                </li>
            {{/foreach}}
        </ul>

        <ul class="slide_position clearfix">
            {{foreach $course_list.data as $item}}
                {{if $item@index == 0}}
                <li class="on">
                    <span></span>
                </li>
                {{else}}
                <li>
                    <span></span>
                </li>
                {{/if}}
            {{/foreach}}
        </ul>
    </div>
</div>