<div class="coupon-contents">
    <img src="https://imgs.genshuixue.com/0cms/d/file/content/2017/06/59507a1ecaf9e.png">
    <div class="coupon-cont">
        <div class="coupon-left-cont">
            <div class="coupon-moneny">
                <span class="coupon-rmb">￥</span>
                <span class="coupon-balance">{{$coupon.balance}}</span>
            </div>
            {{if $coupon.cond_threshold > 0}}
                <span class="coupon-conthod">满{{$coupon.cond_threshold}}可用</span>
            {{/if}}
        </div>

        <div class="coupon-right-cont">
            <div class="coupon-limit">
                {{if $couponType == 2}}
                    仅限购买{{$tpl_data.source_user_name}}的指定课程
                {{else}}
                    {{$tpl_data.source_user_name}}的课程可用
                {{/if}}
            </div>
            <div class="coupon-time">
                {{$coupon.effect_time}}至{{$coupon.expire_time}}
            </div>
        </div>
    </div>
</div>