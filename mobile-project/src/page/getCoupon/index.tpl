{{*
	@file 优惠券领取成功页面
	@author huangshiming
*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}

    {{$page_title = "跟谁学－找好老师，上跟谁学"}}
    {{$page_module = "page/getCoupon/index"}}
    {{$enable_backTopButton = true}}

    {{$script_data = $tpl_data}}
    {{*隐藏广告条*}}
    {{if isset($smarty.get.viewType) && $smarty.get.viewType == 'hide'}}
        {{$isShowAds = false}}
    {{/if}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/getCoupon/index.styl"/>
{{/block}}

{{block name="content"}}
    {{$coupon = $tpl_data.coupon}}
    {{*优惠券类型 1-通用 2-指定课程*}}
    {{$couponType=2}}
    {{if empty($coupon.cond_class) && empty($coupon.cond_video) && empty($coupon.cond_org_xcourse)}}
        {{$couponType=1}}
    {{/if}}

    <div class="coupon-status">
        {{if $coupon.status_type == 'has_get'}}
            已经领取过了呦
        {{else if $coupon.status_type == 'normal'}}
            成功领取
        {{/if}}
    </div>

    <div class="get-coupon-text">
        <p class="pre-text">您领取的优惠券</p>
        <p class="after-text">已放入跟谁学账户<span class="mobile-color">{{$tpl_data.mobile}}</span></p>
    </div>

    {{include file="page/getCoupon/_part/couponContent.tpl"}}

    <div class="rules">
        可登录跟谁学APP到“我-钱包管理-优惠券”中查看
    </div>

    {{if !empty($coupon.course_list)}}
        <div class="coupon-title">
            {{if $couponType == 1}}
                {{$tpl_data.source_user_name}}的推荐课程
            {{else}}
                以下课程可以使用优惠券，快去看看吧！
            {{/if}}
        </div>

        {{include file="page/getCoupon/_part/couponCourseList.tpl"}}
    {{/if}}

    <div class="buttons">
        <a class="button-item" href="{{$tpl_data.course_url}}">更多课程</a>
        <div class="button-item wx-button hide">分享给小伙伴</div>
    </div>


    <div class="bottom-logo">
        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/06/593f4cd499dd6.png">
    </div>
{{/block}}
