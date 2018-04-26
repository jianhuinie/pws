{{if !empty($tpl_data.related_course)}}
<div class="related-course detail-item">
    <div class="detail-title">相关课程</div>
    <div class="course-list detail-content">
        <ul>
            {{foreach $tpl_data.related_course.courses as $list}}
            {{if $list@index lt 3}}

            <li>
                <a href="{{$list.url}}"
                   {{if $list.type == 3}}
                    data-app="toVideoCourseDetail|{{$list.number}}|"
                    data-jockey='toVideoCourseDetail|{"number":"{{$list.number}}"}'
                   {{/if}}>
                    <div class="item analysis-habo-log" data-habo-type="{{$gsType}}" data-habo-stype="clcourse">
                        <div class="left-col img-background">
                            <img width="100%" height="100%" data-src="{{$list.logo}}" alt=""/>
                            {{if $list.type == 3}}
                            <img class="icon-play" width="100%" height="100%"
                                 src="https://imgs.genshuixue.com/0cms/d/file/content/2015/12/5673b592e735e.png" alt=""/>
                            {{/if}}
                            <span class="type">
                                {{if $list.type == 1}}
                                    1对1
                                {{elseif $list.type == 2}}
                                    班课
                                {{elseif
                                    $list.type == 3}}
                                    视频课
                                {{/if}}
                            </span>
                        </div>
                        <div class="right-col">
                            <div class="top-line">
                                <span class="rc-title">{{$list.name}}</span>
                            </div>
                            <div class="bottom-line">
                                <p class="rc-price{{if empty($list.current_price) || $list.current_price eq 0.0}} rc-price-free{{/if}}">
                                    {{if !empty($list.discount)}}
                                        秒杀价:￥{{$list.discount.price}}
                                    {{elseif !empty($list.realtime_price)}}
                                        插班价:￥{{$list.realtime_price}}
                                    {{else}}
                                        {{if !empty($list.current_price) && $list.current_price neq 0.0}}
                                            ￥{{$list.current_price}}
                                        {{else}}
                                            免费
                                        {{/if}}
                                    {{/if}}
                                </p>
                            </div>
                        </div>
                    </div>
                </a>
            </li>


            {{/if}}
            {{/foreach}}
        </ul>
        {{if $ext_data.is_app}}
            <a href="{{$tpl_data.related_course.more_url}}" >
                <div class="all-rc related-course-more analysis-habo-log" data-habo-type="{{$gsType}}" data-habo-stype="morecourse">查看更多课程</div>
            </a>
        {{else}}
            {{if !isset($tpl_data.is_u_meng)}}
                {{if preg_match('/kaoyan/', $host)}}
                    <div class="ky-download">
                        <a href="http://kaoyan.m.genshuixue.com/download/kaoyan">
                            下载跟谁学考研APP查看更多优质课程
                        </a>
                    </div>
                {{else}}
                    <div class="app-download">下载跟谁学APP查看更多优质课程</div>
                {{/if}}
            {{/if}}
        {{/if}}
    </div>
</div>
{{/if}}