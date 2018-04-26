    <div class="baner-wrap">
        <div class="top-slider top-sliders-container" id="myslider">
            <ul class="slide_group clearfix">
                {{foreach $tpl_data.banner as $item}}
                <li class="slide" data-index="{{$item@index}}">
                    <a href="{{$item.link}}">
                        <img width="100%" height="100%" data-src="{{$item.pic_url}}"/>
                        <div class="img-text">{{$item.title}}</div>
                    </a>
                </li>
                {{/foreach}}
            </ul>
            <ul class="slide_position clearfix">
                {{foreach $tpl_data.banner as $item}}
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
        </div>
    </div>