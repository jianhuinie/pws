    <div class="course">
    {{foreach courseList as $item index}}
    <div class="course-item clickRevers" {{if hasMore == 0 && index == courseList.length - 1}}style="border-bottom: none;"{{/if}} data-url="{{$item.url}}" data-type="{{$item.type}}" data-number="{{$item.number}}" data-stype="m_teacher_tag">
        <div class="img-container">
            <img data-src="{{$item.cover_url}}" class="course-avatar">
            {{if $item.fenqi}}
            <span class="fenqi">{{$item.fenqi.tag_name}}</span>
            {{/if}}
        </div>
        <div class="course-item-info">
        <div class="name line-clamp line-clamp-2">{{$item.name}}</div>

        <div class="course-type">
            {{if $item.type == 1}}
                1对1
            {{else if $item.type == 2 || $item.type == 4}}
                班课
            {{else if $item.type == 3}}
                视频课
            {{else if $item.type == 13}}
                <span class="good-one2one-span">优选1对1</span>
            {{/if}}

            {{if $item.type!=3}}
                {{if $item.type == 13 || $item.type == 1}}
                    {{if $item.is_online == 2 &&  $item.support_offline == 0}}
                        | 仅线上授课
                    {{else if $item.is_online == 0 &&  $item.support_offline > 0}}
                        | 仅线下授课
                    {{else if $item.is_online == 2 &&  $item.support_offline > 0}}
                        | 可线上·线下授课
                    {{/if}}
                {{else}}
                    {{if $item.is_online == true}}
                        | 线上课
                    {{else}}
                        | 线下课
                    {{/if}}
                {{/if}}
            {{/if}}
        </div>
        <div class="price {{if $item.type == 13}} good-one2one-price{{/if}}"

        {{if $item.price == 0}}
            style="color: #43B245"
        {{/if}}>

            {{if $item.price == 0}}

                免费
            {{else}}


            {{if $item.discount && $item.discount.discount_price > 0}}
                秒杀价：￥{{$item.discount.discount_price}} {{if $item.type == 1}}起{{/if}}
            {{else}}
                ￥{{$item.price}} {{if $item.type == 1 || $item.type == 13}}起{{/if}}
            {{/if}}

            {{/if}}</div>
        </div>
    </div>
    {{/foreach}}
    </div>