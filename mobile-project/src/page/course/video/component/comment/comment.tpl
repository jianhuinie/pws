{{*
    @file 课程评价
    @author hurry
    @date 2016/12/15
*}}
{{if !empty($comment.comment_list)}}
    <div class="detail-course-comment detail-item">
        <div class="detail-title">课程评价</div>
        <div class="comment-info detail-content">
            {{if $comment.additional.user_total_number != 0}}
                <div class="total-star">
                    {{include file="common/starScore/starScore.tpl" score=$comment.additional.average}}
                    <span class="score">
                        {{$comment.additional.average}}
                    </span>
                </div>
            {{/if}}
            <div class="comment-detail">
                {{foreach $comment.comment_list as $list}}
                    {{if $list@index lt 3}}
                        <div class="comment-item">
                        {{if !preg_match('/jinyou/', $host)}}
                            <a {{if !empty($list.serial_number)}} href="/x/{{$list.serial_number}}" {{/if}}>
                        {{/if}}
                            <div class="user-info">
                                <div class="avatar">
                                    <img width="100%" whs="1.0" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a2315c62581.png"
                                         data-src="{{$list.user.avatar_url}}" alt=""/>
                                </div>
                                </a>
                                <div class="right-info">
                                    <div class="stu-name">{{$list.user.display_name}}</div>
                                    <div class="create-time">{{$list.create_time}}</div>
                                </div>
                            </div>
                            <div class="comment">{{$list.info|escape:html}}</div>
                        </div>
                    {{/if}}
                {{/foreach}}
            </div>
            <div class="detail-more">
                <span class="more-btn total-comment analysis-habo-log" data-habo-type="{{$gsType}}" data-habo-stype="morecomment">
                    {{if $comment.additional.user_total_number != 0}}
                    查看{{$comment.additional.total_number}}条评价
                    {{/if}}
                </span>
            </div>
        </div>
    </div>
{{/if}}