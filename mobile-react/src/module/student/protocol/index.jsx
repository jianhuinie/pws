import React from 'react';
require('css-loader!./index.styl');
import Util from 'common/util/util';
export default class Protocol extends React.Component {

    componentDidMount() {
        document.title = '微师平台用户协议';
        Util.sharePage();
    }

    render() {
        return (
            <div className="protocol-view">
                <h2 className="protocol-view-title">《微师使用协议》</h2>
                <div className="paragraph">欢迎你使用微师并与微师经营者签署本使用协议！</div>
                <div className="paragraph">自本协议发布之日起，<span className="underline">微师网站、微师微信公众号、微师客户端所称“微师使用协议”均指本协议。</span></div>
                <div className="paragraph">各服务条款前所列索引关键词仅为帮助你理解该条款表达的主旨之用，不影响或限制本协议条款的含义或解释。为维护你自身权益，建议你仔细阅读各条款具体表述。</div>
                <div className="paragraph">
                    <span className="emphasize">0.1【审慎阅读】</span>
                    点击同意本协议之前，请认真阅读（未成年人请在监管人陪同下阅读）本协议。
                    你务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。
                    <span className="underline">免除或者限制责任的条款将以粗体下划线标识，请重点阅读。</span>如你对协议有任何疑问，可向微师客服咨询。
                </div>
                <div className="paragraph">
                    <span className="emphasize">0.2【签约动作】</span>
                    当你按照登录、注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，
                    即表示已充分阅读、理解并接受本协议的全部内容，并与微师达成一致，成为微师“用户”。
                    <span className="underline">阅读本协议的过程中，如果你不同意本协议或其中任何条款约定，你应立即停止注册、登录程序。</span>
                </div>
                <div className="paragraph">
                    <span className="emphasize">0.3【协议变更】</span>
                    在你签署本协议之后，此文本可能因国家政策、产品以及履行本协议的环境发生变化而进行修改，
                    <span className="underline">修改后的协议将发布在微师产品上，并以本协议第九条约定的方式通知你。</span>
                    若你对修改后的协议有异议，请立即停止登录、使用微师产品及服务，若你登录或继续使用微师产品或服务，视为对修改后的协议予以认可。
                </div>
                <div className="paragraph">
                    <span className="emphasize">0.4【补充协议】</span>
                    由于互联网高速发展，你与微师签署的本协议列明的条款并不能完整罗列并覆盖你与微师的所有权利与义务，
                    现有的约定也不能保证完全符合未来发展的需求。
                    <span className="underline">
                        因此，微师法律声明及隐私权政策、微师产品与服务规则均为本协议的补充协议，
                        与本协议不可分割且具有同等法律效力。
                    </span>
                    如你使用微师服务，视为你同意上述补充协议。各补充协议的变更效力参照0.3款的约定。
                </div>
                <div className="paragraph second-title">一、 定义</div>
                <div className="paragraph">
                    <span className="emphasize">微师：</span>
                    指包括微师网（&nbsp;域名为&nbsp;
                    <span className="underline">www.weishi100.com</span>&nbsp;, &nbsp;
                    <span className="underline">m.weishi100.com</span>&nbsp;
                    ）、微师公众号及微师客户端。
                </div>
                <div className="paragraph">
                    <span className="emphasize">微师经营者：</span>
                    北京百家互联科技有限公司。
                </div>
                <div className="paragraph">
                    <span className="emphasize">微师产品规则：</span>
                    包括所有在微师产品上已经发布及后续发布的全部规则、解读、实施细则、产品流程说明、公告等内容。
                </div>
                <div className="paragraph">
                    <span className="emphasize">用户：</span>
                    下称“你”或“用户”，是指注册、登录、使用微师产品的个人或组织，包括但不限于在微师入驻的机构、老师、学员等。
                </div>
                <div className="paragraph">
                    <span className="emphasize">机构：</span>
                    指注册使用微师服务，在中国境内依法成立的法人组织或中国法律承认的其他非法人组织。
                </div>
                <div className="paragraph">
                    <span className="emphasize">老师：</span>
                    指注册使用微师服务，从属于入驻机构或独立的注册老师。
                </div>
                <div className="paragraph">
                    <span className="emphasize">学员：</span>
                    注册、登录、使用微师产品，参加入驻机构、老师开设的课程等活动的个人。
                </div>
                <div className="paragraph second-title">二、 协议范围</div>
                <div className="paragraph emphasize">2.1 签约主体</div>
                <div className="paragraph">
                    <span className="emphasize">【签约主体】</span>
                    本协议由你与微师经营者共同订立，本协议对你与微师经营者均具有约束力。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【经营者信息】</span>
                    微师经营者是指经营微师产品的法律主体，你可随时查看微师网站首页底部公示的证照信息以确定与你履约的微师经营者的信息。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【经营者变更】</span>
                    本协议项下，微师经营者可能根据微师产品的业务调整而发生变更，变更后的微师经营者与你共同履行本协议并向你提供服务，微师经营者的变更不会影响你本协议项下的权益。
                </div>
                <div className="paragraph second-title">三、 账号注册与使用</div>
                <div className="paragraph emphasize">3.1 用户资格</div>
                <div className="paragraph">
                    <span className="emphasize">【用户资格】</span>
                    你确认，在开始注册并使用微师产品与服务前，你应当具备中华人民共和国法律规定的与你行为相适应的民事行为能力。若你不具备前述与你行为相适应的民事行为能力
                    ，则你及你的监护人应依照法律规定承担因此而导致的一切后果。
                </div>
                <div className="paragraph emphasize">3.2 用户账号说明</div>
                <div className="paragraph">
                    <span className="emphasize">【用户账号获得】</span>
                    当你使用你的第三方平台账号，登录微师，即在微师创建等同于你的第三方平台账号的微师账号。在你的微师账号绑定你的手机号后，你的手机号也具有你的微师账号的同等效力。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【课堂ID获得】</span>
                    当入驻机构、老师获得用户账号后，可申请创建课堂。通过微师审核，将分配获得课堂ID。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【用户账号使用】</span>
                    你有权使用你设置或确认的微师用户账号登录微师产品。
                </div>
                <div className="paragraph">
                    微师产品只允许每位用户使用一个微师账号。
                </div>
                <div className="paragraph">
                    由于你的微师账号关联你的个人信息及微师的商业信息，你的微师账号仅限于你本人使用。
                    你直接或间接授权第三方使用你微师账号所导致的所有不利后果由你自行承担。
                    如经微师判断，你的微师账号的使用可能危及你的账号安全或微师产品信息安全的，
                    微师可拒绝提供相应服务或终止本协议。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【用户账号转让】</span>
                    你在微师的账号不得以任何方式转让，否则微师有权追究你的违约责任，且由此产生的一切责任均由你承担。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【实名认证】</span>
                    为使你更好地使用微师的各项服务，保障你的账号安全，微师可要求你按我国法律规定完成实名认证。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【不活跃账号回收】</span>
                    如你的账号同时符合以下条件，则微师可回收你的账号，你的账号将不能再登录微师产品，并按本协议第十条的约定处理：
                </div>
                <div className="paragraph">
                    <div className="indent">（一）未按要求完成实名认证</div>
                    <div className="indent">（二）连续90天未用于登录微师产品</div>
                    <div className="indent">（三）不存在未到期的有效业务</div>
                </div>
                <div className="paragraph emphasize">3.3 用户信息管理</div>
                <div className="paragraph emphasize">3.3.1 真实合法</div>
                <div className="paragraph">
                    <span className="emphasize">【信息真实】</span>
                    入驻机构、老师在使用微师产品与服务时，应当按微师页面的提示准确完整地提供你的信息
                    （包括你的姓名、联系地址、有效联系电话及证件信息等），以便微师与你联系。你了解并同意，
                    你有义务保证你提供信息的真实性及有效性。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【名称合法】</span>
                    你在微师设置的以下名称，包括但不限于用户名称、课堂名称、课程名称等，
                    不得违反国家法律法规以及微师产品关于此类名称的管理规定，否则微师可限制、禁止你使用微师产品的相关服务，
                    或按照本协议的违约处理措施进行处理。
                </div>
                <div className="paragraph emphasize">3.3.2 更新维护</div>
                <div className="paragraph">
                    <span className="emphasize">【信息更新】</span>
                    你应当及时更新你提供的信息，在法律有明确规定要求微师作为网络服务提供者必须对用户的信息进行核实的情况下，
                    微师将依法不时地对你的信息进行检查核实，你应当配合提供最新、真实、完整、有效的信息。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【信息维护】</span>
                    存在以下任一条件时，微师可向你发出询问或要求整改的通知，并要求你进行重新认证，
                    直至中止、终止对你提供部分或全部微师产品与服务，
                    微师对此不承担责任，你将承担对你自身、他人及微师造成的全部损失与不利后果。
                </div>
                <div className="paragraph">
                    <div className="indent">（一）微师按你最后一次提供的信息与你联系未果</div>
                    <div className="indent">（二）你未按微师的要求及时提供信息</div>
                    <div className="indent">（三）你提供的信息存在明显不实</div>
                    <div className="indent">（四）司法行政机关核实你提供的信息无效</div>
                </div>
                <div className="paragraph emphasize">3.4 账号安全规范</div>
                <div className="paragraph">
                    <span className="emphasize">【账号安全保管义务】</span>
                    你通过第三方平台账号登录微师产品，微师任何时候均不会主动要求你提供你的第三方平台账号、密码或手机短信验证码，
                    建议你务必自行保管好你的第三方平台账号与密码。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【账号损失】</span>
                    因你主动泄露账号或因你遭受他人攻击、诈骗等行为导致的损失及后果，微师对此不承担责任，你应通过司法、行政等途径向侵权行为人追偿。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【账号行为责任自负】</span>
                    除微师存在过错外，你应对你账号下的所有行为结果（包括但不限于在线发布信息、购买课程或其他服务及披露信息等）负责。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【日常维护须知】</span>
                    如发现任何未经授权使用你账号登录微师产品或其他可能导致你账号遭窃、遗失的情况，
                    建议你立即通知微师。你理解微师对你的任何请求采取行动均需要合理时间，
                    且微师应你的请求而采取的行动可能无法避免或阻止侵害后果的形成或扩大，除微师存在法定过错外，微师不承担责任。
                </div>
                <div className="paragraph second-title">四、 微师产品服务及规范</div>
                <div className="paragraph">
                    <span className="emphasize">【服务概况】</span>
                    你可以在微师享受创建课堂、开设课程，在课程中发表评论、提问，提交协助解决争议等服务。
                    微师将根据经营的实际需要，不时修改或开发新的服务内容，用户能享受的服务范围，
                    以微师提供的实际功能为准。
                </div>
                <div className="paragraph emphasize">4.1 课堂管理</div>
                <div className="paragraph">
                    <span className="emphasize">【课堂创建】</span>
                    你可以在微师上创建属于你个人的课堂，并在课堂下开设多门类免费或付费课程，吸引学员参与或购买课程。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【课堂限制】</span>
                    基于微师管理需要，你理解并认可，同一用户在微师上仅能开设一个课堂，微师可关闭你在微师上同时开设的其他课堂。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【课堂转让】</span>
                    由于课堂与微师账号的不可分性，课堂转让实质为微师账号的转让，因此微师不允许你转让课堂。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【课程删除】</span>
                    你可以删除你课堂内所有或部分课程，但你应确保你删除课程不会影响到之前学员的权益，否则，
                    你应当对你删除课程所造成的违约、侵权等法律后果承担相应责任，包括但不限于对此前已收取的相关费用的退还及赔偿承担相应责任。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【课堂关停】</span>
                    在你的课堂连续六周无免费或付费课程的情况下，微师可关停你的课堂。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【课程管理】</span>
                    你对课堂内开设的课程内容的合法性真实性有效性承担法律责任，你在课程中对学员承担管理责任，不得利用课堂服务进行非法活动。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【课程产权】</span>
                    微师建立了知识产权侵权投诉机制，你发现原创内容被抄袭、复制等构成侵权的，
                    可以向微师提供相关证据进行投诉，微师查实后将下架侵权课程。知识产权被侵犯，并通过司法途径维权的，
                    微师将在法律许可、必要及自身能力范围内，向被侵权人或有关机构提供侵权人的注册信息，协助维权。
                </div>
                <div className="paragraph emphasize">4.2 课堂、课程的发布与推广</div>
                <div className="paragraph">
                    <span className="emphasize">【发布与推广】</span>
                    用户创建课堂，添加课程后，可以通过课程分享等营销工具，
                    发布课程信息，吸引学员参与或购买。 被微师官方选中的优质课程将有机会进入推荐页面，
                    以图片或文字形式向学员推广。
                </div>
                <div className="paragraph emphasize">4.3 依法纳税</div>
                <div className="paragraph">
                    <span className="emphasize">【依法纳税】</span>
                    依法纳税是每一个公民、企业应尽的义务。对于从微师获得的应纳税所得，你应及时依法向税务主管机关申报纳税。
                    根据国家法律法规政策，如税务机关要求微师作为代扣代缴义务人的，微师可在用户对课程收益提现前，扣除应纳税款，代为缴纳。
                </div>
                <div className="paragraph emphasize">4.4 课程购买</div>
                <div className="paragraph">
                    <span className="emphasize">【课程购买】</span>
                    通过注册时填写的第三方账号订阅你感兴趣的课程及课堂信息。
                    当你在微师购买课程时，请务必仔细确认所购课程的时间、价格及内容等重要事项，
                    并在下单时仔细核实课程和价格信息。你购买课程的交易发生在你与入驻机构或个体老师之间，
                    微师无正当理由不能要求入驻机构或老师退款。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【用户谨慎义务】</span>
                    微师仅向你提供微师产品与服务，你了解微师上的信息系用户自行发布，
                    且可能存在风险和瑕疵。鉴于微师存在海量信息及信息远程和即时发布的特点，
                    微师无法逐一审查课程内容的质量、效果、准确性和真实性，对此你在参与或购买课程时应谨慎判断。
                </div>
                <div className="paragraph emphasize">4.5 服务收费</div>
                <div className="paragraph">
                    <span className="emphasize">【服务收费】</span>
                    微师为向你提供的产品与服务付出了大量的成本，除明示的收费业务外，
                    微师向你提供的服务目前是免费的。如未来微师向你收取合理费用，
                    微师会采取合理途径、以足够合理的期限提前通过本协议第九条约定的方式通知你，确保你有充分选择的权利。
                </div>
                <div className="paragraph emphasize">4.6 禁止行为</div>
                <div className="paragraph">
                    <span className="emphasize">【禁止行为】</span>
                    你使用微师服务应严格遵守 《网络安全法》《信息网络传播权保护条例》《互联网信息服务管理办法》
                    《互联网直播服务管理规定》《互联网文化管理暂行规定》《网络表演经营活动管理办法》《互联网视听节目服务管理规定》
                    《互联网跟帖评论服务管理规定》《互联网群组信息服务管理规定》《互联网广告管理暂行办法》
                    《网络交易管理办法》等法律、法规、规范性文件的规定，
                    你使用微师服务不得涉嫌任何色情、赌博、涉黑、谣言、误导、骚扰、暴力、侵犯他人隐私、侵犯他人知识产权、
                    侵犯他人合法权益的行为。你不得在微师上从事以下行为：
                </div>
                <div className="paragraph">
                    <div className="indent">（一）利用微师发表、传送、传播、储存危害国家安全、国家统一、社会稳定的内容</div>
                    <div className="indent">（二）利用微师发表侮辱、诽谤、色情、暴力、引起他人不安及任何违反国家法律法规政策的内容</div>
                    <div className="indent">（三）利用微师发表、传送、传播、储存侵害他人知识产权、商业秘密、肖像权、隐私权等合法权利的内容</div>
                    <div className="indent">（四）利用微师发表欺诈、虚假、不准确、存在误导性的信息，或冒充、利用他人名义进行活动</div>
                    <div className="indent">（五）利用微师从事任何违法犯罪活动</div>
                    <div className="indent">（六）发布破坏、篡改、删除、影响微师任一系统正常运行或未经授权秘密获取微师及其他用户数据、个人资料的病毒、木马、爬虫等恶意软件、程序代码</div>
                    <div className="indent">（七）发布违背社会公共利益或公共道德的信息，发布不适于本协议或微师产品与服务规则的信息</div>
                    <div className="indent">（八）在微师上贬低、诋毁竞争对手，干扰微师上进行的任何交易、活动，或以任何方式干扰或试图干扰微师的正常运作</div>
                    <div className="indent">（九）对课程实施恶意购买、恶意维权等扰乱微师正常交易秩序的行为</div>
                    <div className="indent">（十）其他违反中华人民共和国相关法律法规及国家政策的行为</div>
                </div>
                <div className="paragraph emphasize">4.7 交易争议处理</div>
                <div className="paragraph">
                    <span className="emphasize">【交易争议处理】</span>
                    你在微师上的交易过程中与其他用户发生争议的，你或其他用户中的任何一方均有权选择以下途径解决：
                </div>
                <div className="paragraph">
                    <div className="indent">（一）与争议相对方自主协商</div>
                    <div className="indent">（二）请求消费者协会或者其他依法成立的调解组织调解</div>
                    <div className="indent">（三）向有关行政部门投诉</div>
                    <div className="indent">（四）根据与争议相对方达成的仲裁协议（如有）提请仲裁机构仲裁</div>
                    <div className="indent">（五）向人民法院提起诉讼</div>
                </div>
                <div className="paragraph emphasize">4.8 免责条款</div>
                <div className="paragraph">
                    <span className="emphasize">【不可抗力及第三方原因】</span>
                    微师依照法律规定履行基础保障义务，但对于下述原因导致的合同履行障碍、履行瑕疵、履行延后或履行内容变更等情形，微师不承担相应的责任：
                </div>
                <div className="paragraph">
                    <div className="indent">（一）因自然灾害、罢工、暴乱、战争、政府行为、司法行政命令等不可抗力因素</div>
                    <div className="indent">（二）因电力供应故障、通讯网络故障等公共服务因素或网络流量拥堵、黑客攻击等第三人因素</div>
                    <div className="indent">（三）在微师已尽善意管理的情况下，因常规或紧急的设备与系统维护、设备与系统故障、网络信息与数据安全等因素</div>
                </div>
                <div className="paragraph second-title">五、 用户信息的保护及例外</div>
                <div className="paragraph emphasize">5.1 用户信息保护</div>
                <div className="paragraph">
                    <span className="emphasize">【信息保护注意事项】</span>
                    微师非常重视用户个人信息的保护，在你使用微师提供的服务时，
                    你同意微师按照公布的隐私权政策收集、存储、保护、使用和披露你的个人信息。
                    保护用户隐私和其他个人信息是微师的一项基本政策，微师保证不会将你的注册资料及你在使用微师时存储在微师的非公开内容用于任何用途。此外你需要特别注意以下几点：
                </div>
                <div className="paragraph">
                    <div className="indent">（一）请你勿在使用微师产品与服务过程中透露你的各类财产帐户、银行卡、信用卡、第三方支付账号及对应密码等重要资料，否则由此带来的任何损失由你自行承担</div>
                    <div className="indent">（二）你的注册信息是微师的重要保护内容，微师将采取必要的技术保护措施。但由于互联网的开放性以及技术的迅猛发展，可能因第三方因素导致你的信息泄漏，微师对此不承担责任</div>
                    <div className="indent">（三）微师的服务具有公开性，若你将个人隐私信息上传、发表至微师上，或通过课堂等微师服务传播给其他人，由此引起隐私的泄漏，微师对此不承担责任</div>
                    <div className="indent">（四）由于你将账号信息告知他人或与他人共享账号，由此导致的任何个人隐私的泄漏，微师对此不承担责任</div>
                    <div className="indent">（五）若你是未成年人，你在微师上发表或上传信息前，应取得监护人同意或与监护人一同完成。</div>
                </div>
                <div className="paragraph emphasize">5.2 第三方合作信息互通</div>
                <div className="paragraph">
                    <span className="emphasize">【第三方合作信息互通】</span>
                    为提升产品与服务的质量，微师可能会与第三方合作共同向你提供相关的微师产品与服务，此类合作可能需要包括但不限于微师用户数据与第三方用户数据的互通。
                    在此情况下，你知晓并同意如该第三方同意承担与微师同等的保护用户隐私的责任，
                    则微师有权将你的注册资料等提供给该第三方，
                    并与第三方约定你的数据使用仅为双方合作共同提升微师产品与服务效果之目的；
                    并且，微师将对该等第三方使用你的数据的行为进行监督和管理，尽一切合理努力保护你个人信息的安全性。
                </div>
                <div className="paragraph emphasize">5.3 用户信息保护的例外</div>
                <div className="paragraph">
                    <span className="emphasize">【信息保护例外】</span>
                    保护用户隐私和其他个人信息是微师的一项基本政策，微师保证不会披露或将你的注册资料及你在使用微师时存储在微师的非公开内容用于任何用途，但下列情况除外：
                </div>
                <div className="paragraph">
                    <div className="indent">（一）你自行在网络上公开的信息或其他已合法公开的个人信息</div>
                    <div className="indent">（二）以合法渠道获取的个人信息</div>
                    <div className="indent">（三）事先获得你的明确授权</div>
                    <div className="indent">（四）为维护社会公共利益</div>
                    <div className="indent">（五）微师或学校、科研机构等基于公共利益为学术研究或统计的目的，且公开方式不足以识别特定自然人</div>
                    <div className="indent">（六）你侵害微师合法权益，为维护前述合法权益且在必要范围内</div>
                    <div className="indent">（七）根据相关政府主管部门司法机关或根据相关法律法规和政策的要求</div>
                    <div className="indent">（八）其他必要情况</div>
                </div>
                <div className="paragraph second-title">六、知识产权及相关权利</div>
                <div className="paragraph emphasize">6.1 用户权利通知</div>
                <div className="paragraph">
                    <span className="emphasize">【用户权利通知】</span>
                    微师尊重他人的知识产权和合法权益，呼吁用户也要同样尊重他人的知识产权和他人的合法权益。若你认为你的知识产权或其他合法权益被侵犯，请按照以下规范向微师提供资料。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【权利通知格式规范】</span>
                    为了微师有效处理你发出的权利通知，请使用以下格式（包括各条款序号）：
                </div>
                <div className="paragraph">
                    <div className="indent">（一）权利人对涉嫌侵权内容拥有知识产权或其他合法权益，依法可以行使知识产权或其他合法权益的权属证明</div>
                    <div className="indent">（二）请充分、明确地描述被侵犯了知识产权或其他合法权益的情况并请提供涉嫌侵权的课程名称</div>
                    <div className="indent">（三）请指明涉嫌侵权课程或其他信息的哪些内容侵犯了第（二）项中列明的权利</div>
                    <div className="indent">（四）请提供权利人具体的联络信息，包括姓名、身份证或护照复印件（对自然人）、机构登记证明复印件（对机构）、通信地址、电话号码、传真和电子邮件及联系人</div>
                    <div className="indent">（五）请提供涉嫌侵权内容在微师产品的位置（如指明你举报的含有侵权内容的出处，即：具体某个课程或具体的链接地址）以便我们与你举报的含有侵权内容的课程所有权人/管理人联系</div>
                    <div className="indent">（六）请在权利通知中加入如下关于通知内容真实性的声明：“我保证，本通知中所述信息是合法、充分、真实、准确、完整的，如果本权利通知内容不完全属实，本人将承担由此产生的一切法律责任，包括但不限于对被通知人所造成损失的赔偿、对微师所造成损失的赔偿等”；</div>
                    <div className="indent">（七）请你签署该权利通知，如果你是依法成立的机构或组织，请你加盖公章。</div>
                </div>
                <div className="paragraph">
                    <span className="emphasize">【权利通知失实】</span>
                    如果权利通知的陈述失实，权利通知提交者将承担由此造成的全部法律责任
                    （包括但不限于赔偿各种费用及律师费）。如果你不确定是否侵犯了知识产权和其他合法权益，微师建议你首先咨询专业人士。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【反通知】</span>
                    微师将及时将权利通知转达给被通知人，并根据前述权利通知可依法采取删除、屏蔽、断开链接等必要措施，
                    同时，被删除、屏蔽、断开链接的内容提供者亦有权依法向微师发出关于其内容不侵权的反通知。
                    反通知发出后，微师将及时将反通知转达给权利通知人，并可根据反通知采取恢复措施。
                    前述权利通知发出人无权要求微师再行采取删除、屏蔽、断开链接等技术措施。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【反通知格式规范】</span>
                </div>
                <div className="paragraph">
                    <div>（一）反通知的内容应包括：</div>
                    <div>（二）反通知人的权属证明；</div>
                    <div>（三）充分描述不构成侵权的理由；</div>
                    <div>（四）明确指明要求恢复的内容、措施及网址；</div>
                    <div>
                        （五） 反通知人详细的联络方式，个人请提供姓名、身份证或护照复印件、电话、通信地址、邮编等。
                        单位请提供法人资质文件复印件（加盖公章）、联系人、电话、通信地址、邮编等。
                    </div>
                    <div>
                        （六）请在反通知中加入如下关于反通知内容真实性的声明：
                        “我保证，本反通知中所述信息是合法、充分、真实、准确、完整的，如果本反通知内容不完全属实，
                        本人将承担由此产生的一切法律责任，包括但不限于对权利通知人所造成损失的赔偿、
                        对微师所造成损失的赔偿等”；
                    </div>
                </div>
                <div className="paragraph">
                    【反通知失实】如果“反通知”的内容失实，反通知人将承担由此造成的全部法律责任
                    （包括但不限于赔偿各种费用及律师费）。如果你不确定是否侵犯了知识产权和其他合法权益，
                    微师建议你首先咨询专业人士。
                </div>
                <div className="paragraph emphasize">6.2 用户授权</div>
                <div className="paragraph">
                    <span className="emphasize">【用户授权】</span>
                    对于用户通过微师上传至可公开（免费或付费）获取区域的任何内容，
                    用户同意微师在全世界范围内具有免费的、永久性的、不可撤销的、非独家的和完全再许可的权利和许可。
                    当微师与第三方存在合作关系共同向你提供的微师产品与服务，或共同推广微师产品与服务的，
                    你同意微师及第三方可将此等内容编入当前已知的或以后开发的其他任何形式的作品、媒体或技术中。
                </div>
                <div className="paragraph emphasize">6.3 权利声明</div>
                <div className="paragraph">
                    <span className="emphasize">【权利声明】</span>
                    微师所有的产品、技术、服务与所有程序均属于微师的知识产权，“微师”及相关图形等为微师的注册商标及企业标识。未经微师许可，
                    任何人不得擅自（包括但不限于：以非法的方式复制、传播、展示、镜像、上载、下载）使用，否则微师将依法追究法律责任。
                </div>
                <div className="paragraph second-title">七、第三方产品和服务</div>
                <div className="paragraph emphasize">7.1 第三方产品和服务</div>
                <div className="paragraph">
                    <span className="emphasize">【第三方产品和服务】</span>
                    微师服务可能包含第三方提供的产品或服务。当你使用第三方提供的产品或服务时，
                    可能会另有相关的协议或规则，你同样应当认真阅读并遵守。如你在使用第三方产品或服务时发生任何纠纷的，
                    请你与第三方直接联系，微师不承担任何责任，但根据需要会依法提供必要的协助。
                </div>
                <div className="paragraph emphasize">7.2 第三方支付服务</div>
                <div className="paragraph">
                    <span className="emphasize">【第三方支付服务】</span>
                    用户在微师上通过购买课程、打赏、发红包等方式支付的资金，
                    用户在微师上进行的包括但不限于上述各种支付活动均直接通过微信支付或支付宝服务实现，
                    用户应遵守第三方支付服务协议。因第三方支付服务收取的手续费和导致的资金损失由用户自行承担或根据第三方支付服务的协议处理，微师不承担相应责任。
                </div>
                <div className="paragraph emphasize">7.3 代收服务</div>
                <div className="paragraph">
                    <span className="emphasize">【代收服务】</span>
                    用户在微师上购买课程等方式支付的资金，用户均同意由微师代收后，
                    支付给用户的相应支付活动所指向的特定对象。用户支付的资金均存入第三方支付平台或微师账号。
                    用户使用微师代收服务期间，微师无须对为你保管、代收或代付款项的货币贬值、
                    汇率损失和利息损失及其他风险担责，并且微师无须向你支付此等款项的任何孳息。
                </div>
                <div className="paragraph emphasize">7.4 提现服务</div>
                <div className="paragraph">
                    <span className="emphasize">【提现服务】</span>
                    根据不同的支付方式，接受资金的用户可在微师上申请提现。根据相关法律法规及第三方支付平台的限制，
                    单笔提现可能存在一定的提现限额和账期要求。微师无法提供资金即时到账服务，你认可资金于途中流转需要合理时间。
                    提现指令一旦发出即立即生效、不可撤销，微师有权根据你发出的提现指令进行支付操作。
                    你应妥善保管你的手机等电子设备以及第三方平台账号及密码、支付密码、短信校验码等信息和资料，
                    因你泄露、遗失、复制、转交前述信息和资料而导致的损失，由你自行承担。
                </div>
                <div className="paragraph second-title">八、 用户的违约及处理</div>
                <div className="paragraph emphasize">8.1 违约认定</div>
                <div className="paragraph">
                    <span className="emphasize">【违约情形】</span>
                    发生如下情形之一的，视为你违约：
                </div>
                <div className="indent">（一）使用微师服务时违反有关法律法规规定；</div>
                <div className="indent">（二）违反本协议、本协议补充协议约定或微师产品与服务规则。</div>  
                <div className="paragraph">
                    <span className="emphasize">【违约认定】</span>
                    微师可在产品与服务规则中约定违约认定的程序和标准，你有义务对你的数据或信息的异常现象进行充分举证和合理解释，否则将被认定为违约。
                </div>
                <div className="paragraph emphasize">8.2 违约处理措施</div>
                <div className="paragraph">
                    <span className="emphasize">【信息处理】</span>
                    <span className="underline">
                        你在微师上发布的信息构成违约或违反法律规定的，微师可根据相应规则立即对相应信息进行删除、屏蔽处理或对你的课程进行下架、对你的账号进行封号。
                    </span>
                </div>
                <div className="paragraph">
                    <span className="emphasize">【行为限制】</span>
                    <span className="underline">
                        你在微师上实施的行为，或虽未在微师上实施但对微师及其用户产生影响的行为构成违约或违反法律规定的，
                        微师可依据相应规则对你执行限制参加推广活动、中止向你提供部分或全部服务、划扣违约金等处理措施。
                        如你的行为构成根本违约的，微师可查封你的账号，终止向你提供服务。
                    </span>
                </div>
                <div className="paragraph">
                    <span className="emphasize">【信息移交】</span>
                    <span className="underline">
                        为遵守国家法律、法规，维护社会安全，对于在微师实施违法犯罪活动的用户，微师将可能冻结账号，并向公安及其他主管机关移交与违法犯罪活动有关的线索及用户信息。
                    </span>
                </div>
                <div className="paragraph">
                    <span className="emphasize">【账号严重风险】</span>
                    <span className="underline">
                        当你违约的同时存在欺诈、售假、盗用他人账号等特定情形或你存在危及他人交易安全或账号安全风险时，
                        或严重影响微师正常运转的，微师会依照你行为的风险程度对你的账号采取取消收款、关停课程、
                        终止服务等强制措施。
                    </span>
                </div>
                <div className="paragraph emphasize">8.3 赔偿责任</div>
                <div className="paragraph">
                    <span className="emphasize">【赔偿范围】</span>
                    如你的行为使微师遭受损失（包括自身的经济损失、商誉损失及对外支付的赔偿金、和解款、律师费、诉讼费等经济损失），你应赔偿微师的上述全部损失。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【损失追偿】</span>
                    如你的行为使微师遭受第三人主张权利，微师可在对第三人承担金钱给付等义务后就全部损失向你追偿。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【资金划扣】</span>
                    如因你的行为构成严重违法、犯罪或违反相关政策的强制性规定，使得第三人遭受损失的，
                    微师出于社会公共利益保护或消费者权益保护目的，或依据司法机关的法律文书，可从你由微师代收的资金中划扣相应款项进行支付。
                    如你由微师代收的资金不足以支付上述赔偿款项的，微师可直接扣减你在微师其它协议项下的权益。
                </div>
                <div className="paragraph emphasize">8.4 特别约定</div>
                <div className="paragraph">
                    <span className="emphasize">【商业贿赂】</span>
                    如你向微师雇员或顾问等提供实物、现金、现金等价物、劳务、旅游等价值明显超出正常商务洽谈范畴的利益，
                    则可视为你存在商业贿赂行为。发生上述情形的，微师可立即终止与你的所有合作并向你收取违约金及/或赔偿金，
                    该等金额以微师因你的贿赂行为而遭受的经济损失和商誉损失作为计算依据。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【关联处理】</span>
                    如你因严重违约导致微师终止本协议的，出于维护平台秩序及保护用户权益的目的，
                    微师可对微师与你在其他协议项下的合作采取中止甚或终止协议的措施，并以本协议第九条约定的方式通知你。
                </div>
                <div className="paragraph second-title">九、 通知</div>
                <div className="paragraph emphasize">9.1 用户有效的联系方式</div>
                <div className="paragraph">
                    <span className="emphasize">【联系方式真实有效】</span>
                    在注册成为微师用户，使用微师产品并接受微师服务时，你应保证使用真实有效的第三方平台账号。
                    如需绑定你的手机，应保证使用本人的手机号。如果你创建课堂，开设收费课程，
                    微师将要求你提供真实的联系方式，联系方式发生变更时，你有义务及时更新相关信息，并保持可被联系的状态。
                </div>
                <div className="paragraph">
                    你提供的微信号、手机号或其他联系方式，作为你在微师的有效联系方式。
                    微师将向其中之一或若干联系方式向你送达各类通知，此类通知内容可能对你的权利义务产生重大有利或不利影响，
                    请务必及时关注。
                </div>
                <div className="paragraph emphasize">9.2 微师联系方式</div>
                <div className="paragraph underline">
                    你对微师的通知应通过微师对外正式公布的通信地址、传真号码、电子邮件地址等联系信息进行送达。
                </div>
                <div className="paragraph emphasize">9.3 通知的送达</div>
                <div className="paragraph">
                    <span className="emphasize">【通知送达的方式】</span>
                    微师通过上述联系方式向你发出通知，其中以电子方式发出的书面通知，
                    包括但不限于微师公告，无论是选择向你提供的联系电话发送手机短信，
                    还是向你提供的电子邮件地址发送电子邮件，或者向你的第三方账号（如微信账号）推送微师公众号消息，
                    在发送成功后即视为送达；以纸质载体发出的书面通知，按照提供联系地址发送后的第五个自然日即视为送达。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【通知送达的法律后果】</span>
                    你应当保证所提供的联系方式准确、有效，并实时更新。如果因提供的联系方式不确切，
                    或不及时告知变更后的联系方式，使通知无法送达或未及时送达，由你自行承担由此可能产生的法律后果。
                </div>
                <div className="paragraph second-title">十、 协议的终止</div>
                <div className="paragraph emphasize">10.1 终止的情形</div>
                <div className="paragraph">
                    <span className="emphasize">【用户发起的终止】</span>
                    你有权通过以下任一方式终止本协议：
                </div>
                <div className="paragraph">
                    <div className="indent">（一）变更事项生效前，你停止使用并明示不愿接受变更事项的</div>
                    <div className="indent">（二）你明示不愿继续使用微师产品与服务，且符合微师终止条件的</div>
                </div>
                <div className="paragraph">
                    <span className="emphasize">【微师发起的终止】</span>
                    出现以下情况时，微师可以本协议第九条约定的方式通知你终止本协议：
                </div>
                <div className="paragraph">
                    <div className="indent">（一）你违反本协议约定，微师依据违约条款终止本协议的</div>
                    <div className="indent">（二）你盗用他人账号、发布违禁信息、骗取他人财物、侵犯他人知识产权、扰乱市场秩序、采取不正当手段谋利等行为，微师依据本协议和微师产品与服务规则对你的账号予以查封的</div>
                    <div className="indent">（三）除上述情形外，因你多次违反微师产品与服务规则相关规定且情节严重，微师依据本协议及微师产品与服务规则对你的账号予以查封的</div>
                    <div className="indent">（四）你的账号被微师依据本协议回收的</div>
                    <div className="indent">（五）根据法律、法规、政策规定，出于维护公共利益的目的，其它应当终止服务的情况</div>
                </div>
                <div className="paragraph emphasize">10.2 协议终止后的处理</div>
                <div className="paragraph">
                    <span className="emphasize">【用户信息披露】</span>
                    本协议终止后，除法律有明确规定外，微师无义务向你或你指定的第三方披露你账号中的任何信息。
                </div>
                <div className="paragraph">
                    <span className="emphasize">【微师权利】</span>
                    本协议终止后，微师仍享有下列权利：
                </div>
                <div className="paragraph">
                    <div className="indent">（一）继续保存你留存于微师的本协议的各类信息</div>
                    <div className="indent">（二）对于你过往的违约行为，微师仍可依据本协议向你追究违约责任</div>
                </div>
                <div className="paragraph">
                    入驻机构或老师自行终止协议或因上述条款被终止协议，仍有未完成的收费服务的，
                    应积极与付费用户协商解决；
                    <span className="underline">
                        拒绝协商或协商未果的，微师将依据《中华人民共和国消费者权益保护法》等法律法规的规定，
                        为用户向入驻机构或老师追究违约责任提供必要信息或协助。
                    </span>
                </div>
                <div className="paragraph second-title">十一、 法律适用、管辖与其他</div>
                <div className="paragraph emphasize">11.1 法律适用</div>
                <div className="paragraph">
                    <span className="emphasize">【法律适用】</span>
                    本协议之订立、生效、解释、修订、补充、终止、执行与争议解决均适用中华人民共和国大陆地区法律；如法律无相关规定的，参照商业惯例及/或行业惯例。
                </div>
                <div className="paragraph emphasize">11.2 管辖</div>
                <div className="paragraph">
                    <span className="emphasize">【管辖】</span>
                    你因使用微师产品与服务所产生的与微师有关的争议，由微师与你协商解决。协商不成时，任何一方均可向微师经营者注册地的人民法院提起诉讼。
                </div>
                <div className="paragraph emphasize">11.3 协议可分性</div>
                <div className="paragraph">
                    <span className="emphasize">【协议可分性】</span>
                    本协议任一条款被视为废止、无效或不可执行，该条应视为可分的且并不影响本协议其余条款的有效性及可执行性。
                </div>
                <div className="paragraph emphasize">11.4本协议版本</div>
                <div className="paragraph">
                    本协议为1.0版本，生效日期为2018年2月1日。
                </div>
            </div>
        );
    }
};
