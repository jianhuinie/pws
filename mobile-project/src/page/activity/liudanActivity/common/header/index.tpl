<div class="header">
    <div class="logo">
        <img data-src="{{$static_origin}}/src/page/activity/liudanActivity/common/img/logo.png">
    </div>
    <a href="https://m.genshuixue.com">
        <div class="home">
            <img data-src="{{$static_origin}}/src/page/activity/liudanActivity/common/img/icon_home1.png">
        </div>
    </a>
    <div class="header-jinpai">
        {{if $value == 'jinpai'}}
            <img data-src="{{$static_origin}}/src/page/activity/liudanActivity/common/img/header_jinpai.png">
        {{elseif $value == "vip"}}
            <img data-src="{{$static_origin}}/src/page/activity/liudanActivity/common/img/vip.png">
        {{/if}}
    </div>
    <p class="title{{if $value == "vip"}} title-vip{{/if}}">
        {{if $value == "jinpai"}}
            金牌认证机构
        {{elseif $value == "vip"}}
            跟谁学会员介绍
        {{/if}}
    </p>
    {{if $value == "jinpai"}}
        <p class="content">
            让您的机构面向潜在精准学生用户进行广告曝光
        </p>
    {{else if $value == "vip"}}
        <p class="content">
            会员排序绝对优先
        </p>
        <p class="content">
            专属特权只为优秀的您
        </p>
    {{/if}}
    <a tag="#0" href="javascript:go('#0');">
        <div class="to-application">立即申请</div>
    </a>
    <div {{if $value == 'jinpai'}}data-tel="18811426167"{{else if $value == "vip"}}data-tel="18910036756"{{/if}}
            class="free-consult">
        免费咨询
    </div>
</div>