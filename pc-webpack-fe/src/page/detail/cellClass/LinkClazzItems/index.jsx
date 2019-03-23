import {PureComponent} from 'react';
import {connect} from 'react-redux';
import LinkClazzTab from './LinkClazzTab/index';
import PublicFunction from '../publicFunction/index';
import CountDownBusiness from '~/component/CountDownBusiness/index';
import cellClass from '~/model/cellClass';
import LinkModal from '~/component/LinkModal/index';
import LinkClazzList from '~/component/LinkClazzList/index';
import './index.styl';

class LinkClazzItems extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // linkCellClazzNumber: props.linkCellClazzNumber,
            // linkItems: props.linkItems,
            // getLinkTabIndex: props.getLinkTabIndex,
            currentTabIndex: 0,
            // visible: false,
            // countDownStatus: 0,   // 限时折扣状态
        };
    }

    onLinkClazzTabChange = index => {
        const {dispatch} = this.props;
        dispatch(cellClass.changeInitState({
            type: 'addCurrentTabIndex',
            currentTabIndex: index
        }));
        this.setState({
            currentTabIndex: index
        });
    }

    bottomFunc = () => {
        this.setState({
            showPublickFunction: true
        });
    }

    render() {
        const {
            showPublickFunction,
            currentTabIndex
        } = this.state;
        const {
            linkItems,
            cellClass: {
                showLinkModal,
                bottomInfo: {
                    discount,
                    originalPrice,
                    price
                },
                enrollInfo: {
                    bottomButton,
                    countDownTime,
                    countDownStatus
                }
            }
        } = this.props;

        const {beginTime, currentTime, endTime} = countDownTime;
        const currentLinkItem = linkItems[currentTabIndex];
        const linkDiscountPrice = currentLinkItem.originalPrice - currentLinkItem.price;
        const currentLinkItemCellClazzs = currentLinkItem.cellClazzs;
        return (
            <div className="link-clazzs">
                <div className="link-clazz">
                    <LinkClazzTab
                        linkItems={linkItems}
                        onLinkClazzTabChange={this.onLinkClazzTabChange}
                    />
                    <div className="link-clazz-lists">
                        <div className="lists-out-wrap">
                            <div className="lists-inner-wrap" style={{width: 307 * currentLinkItemCellClazzs.length}}>
                                {
                                    currentLinkItemCellClazzs.length && currentLinkItemCellClazzs.map((item, index) => {
                                        return (
                                            <div className="item-wrap" key={item.number}>
                                                <LinkClazzList
                                                    key={item.number}
                                                    item={item}
                                                    fromPage="cellDetail"
                                                />
                                                {
                                                    currentLinkItem.length - 1 !== index
                                                    && <div className="add-chart">+</div>
                                                }
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <div className="link-discount-info">
                            <div className="price">
                                <span className="now-price">
                                    现价:
                                    <span className="mony">￥{linkItems[0].price / 100}</span>
                                </span>
                                <span className="discount-price">立省{linkDiscountPrice / 100}元</span>
                            </div>
                            <div
                                role="presentation"
                                className={`action-button ${bottomButton.className}`}
                                onClick={this.bottomFunc}
                            >
                                {bottomButton.text}
                            </div>
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
                    </div>
                </div>
                {/* {showLinkModal && <LinkModal visible={showLinkModal} currentTabIndex={currentTabIndex} />} */}
                {showPublickFunction && <PublicFunction componentType="linkCourse" currentTabIndex={currentTabIndex} />}
            </div>
        );
    }
}

export default connect(s => s)(LinkClazzItems);
