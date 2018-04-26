{{*
    @file 轮播图-3D 覆盖流效果
    @author hurry
    @date 2016-10-08
*}}
<div class="swiper-container swiper-3d-container">
    <div class="swiper-wrapper">
        {{foreach $items as $item}}
            <div class="swiper-slide">
                <a href="{{$item.url}}">
                    <div class="slide-img">
                        <img width="100%" height="100%" src="{{$item.img}}@2x_70Q_1o_208w_119h_1e_1c.src"/>
                        {{if $item.icon == 1}}
                            {{include file="page/college/home/_part/playIcon/index.tpl"}}
                        {{/if}}
                    </div>
                    <div class="title double-line">{{$item.title}}</div>
                    <div class="desc ellipsis">{{$item.show_count}}人已看</div>
                </a>
            </div>
        {{/foreach}}
    </div>
</div>