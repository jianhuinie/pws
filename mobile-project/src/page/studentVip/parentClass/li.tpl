{{if list.length}}
{{if hasPics == 0}}
<div style="margin-top: 40px;"></div>
{{/if}}
{{foreach list as $item}}
        <a href="{{$item.url}}">
            <li class="main-list-item clearfix">
            <img data-src="{{$item.img}}" class="main-list-img">
            <div class="main-list-info">
                <p class="main-list-name">{{$item.course_name}}</p>
                <p class="main-list-text">
                    {{if $item.course_type == 1}}
                        {{$item.teacher_name}}
                        <span style="margin-right: 4px;"></span>
                        {{$item.area}}
                    {{else if $item.course_type == 2}}
                        已报{{$item.sign_up_number}}人
                        <span style="margin-right: 4px;"></span>
                        {{$item.area}}
                    {{else if $item.course_type == 3}}
                        {{$item.sign_up_number}}人在学习
                    {{else}}
                        已报{{$item.sign_up_number}}人
                        {{if $item.start_time}}
                        | {{$item.start_time}}
                        {{/if}}
                    {{/if}}
                </p>
                <div class="main-list-tag">
                    {{foreach $item.tag as $ite}}
                    {{if $ite!=null}}
                        {{if $ite == '会员免费' || $ite == '会员优惠'}}
                        <p class="red-tag">{{$ite}}</p>
                        {{else}}
                        <p class="blue-tag">{{$ite}}</p>
                        {{/if}}
                    {{/if}}
                    {{/foreach}}
                </div>
            </div>
            </li>
        </a>
{{/foreach}}
{{/if}}