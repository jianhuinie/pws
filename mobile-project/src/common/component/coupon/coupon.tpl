<div class="coupon-container-box">
<div class="title-line">
    <div class="name">优惠券</div>
    <div class="slide-close">×</div>
</div>
<div class="coupon-boxs">
{{if couponList.length > 0}}
    {{foreach couponList as $item index}}
        <div class="coupon-item">
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2017/01/5870bbf82b389.png">
            <div class="coupon-item-box" data-status="0" data-index="{{index}}" data-list={{if $item.course_list.length > 0}}1{{else}}0{{/if}}>

                <div {{if $item.status_type == 'normal'}}  class="balance able" {{else}} class="balance unable"{{/if}}>
                    <span class="money"{{if $item.balance > 999}}style="font-size: 24px;"{{/if}}>
                        <span class="icon">￥</span>
                        <span class="number">
                            {{$item.balance}}
                        </span>
                    </span>
                </div>
                <div class="base-info">
                    <div class="full-use line-clamp">
                        {{$item.cond_limit}}
                    </div>

                    <div class="time line-clamp">
                        {{$item.effect_time}} - {{$item.expire_time}}
                    </div>
                        {{if $item.status_type == 'normal'}}
                            <div class="coupon-status">
                                <span class="normal" data-id="{{$item.serial_num}}">立即领取</span>
                                {{if $item.course_list.length > 0}}
                                <img class="open-icon" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/12/584e9903420eb.png">
                                {{/if}}
                            </div>
                        {{else}}
                            <div class="coupon-status">
                                <span class="other" data-id="{{$item.id}}">{{$item.status_name}}</span>
                                {{if $item.course_list.length > 0}}
                                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/12/584e9903420eb.png">
                                {{/if}}
                            </div>
                        {{/if}}
                    </div>
                </div>
            {{if $item.course_list.length > 0}}
            <div class="rule-boxs hide">
                <div class="rule-name">使用规则</div>
                <div class="rule-title">以下课程可以使用</div>
                <div class="rules">
                    {{foreach $item.course_list as $ite}}
                    <div class="rules-item" data-url="{{$ite.url}}" data-number="{{$ite.number}}" data-type="{{$item.cond_course_type}}">{{$ite.name}}</div>
                    {{/foreach}}
                </div>
            </div>
            {{/if}}
        </div>
    {{/foreach}}
{{else}}
<div class="empty-coupon">该老师没有可领取的优惠券</div>
{{/if}}
</div>
</div>