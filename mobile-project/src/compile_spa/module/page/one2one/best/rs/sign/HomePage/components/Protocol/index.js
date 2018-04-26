define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _config = require('../../../../config');
    var service = require('common/service');
    var urlUtil = require('util/url_v2');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _config2 = _interopRequireDefault(_config);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
        }
    }
    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ('value' in descriptor)
                    descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function (Constructor, protoProps, staticProps) {
            if (protoProps)
                defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
                defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        }
        return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
    }
    function _inherits(subClass, superClass) {
        if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var Protocol = function (_React$Component) {
        _inherits(Protocol, _React$Component);
        function Protocol(props) {
            _classCallCheck(this, Protocol);
            var _this = _possibleConstructorReturn(this, (Protocol.__proto__ || Object.getPrototypeOf(Protocol)).call(this, props));
            _this.state = {
                subjectName: '',
                ratio: ''
            };
            return _this;
        }
        _createClass(Protocol, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var me = this;
                    var subjectId = urlUtil.parseQuery(location.search).subject_id;
                    var data = {};
                    if (subjectId) {
                        data.subject_id = subjectId;
                    }
                    service.get(_config2.default.PATHS.SIGNED_SUBJECTS_RATE, data, function (res) {
                        if (res.code === 0) {
                            var dt = res.data;
                            me.setState({
                                subjectName: dt.subject_name,
                                ratio: dt.share_ratio
                            });
                        }
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement('div', { className: 'sign-home-protocol' }, _react2.default.createElement('p', { className: 'title' }, '跟谁学优选计划合作协议'), _react2.default.createElement('p', { className: 'sub-title' }, '欢迎参加跟谁学1对1优选计划合作\uFF0C 跟谁学1对1优选计划由北京百家互联科技有限公司负责运营\uFF0C 您报名参加跟谁学1对1优选计划并通过跟谁学人工审核及线上面试合格后\uFF0C方可成为跟谁学1对1优选计划的合作老师\u3002 请您仔细阅读本协议的全部内容\uFF0C点击\u201C同意\u201D表示您已接受并同意遵守本协议的全部条款\u3002'), _react2.default.createElement('div', { className: 'items' }, _react2.default.createElement('p', { className: 't1' }, '第一条 定义'), _react2.default.createElement('p', { className: 't2' }, '1\u3001跟谁学\uFF1A由北京百家互联科技有限公司自行设计开发运营的找好老师学习服务平台\uFF08下称跟谁学或跟谁学平台\uFF09\u3002'), _react2.default.createElement('p', { className: 't2' }, '2\u3001优选计划\uFF1A是跟谁学平台为优秀个体老师匹配学生资源并共享课程收益的合作项目\u3002'), _react2.default.createElement('p', { className: 't2' }, '3\u3001个体老师\uFF1A是指以个人名义入驻跟谁学平台\uFF0C并拥有独立提现账号\uFF0C当前未与跟谁学平台上任何机构及工作室签约的老师\u3002'), _react2.default.createElement('p', { className: 't2' }, '4\u3001跟谁学ID号\uFF1A个体老师入驻跟谁学平台时绑定注册手机号后系统匹配生成的编码\uFF0C该ID号是个体老师在跟谁学平台上的唯一专属身份标识号码\uFF0C个体老师可在该ID号下绑定个人银行卡完成提现操作\u3002'), _react2.default.createElement('p', { className: 't2' }, '5\u3001线上视频课程\uFF1A是指您自行录制\u3001自行上传至跟谁学平台并自行定价售卖或供学生免费观看的视频课程\u3002'), _react2.default.createElement('p', { className: 't2' }, '6\u3001线下课程\uFF1A是指您通过跟谁学平台获取生源信息并在线下进行授课的课程\u3002'), _react2.default.createElement('p', { className: 't2' }, '7\u3001收益\uFF1A本协议收益仅包括个体老师与跟谁学签约的合作科目所产生的课酬收入\u3002'), _react2.default.createElement('p', { className: 't2' }, '8\u3001跳单\uFF1A是指跟谁学向您提供学生或家长信息后\uFF0C您擅自脱离跟谁学平台私自与学生及其家长进行线下成单的行为\u3002'), _react2.default.createElement('p', { className: 't2' }, '9\u3001第三方渠道\uFF1A跟谁学根据业务发展需要选择的合作机构\uFF0C包括但不限于推广机构\u3001获客机构等\u3002'), _react2.default.createElement('p', { className: 't1' }, '第二条 合作模式及合作期限'), _react2.default.createElement('p', { className: 't2' }, '1\u3001您入驻跟谁学平台并自行在跟谁学平台开设课程\uFF1B跟谁学通过自有资源为您匹配学生需求\uFF0C双方按约定规则共享课程的收益\u3002'), _react2.default.createElement('p', { className: 't2' }, '2\u3001合作科目\uFF1A', _react2.default.createElement('span', { className: 'subject' }, this.state.subjectName), '1对1课程'), _react2.default.createElement('p', { className: 't2' }, '3\u3001合作期限\uFF1A自您点击同意签署本协议后开始合作\uFF0C双方未提出解除\u3001终止本协议的\uFF0C合作持续有效\u3002'), _react2.default.createElement('p', { className: 't1' }, '第三条 课程的设置\u3001定价\u3001收益及退费\u3001罚款处理'), _react2.default.createElement('p', { className: 't2' }, '1\u3001课程的内容\u3001课节\u3001课程体系等均由您自行在跟谁学后台设置\uFF0C课程内容的相关知识产权归您所有\uFF0C您须对课程内容的合法性\u3001真实性及有效性承担法律责任\uFF0C课程的内容如涉嫌侵犯第三方的知识产权或其他合法权益的\uFF0C由您自行对第三方承担赔偿责任\uFF0C如因此给跟谁学造成损失的\uFF0C您还应对跟谁学承担赔偿责任\uFF0C跟谁学有权从本协议费用中直接扣除\u3002'), _react2.default.createElement('p', { className: 't2' }, '2\u3001课程的定价\u3001课消体系等由您自行在跟谁学后台设置\uFF0C跟谁学有权对您的课程定价\u3001课消体系提出修改建议\u3002'), _react2.default.createElement('p', { className: 't2' }, '3\u3001双方收益分成\uFF1A跟谁学与您对本协议收益按', _react2.default.createElement('span', { className: 'ratio' }, this.state.ratio * 10 + ' : ' + (1 - this.state.ratio) * 10), '的比例进行分成\uFF0C即您获得收益的', _react2.default.createElement('span', { className: 'ratio' }, (1 - this.state.ratio) * 100 + '%'), '\u3002跟谁学与您各自承担己方应缴纳的税费\u3002'), _react2.default.createElement('p', { className: 't2' }, '4\u3001支付时间与支付方式\uFF1A跟谁学平台对双方的应得收益按约定比例自动分账\uFF0C您提供授课服务后24小时内\uFF0C您应得收益划入您在跟谁学平台的账户内\uFF0C您可自行完成提现操作\u3002'), _react2.default.createElement('p', { className: 't2' }, '5\u3001退费处理\uFF1A'), _react2.default.createElement('p', { className: 't3' }, '(1)您未提供授课服务的课程\uFF0C学生申请退费的\uFF0C跟谁学全额退还学生\uFF0C跟谁学与您均不获得任何收益\uFF1B'), _react2.default.createElement('p', { className: 't3' }, '(2)您提供授课服务后的课程\uFF0C学生申请退费的\uFF0C不予支持\u3002'), _react2.default.createElement('p', { className: 't2' }, '6\u3001罚款\uFF1A您违反跟谁学的教学服务标准而被执行的罚款\uFF0C将在您应得收益中直接扣除\u3002'), _react2.default.createElement('p', { className: 't1' }, '第四条 跟谁学的权利义务'), _react2.default.createElement('p', { className: 't2' }, '1\u3001跟谁学通过线上方式对您进行授课面试\uFF0C通过跟谁学面试后您方可成为跟谁学的1对1优选计划合作方\u3002'), _react2.default.createElement('p', { className: 't2' }, '2\u3001跟谁学利用自有资源为您匹配学生需求\u3002'), _react2.default.createElement('p', { className: 't2' }, '3\u3001跟谁学为您提供直播授课\u3001在线答疑\u3001在线支付\u3001在线评价等技术服务\u3002'), _react2.default.createElement('p', { className: 't2' }, '4\u3001跟谁学对于您在跟谁学平台上的课程交易行为有权利进行抽查\uFF0C抽查方式包括但不限于数据分析\u3001电话回访\u3001受理投诉等\u3002'), _react2.default.createElement('p', { className: 't2' }, '5\u3001跟谁学将制定面试规则\u3001接单规则\u3001教学任务规则\u3001教学服务流程\u3001教学服务标准等管理规则\uFF0C以规范您的教学服务\u3002'), _react2.default.createElement('p', { className: 't1' }, '第五条 您的权利义务'), _react2.default.createElement('p', { className: 't2' }, '1\u3001您应认真遵守跟谁学制定的面试规则\u3001接单规则\u3001教学任务规则\u3001教学服务流程\u3001教学服务标准等管理规则\uFF0C规范自己的教学服务\uFF0C努力提升教学水平\u3002'), _react2.default.createElement('p', { className: 't2' }, '2\u3001跟谁学为您匹配学生资源的过程中\uFF0C您应积极配合跟谁学成单\uFF0C包括但不限于提供必要的试听\u3001家长答疑等\u3002'), _react2.default.createElement('p', { className: 't2' }, '3\u3001您获得跟谁学提供的学生信息后\uFF0C不得故意规避本协议约定合作方式脱离跟谁学平台擅自与学生成单或采取其他方式接受课酬支付\u3002'), _react2.default.createElement('p', { className: 't2' }, '4\u3001您与学生自行约定线下上课的\uFF0C您应自行负责线下上课过程中的人身及财产安全\u3002'), _react2.default.createElement('p', { className: 't2' }, '5\u3001跟谁学如接到涉及您的学员投诉事件\uFF0C您应积极配合跟谁学妥善处理\uFF0C并接受跟谁学的处理建议\u3002'), _react2.default.createElement('p', { className: 't2' }, '6\u3001您应对您上传至跟谁学平台的所有资料包括但不限于个人信息\u3001过往经历\u3001教学成果\u3001文章等内容的真实性\u3001合法性\u3001有效性及完整性承担法律责任\u3002您上传的任何资料如涉嫌侵犯第三方肖像权\u3001名誉权\u3001知识产权等合法权益或受到第三方投诉及起诉的\uFF0C您应对第三方承担赔偿损失\u3001赔礼道歉等法律责任\uFF1B如由此给跟谁学造成损失的\uFF0C您还应对跟谁学承担赔偿责任\uFF0C跟谁学有权从本协议费用中直接扣除\u3002'), _react2.default.createElement('p', { className: 't1' }, '第六条 保密条款及知识产权'), _react2.default.createElement('p', { className: 't2' }, '1\u3001 本协议内容及双方在谈判\u3001签署\u3001履行本协议过程中您知悉的跟谁学战略决策\u3001计划部署\u3001业务创新\u3001发展规划\u3001商业模式\u3001运营数据\u3001经营信息及业务资料等均为保密信息\uFF0C您均需承担保密义务\uFF0C不得向任何第三方透漏\u3002'), _react2.default.createElement('p', { className: 't2' }, '2\u3001 无论本协议解除或终止\uFF0C本保密条款对您均具有约束力\u3002'), _react2.default.createElement('p', { className: 't2' }, '3\u3001 跟谁学的所有产品包括但不限于网站\u3001客户端\u3001手机APP等均系跟谁学自主研发完成\uFF0C跟谁学享有所有产品的知识产权\uFF0C您仅基于履行本协议目的享有免费的\u3001不可转让的\u3001非独占的使用权\uFF0C不得对跟谁学产品进行任何复制\u3001修改等\uFF0C不得进行任何反向工程\u3001反向汇编\u3001反向编译或试图提取源代码\uFF0C不得创作任何衍生作品\u3002'), _react2.default.createElement('p', { className: 't1' }, '第七条 本协议解除'), _react2.default.createElement('p', { className: 't2' }, '1\u3001您出现下列情形的\uFF0C跟谁学可单方解除本协议\uFF0C跟谁学将向您发送书面解除通知\uFF0C解除通知中将载明解除日期及收益结算\uFF1A'), _react2.default.createElement('p', { className: 't2' }, '(1)在跟谁学平台上传虚假个人资料等信息的\uFF1B'), _react2.default.createElement('p', { className: 't2' }, '(2)合作中与跟谁学平台配合度不高或屡次违反跟谁学平台管理规则的\uFF1B'), _react2.default.createElement('p', { className: 't2' }, '(3)泄露学生及家长个人信息或骚扰\u3001恐吓学生及家长的\uFF1B'), _react2.default.createElement('p', { className: 't2' }, '(4)多次被学生及家长投诉并经跟谁学证实的\uFF1B'), _react2.default.createElement('p', { className: 't2' }, '(5)严重侵犯其他第三方合法权益被第三方投诉或起诉的\uFF1B'), _react2.default.createElement('p', { className: 't2' }, '(6)利用跟谁学提供的服务从事违法活动的\uFF1B'), _react2.default.createElement('p', { className: 't2' }, '(7)跳单\u3001刷单骗取跟谁学平台补贴等侵犯跟谁学合法权益的\u3002'), _react2.default.createElement('p', { className: 't2' }, '2\u3001您若要退出本优选计划\uFF0C需在确保当前订单已履行完毕的情况下\uFF0C向跟谁学发送书面通知\uFF0C跟谁学确认符合解除条件的将在7个工作日内处理完毕\u3002'), _react2.default.createElement('p', { className: 't1' }, '第八条 违约责任及争议解决'), _react2.default.createElement('p', { className: 't2' }, '1\u3001双方任何违反本协议约定的行为均视为违约\uFF0C任何一方违约的\uFF0C守约方可向违约方发送书面改正通知\uFF0C并要求违约方赔偿守约方损失\u3002'), _react2.default.createElement('p', { className: 't2' }, '2\u3001本协议履行过程中如发生纠纷\uFF0C双方应友好协商解决\u3002如不能协商一致\uFF0C双方一致同意将争议提交北京市海淀区人民法院诉讼解决\u3002'), _react2.default.createElement('p', { className: 't1' }, '第九条 本协议条款的组成及可分性'), _react2.default.createElement('p', { className: 't2' }, '1\u3001在跟谁学平台公布及更新的网站条款及平台规则等均视为本协议的有效组成部分\uFF0C您应予遵守\u3002'), _react2.default.createElement('p', { className: 't2' }, '2\u3001跟谁学制定的面试规则\u3001接单规则\u3001教学任务规则\u3001教学服务流程\u3001教学服务标准等管理规则视为本协议的有效组成部分\uFF0C您应予遵守\u3002'), _react2.default.createElement('p', { className: 't2' }, '3\u3001本协议条款中任何一条被视为无效或因任何理由不可执行\uFF0C不影响任何其余条款的有效性和可执行性\u3002'), _react2.default.createElement('p', { className: 't1' }, '第十条 通知'), _react2.default.createElement('p', { className: 't2' }, '本协议履行过程中的所有通知将通过您在跟谁学平台注册的手机号码及预留邮箱通知您\uFF0C也请您随时留意跟谁学网站公布的通知\u3002'), _react2.default.createElement('p', { className: 't1' }, '第十一条 本协议解释'), _react2.default.createElement('p', { className: 't2' }, '跟谁学在法律许可范围内对本协议拥有解释权\u3002')));
                }
            }
        ]);
        return Protocol;
    }(_react2.default.Component);
    exports.default = Protocol;
});