{{$comment_data = $tpl_data.comment_info}}

<div class="tabs class-comment" data-tab="class-comment">
{{* 暂无评价 *}}
{{if empty($comment_data.comment_list)}}
    {{* 免费课 *}}
    {{if $comment_data.additional.is_free && !$comment_data.additional.can_comment}}
        <div class="no-comment">
            <span>加入课程才可以发表评价哦</span>
        </div>
    {{else if $comment_data.additional.can_comment}}
        <div class="no-comment-symbol">
            <span>
               发表评价
            </span>
            <span>
                {{for $i=0; $i<5; $i++}}
                <i class="icon icon-star_all"></i>
                {{/for}}
            </span>
        </div>
    {{/if}}
    <div class="no-comment-banner">
        <div class="banner">
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/569370bfae8cb.png"/>
            <p>暂无评价</p>
        </div>
    </div>
{{else}}
    <div class="has-comment">
        <span class="title">
            评价
             {{include file="common/starScore/starScore.tpl" score=$comment_data.additional.average}}
            <span>{{$comment_data.additional.average}}</span>
        </span>
         <span class="comment-people">
            {{$comment_data.additional.total_number}}人评价
        </span>
    </div>
    {{* 评价 tag *}}
    {{if !empty($comment_data.additional.comment_tag)}}
    <div class="comment-detail-tag">
        <span class="tag active" data-tag="0">全部</span>
        {{foreach $comment_data.additional.comment_tag as $commentTag}}
        <span class="tag {{if !$commentTag.type}}bad{{/if}}" data-tag="{{$commentTag.value}}">
            {{$commentTag.name}}
            {{if $commentTag.count > 99}}
            (99+)
            {{else}}
            ({{$commentTag.count}})
            {{/if}}
           </span>
        {{/foreach}}
    </div>
    {{/if}}
    {{if $comment_data.additional.can_comment}}
    <div class="has-comment-banner">
        <span>
            {{for $i=0; $i<5; $i++}}
            <i class="icon icon-star_all"></i>
            {{/for}}
        </span>
         <p>
           发表评价
        </p>
    </div>
    {{/if}}

    {{* 全部评价列表 *}}
    {{if !empty($comment_data.comment_list)}}
    <div class="all-comment-lists {{if !$comment_data.additional.can_comment}} can-not-comment {{/if}}">
        <ul class="comment-list">
            {{include file="./ajax-videoComment.tpl"}}
        </ul>
        {{if $comment_data.additional.has_more}}
        <div class="more-loading" data-page="{{$comment_data.additional.next_cursor}}">
            <span class="more">查看更多</span>
        </div>
        {{/if}}
    </div>
    {{/if}}

{{/if}}

</div>