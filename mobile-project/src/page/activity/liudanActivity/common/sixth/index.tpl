<div class="article5">
    <a name="0" class="aClass"></a>
    <p class="little-title {{if $value == "vip"}}vip-title {{/if}}center">
        {{if $value == "jinpai"}}
            现在申请
        {{else if $value == "vip"}}
            立即申请
        {{/if}}
    </p>
    {{if $value == "jinpai"}}
        <p class="title center">立送价值<span>5000元</span>聚惠学广告位一次</p>
    {{/if}}

    <form id="form">
    
        {{if $value == "jinpai"}}
        <input class="name input" type="text"
                name="name" required="required"
                maxlength="20" placeholder="请输入您的机构名称">
        {{/if}}
        <input class="mobile input" type="text"
                name="mobile" required="required"
                maxlength="14" placeholder="请输入您的联系方式">
        <input class="city input" type="text"
                name="mobile" required="required"
                maxlength="20" placeholder="请输入您所在的城市">
        <div class="submit center">提交申请</div>
    </form>
    <div class="protocol center">
        <p>我们将会对您的信息保密，敬请放心！</p>
        <p>信息提交后，跟谁学专属客户经理将会第一时间与您联系，请注意接听！</p>
    </div>
    {{if $value == "jinpai"}}
    <div class="to-home">
        <a href="https://m.genshuixue.com">
            <img data-src="{{$static_origin}}/src/page/activity/liudanActivity/common/img/icon_home2.png">
            <span>去跟谁学逛逛</span>
        </a>
    </div>
    {{/if}}

</div>