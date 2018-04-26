{{*
    @file 课节信息
    @author hurry
    @date 2017/1/15
    @params $item
*}}
<ul>
{{foreach $items as $item}}
    {{$className = ""}}
    {{if  $course_info.price > 0}}
        {{if $item.pay_status == 3}}
            {{$className = "has-try"}}
            {{$able = "listen-able"}}
        {{else if $item.can_access}}
            {{$able = "listen-able"}}
        {{else}}
            {{$able = "listen-unable"}}
        {{/if}}
    {{else}}
        {{$li_width = "100%"}}
        {{$able = "listen-able"}}
    {{/if}}
    <li class="class-sections {{$able}} {{$className}} analysis-habo-log" data-habo-type="{{$gsType}}" data-habo-stype="
    {{if $item.pay_status == 3}}
        daudition
    {{elseif $course_info.price > 0}}
        dbuy
    {{else}}
        dlearning
    {{/if}}
    " data-section-id="{{$item.section_id}}">
        <div class="left">
            <div class="index">
                <span>{{$item@index + 1}}</span>
            </div>
            <div class="content">
                <p class="item-title">
                    {{$item.title}}
                </p>
                <p class="total">
                    {{$item.total_length}}分钟
                </p>
            </div>
        </div>
        {{if $course_info.price > 0 && $item.pay_status == 3}}
            <div class="item-listen-play">
                <span class="character">免费试听</span>
            </div>
        {{/if}}
    </li>
{{/foreach}}
</ul>