{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "推荐有奖"}}

    {{$page_module = "page/teacher/invite_teacher/index/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}

    {{$script_data.qrCodeUrl = $tpl_data.share_url}}
    {{$script_data.share = $tpl_data.share}}
    {{$script_data.inviteCode = $tpl_data.invite_code}}
    {{$script_data.userRole = $tpl_data.user_role}}

{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/teacher/invite_teacher/index/index.styl"/>
{{/block}}

{{block name="content"}}

{{include file="page/_common/nav_bar/nav_bar.tpl" text="推荐有奖"}}

    <header class="top-bar">
        <a href="/tcenter/invite-register/index?user_role=0" class="teacher{{if $tpl_data.user_role eq 0}} selected{{/if}}">邀请老师</a>
        <a href="/tcenter/invite-register/index?user_role=2" class="student{{if $tpl_data.user_role eq 2}} selected{{/if}}">邀请学生</a>
    </header>
    {{if $tpl_data.user_role eq 0}}
    <div class="block-teacher teacher-student">
    {{if !(empty($tpl_data.invited_num) && empty($tpl_data.worked_num))}}
        <a href="/tcenter/invite-register/records?user_role=0&invite_code={{$tpl_data.invite_code}}" class="nums">
            <div class="been-registered">
                <div class="num">{{$tpl_data.invited_num}}</div>
                <div class="desc">已注册老师人数</div>
            </div>
            <div class="been-worked">
                <div class="num">{{$tpl_data.worked_num}}</div>
                <div class="desc">已生效老师人数</div>
            </div>
            <i class="arrow-dir icon icon-chevron-thin-right"></i>
        </a>
    {{/if}}
        <div class="tip">邀好友开启在线教育之旅，立即获得三重大礼</div>
        <div href="#invite-right-now" class="invite-btn">立即邀请</div>
        <div class="prize-one">
            <div class="title title-one">第一重：学分奖励立即拿</div>
            <div class="body body-1">
                <div class="row-1">
                    <img class="row-img" data-src="./img/ic_link@2x.png" alt="" class="img">
                    <div class="text">
                        分享邀请链接：20学分<br>
                        <span class="tip-max">每天最多20学分</span>
                    </div>
                </div>
                <div class="row-2">
                    <img class="row-img" data-src="./img/ic_users@2x.png" alt="" class="img">
                    <div class="text">被邀请老师注册成功<br>300学分</div>
                </div>
                <div class="row-3 row-last">
                    <img class="row-img" data-src="./img/ic_shengxiao@2x.png" alt="" class="img">
                    <div class="text">被邀请老师生效<br>2000学分</div>
                </div>
            </div>
        </div>
        <div class="prize-two">
            <div class="title">第二重：累计满额赠短信</div>
            <div class="body body-2">
                <div class="row-2">
                    <img class="row-img" data-src="./img/ic_users@2x.png" alt="" class="img">
                    <div class="text">每邀请3名老师注册<br>送200条短信</div>
                </div>
                <div class="row-3 row-last">
                    <img class="row-img" data-src="./img/ic_shengxiao@2x.png" alt="" class="img">
                    <div class="text">每邀请3名老师生效<br>送1000条短信</div>
                </div>
            </div>
        </div>
        <div class="prize-three">
            <div class="title">第三重：双项大奖任你选</div>
            <div class="title-sub">每邀请生效老师10人，可从以下奖品任选一件，客服将主动联系获奖老师</div>
            <div class="body body-3">
                <div class="row-1">
                    <img class="row-img" data-src="./img/img_luoji.png" alt="" class="img">
                    <div class="text">罗技 (Logintech)<br>C310网络摄像头</div>
                </div>
                <div class="row-2 row-last">
                    <img class="row-img" data-src="./img/img_mengtian@2x.png" alt="" class="img">
                    <div class="text">蒙恬(Penpower)PDD<br>手写板</div>
                </div>
            </div>
        </div>
    </div>
    {{else}}
    <div class="block-student teacher-student">
    {{if $tpl_data.invited_num > 0}}
        <a href="/tcenter/invite-register/records?user_role=2&invite_code={{$tpl_data.invite_code}}" class="nums">
            <div class="been-registered">
                <div class="num">{{$tpl_data.invited_num}}</div>
                <div class="desc">已邀请学生人数</div>
            </div>
            <i class="arrow-dir icon icon-chevron-thin-right"></i>
        </a>
    {{/if}}
        <div class="prize-one">
            <div class="title">现在邀请学生加入，可获学分奖励</div>
            <div class="body body-1">
                <div class="row-1">
                    <img class="row-img" data-src="./img/ic_link@2x.png" alt="" class="img">
                    <div class="text">
                        分享邀请链接：20学分<br>
                        <span class="tip-max">每天最多20学分</span>
                    </div>
                </div>
                <div class="row-2 row-last">
                    <img class="row-img" data-src="./img/ic_users@2x.png" alt="" class="img">
                    <div class="text">被邀请学生注册成功<br>100学分</div>
                </div>
            </div>
        </div>
        <div class="block-qr-code">
            <div class="title">学生可用微信扫描二维码</div>
            <div class="img"></div>
        </div>
    </div>
    {{/if}}
    <a name="invite-right-now" class="block-share">
        <div class="title">——— 可以通过以下方式邀请好友 ———</div>
        <div class="body">
            <div class="unit weixin{{if $tpl_data.user_role eq 0}} weixin0{{else}} weixin2{{/if}}">
                <img data-src="./img/ic_wechat_signed.png" alt="" class="img">
                <div class="desc">微信好友</div>
            </div>
            <div class="unit pyq{{if $tpl_data.user_role eq 0}} pyq0{{else}} pyq2{{/if}}">
                <img data-src="./img/ic_wechatcycle_signed.png" alt="" class="img">
                <div class="desc">朋友圈</div>
            </div>
            <div class="unit QQ{{if $tpl_data.user_role eq 0}} QQ0{{else}} QQ2{{/if}}">
                <img data-src="./img/ic_qq_signed.png" alt="" class="img">
                <div class="desc">QQ好友</div>
            </div>
            <div class="unit weibo{{if $tpl_data.user_role eq 0}} weibo0{{else}} weibo2{{/if}}">
                <img data-src="./img/ic_weibo_signed.png" alt="" class="img">
                <div class="desc">新浪微博</div>
            </div>
            <div class="unit qzone{{if $tpl_data.user_role eq 0}} qzone0{{else}} qzone2{{/if}}">
                <img data-src="./img/ic_share_zone.png" alt="" class="img">
                <div class="desc">QQ空间</div>
            </div>
            <div class="unit sms{{if $tpl_data.user_role eq 0}} sms0{{else}} sms2{{/if}}">
                <img data-src="./img/ic_share_duanxin.png" alt="" class="img">
                <div class="desc">短信</div>
            </div>
        </div>
    </div>
{{/block}}
