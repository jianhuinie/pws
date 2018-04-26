<div class="related-course ajax-related-course">
    <div class="course-list">
        <ul>
            {{foreach $relatedCourse as $item index}}
            <li>
                <a href="{{$item.url}}" class="analysis-habo-log"
                   {{if $item.type == 3}}
                   data-app="toVideoCourseDetail|{{$item.number}}|"
                   data-jockey='toVideoCourseDetail|{"number":"{{$item.number}}"}'
                   {{/if}}
                   data-habo-type="m_courseC"
                   data-habo-stype="correlation course"
                   >
                    <div class="item">
                        <div class="left-col img-background">
                            <img width="100%" height="100%" data-src="{{$item.logo}}" alt=""/>
                            {{if $item.type == 3}}
                            <img class="icon-play" width="100%" height="100%"
                                 src="https://imgs.genshuixue.com/0cms/d/file/content/2015/12/5673b592e735e.png" alt=""/>
                            {{/if}}
                        </div>
                        <div class="right-col">
                            <div class="top-line">
                                <span class="type">{{if $item.type == 1}}1对1{{else if $item.type == 2}}班课{{else if
                                    $item.type == 3}}视频课{{/if}}</span>

                                <span class="rc-title">{{$item.name}}</span>
                            </div>
                            <div class="bottom-line">
                                <p class="rc-price{{if !$item.current_price || $item.current_price == 0}} rc-price-free{{/if}}">
                                    {{if $item.limited_discount}}
                                    秒杀价:￥{{$item.limited_discount.price}}
                                        <span class="delete-price{{if !$item.current_price}} rc-price-free{{/if}}">{{if $item.current_price}}￥{{$item.current_price}}{{else}}免费{{/if}}</span>
                                    {{else if $item.realtime_price}}
                                    插班价:￥{{$item.realtime_price}}
                                        <span class="delete-price{{if !$item.current_price}} rc-price-free{{/if}}">{{if $item.current_price && $item.current_price != 0}}￥{{$item.current_price}}{{else}}免费{{/if}}</span>
                                    {{else}}
                                        {{if $item.current_price && $item.current_price != 0}}
                                            ￥{{$item.current_price}}
                                        {{else}}
                                            免费
                                        {{/if}}
                                        {{if $item.origin_price}}
                                            <span class="delete-price">
                                                ￥{{$item.origin_price}}
                                            </span>
                                        {{/if}}
                                    {{/if}}
                                </p>
                            </div>
                        </div>
                    </div>
                </a>
            </li>
            {{/foreach}}
        </ul>
    </div>
</div>