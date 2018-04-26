{{*
    @file 四张图
    @author hurry
    @date 2016-10-08
*}}
<div class="desc_img_vertical">
    <ul class="items">
    {{foreach $items as $item}}
        <a href="{{$item.url}}">
            <li class="item">
                <div class="container">
                    <div class="img-bg img-wrap-16-9">
                        <img width="100%" height="auto" whs="1.78" data-src="{{$item.img}}"/>
                        {{if $item.icon == 1}}
                            {{include file="page/college/home/_part/playIcon/index.tpl"}}
                        {{/if}}
                     </div>
                    <div class="content">
                        <div class="title double-line">
                            {{$item.title}}
                        </div>
                        <div class="count">
                            <span>
                                {{$item.show_count}}人已看
                            </span>
                        </div>
                    </div>
                </div>
            </li>
        </a>
    {{/foreach}}
    </ul>
</div>