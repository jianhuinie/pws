{{extends file="page_app/_base/base.tpl"}}

{{*页面配置*}}
{{block name="page" append}}
    {{*标题*}}
    {{$page_title = "免单邀请卡"}}
    {{*页面入口模块, 例如:page/app_teacher/vip_index/index*}}
    {{$page_module = "page_app/imgInvite/index"}}
    {{*是否使用返回顶部的按钮*}}
    {{$enable_backTopButton = true}}
{{/block}}

{{*模板数据, 需要传递到js模块中的模板数据在这里配置*}}
{{block name="data"}}
    {{$script_data["data"] = $tpl_data}}
{{/block}}

{{*页面样式*}}
{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page_app/imgInvite/index.styl"/>
{{/block}}

{{*页面内容*}}
{{block name="content"}}
    <div class="container" id="card" data-hasmore="{{$tpl_data.pager.has_more}}" data-curp="{{$tpl_data.pager.current_page}}" data-nexp="{{$tpl_data.pager.next_page}}">
        <div class="top-container">
            <div id="publish">新建邀请卡</div>
        </div>
        {{if empty($tpl_data.items)}}
        <div class="invite-info">
            <h2>邀请卡炫技小贴士:</h2>
            <ul class="list">
                <li>活动名称决定了第一印象，咬文嚼字一点也不过分;</li>
                <li>合适的课程价格，会吸引更多的人参与活动;</li>
                <li>合理设置最低邀请人数，传播根本停不下来;</li>
                <li>最重要的是，分享渠道和次数多多益善呦。</li>
            </ul>
        </div>
        <div class="exp-container">
            <p>示例:</p>
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2017/03/58cce09ee780f.png" class="example">
        </div>
        {{else}}
        <div class="card-container">
        {{foreach $tpl_data.items as $item}}
            <div class="card{{if $item.is_end === true}} end{{/if}}"
                data-image="{{$item.image_url}}"
                data-uuid="{{$item.uuid}}"
            >
                {{if $item.is_end === true}}
                <span class="end-info">已结束</span>
                {{/if}}
                <p class="info">
                    <span class="title">活动名称:&nbsp;</span>
                    <span class="content">{{$item.name}}</span>
                </p>
                <p class="info time-info">
                    <span class="title time-title">活动时间:&nbsp;</span>
                    <span class="content time">
                    {{$item.begin_time|date_format:"%Y-%m-%d"}}至{{$item.end_time|date_format:"%Y-%m-%d"}}
                    </span>
                </p>
                <p class="info">
                    <span class="title">免单课程:&nbsp;</span>
                    <span class="content">{{$item.course.name}}</span>
                </p>
                <p class="info">
                    <span class="title">最低邀请人数:&nbsp;</span>
                    <span class="content">{{$item.quota}}人</span>
                </p>
                <p class="info">
                    <span class="title">活动统计:&nbsp;</span>
                    <span class="content">
                        <span class="num">{{$item.stat.cards_count}}人</span>看过你的课程,
                        <span class="num">{{$item.stat.cards_satisfy_quota_count}}人</span>免单
                    </span>
                </p>
            </div>
        {{/foreach}}
        {{/if}}
        </div>
    </div>
{{/block}}

{{*js脚本, 有些特殊情况js需要写在页面里的时候用写在这个block里*}}
{{block name="script"}}
    {{*<script></script>*}}
{{/block}}