{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "邀请记录"}}

    {{$page_module = "page/teacher/invite_teacher/list/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/teacher/invite_teacher/list/index.styl"/>
{{/block}}

{{block name="content"}}

    <div class="top-banner">
        <img class="background" data-src="{{$static_origin}}/src/page/teacher/invite_teacher/list/images/pic_historybanner.png" />
        {{if !empty($tpl_data) && !empty($tpl_data.invited_users)}}
        <div class="top-banner-info">
            <div class="text">
                <div class="avatar">
                    <img data-src="{{$tpl_data.avatar}}">
                </div>
                <div class="inline">已邀请了{{$tpl_data.invited_num}}位老师注册</div>
                <div class="inline">其中{{$tpl_data.effect_num}}位老师成为了生效老师</div>
            </div>
            <div class="vip">
                <img data-src="{{$static_origin}}/src/page/teacher/invite_teacher/list/images/ic_vipcrown_yq.png" />
                <div class="inline info-top">已获得了{{$tpl_data.privilege_days}}天会员特权</div>
                <div class="inline">最多还可以获得{{$tpl_data.extra_days}}天会员特权</div>
            </div>
        </div>
        {{/if}}
    </div>
    <div class="g-list">
        <div class="g-list-header clearfix">
            <div class="set">我邀请的用户</div>
            <div class="set">注册日期</div>
            <div class="set">我的奖励</div>
        </div>
        {{if !empty($tpl_data) && !empty($tpl_data.invited_users)}}
            <div class="g-list-item">
                {{foreach $tpl_data.invited_users as $item}}
                    <div class="item clearfix">
                        <div class="set">
                            <div class="inline">{{$item.name}}</div>
                            <div class="active {{if $item.effective_status_code=='0'}}no-active{{/if}}">{{$item.effective_status}}</div>
                        </div>
                        <div class="set">{{$item.register_date}}</div>
                        <div class="set">
                            <div class="inline">{{$item.reward}}</div>
                            <div class="active {{if $item.reward_status_code=='0'}}no-active{{/if}}">{{$item.reward_status}}</div>
                        </div>
                    </div>
                {{/foreach}}
            </div>
            {{else}}
            <div class="g-list-none-item">
                <img class="top-banner-none-text" data-src="{{$static_origin}}/src/page/teacher/invite_teacher/list/images/ic_nohistory.png">

                <div class="text">还没有成功邀请过好友</div>
            </div>
        {{/if}}
    </div>
{{/block}}