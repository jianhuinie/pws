<div class="list">
    {{foreach list as $it}}
    <div class="list-box-item" data-href="/source-hall/studentOrderDetail?number={{$it.number}}">
        <div class="header">
            <div class="time" data-time="{{$it.create_time}}"></div>
            <div class="status {{if $it.display_status == 0}}un-pay{{else if $it.display_status == 1}}no-pay{{else if $it.display_status == 2}}has-pay{{else if $it.display_status == 3}}done-pay{{else}}cancel-pay{{/if}}">
                {{if $it.display_status == 0}}
                    待响应
                {{else if $it.display_status == 1}}
                    暂不报名
                {{else if $it.display_status == 2}}
                    已报名
                {{else if $it.display_status == 3}}
                    已成单
                {{else if $it.display_status == 4}}
                    取消报名
                {{else if $it.display_status == 5}}
                    已结束报名
                {{/if}}
            </div>
        </div>

        <div class="subject-name">
            {{$it.subject_name}}
        </div>

        <div class="line">
        </div>

        <div class="content">
            <div class="item">
                <i class="icon icon-ic_price"></i>
                <span class="price">￥{{$it.min_price}}-{{$it.max_price}}/小时</span>
            </div>

            <div class="item">
                <i class="icon icon-shijian"></i>
                <span class="student-require-time">
                </span>
            </div>

            {{if $it.class_address}}
            <div class="item distance-card">
                <i class="icon icon-ditu"></i>
                <span class="location line-clamp line-clamp-2">
                    {{$it.class_address}}
                </span>
                {{if $it.distance > 0}}
                    <span class="distance">
                        距离您{{$it.distance}}km
                    </span>
                {{/if}}
            </div>
            {{/if}}

        </div>

    {{if $it.display_status == 0}}
        <div class="content-line"></div>

        <div class="un-pay-status">
            <div class="un-do-pay pay-button" data-number="{{$it.number}}">暂不报名</div>
            <div class="do-pay pay-button" data-href="/source-hall/studentOrderDetail?number={{$it.number}}" data-number="{{$it.number}}">报名</div>
        </div>
    {{/if}}
    </div>
    {{/foreach}}
</div>