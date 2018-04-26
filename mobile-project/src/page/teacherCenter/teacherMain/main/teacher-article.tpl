<div class="teacher-article">
    {{$tpl_data = tpl_data}}
    {{if !empty($tpl_data.articles)}}
    {{$articles = $tpl_data.articles}}
    <ul class="relative-info home-news">
        {{foreach $articles as $tdn index}}
        {{$hasImg = ""}}
        {{if !empty($tdn.covers)}}
        {{$hasImg = "right-image"}}
        {{/if}}
        <li  class="item-content border-bottom {{$hasImg}}">
            {{$cIndex = index + 1}}
            <a href="{{$tdn.detail_url}}"
               {{if isset($tdn.qid)}}

               data-log="article_homepage_article"
               qid="{{$tdn.qid}}"
               rank="{{$cIndex}}"
               search_form="{{$tdn.search_form}}"
               content_type="article"
               role="{{$tdn.role}}"
               {{/if}}
               class="item-article" >
            <div>
                <div class="right-img-a">
                    {{if !empty($tdn.covers)}}
                    {{foreach $tdn.covers as $img}}
                    <div class="right-img-content">
                        <img width="100%" height="100%" data-src="{{$img}}">
                    </div>
                    {{/foreach}}
                    <div class="child-content child-pad">
                        <h3 class="double-line">{{$tdn.title}}</h3>
                    </div>
                    <p class="news-teacher-name">
                        <span>
                        {{$tdn.publish_at}}
                        </span>
                        {{if $tdn.upvotes > 0}}
                        <i class="icon icon-praise"></i>
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
                        <i class="icon icon-praise"></i>
                        {{if $tdn.upvotes > 99}}99+{{else}}{{$tdn.upvotes}}{{/if}}
                        {{/if}}
                    </p>
                    {{/if}}
                </div>
            </div>
            </a>
        </li>
        {{/foreach}}
    </ul>

    {{if $tpl_data.pager.has_more == 1}}
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