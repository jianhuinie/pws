<div class="teacher-article">
    {{$tpl_data = tpl_data}}
    {{if $tpl_data.articles[0]}}
        {{$articles = $tpl_data.articles}}
            <ul class="relative-info home-news">
                {{foreach $articles as $tdn index}}
                    <!-- {{$hasImg = ""}}
                    {{if $tdn.cover}}
                    {{$hasImg = "right-image"}}
                    {{/if}} -->
                    <!-- 修复right-image异常显示 -->
                    <li class="item-content border-bottom {{$hasImg}}" data-url="{{$tdn.detail_url}}" data-id="{{$tdn.item_id}}"
                    data-type="{{$tdn.item_type}}">
                        <div>
                            <div class="right-img-a">
                                {{if $tdn.cover}}
                                    <div class="right-img-content">
                                        <img width="100%" height="100%" data-src="{{$tdn.cover}}">
                                    </div>
                                    <div class="child-content child-pad">
                                        <h3 class="double-line">{{$tdn.title}}</h3>
                                    </div>
                                    <p class="news-teacher-name">
                                        <span>
                                            {{$tdn.publish_at}}
                                        </span>
                                        {{if $tdn.upvotes > 0}}
                                            <i class="icon icon-like"></i>
                                            {{if $tdn.upvotes > 99}}99+{{else}}{{$tdn.upvotes}}{{/if}}
                                        {{/if}}
                                    </p>
                                {{else}}
                                    <div class="child-content child-no">
                                        <h3 class="double-line">{{$tdn.title}}</h3>
                                    </div>
                                    <p class="news-teacher-name">
                                        <span>
                                            {{$tdn.publish_at}}
                                        </span>
                                        {{if $tdn.upvotes > 0}}
                                            <i class="icon icon-like"></i>
                                            {{if $tdn.upvotes > 99}}99+{{else}}{{$tdn.upvotes}}{{/if}}
                                        {{/if}}
                                    </p>
                                {{/if}}
                            </div>
                        </div>
                    </li>
                {{/foreach}}
            </ul>

        {{if $tpl_data.pager.has_more != false}}
            <div next_cursor="{{$tpl_data.pager.next_page}}" class="load-more load-next-cursor">
                <span>点击查看更多</span>
            </div>
        {{/if}}
    {{else}}
        <div class="no-article">
            暂无文章信息
        </div>
    {{/if}}
</div>