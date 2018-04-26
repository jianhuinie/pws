<div class="article1">
    <p class="title">
        {{if $value == "jinpai"}}
            什么是金牌认证机构？
        {{else if $value == "vip"}}
            什么是跟谁学会员
        {{/if}}
    </p>

    {{if $value == "jinpai"}}
        <p class="little-title">
            线上广告·品牌认证·高效转化·助力招生
        </p>
    {{/if}}

    {{if $value == "jinpai"}}
        <p class="content">金牌认证机构，是跟谁学和瑞士权威认证机构SGS联合推出的广告产品，专为优质教育机构提供面向精准学生的广告宣传，生源的高效转化工具和机构品牌的权威认证</p>
        <p class="content">解决机构发展中招生扩张难、线下广告又贵又低效、品牌得不到学生家长认可等关键痛点，助力优质机构跨品类、跨地域招生扩张</p>
    {{else if $value == "vip"}}
        <p class="content">会员是跟谁学为老师和机构提供的互联网教育营销产品，通过5大系统，36项权益，助力您快速晋升互联网人气老师</p>
    {{/if}}

    {{if $value == "jinpai"}}
    <div class="circle-goods">
        <div class="circle-little"></div>
        <span class="good red good1">学员咨询报名</span>
        <span class="good blue good2">全年广告特权</span>
        <span class="good blue good3">公开课转化</span>
        <span class="good red good4">品牌课价双丰收</span>
        <span class="good red good5">促销复购传播</span>
    </div>
    {{else if $value == "vip"}}
    <div class="vip-img">
        <img data-src="{{$static_origin}}/src/page/activity/liudanActivity/common/img/sixStep.png">
    </div>
    {{/if}}
</div>