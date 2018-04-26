{{*
    @file 跟谁学大学首页
    @author hurry
    @date 2016-10-08
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "跟谁学大学"}}
    {{$page_module = "page/college/home/index"}}
    {{$enable_backTopButton = true}}
{{/block}}
{{block name="data"}}
    {{$script_data = $tpl_data}}
    {{* 二级页面 *}}
    {{$college_second_page = 'tcenter/gsx_college/list'}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/college/home/index.styl"/>
{{/block}}

{{block name="content"}}
    <div class="college-container">
        <header>
            <div class="search">
                {{include file="page/college/ui/search/index.tpl"}}
            </div>
            <div class="swiper-container swiper-banner-container" id="myslider">
                <ul class="swiper-wrapper">
                    {{foreach $tpl_data.banners as $banner}}
                    <li class="swiper-slide" data-index="{{$banner@index}}">
                        <a href="{{$banner.url}}">
                            <img width="100%" height="100%" data-src="{{$banner.img}}"/>
                            <!-- <div class="title">{{$banner.title}}</div>
                            <div class="desc">{{$banner.desc}}</div> -->
                        </a>
                    </li>
                    {{/foreach}}
                </ul>
                <ul class="slider-page clearfix">
                    {{foreach $tpl_data.banners as $item}}
                    {{if $item@index == 0}}
                    <li class="on">
                        <span></span>
                    </li>
                    {{else}}
                    <li>
                        <span></span>
                    </li>
                    {{/if}}
                    {{/foreach}}
                </ul>
                <!-- <div class="swiper-banner-pagination swiper-pagination"></div> -->
            </div>
        </header>
        <div class="content">
            {{foreach $tpl_data.body as $content}}
                <div class="content-item">
                    <div class="header">
                        <span class="name">
                            <span class="split"></span>
                            <span class="val">{{$content.name}}</span>
                        </span>
                        <a class="more" href="{{$main_origin}}/{{$college_second_page}}?type={{$content.type}}">
                            <span>更多</span>
                            <span class="icon-chevron-thin-right"></span>
                        </a>
                    </div>
                    {{if $content.style == 'cards'}}
                        {{include file="page/college/home/_part/cards/index.tpl" items=$content.items}}
                    {{elseif $content.style == 'img_desc_vertical'}}
                        {{include file="page/college/home/_part/img_desc_vertical/index.tpl" items=$content.items}}
                    {{elseif $content.style == 'desc_img_lateral'}}
                        {{include file="page/college/home/_part/desc_img_lateral/index.tpl" items=$content.items}}
                    {{elseif $content.style == 'img_desc_lateral'}}
                        {{include file="page/college/home/_part/img_desc_lateral/index.tpl" items=$content.items}}
                    {{/if}}
                </div>
            {{/foreach}}
            <div class="new-user">
                <div>
                    <a href="{{$tpl_data.manager.url}}">
                        <img width="100%" height="100%" data-src="{{$tpl_data.manager.img}}"/>
                    </a>
                </div>
                {{if !isset($smarty.get.source)}}
                <div class="more-contact">
                    <p class="title">更多获取帮助的渠道</p>
                    <p>致电我们的客服：4000-910-910</p>
                    <p>关注微信服务号：genshuixue_teacher</p>
                    <p>加入QQ咨询群：310442613</p>
                </div>
                {{else}}
                <div class="more-qrcode">
                    <p class="contact">客服电话：4000-910-910</p>
                    <div class="qrcode">
                        <div class="container">
                            <div class="div-img">
                                <img width="100%" height="100%" data-src="{{$static_origin}}/src/page/college/img/qrcode_genshuixue_teacher.png"/>
                            </div>
                            <div>
                                <p class="title">微信服务号</p>
                                <p class="code">genshuixue_teacher</p>
                            </div>
                        </div>
                        <div class="container">
                            <div class="div-img">
                                <img width="100%" height="100%" data-src="{{$static_origin}}/src/page/college/img/qrcode_qq.png"/>
                            </div>
                            <div>
                                <p class="title">QQ群</p>
                                <p class="code">310442613</p>
                            </div>
                        </div>
                    </div>
                </div>
                {{/if}}
            </div>
        </div>
        <footer class="footer">
            <p>Copyright @ 2014-2017 跟谁学版权所有</p>
        </footer>
    </div>
{{/block}}