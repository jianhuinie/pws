{{*
    @file 四张图
    @author hurry
    @date 2016-10-08
*}}
<div class="desc_img_lateral">
    {{foreach $items as $item}}
        <a href="{{$item.url}}">
            <div class="item">
                <img width="auto" height="auto"
                 data-src="{{$item.img}}"/>
                <div class="desc">
                    <div class="title">{{$item.title}}</div>
                    <div class="desc">{{$item.desc}}</div>
                    <div>
                        <span>
                            {{$item.show_count}}
                        </span>
                        <span>
                            {{$item.hot_count}}
                        </span>
                    </div>
                </div>
            </div>
        </a>
    {{/foreach}}
</div>