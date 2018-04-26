{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "扣分记录"}}

    {{$page_module = "page/teacher/deduct/list/index"}}

    {{$enable_backTopButton = true}}
{{/block}}

{{block name="data"}}
    {{$script_data.pageData = $tpl_data}}
    {{$mess = 0}}
    {{if empty($tpl_data.current_deduct_points)}}
    {{$mess = 1}}
    {{else if $tpl_data.current_deduct_points <= 11}}
    {{$mess = 2}}
    {{$point = 12-$tpl_data.current_deduct_points}}
    {{else if $tpl_data.current_deduct_points < 36}}
    {{$mess = 3}}
    {{else if $tpl_data.current_deduct_points >=36}}
    {{$mess = 4}}
    {{/if}}


{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/teacher/deduct/list/index.styl"/>
{{/block}}

{{block name="content"}}

<div class="top-banner">
    <div class="top-banner-info">
        <div class="text">
            <div class="now">当前违规扣分</div>
            <div class="points">
             {{if empty($tpl_data.current_deduct_points)}}0
             {{else}}
             -{{$tpl_data.current_deduct_points}}
             {{/if}}
             </div>
            <div class="message">
                {{if $mess == 1}}
                表现优秀！继续保持哦～
                {{else if $mess == 2}}
                小心哦~再扣{{$point}}分你的主页及课程将被搜索屏蔽
                {{else if $mess == 3}}
                您的扣分已满12分,老师主页及课程已被搜索屏蔽

                 {{else if $mess == 4}}
                 您在今年的累计扣分已满36分，老师主页及课程已被永久搜索屏蔽
                {{/if}}
            </div>
        </div>
        <a class="detail-btn" href="/teacher_center/deductRule">查看扣分规则</a>

    </div>
</div>
<div class="deduct-list">
    {{if !empty($tpl_data) && !empty($tpl_data.list)}}

        {{foreach $tpl_data.list as $item}}

            <div class="list-item">
                <div class="item-top">
                    <span class="start-time">{{$item.start_time}}</span>
                    <span class="deduct-num">-{{$item.deduct_point}}</span>
                    {{$appeal = ""}}
                    {{if !$item.status}}
                    {{$appeal = "申诉"}}
                    {{else if $item.status == 1}}
                    {{$appeal = "申诉中"}}
                    {{else if $item.status == 2}}
                    {{$appeal = "申诉成功"}}
                    {{else if $item.status == 3}}
                    {{$appeal = "申诉失败"}}
                    {{/if}}
                    {{if $appeal == "申诉"}}
                    {{*<a href="/teacher/deductDetail?deduct_id={{$item.id}}">*}}
                    {{else}}
                    {{*<a href="/teacher/deductAppealDetail?deduct_id={{$item.id}}">*}}
                    {{/if}}
                    {{*<span class="appeal">*}}
                        {{*$appeal*}}
                    {{*</span>*}}
                    {{*</a>*}}
                </div>
                <div class="deduct-reason">
                    扣分原因：{{$item.deduct_reason}}
                </div>
                <div class="clear">
                    {{$item.bottom_tip}}
                </div>
            </div>

        {{/foreach}}

    {{else}}

        <div class="list-none">
            <div class="text">没有更多记录</div>
        </div>

    {{/if}}
</div>

<div class="punish-content">
    <div class="header">
        处罚内容
    </div>
    <ul>
        <li>
            老师主页及课程无法被搜索到
        </li>
        <li>
            无法提交课程审核
        </li>
    </ul>
</div>

{{/block}}
