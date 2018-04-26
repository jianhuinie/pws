{{*

@file 活动报名页
@author caoying

url: /org/activityDetail?board_id=263

*}}

{{extends file="page/_base/base.tpl"}}

{{block name="data"}}

{{$smarty.block.parent}}
{{$script_path = './activitySign'}}

{{$script_data.user_name = $tpl_data.user_info.user_name}}
{{$script_data.mobile = $tpl_data.user_info.user_mobile}}
{{$script_data.board_id = $tpl_data.board_detail.id}}
{{$script_data.number = $tpl_data.base_info.number}}
{{if not empty($tpl_data.base_info.support_tianxiao)}}
{{$script_data.isTianxiaoOrg = $tpl_data.base_info.support_tianxiao}}
{{/if}}

{{$script_data['share_info'] = []}}
{{$script_data['share_info']['title'] = $tpl_data.board_detail.title|escape}}
{{$script_data['share_info']['content'] = strip_tags($tpl_data.board_detail.content)}}
{{$script_data['share_info']['img'] = $tpl_data.board_detail.img}}
{{if not empty($tpl_data.short_url)}}
{{$script_data['share_info']['shortUrl'] = $tpl_data.short_url}}
{{/if}}

{{/block}}

{{block name="title"}}
活动报名
{{/block}}

{{block name="style"}}
<link rel="stylesheet" href="{{$static_origin}}/src/page/huikejian/newOrgActivitySign/activitySign.styl">
{{/block}}

{{block name="content"}}
{{strip}}
{{include file="../../_common/nav_bar/nav_bar.tpl" text= $tpl_data.board_detail.title|escape}}
<div id="main">
    {{* 头部 *}}
    <div class="header">
        <div class="activity-name">{{$tpl_data.board_detail.title}}</div>
        <div class="activity-other">
            <span class="activity-time">{{$tpl_data.board_detail.create_time|mb_subStr:0:16}}</span>
            <span class="org-name">{{$tpl_data.base_info.name}}</span>
        </div>
    </div>
    {{* 通知 *}}
    {{if !empty($tpl_data.board_conf)}}
    <div class="notice">
        <div class="notice-img bg-img">
            <img src="/src/page/huikejian/img/love_back.png"/>
            <span class="title">通知</span>
        </div>
        <div class="notice-content">
            {{if !empty($tpl_data.board_conf.start_time)}}
            <div class="time">
                <span class="time-title">时间：</span>
                <span class="start-time">{{$tpl_data.board_conf.start_time|mb_subStr:0:16}}</span>
                <span class="time-title">至</span>
                <span class="end-time">{{$tpl_data.board_conf.end_time|mb_subStr:0:16}}</span>
            </div>
            {{/if}}
            {{if !empty($tpl_data.board_conf.address)}}
            <div class="address">
                <span class="time-title">地点：</span>
                <span class="address-detail">{{$tpl_data.board_conf.address}}</span>
            </div>
            {{/if}}
            <div class="max-people">
                <span class="time-title">人数：</span>
                <span class="address-detail">
                    {{if !empty($tpl_data.board_conf.count_limit)}}
                    {{$tpl_data.board_conf.count_limit}}
                    {{else}}
                        不限
                    {{/if}}
                </span>
            </div>
            <div class="break-sign">
                <span class="time-title">报名截止：</span>
                <span class="detail">
                    {{if !empty($tpl_data.board_conf.report_end_time)}}
                    {{$tpl_data.board_conf.report_end_time}}
                    {{else}}
                        待定
                    {{/if}}
                </span>
            </div>
        </div>
    </div>
    {{/if}}

    {{* 详情 *}}
    {{if !empty($tpl_data.board_detail)}}
    <div class="activity-detail">
        <div class="detail-img bg-img">
            <img src="/src/page/huikejian/img/love_back.png"/>
            <span class="title">详情</span>
        </div>
        <div class="detail-content">
            {{$tpl_data.board_detail.content}}
        </div>
    </div>
    {{/if}}

    {{* 报名 *}}
    {{if !empty($tpl_data.board_detail.switcher) && $tpl_data.board_detail.switcher == 1}}
    <div class="sign-info">
        <div class="detail-img bg-img">
            <img src="/src/page/huikejian/img/love_back.png"/>
            <span class="title">报名</span>
        </div>
        <div class="content">
            {{foreach $tpl_data.sign_info as $sign_info}}
            <div class="content-info" data-label="{{$sign_info.label}}" {{if !empty($sign_info.hint)}} data-hint="{{$sign_info.hint}}" {{else}} data-hint="" {{/if}} data-name="{{$sign_info.name}}" data-required="{{$sign_info.required}}">
                <span class="title">
                    {{$sign_info.label}}
                    {{if $sign_info.required eq 1}}
                    *
                    {{/if}}
                </span>
                <input type="text" class="{{$sign_info.name}}-text" {{if !empty($sign_info.hint)}} value="{{$sign_info.hint}}" {{else}} value="" {{/if}}/>
            </div>
            {{/foreach}}
            <div class="user-code" data-label="验证码" data-name="user-code" >
                <span class="title">
                    验证码*
                </span>
                <input type="number" class="code-text"/>
                <span class="gain-code"> 获取验证码</span>
            </div>
        </div>
        <div class="commit">
            提交报名
        </div>


    </div>
    {{/if}}

    <div class="footer">
        <span class="eye">阅读 {{$tpl_data.board_detail.read_times}}</span>
        <span class="thump" data-thump="{{$tpl_data.board_detail.liked}}" data-count="{{$tpl_data.board_detail.support_num}}">
            <i class="icon icon-thumbs-up"></i>
            <span class="thump-count">{{$tpl_data.board_detail.support_num}}</span>
        </span>
        <a href="{{$tpl_data.more_url|regex_replace:"/black/":"new_black"}}">点击查看更多</a>
    </div>
</div>

{{/strip}}
{{/block}}
