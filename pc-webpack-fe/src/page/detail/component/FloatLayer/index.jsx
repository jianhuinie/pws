/**
 * 课程信息
 * @author niejianhui
 */
import {PureComponent} from 'react';
import util from '~/util/util';
import config from '~/page/detail/cellClass/config';
import {connect} from 'react-redux';
import LinkModal from '~/component/LinkModal/index';
import PublicFunction from '~/page/detail/cellClass/publicFunction/index';
import cellClass from '~/model/cellClass';
import {Modal} from 'antd';

import './index.styl';

class FloatLayer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showPublickFunction: false,
            // countDownStatus: props.countDownStatus,
        };
    }

    onOk = url => {
        location.href = url;
    }

    openModal = (content, url, type) => {
        const confirmParams = {
            title: '温馨提示',
            content,
            cancelText: '取消',
            okText: '确定',
            onOk: () => this.onOk(url),
        };
        const infoParams = {
            title: '温馨提示',
            content,
            okText: '确定',
            onOk: () => { },
        };
        if (type === 'linkClazzHasBought' || type === 'clazzHasBought') {
            Modal.info(infoParams);
        } else {
            Modal.confirm(confirmParams);
        }
    }

    // dataReport = name => {
    //     let eventId = '';
    //     switch (name) {
    //         case '课程详情':
    //             eventId = '8880560';
    //             break;
    //         case '主讲老师':
    //             eventId = '8880521';
    //             break;
    //         case '课程表':
    //             eventId = '8880465';
    //             break;
    //         case '课程评价':
    //             eventId = '8880394';
    //             break;
    //         default:
    //     }
    //     return eventId;
    // }

    bottomFunc = () => {
        const {linkInfo: {linkItems}, enrollInfo: {bottomButton}} = this.props.cellClass;
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

    clickTab = e => {
        const {moduleName} = e.target.dataset;
        this.props.onClickTab(moduleName);
    }

    render() {
        const {showPublickFunction} = this.state;
        const {
            cellClass: {
                showLinkModal,
                enrollInfo: {
                    bottomButton,
                    countDownStatus,
                    realPrice,
                    discountPrice,
                    bottomInfoPrice,
                    bottomInfoOriginPrice
                }
            }
        } = this.props;

        return (
            <div className="float-layer-clazz">
                <div className="wrapper">
                    <div className="layer-tabs">
                        {
                            config.COURSETABS.map(tab => {
                                return (
                                    <span
                                        role="presentation"
                                        key={tab.name}
                                        data-module-name={tab.moduleName}
                                        // data-event-id={this.dataReport(tab.name)}
                                        className={'analysis-haoke-log '
                                            + (this.props.activeModule === tab.moduleName
                                                ? 'active' : '')}
                                        onClick={this.clickTab}
                                    >
                                        {tab.name}
                                        {/* {
                                            tab.moduleName === 'course-plan' && hasAudition ? (
                                                <div className="label-audition">试听</div>
                                            ) : ''
                                        } */}
                                    </span>
                                );
                            })
                        }
                    </div>
                    <div className="btn-info">
                        {
                            countDownStatus === 3
                                ? (
                                    <div className="prices">
                                        <span className="text-price">￥{bottomInfoPrice / 100}</span>
                                        <span className="text-price-s">优惠价{discountPrice}</span>
                                    </div>
                                )
                                : (
                                    <div className="prices">
                                        {
                                            countDownStatus === 2
                                                ? (
                                                    <span
                                                        className={`${discountPrice === '免费' && 'free'}`}
                                                    >
                                                        {discountPrice}
                                                    </span>
                                                )
                                                : (
                                                    <span className={`${bottomInfoPrice === '免费' && 'free'}`}>
                                                        {realPrice}
                                                    </span>
                                                )
                                        }
                                        {
                                            countDownStatus === 2
                                                ? <span className="origin-price ">{realPrice}</span>
                                                : (
                                                    <span className="origin-price">
                                                        {`${+bottomInfoOriginPrice === 0
                                                            ? ''
                                                            : '￥' + bottomInfoOriginPrice / 100}`}
                                                    </span>
                                                )
                                        }
                                    </div>
                                )
                        }
                        <div>
                            <span
                                className="analysis-haoke-log action-btn"
                                role="presentation"
                                onClick={this.bottomFunc}
                            >
                                {bottomButton.text}
                            </span>
                        </div>
                    </div>
                </div>
                {showLinkModal && <LinkModal visible={showLinkModal} />}
                {showPublickFunction ? <PublicFunction componentType="bottom" /> : null}
            </div>
        );
    }
}

export default connect(s => s)(FloatLayer);
