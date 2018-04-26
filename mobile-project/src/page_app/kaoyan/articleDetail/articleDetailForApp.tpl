{{*

@file 文章详情页
@author hanzhaohang

*}}
{{extends file="page_app/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = ""}}
    {{$page_module = "page_app/kaoyan/articleDetail/articleDetailForApp"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data.news_id = $tpl_data.article_detail.article_number}}
    {{$script_data.share_info = Json_encode($tpl_data.share_info)}}
    {{$script_data.comments = $tpl_data.article_detail.comments}}
    {{$script_data.favorite_info = $tpl_data.favorite_info}}
    {{if isset($tpl_data.article_detail.top_comments)}}
        {{$script_data.top_comments = $tpl_data.article_detail.top_comments}}
    {{/if}}
    {{if isset($tpl_data.article_detail.total_comments)}}
        {{$script_data.total_comments = $tpl_data.article_detail.total_comments}}
    {{/if}}
{{/block}}


{{block name="style"}}
<link rel="stylesheet" href="{{$static_origin}}/src/page_app/kaoyan/articleDetail/articleDetailForApp.styl">
{{/block}}

{{block name="content"}}

{{$td = $tpl_data}}
{{strip}}
<div class="fullscreen" id="showBigPic">
    <img class="bigPic" style="width: 320px; height: 197px;">
</div>
<div id="main-content">
    <div class="article-info">
        {{if isset($td.article_detail)}}
        {{$tad = $td.article_detail}}
        <header class="title">{{$tad.headline}}</header>
        {{if !empty($tad.avatar)}}
        {{$teacherNum = ""}}
        {{if isset($tad.teacher_number)}}
            {{$teacherNum = $tad.teacher_number}}
        {{/if}}
        <section class="author-info">
            <div class="author-head">
                <div teacher-number="{{$teacherNum}}">
                    <img data-src="{{$tad.avatar}}" width="100%" whs="1" height="auto"/>
                </div>
            </div>
            <div class="author-detail">
                <p class="single-line t-p">
                    <div teacher-number="{{$teacherNum}}">
                        {{$tad.author}}
                    </div>
                </p>
                <p class="single-line b-p">
                    {{$tad.create_at}}
                </p>
            </div>
        </section>
        {{else}}
        <section class="attribute g-f">
            <span>{{$tad.author}}</span>
            <span>{{$tad.create_at}}</span>
        </section>
        {{/if}}

        <article class="article-content" id="article-content">{{$tad.contents}}</article>
        <section class="recommend">
            {{$isActive = ""}}
            {{if $tad.liked == true}}
            {{$isActive = " active"}}
            {{/if}}
            <div class="recommend-btn {{$isActive}}" id="recommend-btn"><i id="add_recommend" class="add_one"></i>
                <span class="icon-like"></span>
            </div>
            <div class="g-f">
                获得 <i id="add_recommend_dom">{{$tad.like_times}}</i>
                个赞

                {{if $tad.reported}}
                <span id="report-btn" reported="true">已举报</span>
                {{else}}
                <span id="report-btn">举报</span>
                {{/if}}
            </div>
        </section>
        {{/if}}

        <section id="article_teacher" style="display:none" class="relative-teacher relative-info right-image"></section>

    </div>
    <div id="relative-info-load" style="height: 32px; text-align:center; line-height: 48px; overflow:hidden;">
        <img src="https://imgs.genshuixue.com/0cms/d/file/content/2015/07/55b9eb44b03de.gif"></div>

    <div class="article-info" id="bottom-article-info" style="display:none">
        <nav class="column-head">相关内容</nav>
        <section>
            <ul class="relative-info"></ul>
        </section>
    </div>

    <section class="comments">
        <div class="hot-comments comment-info" id="hot-comments">
            <div class="comment-title">
                <nav class="column-head hot-comments-h">热门评论</nav>
            </div>
            <section>
                <ul id="hot-comments-ul">
                </ul>
                <div next_cursor="1" text="更多热门评论" type="hot-comments-ul" class="more-comment">更多热门评论</div>
            </section>
        </div>
        <div class="new-comments comment-info" id="new-comments">
            <div class="comment-title">
                <nav class="column-head new-comments-h">最新评论</nav>
            </div>
            <section class="new-comment">
                <ul id="new-comments-ul">
                </ul>
                <div next_cursor="1" type="new-comments-ul" class="more-comment" text="更多最新评论">更多最新评论</div>
            </section>
            <section class="none-comment">
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2015/09/55f8e0dbd6576.png">

                <p>快抢沙发</p>
            </section>
        </div>
    </section>
</div>

{{/strip}}
{{/block}}
