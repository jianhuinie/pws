{{*
    @file 左描述右图
    @author hurry
    @date 2016-10-08
*}}
<div class="desc_img_lateral">
    {{foreach $items as $item}}
        <a href="{{$item.url}}">
            <div class="item {{if $item@index == 0}}img{{/if}}">
                <div class="content">
                    <div class="title ellipsis">
                        {{$item.title}}
                    </div>
                    {{if $item@index == 0}}
                    <div class="desc double-line">
                        {{$item.desc}}
                    </div>
                    {{/if}}
                    <div class="count">
                        <span>
                            {{$item.show_count}}人已看
                        </span>
                    </div>
                </div>
                {{if $item@index == 0}}
                    <div class="div-img">
                        <img width="100%" height="100%" data-src="{{$item.img}}"/>
                        {{if $item.icon == 1}}
                            {{include file="page/college/home/_part/playIcon/index.tpl"}}
                        {{/if}}
                    </div>
                {{/if}}
            </div>
        </a>
    {{/foreach}}
</div>