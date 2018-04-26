<div class="courses">
<div class="course-content">
    {{foreach data.list as $item index}}
    <div class="item showClick{{if $item.course_type == 4}} isVideo{{/if}}" data-url="{{$item.url}}" {{if $item.course_type == 4}}data-number="{{$item.number}}"{{/if}}>
            <img class="avatar" data-src="{{$item.preface}}">
            <div class="name line-clamp line-clamp-2">{{$item.name}}</div>
            <div class="tag">
                <span>{{$item.course_desc}}</span>
            </div>

            {{if $item.discount}}
                {{if $item.discount.end_time}}
                    <div class="last-time" data-endTime="{{$item.discount.end_time}}"></div>
                {{/if}}
            {{/if}}

            <div class="price">
                {{if $item.discount}}
                    {{if $item.discount.discount_price == 0}}
                        免费
                    {{else if $item.discount.discount_price > 0}}
                        秒杀价: ￥{{$item.discount.discount_price}}
                    {{/if}}
                {{else if $item.price > 0}}
                    ￥{{$item.price}}
                {{else}}
                    免费
                {{/if}}
                {{if $item.fenqi}}
                <span class="fenqi hide" data-video="{{if $item.course_type == 4}}1{{else}}0{{/if}}">{{$item.fenqi.tag_name}}</span>
                {{/if}}
            </div>

            {{if $item.course_type != 10}}
                <div class="favor" data-type="{{if $item.course_type == 3||$item.course_type == 2}}class_course{{else if $item.course_type == 1}}one2one_course{{else}}video_course{{/if}}" data-number="{{$item.number}}" {{if $item.type}}data-collect="{{$item.type}}"{{/if}}>
                    <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/582a7ae1f1d95.png">
                </div>

                <div class="favor-container">
                    <div class="favor-info hide">
                    <div class="favor-narrow"></div>
                    <div class="favor-mask">
                    </div>
                    <div class="favor-course"></div>
                    </div>
                </div>
            {{/if}}

        </div>
    {{/foreach}}
</div>
</div>