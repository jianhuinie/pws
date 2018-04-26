{{*
    @file 你的名字（活动）
    @author shubaiqiao
    @date 2016-12-08
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "【你的名字】写在手心里的秘密"}}

    {{$page_module = "page/activity/yourName/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/yourName/index.styl"/>
{{/block}}

{{block name="content"}}

{{*include file="page/_common/nav_bar/nav_bar.tpl" text="【你的名字】写在手心里的秘密"*}}
    <div class="container">
        <img data-src="{{$static_origin}}/src/page/activity/yourName/img/background.jpg">
        <div class="content">
            <div class="title">“看着手心，那是似曾相识的笔迹，写下的，喜欢你。”</div>
            <div class="banner">
                <ul class="swiper-wrapper">
                    <li class="swiper-slide" data-index="{{$banner@index}}">
                        <img width="100%" height="100%" data-src="{{$static_origin}}/src/page/activity/yourName/img/banner1.png"/>
                    </li>
                    <li class="swiper-slide" data-index="{{$banner@index}}">
                        <img width="100%" height="100%" data-src="{{$static_origin}}/src/page/activity/yourName/img/banner2.png"/>
                    </li>
                    <li class="swiper-slide" data-index="{{$banner@index}}">
                        <img width="100%" height="100%" data-src="{{$static_origin}}/src/page/activity/yourName/img/banner3.png"/>
                    </li>
                    <li class="swiper-slide" data-index="{{$banner@index}}">
                        <img width="100%" height="100%" data-src="{{$static_origin}}/src/page/activity/yourName/img/banner4.png"/>
                    </li>
                    <li class="swiper-slide" data-index="{{$banner@index}}">
                        <img width="100%" height="100%" data-src="{{$static_origin}}/src/page/activity/yourName/img/banner5.png"/>
                    </li>
                </ul>
            </div>
            <div class="input-container">
                <form id="form">
                    <div class="input">
                        <span>掌心</span>
                        <input class="hand" type="text" name="hand" required="required" max-length="20" placeholder="输入文字试试看">
                    </div>
                    <div class="input">
                        <span>你的</span>
                        <input class="your" type="text" name="your" required="required" max-length="8">
                    </div>
                    <div class="submit">生成海报</div>
                </form>
            </div>
            <div class="footer">
                <img width="100%" height="100%" data-src="{{$static_origin}}/src/page/activity/yourName/img/footer.png"/>
            </div>
        </div>
    </div>


{{/block}}