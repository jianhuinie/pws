{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "课程收入分成合作协议"}}
    {{$page_module = "page/CPS/sign_agreement_org/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data["data"] = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/CPS/sign_agreement_org/css/index.styl"/>
{{/block}}

{{block name="content"}}
{{$ti = $tpl_data}}
{{include file="page/_common/nav_bar/nav_bar.tpl" text="课程收入分成合作协议"}}
{{$space = "&nbsp;&nbsp;&nbsp;&nbsp;"}}
<div class="login">
    <div class="top">
        <img width="auto" height="auto" src="https://imgs.genshuixue.com/0cms/d/file/content/2015/06/55725a33c6363.png">
    </div>
    <div class="input-c cel-phone">
        <input id="mobile" class="form-text" type="tel" errmsg="请输入您的机构注册手机号码" name="cel-phone" placeholder="请输入手机号" autocomplete="off">
    </div>
<!--     <div class="item input-c">
        <div class="right_wrap" id="sms_vcode">
        获取验证码
            <div class="btn_vcode disable">获取验证码</div>
        </div> -->
        <div class="item input-c">
            <div class="right_wrap" id="sms_vcode">
            获取验证码
                <div class="btn_vcode disable">获取验证码</div>
            </div>
            <div class="vcode_wrap form-group">
                <input class="input_text"
                       type="tel"
                       name="verify_code"
                       autocomplete="off"
                       placeholder="输入手机验证码"
                       required/>
            </div>
        </div>
    <!-- </div> -->

    <div class="login-button">登录</div>
</div>

    <div class="agreement"  style="display:none;">
        <div class="content-main">
        <div id="content-body" data-reactid=".0.1.1.1.0">
            <div>
            <span>跟谁学课程收入协议由百家互联科技有限公司和您签订。 </span>
            <br>
            <br>
                <span>甲方：北京百家互联科技有限公司</span>
                <br>
                <span>乙方：<span class="display_name"></span></span>
                <br>
                <span>证件号码：<span class="id_number"></span></span>
                <br>
                <br>
                <span class="f-w">鉴于：</span>
                <br>
                <span>1、甲方旗下跟谁学平台（下称跟谁学平台或平台）系自主研发并运营的O2O找好老师学习服务电商平台，产品类型包括但不限于PC端、移动客户端、M站等；
                <br>
                2、乙方系入驻跟谁学平台的机构/老师；甲乙双方针对线上线下的教育资源共享及双方合作开展的直播/录播课程／线下班课／一对一课程（以下统称课程）的课酬分成等相关事宜，根据《中华人民共和国合同法》等规定，特签署本协议。</span>
                <br>
                <br>
                <span class="f-w">第一条 定义</span>
                <br>
                <span>
                    1、机构：是指在跟谁学平台注册并拥有独立提现账号的学校、公司或工作室。<br>
                    2、机构老师：是指机构以其自身名义入驻跟谁学平台，该机构名下的老师统称为机构老师，该机构在跟谁学平台拥有独立的提现账号，机构老师在跟谁学平台没有独立的提现账号，机构老师在跟谁学平台上的课酬统一由其所在机构进行线下结算。<br>
                    3、个体老师：是指以个人名义入驻跟谁学平台，并拥有独立提现账号，当前未与跟谁学平台上机构签约的老师。<br>
                    4、直播课程：是指在机构或老师指定的时间段通过跟谁学平台的直播工具进行授课的课程，包括一对一和班课形式。<br>
                    5、录播课程：是指机构或老师自行录制、自行上传至跟谁学平台并自行定价售卖的视频课程。<br>
                    6、线下班课：是指机构或老师通过跟谁学平台获取生源信息并在线下进行授课的班级课程。
                </span>
                <br>
                <br>
                <span  class="f-w">第二条 合作模式及合作期限</span>
                <br>
                <span>1、乙方入驻跟谁学平台并自行在跟谁学平台开设课程；同时，甲方为乙方提供平台推广服务，双方对课酬收入按约定比例进行分成。</span>
                <br>
                <span>2、甲乙双方商定合作期限为1年。自<span class="start_time"></span>至<span class="end_time"></span>止。合作期限届满，双方拟继续合作的需另行签署协议。</span>
                <br>
                <br>
                <span  class="f-w">第三条 课程的设置与定价</span>
                <br>
                <span>1、课程的开设与定价等均由乙方自行在跟谁学平台设置，跟谁学平台课程价格不得高于线下优惠后价格。
                </span>
                <br>
                <span>2、课程的内容由乙方自行设定，相关知识产权归乙方所有，乙方须对课程内容的合法性、真实性及有效性承担法律责任，课程的内容如涉嫌侵犯第三方的知识产权或其他合法权益的，由乙方自行对第三方承担赔偿责任，如因此给甲方造成损失的，乙方还应对甲方承担赔偿责任，甲方有权从乙方收益分成中直接扣除。</span>
                <br>
                <span>3、乙方不得利用跟谁学平台的直播/录播服务从事任何违反法律规定或社会道德的活动。</span>
                <br>
                <span>4、乙方不得故意规避本协议约定引导学生在线下进行课酬支付。</span>
                <br><br>
                <span  class="f-w">
                    第四条 课程的宣传推广
                </span>
                <br>
                <span>
                    甲方可根据自身的资源分布为乙方的课程提供如下推广支持，但甲方不对推广效果做出任何保证与承诺：<br>
                    1、甲方在跟谁学平台站内对乙方的课程进行站内推广。<br>
                    2、甲方的分公司及市场渠道对乙方的课程进行线下推广。<br>
                    3、甲方在与其存在合作关系的第三方渠道对乙方的课程进行网络推广。
                </span>
                <br>
                <br>
                <span  class="f-w">
                    第五条 本协议费用及课酬收入分成比例
                </span>
                <br>
                <span>1、课酬收入分成比例：</span></span>
            <div>
                <span>
                    <div class="page" title="Page 1">
                        <div class="table-scroll">
                            <table>
                                <colgroup>
                                    <col style="width: 51.225919%;">
                                        <col style="width: 48.774081%;"></colgroup>
                                <tbody>
                                <tr>
                                        <td>课程种类</td>
                                        <td>甲方分成比例</td>
                                    </tr>
                                    {{foreach $tpl_data.rate_info.rate_detail as $cItem}}
                                        <tr>
                                            <td>{{$cItem.course_type}}</td>
                                            <td>{{$cItem.rate}}</td>
                                        </tr>
                                    {{/foreach}}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <span style="display:block; padding-top: 5px;">
                    {{$space}}学生将课程费用支付至跟谁学平台并确认支付后，甲方将乙方应得收益实时划扣至乙方在跟谁学平台的账户中，乙方自行提现。若乙方通过跟谁学平台获得的生源在跟谁学平台之外完成支付，乙方应在成交当月内主动告知甲方，并按照分成比例把甲方应得收益打到甲方对公账户中。<br>
                    {{$space}}如学生使用苹果系统购买录播课程时，苹果公司会抽取30%的费用，乙方实际到账金额=订单金额*(1-苹果公司抽取比例 ) *（1-甲方分成比例 )。<br>
                    {{$space}}退费：如果学生在确认课酬支付前申请退费，甲乙双方不产生任何课程分成，所有费用都将退回给学生。 <br>
                    {{$space}}甲方对于乙方在跟谁学平台上的课程交易行为有权利进行抽查，抽查方式包括但不限于数据分析、电话回访、受理投诉等。如甲方有证据证明乙方违反本协议约定擅自跳单的，乙方应向甲方补足应得收益并打入甲方对公账户中。<br>
                    {{$space}}甲方帐号：110911534310504<br>
                    {{$space}}户名：北京百家互联科技有限公司<br>
                    {{$space}}开 户 行：招商银行北京上地支行
                    </span>
                    <br>

                    <span  class="f-w">第六条 保密条款及知识产权</span>
                    <br>
                    <span>
                        1、 甲乙双方在谈判、签署、履行本协议过程中知悉的对方的战略决策、计划部署、业务创新、发展规划、商业模式及本协议内容，双方均需承担保密义务，不得向任何第三方透漏。<br>
                        2、 无论本协议解除或终止，本保密条款对双方均具有约束力。<br>
                        3、 跟谁学的所有产品包括但不限于网站、客户端、手机APP等均系甲方自主研发完成，甲方享有所有产品的知识产权，乙方仅基于履行本协议目的享有免费的、不可转让的、非独占的使用权，不得对跟谁学产品进行任何复制、修改等，不得进行任何反向工程、反向汇编、反向编译或试图提取源代码，不得创作任何衍生作品。
                    </span>
                    <br>
                    <br>
                    <span  class="f-w">第七条 争议解决</span>
                    <br>
                    <span>{{$space}}本协议履行过程中如发生纠纷，双方应友好协商解决。如不能协商一致，双方一致同意将争议提交北京市海淀区人民法院诉讼解决。</span>
                    <br>
                    <br>
                    <span  class="f-w">第八条 本协议条款的修改权与可分性 </span>
                    <br>
                    <span>
                        1、为更好地提供服务并符合相关监管政策，甲方有权及时修改本协议条款并在跟谁学相关产品中进行更新与公告。<br>
                        2、本协议条款中任何一条被视为无效或因任何理由不可执行，不影响任何其余条款的有效性和可执行性。
                    </span>
                    <br>
                    <br>
                    <span  class="f-w">第九条 通知</span>
                    <br>
                    <span>
                        {{$space}}甲方将通过在跟谁学相关产品中发布公告、短信通知、客服电话等不同方式与机构/老师进行联系，通知相关变更信息。
                    </span>
                    <br>
                    <br>
                    <span  class="f-w">第十条 协议生效</span>
                    <br>
                    <span>
                        {{$space}}本协议自乙方点击“确认签约”时生效。
                    </span>
                    </div>
                    <br>
                    <div class="page" title="Page 1">
                        <div class="section">
                            <div class="layoutArea">
                                <div class="column">
                                    <p>
                                        <span>甲方：北京百家互联科技有限公司</span>
                                        <br>
                                        <span> 乙方：<span class="display_name"></span></span>
                                        <br>
                                        <span class="start_time"></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
    {{*status:0未签约；1已签约；2合同过期*}}
    {{if $ti.status == 1}}
    <div class="button grey">已签约</div>
    {{else}}
    <div class="button">确认签约</div>
    {{/if}}
    </div>


{{/block}}
