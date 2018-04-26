{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "跟谁学分期"}}
    {{$page_module = "page/course/instalment/disseminate/index"}}
    {{$enable_backTopButton = true}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/course/instalment/disseminate/css/index.styl" />
{{/block}}

{{block name="content"}}
{{strip}}
    <div class="instalment-disseminate">
        <div class="title">
            <img class="bg" data-src="{{$static_origin}}/src/page/course/instalment/disseminate/img/title.png">
            <img class="icon" data-src="{{$static_origin}}/src/page/course/instalment/disseminate/img/titleIcon.png">
        </div>
        <ul>
            <li>
                <img data-src="{{$static_origin}}/src/page/course/instalment/disseminate/img/cost.png">
            </li>
            <li>
                <img data-src="{{$static_origin}}/src/page/course/instalment/disseminate/img/risk.png">
            </li>
            <li>
                <img data-src="{{$static_origin}}/src/page/course/instalment/disseminate/img/shortcut.png">
            </li>
        </ul>
        <p class="subject">
            立享便捷金融营销工具，助力机构招生季！
        </p>
        <p class="join-info">
            点击下方按钮“一键报名”，立享专员一对一接入服务,现在加入，更享跟谁学分期战略合作伙伴资格，附加资源价值无限
        </p>
        <div class="sign-dialog">
            <div class="mask"></div>
            <div class="container">
                <div>
                    <span class="close">
                        <img class="sign-icon" src="{{$static_origin}}/src/page/course/instalment/disseminate/img/close.png">
                    </span>
                    <div class="error">&nbsp;</div>
                    <input class="name" name="name" placeholder="姓名">
                    <input class="mobile" name="mobile" placeholder="手机号">
                    <input class="org-name" name="orgName" placeholder="机构名">
                    <a class="btn" href="javascript:void(0)">
                        提交
                    </a>
                </div>
            </div>
        </div>
        <div class="sign">
            <a class="btn-sign" href="javascript:void(0)"></a>
            <img class="sign-icon" data-src="{{$static_origin}}/src/page/course/instalment/disseminate/img/signIcon.png">
        </div>
        <div class="notice">
            <img class="sign-btn" data-src="{{$static_origin}}/src/page/course/instalment/disseminate/img/noticeIcon.png">
            报名截至日期8月15日，由于名额有限,我们将对您的机构资质进行一定的审核，未成功进入该期试点的机构，我们将自动将您加入二期名单
        </div>
        <div class="next">
            <img data-src="{{$static_origin}}/src/page/course/instalment/disseminate/img/next.png">
        </div>
        <div class="more">
            了解更多
        </div>
        <div class="describe">
            <p>
                分期产品对于教育机构来说，并非单纯的帮助学生解决学费问题。它是天然的优质营销工具。在教育机构的市场营销活动中，打折等传统促销模式有着天生的缺陷。相比之下，以0利率0手续费的方式对用户进行变相打折，不论是交易转化还是成单量都会有一定的提升。
            </p>
            <p>
                跟谁学分期致力于为教育机构提供标准化的分期金融工具。且跟谁学分期本身不捆绑其它任何产品及条款。
            </p>
        </div>
        <div class="feature">
            我们的产品有如下特质：
            <ul>
                <li>
                    <img data-src="{{$static_origin}}/src/page/course/instalment/disseminate/img/icon1.png">
                    便捷申请：微信扫描二维码即可方便快速申请，自主操作，简单无门槛
                </li>
                <li>
                    <img data-src="{{$static_origin}}/src/page/course/instalment/disseminate/img/icon2.png">
                    无需信用卡：无需用户开通提前申请，随需随用，不占用信用卡额度
                </li>
                <li>
                    <img data-src="{{$static_origin}}/src/page/course/instalment/disseminate/img/icon3.png">
                    快捷还款：支持微信支付宝等支付方式还款，在线支付，快捷还款
                </li>
                <li>
                    <img data-src="{{$static_origin}}/src/page/course/instalment/disseminate/img/icon4.png">
                    机构闪电接入：简单提交机构即课程资料后即可开通服务，专人跟进，省心省力
                </li>
                <li>
                    <img data-src="{{$static_origin}}/src/page/course/instalment/disseminate/img/icon5.png">
                    模式零活：既允许机构承担费率，也支持学生承担费率。可将课程包装为0息0利的营销模式
                </li>
                <li>
                    <img data-src="{{$static_origin}}/src/page/course/instalment/disseminate/img/icon6.png">
                    无风险：机构不承担任何资金风险
                </li>
            </ul>
        </div>
        <div class="process">
            <div class="title">
                主要流程
            </div>
            <div class="process-list">
                <img data-src="{{$static_origin}}/src/page/course/instalment/disseminate/img/process.png">
            </div>
        </div>
    </div>
{{/strip}}
{{/block}}