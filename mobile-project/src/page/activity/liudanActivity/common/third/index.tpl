<div class="article2">
    <p class="title">
        {{if $value == "jinpai"}}
            金牌认证机构
        {{else if $value == "vip"}}
            跟谁学会员
        {{/if}}
    </p>
    <p class="title">
        {{if $value == "jinpai"}}
            适合哪些品类的教培机构
        {{else if $value == "vip"}}
            适合哪些品类的老师
        {{/if}}
    </p>
    <p class="content">跟谁学作为全球最大的找好老师学习服务平台，覆盖上千品类，8000万学生用户，60万老师，6万机构</p>
    <div class="class-container">
        <div class="class">
            <img class="icon-img"
                    data-src="{{$static_origin}}/src/page/activity/liudanActivity/common/img/child.png">
            <p class="icon-exp">学前教育</p>
        </div>
        <div class="class">
            <img class="icon-img"
                    data-src="{{$static_origin}}/src/page/activity/liudanActivity/common/img/coach.png">
            <p class="icon-exp">中小学辅导</p>
        </div>
        <div class="class">
            <img class="icon-img"
                    data-src="{{$static_origin}}/src/page/activity/liudanActivity/common/img/abroad.png">
            <p class="icon-exp">出国留学</p>
        </div>
        <div class="class last-class">
            <img class="icon-img"
                    data-src="{{$static_origin}}/src/page/activity/liudanActivity/common/img/language.png">
            <p class="icon-exp">语言培训</p>
        </div>
    </div>
    <div class="class-container">
        <div class="class">
            <img class="icon-img"
                    data-src="{{$static_origin}}/src/page/activity/liudanActivity/common/img/postgraduate.png">
            <p class="icon-exp">大学考研</p>
        </div>
        <div class="class">
            <img class="icon-img"
                    data-src="{{$static_origin}}/src/page/activity/liudanActivity/common/img/art.png">
            <p class="icon-exp">艺体兴趣</p>
        </div>
        <div class="class last-class">
            <img class="icon-img"
                    data-src="{{$static_origin}}/src/page/activity/liudanActivity/common/img/profession.png">
            <p class="icon-exp">职业技能</p>
        </div>
    </div>
</div>