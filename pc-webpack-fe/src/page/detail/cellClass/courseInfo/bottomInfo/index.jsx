/**
 * 课程信息
 * @author xiazhiyao
 */
import {PureComponent} from 'react';
import {connect} from 'react-redux';
import util from '~/util/util';
import config from '~/page/detail/cellClass/config';
import LinkModal from '~/component/LinkModal/index';
import AssistantTeacher from '~/component/AssistantTeacher/index';
import CountDownBusiness from '~/component/CountDownBusiness/index';
import PublicFunction from '../../publicFunction/index';
import cellClass from '~/model/cellClass';
import './index.styl';

let timeShow;
let downLoadTime = new Date().getTime();
let countDownStatusChange = 1;
class Bottom extends PureComponent {

    constructor(props) {
        super(props);
        const {bottomInfo} = props;
        const scheme = bottomInfo.scheme;
        const params = util.parseUrl(scheme);
        const {a} = params;
        this.state = {
            bottomInfo,
            // 限时折扣状态
            countDownStatus: 1,
            bottomButton: config.SCHEMEMAPS[a],
            // 调用公共组件中的报名
            showPublickFunction: false,
        };
    }

    componentWillMount() {
        const {bottomInfo} = this.state;
        this.countDownFunc(bottomInfo);
    }

    bottomFunc = () => {
        const {linkInfo: {linkItems}} = this.props.cellClass;
        const {bottomButton} = this.state;
        if (linkItems.length > 0 && bottomButton.name === 'goBuy') {
            const {dispatch} = this.props;
            dispatch(cellClass.changeInitState({
                type: 'showLinkModal',
            }));
        } else {
            this.setState({
                showPublickFunction: true
            });
        }
    }

    // 倒计时
    countDownFunc = (linkItem, startDiscount) => {
        if (linkItem.discount) {
            let {beginTime, endTime, currentTime} = linkItem.discount;
            if (startDiscount) {
                currentTime = beginTime;
            }
            beginTime = util.getTime(beginTime);
            endTime = util.getTime(endTime);
            currentTime = util.getTime(currentTime) + (new Date().getTime() - downLoadTime);
            if (currentTime >= beginTime && currentTime < endTime) {
                if (linkItem.discount.type === 1 || linkItem.discount.limitCount - linkItem.discount.count !== 0) {
                    const sub = parseInt((endTime - currentTime) / 1000, 10);
                    this.counDownInterval(sub);
                    this.setState({
                        countDownStatus: 2,
                    });
                }
            } else if (currentTime >= beginTime - 24 * 3600 * 1000 && currentTime < beginTime) {
                this.setState({
                    countDownStatus: 3,
                });
                const sub = parseInt((beginTime - currentTime) / 1000, 10);
                this.counDownInterval(sub, true);
            }
        }
    }

    // 倒计时函数
    counDownInterval = (sub, startDiscount) => {
        const {bottomInfo} = this.state;
        timeShow = setInterval(() => {
            sub--;
            if (sub <= 0) {
                clearInterval(timeShow);
                this.setState({
                    countDownStatus: 1
                });
                if (startDiscount) {
                    downLoadTime = new Date().getTime();
                    this.countDownFunc(bottomInfo, true);
                    this.props.getFootbar();
                    this.setState({
                        countDownTxt: ''
                    });
                }
            } else {
                const countDownTxt = util.countDown(sub, true);
                this.setState({
                    countDownTxt
                });
            }
        }, 1000);
    }

    getCountDownStatus = data => {
        this.setState({
            countDownStatus: data
        });
    }

    showModal = () => {
        const {dispatch} = this.props;
        dispatch(cellClass.changeInitState({
            type: 'showAssistantTeacher'
        }));
    }

    hideConsultDialog = () => {
        const {dispatch} = this.props;
        dispatch(cellClass.changeInitState({
            type: 'hideAssistantTeacher'
        }));
    }

