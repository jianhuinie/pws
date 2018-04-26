{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{if $tpl_data.user_role eq 0}}
    {{$page_title = "老师邀请记录"}}
    {{else}}
    {{$page_title = "学生邀请记录"}}
    {{/if}}
    {{$page_module = "page/teacher/invite_teacher/record/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/teacher/invite_teacher/record/index.styl"/>
{{/block}}

{{block name="content"}}

{{if $tpl_data.user_role eq 0}}
{{include file="page/_common/nav_bar/nav_bar.tpl" text="老师邀请记录"}}
{{else}}
{{include file="page/_common/nav_bar/nav_bar.tpl" text="学生邀请记录"}}
{{/if}}

    <header class="top-banner">
        <img class="background" data-src="./img/pic_historybanner.png" />
        <div class="info">
            <div class="effect-share">
                <div class="num">{{if !empty($tpl_data.shared_count)}}{{$tpl_data.shared_count}}{{else}}0{{/if}}</div>
                <div class="desc">有效分享次数</div>
            </div>
            <div class="invited-students">
                <div class="num">{{if !empty($tpl_data.registerd_count)}}{{$tpl_data.registerd_count}}{{else}}0{{/if}}</div>
                <div class="desc">邀请{{if $tpl_data.user_role eq 0}}老师{{else}}学生{{/if}}次数</div>
            </div>
            <div class="scores-got">
                <div class="num">{{if !empty($tpl_data.integral)}}{{$tpl_data.integral}}{{else}}0{{/if}}</div>
                <div class="desc">已获得学分</div>
            </div>
        </div>
    </header>
    <div class="list">
        <div class="nav">
            <div class="desc">被邀用户</div>
            {{if $tpl_data.user_role eq 0}}
            <div class="desc">成果</div>
            {{/if}}
            <div class="desc">时间</div>
            <div class="desc">获得奖励</div>
        </div>
        {{if !empty($tpl_data.items)}}
        {{foreach $tpl_data.items as $item0}}
        {{if !empty($item0.name) && !empty($item0.create_time) && !empty($item0.integral)}}
        <div class="row">
            <div class="column name">{{$item0.name}}</div>
            {{if !empty($item0.type)}}
            <div class="column type">{{$item0.type}}</div>
            {{/if}}
            <div class="column time">{{$item0.create_time|truncate:10:''|replace:'-':'/'}}</div>
            <div class="column integral">{{$item0.integral}}</div>
        </div>
        {{/if}}
        {{/foreach}}
        {{/if}}
    </div>
{{/block}}
