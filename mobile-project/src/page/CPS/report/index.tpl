{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "举报奖励规则"}}

    {{$page_module = "page/CPS/report/index"}}

    {{$enable_backTopButton = false}}

    {{$baseInfo = $tpl_data.basic_info}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/CPS/report/css/index.styl"/>
{{/block}}

{{block name="content"}}
    {{include file="page/_common/nav_bar/nav_bar.tpl" text="举报奖励规则"}}
    <div class="report old">
        <div class="img">
            <img src="{{$static_origin}}/src/page/CPS/report/img/icon-1.png">
        </div>
        <div class="info">如发现平台老师有违规行为，</div>
        <div class="info">请拔打跟谁学客服电话：</div>
        <div class="phone" id="fsdlg_tel">4000-910-910</div>
        <div class="msg"><span class="warn">违规行为</span>包括：课程价格虚高、老师／机构信息不实、老师／机构私下交易等。谢谢对跟谁学的支持！</div>
    </div>

    <div class="report new">
        <p>学生提交投诉举报信息后，跟谁学客服人员将通过电话与举报人确认并核实信息的真实性。</p>
        <p class="title">奖励金额</p>
        <p>经确认无误后，给予举报人200元现金奖励。</p>
        <p>举报奖金将发放到举报人个人中心的“钱包管理”余额中。</p>
        <p class="title">奖金使用</p>
        <p>举报奖金可以用来购买平台上的课程或者直接提现。</p>
    </div>
{{/block}}