    render() {
        const {
            bottomInfo,
            countDownStatus,
            bottomButton,
            showPublickFunction,
            countDownTxt
        } = this.state;
        const {discount, originalPrice, price} = bottomInfo;
        const {beginTime, currentTime, endTime} = discount || {};
        const {
            cellClass: {
                showLinkModal,
                showAssistantTeacher,
                teacherInfo
            }
        } = this.props;
        const salesTeacher = teacherInfo && teacherInfo.salesTeacher;
        const realPrice = +price === 0 ? '免费' : '￥' + price / 100;

        let discountPrice = -1;
        if (discount && +discount.price >= 0) {
            discountPrice = '￥' + discount.price / 100;
        }

        const countDownTime = {
            beginTime,
            currentTime,
            endTime,
        };
        // 全局注册价格
        const {dispatch} = this.props;

        if (countDownStatusChange > 0) {
            dispatch(cellClass.changeInitState({
                type: 'saveEnrollInfo',
                enrollInfo: {
                    bottomButton,
                    countDownTime,
                    countDownStatus,
                    realPrice,
                    discountPrice,
                    bottomInfoPrice: price,
                    bottomInfoOriginPrice: originalPrice
                }
            }));
            countDownStatusChange--;
        }

        return (
            <div className="bottom-info">
                <div className="prices">
                    {
                        countDownStatus === 3
                            ? (
                                <div className="price-content">
                                    <span className="text-price">￥{bottomInfo.price / 100}</span>
                                    <span className="text-price-s">优惠价{discountPrice}</span>
                                </div>
                            )
                            : (
                                <div className="price-content">
                                    {
                                        countDownStatus === 2
                                            ? (
                                                <span
                                                    className={`${discountPrice === '免费' && 'free'}`}
                                                >
                                                    {discountPrice}
                                                </span>
                                            )
                                            : <span className={`${price === '免费' && 'free'}`}>{realPrice}</span>
                                    }
                                    {
                                        countDownStatus === 2
                                            ? (
                                                <span className="origin-price ">
                                                    {realPrice}
                                                </span>
                                            )
                                            : (
                                                <span className="origin-price">
                                                    {`${+originalPrice === 0
                                                        ? ''
                                                        : '￥' + originalPrice / 100}`}
                                                </span>
                                            )
                                    }
                                </div>
                            )
                    }
                </div>
                <div>
                    <div
                        role="presentation"
                        className={`action-btn-detail ${bottomButton.className}`}
                        onClick={this.bottomFunc}
                    >
                        {bottomButton.text}
                    </div>
                    <div
                        role="presentation"
                        onClick={this.showModal}
                        className="class-info-btn"
                    >
                        课程咨询
                    </div>
                    <div className="bottom-text">
                        {
                            bottomInfo.studentCount > 10 ? (
                                <span className="enroll-count">已报{bottomInfo.studentCount}人</span>
                            ) : (
                                <span className="enroll-count">火热报名中</span>
                            )
                        }
                        <div className="count-down-wrape">
                            {
                                beginTime
                                    ? discount.type === 2
                                        ? (
                                            Date.parse(beginTime) - Date.parse(currentTime) < 24 * 60 * 60 * 1000
                                                && Date.parse(beginTime) - Date.parse(currentTime) > 0
                                                ? (
                                                    <CountDownBusiness
                                                        countDownStatus={countDownStatus}
                                                        countDownTime={countDownTime}
                                                    />
                                                )
                                                : (
                                                    Date.parse(currentTime) < Date.parse(endTime)
                                                    && Date.parse(currentTime) > Date.parse(beginTime)
                                                    && discount.limitCount - discount.count > 0
                                                    && (
                                                        <div className="time-limit-discount">
                                                            <span>限额优惠&nbsp;剩</span>
                                                            <span className="limit-count">
                                                                {discount.limitCount - discount.count}
                                                            </span>
                                                            <span className="recovery-price">人 售完恢复原价</span>
                                                        </div>
                                                    )
                                                )
                                        )
                                        : (
                                            <CountDownBusiness
                                                countDownStatus={countDownStatus}
                                                countDownTime={countDownTime}
                                            />
                                        )
                                    : null
                            }
                        </div>
                    </div>
                    {showLinkModal && <LinkModal visible={showLinkModal} />}
                    {showPublickFunction ? <PublicFunction componentType="bottom" /> : null}
                    {
                        salesTeacher && showAssistantTeacher && (
                            <AssistantTeacher
                                teacherNumber={salesTeacher.number}
                                showAssistantTeacher={showAssistantTeacher}
                                onCloseDialog={this.hideConsultDialog}
                            />
                        )
                    }
                </div>
            </div>
        );
    }
}
export default connect(s => s)(Bottom);

