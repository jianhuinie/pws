<div class="article4">
    <p class="title">成功案例</p>
    {{if $value == "jinpai"}}
        <img data-src="{{$static_origin}}/src/page/activity/liudanActivity/common/img/jinyou_logo.png"
                class="logo-jinyou">
        <p class="img-exp">金囿学堂</p>
    {{else if $value == "vip"}}
        <p class="name">肖宝清</p>
    {{/if}}
    <div class="conduct-container">
        <div class="conduct conduct-left">
            <p><span>{{if $value == "jinpai"}}80843{{else if $value == "vip"}}151980{{/if}}</span>人看过</p>
            <p><span>{{if $value == "jinpai"}}60+{{else if $value == "vip"}}14{{/if}}</span>{{if $value == "jinpai"}}精品{{else if $value == "vip"}}个{{/if}}课程</p>
        </div>
        <div class="conduct conduct-right">
            <p><span>{{if $value == "jinpai"}}43336{{else if $value == "vip"}}3449{{/if}}</span>{{if $value == "jinpai"}}位学员{{else if $value == "vip"}}位学生{{/if}}</p>
            <p><span>{{if $value == "jinpai"}}487{{else if $value == "vip"}}1187+{{/if}}</span>条评论</p>
        </div>
    </div>
    <div class="case-slider-container slider-container" id="case-slider">
        <ul class="slide_group">
            {{if $value == "jinpai"}}
                <li class="slide" data-index="0">
                    <img width="100%" height="auto"
                            data-src="{{$static_origin}}/src/page/activity/liudanActivity/common/img/two_jinyou1.png">
                </li>
                <li class="slide" data-index="1">
                    <img width="100%" data-src="{{$static_origin}}/src/page/activity/liudanActivity/common/img/two_jinyou2.png">
                </li>
            {{else if $value == "vip"}}
                <li class="slide" data-index="0">
                    <img width="100%" height="auto"
                        data-src="{{$static_origin}}/src/page/activity/liudanActivity/common/img/success1.png">
                </li>
                <li class="slide" data-index="1">
                    <img width="100%" data-src="{{$static_origin}}/src/page/activity/liudanActivity/common/img/success2.png">
                </li>
                <li class="slide" data-index="1">
                    <img width="100%" data-src="{{$static_origin}}/src/page/activity/liudanActivity/common/img/success3.png">
                </li>
            {{/if}}
        </ul>
        <ul class="slide_position">
            <li class="on">
                <span></span>
            </li>
            <li>
                <span></span>
            </li>
            {{if $value == "vip"}}
                <li>
                    <span></span>
                </li>
            {{/if}}
        </ul>
    </div>
</div>