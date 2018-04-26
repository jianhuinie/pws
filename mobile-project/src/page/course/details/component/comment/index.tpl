{{*学生评价*}}
{{if !empty($comment.comment_list)}}
    <div class="stu-comment">
        <div class="title">学生评价</div>
        <div class="comment-info">
            <div class="total-star">
                {{include file="common/starScore/starScore.tpl" score=$comment.comment_point}}
                <span class="score">
            {{if $comment.comment_point == 0}}5.0{{else}}{{$comment.comment_point}}{{/if}}
        </span>
            </div>
            <div class="comment-detail">
                {{foreach $comment.comment_list as $list}}
                    {{if $list@index eq 0}}
                        <div class="avatar">
                            <img width="100%" whs="1.0" height="100%" src="https://img.genshuixue.com/0cms/d/file/content/2016/01/56a2315c62581.png"
                                 data-src="{{$list.user_avatar}}" alt=""/>
                        </div>
                        <div class="right-info">
                            <div class="stu-name">{{$list.user_name}}</div>
                            <div class="create-time">{{$list.date}}</div>
                        </div>
                        <div class="comment">{{$list.content}}</div>
                    {{/if}}
                {{/foreach}}
            </div>
            <a href="{{$comment.comment_url}}">
                <div class="total-comment">
            <span class="inner-content">
                 查看{{$comment.comment_number}}条评价
            </span>
                </div>
            </a>
        </div>
    </div>
{{/if}}
