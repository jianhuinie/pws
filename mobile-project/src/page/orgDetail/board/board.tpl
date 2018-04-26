{{$base_info = $tpl_data.base_info}}
<div class="board">
    <div class="first-nav clearfix">
        <div class="avatar">
            {{if $base_info.logo}}
            <img src="{{$base_info.logo}}">
            {{else}}
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/12/5846f3de1e1e1.jpg">
            {{/if}}
        </div>

        <div class="info">
            <div class="header-line">
                <span class="name line-clamp" {{if $ext_data.is_app}}style="max-width: 5.625rem"{{else}}style="max-width: 8.525rem"{{/if}}>
                    {{$base_info.name}}
                </span>

                {{* vip 标识*}}
                {{if isset($base_info.membership_level) && $base_info.membership_level != 1}}
                {{* 机构vip分为1、2、3、4 4个等级，分别与老师会员的0、1、2、3相对应，因此机构的会员等级做了减1的处理*}}
                {{$vip_level = $base_info.membership_level - 1}}
                {{else}}
                {{$vip_level = 0}}
                {{/if}}

                {{if $vip_level > 0}}
                <span class="teacher-vip level{{$vip_level}}">
                    {{if $vip_level == 3}}
                     <img width="100%" height="auto" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5d1676.png">
                    {{else if $vip_level == 2}}
                     <img width="100%" height="auto" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5aef77.png">
                    {{else}}
                     <img width="100%" height="auto" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/02/56d3b6e867bb9.png">
                    {{/if}}
                </span>
                {{/if}}
                {{if $base_info.is_gold_certification == true}}
                    <span class="teacher-gold">
                        <img width="100%" height="auto" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/12/584e1ff2427d3.png">
                    </span>
                {{/if}}

                {{if isset($base_info.audio) && $base_info.audio}}
                <div class="audio" data-length={{$base_info.audio.audio_length}} data-url={{$base_info.audio.url}}>
                        <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/581ab2191b9f9.png" class="border">
                        <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/581a03f213bbb.png" class="audio">
                        <span class="time"></span>
                </div>
                {{/if}}
            </div>
            <div class="bottom-line">
                <span>{{$base_info.total_comments}}条评价</span>

                <span class="student-number"></span>
            </div>
        </div>

        {{if $ext_data.is_app}}
        <div class="focus" data-flag="{{$tpl_data.is_focused}}" {{if $tpl_data.is_focused!=0}}style="background: #9d9d9e; color: white;"{{/if}}>{{if $tpl_data.is_focused == 0}}关注{{else}}已关注{{/if}}</div>
        {{/if}}
    </div>

    <div class="second-nav">
        <p class="line-clamp line-clamp-2">{{$base_info.brief}}</p>
    </div>

    <div class="photos">
        <div class="swiper-container">
            <div class="swiper-wrapper photos-swiper-container">
                {{foreach $tpl_data.photo.list as $item}}
                <div class="swiper-slide">
                    <div class="photo">
                        {{$len = $tpl_data.photo.list|count}}
                        <img src="{{$item.img}}@2x_70Q_1o_80w_80h_1e_1c.src" data-img="{{$item.img}}" data-index="{{$item@index}}" data-length="{{$len}}">
                        {{if $item@index == $len-1}}
                        <div class="morepic showClick" data-url="{{$tpl_data.photo.more_url}}">
                            <div class="morepicMask"></div>
                            <p>查看全部</p>
                        </div>
                        {{/if}}
                    </div>
                </div>
                {{/foreach}}
            </div>
        </div>
    </div>


    <div class="second-content" style="padding-right: 10px;">
    {{if isset($tpl_data.location) && not empty($tpl_data.location.location)}}
    <div class="location showClick" data-url="{{$tpl_data.location.more_url}}">
        <span class="icon">
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/580f19800aca9.png">
        </span>

        <span class="address line-clamp">
            {{$tpl_data.location.location}}
        </span>

        <span class="distance">
        {{if isset($tpl_data.location.distance) && $tpl_data.location.distance}}
            {{$tpl_data.location.distance}}
        {{/if}}
            <span class="intoIcon">
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/582a79d0aff23.png">
            </span>
        </span>

    </div>
    {{/if}}

    {{if isset($base_info.extension) && $base_info.extension}}
    <div href="tel:{{$base_info.extension}}" data-tel="tel:{{$base_info.extension}}" data-number="{{$base_info.extension}}" class="phoneCall">
        <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/580f223b83c8d.png" class="icon">
        <span class="phone">{{$base_info.extension|replace:",":" 转 "}}</span>
        <span class="text">免费咨询<img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/582a79d0aff23.png"></span>
    </div>
    {{/if}}
    </div>
</div>