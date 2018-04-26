{{*
    @file 课程评价
    @author hurry
    @date 2016/12/15
*}}
{{if !empty($comment.comment_list)}}
    <div class="detail-course-comment detail-item">
        <div class="detail-title">课程评价</div>
        <div class="comment-info detail-content">
            {{if $comment.user_comment_number != 0}}
                <div class="total-star">
                    {{include file="common/starScore/starScore.tpl" score=$comment.comment_point}}
                    <span class="score">
                        {{if $comment.comment_point == 0}}5.0{{else}}{{$comment.comment_point}}{{/if}}分
                    </span>
                </div>
            {{/if}}
            <div class="comment-detail">
                {{foreach $comment.comment_list as $list}}
                    {{if $list@index lt 3}}
                        <div class="comment-item">
                        {{if !preg_match('/jinyou/', $host)}}
                            <a {{if !empty($list.number)}} href="/x/{{$list.number}}" {{/if}}>
                        {{/if}}
                            <div class="user-info">
                                <div class="avatar">
                                    <img width="100%" whs="1.0" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a2315c62581.png"
                                         data-src="{{$list.user_avatar}}" alt=""/>
                                </div>
                                </a>
                                <div class="right-info">
                                    <div class="stu-name">{{$list.user_name}}</div>
                                    <div class="create-time">{{$list.date}}</div>
                                </div>
                            </div>
                            <div class="comment">{{$list.content|escape:html}}</div>
                        </div>
                    {{/if}}
                {{/foreach}}
            </div>
            <div class="detail-more">
                <span class="more-btn total-comment analysis-habo-log" data-habo-type="{{$gsType}}" data-habo-stype="morecomment">
                    {{if $comment.user_comment_number != 0}}
                    查看{{$comment.comment_number}}条评价
                    {{else}}
                    查看{{$comment.invite_comment_number}}条邀请评价
                    {{/if}}
                </span>
            </div>
        </div>
    </div>
{{/if}}