{{*
    @file 新年第一课活动
    @author yuanye
    @date 2017-02-13
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "人气推荐专区"}}

    {{$page_module = "page/activity/firstClass/recommend"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/firstClass/recommend.styl"/>
{{/block}}

{{block name="content"}}
    {{include file="page/_common/nav_bar/nav_bar.tpl" text="人气推荐专区" }}
    <div class="wrap">
        <div class="hot-recommend">
            <h1 class="title">人气推荐<img class="icon" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/02/58a2ad59e489f.gif"></h1>
            {{foreach $tpl_data.hot_recommend as $item}}
                <div class="item-container" data-url="{{$item.m_detail_url}}">
                    <div class="left">
                        <img data-src="{{$item.cover_url}}">
                    </div>
                    <div class="right">
                        <p class="name">{{$item.name}}</p>
                        <p class="begin">开课日期: <span class="time">{{$item.begin_time|date_format:"%m月%d日"}}</span>
                        </p>
                        <div class="bottom">
                            <span class="price">
                            {{if $item.price == 0}}
                                免费
                            {{else}}
                                {{$item.price}}
                            {{/if}}
                            </span>
                            <span class="total-pay">
                                <span class="number">{{$item.total_pay}}</span>人已报名
                            </span>
                        </div>
                    </div>
                </div>
            {{/foreach}}
        </div>
        <div class="today-recommend">
            <h1 class="title">今日推荐<img class="icon" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/02/58a2ad61b5c72.gif"></h1>
            {{foreach $tpl_data.today_recommend as $item}}
                <div class="item-container" data-url="{{$item.m_detail_url}}">
                    <div class="left">
                        <img data-src="{{$item.cover_url}}">
                    </div>
                    <div class="right">
                        <p class="name">{{$item.name}}</p>
                        <p class="schedule">课节数: <span class="schedules_number">{{$item.schedules_number}}</span>
                        </p>
                        <div class="bottom">
                            <span class="price">
                            {{if $item.price == 0}}
                                免费
                            {{else}}
                                {{$item.price}}
                            {{/if}}
                            </span>
                            <span class="total-pay">
                                <span class="number">{{$item.total_pay}}</span>人已报名
                            </span>
                        </div>
                    </div>
                </div>
            {{/foreach}}
        </div>
        <div class="cheats" style="display:none;">
            <p class="check-cheats" data-url="{{$tpl_data.open_method_url}}">点我查看爆款课程开设秘笈>></p>
            <div class="QR-code-container">
                <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/02/58a11e93ecaad.jpg" class="qr-code">
            </div>
            <p class="concern">关注【跟谁学老师版】公众号，掌握活动最新动态</p>
        </div>
    </div>
{{/block}}










