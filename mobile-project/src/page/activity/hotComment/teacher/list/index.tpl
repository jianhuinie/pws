{{*
    @file 热门评价老师榜
    @author nanci
    @date 2016-12-20
*}}

{{extends file="page/_base/base.tpl"}}

{{block name="page"}}

    {{$page_title = "热门评价老师榜"}}
    {{$page_module = "page/activity/hotComment/teacher/list/index"}}
    {{$enable_backTopButton = false}}
    {{$script_data = $tpl_data}}

{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/hotComment/teacher/list/index.styl"/>
{{/block}}

{{block name="content"}}

{{if $tpl_data.if_login}}
<div class="me">
    {{$teacher_info = $tpl_data.teacher_info}}
    <a href="{{$teacher_info.home_url}}" class="teacher-mainpage dib">
        <img data-src="{{$teacher_info.avatar_url}}" alt="" class="avatar dib">
        <div class="text">
            <span class="name">{{$teacher_info.display_name}}</span>
            {{if $teacher_info.vip_level == 3}}
             <img class="logo-vip" width="17" height="17" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5d1676.png">
            {{elseif $teacher_info.vip_level == 2}}
             <img class="logo-vip" width="17" height="17" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5aef77.png">
            {{elseif $teacher_info.vip_level == 1}}
             <img class="logo-vip" width="17" height="17" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/02/56d3b6e867bb9.png">
            {{else}}
            {{/if}}
            <br>
            <span class="comment-no">{{if $teacher_info.comment_no}}{{$teacher_info.comment_no}}条评论{{else}}暂无评论{{/if}}</span>
            {{if !$teacher_info.if_on_list}}
            <span class="if-on-list">暂未上榜</span>
            {{else}}
            <span class="if-on-list">第{{$teacher_info.rank}}名</span>
            {{/if}}
        </div>
    </a>
    <a href="{{$teacher_info.comment_link}}" class="teacher-comment dib tar">
        <span>回顾我的学生评论</span>
        <span class="icon icon-chevron-thin-right"></span>
    </a>
</div>
{{else}}
<div class="home">
    <a href="/static/login?usertype=0&next=/activity/hotCommentsTeacherRankList" class="teacher-mainpage db">
        <img height="180" data-src="./img/banner-list1.png" alt="" class="banner">
    </a>
</div>
{{/if}}
<div class="list-teacher">
    {{foreach $tpl_data.teacher_list as $item0}}
    <div class="unit">
        <div class="head">
            <div class="rank-no tac{{if $item0.rank < 4}} pre-3{{/if}}">{{$item0.rank}}</div>
            <a href="{{$item0.home_url}}" class="teacher-mainpage">
                <img data-src="{{$item0.avatar_url}}" alt="" class="avatar">
                <div class="text">
                    <span class="name">{{$item0.display_name}}</span>
                    {{if $item0.vip_level == 3}}
                     <img class="logo-vip" width="17" height="17" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5d1676.png">
                    {{elseif $item0.vip_level == 2}}
                     <img class="logo-vip" width="17" height="17" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5aef77.png">
                    {{elseif $item0.vip_level == 1}}
                     <img class="logo-vip" width="17" height="17" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/02/56d3b6e867bb9.png">
                    {{else}}
                    {{/if}}
                    <br>
                    <span class="teach-type">{{$item0.subject_name}}</span>
                </div>
            </a>
            <a href="{{$item0.comment_link}}" class="teacher-comment dib tar">
                <span class="comment-no">{{$item0.comment_no}}条评论</span>
                <span class="icon icon-chevron-thin-right"></span>
            </a>
        </div>
        <div class="comment-first">
            <div class="name">{{$item0.student_name}}</div>
            <p class="content ovh">{{$item0.comment_content}}</p>
            <div class="time tar">{{$item0.comment_time}}</div>
        </div>
    </div>
    {{/foreach}}
</div>
{{/block}}