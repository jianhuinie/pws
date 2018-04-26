{{*头部*}}
<div class="head">
    <div class="top-sliders">
        {{if isset($course_info.photos) && $course_info.photos|count >0}}
            <ul class="slide-images">
                {{foreach $course_info.photos as $photo}}
                    <li>
                        <img width="100%" height="100%" whs="1.78" data-src="{{$photo.url}}"/>
                    </li>
                {{/foreach}}
            </ul>
            {{if $course_info.photos|count > 1}}
                <div class="slide-control">
                    {{foreach $course_info.photos as $photo}}
                        <span class="slide-position"></span>
                    {{/foreach}}
                </div>
            {{/if}}
        {{/if}}
    </div>
    <div class="label">
        {{if $lessonWay == '2'}}直播课{{else}}线下班课{{/if}}
    </div>
</div>
