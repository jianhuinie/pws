{{* 优惠券 *}}

{{$coupon_url = $tpl_data.coupon_url}}

{{if !empty($coupon_url)}}
<a href="{{$coupon_url}}">
    <div class="coupon">
        <div class="title">
            优惠券
        </div>
        <div class="content">
            <span>抵现金</span>
            <i class="icon icon-angle-right"></i>
        </div>
    </div>
</a>
{{/if}}
