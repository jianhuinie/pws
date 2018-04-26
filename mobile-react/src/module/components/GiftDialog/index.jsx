import React, { PropTypes } from 'react';
import ajax from 'common/util/ajaxService';
import ajaxConfig from 'common/ajaxConfig';
import Dialog from 'common/components/Dialog/index';
require('css-loader!./index.styl');

export default class GiftDialog extends React.Component {

    static propTypes = {
        onGainedSuccess: PropTypes.func,
        isShowDialog: PropTypes.bool,
        onClose: PropTypes.func
    };

    static defaultProps = {
        onGainedSuccess: () => {
            location.href = '/mweb/gift';
        },
        onClose: () => {

        },
        isShowDialog: true
    }

    constructor(props) {
        super(props);
        this.state = {
            giftId: undefined,
            courses: [],
            isShowDialog: props.isShowDialog
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isShowDialog: nextProps.isShowDialog });
        if (nextProps.isShowDialog) {
            this.getGiftInfo();
        }
    }

    getGiftInfo = () => {
        ajax.get(ajaxConfig.USER.GET_GIFT_COURSES).then((res) => {
            this.setState({
                giftId: res.data.giftId,
                courses: res.data.courses
            });
        });
    }

    /**
     * 关闭礼物弹窗
     */
    closeGiftDialog = () => {
        this.setState({
            isShowDialog: false
        });
        this.props.onClose && this.props.onClose();
    }

    /**
     * 领取礼包
     */
    gainGift = () => {
        sessionStorage.setItem('haveReceived', 1);
        ajax.post(ajaxConfig.USER.GAIN_GIFT, {
            giftId: this.state.giftId
        }).then(() => {
            this.props.onGainedSuccess();
        });
    }

    render() {
        return (
            <Dialog 
                dialogClassName="gift-dialog" 
                isShowDialog={this.state.isShowDialog} 
                isHiddenClose={Boolean(true)}
            >
                <div className="gift-receive">
                    <ul className="gift-receive-content">
                        {
                            this.state.courses.map((course) => {
                                let learnCnt = course.learnCnt;
                                if (learnCnt > 9999) {
                                    learnCnt = `${(learnCnt / 10000).toFixed(1)}万`;
                                }
                                return (
                                    <li className="gift-item" key={course.id + course.courseMode}>
                                        <img className="gift-item-cover" src={course.coverUrl} />
                                        <div className="gift-item-detail">
                                            <div className="gift-item-detail-title">{course.name}</div>
                                            <div className="gift-item-detail-body">
                                                <div className="gift-item-detail-body-name">{course.className}</div>
                                                <div className="gift-item-detail-body-number">{learnCnt}人在学
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                    <img className="gift-receive-bg" src="https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a8439852e5ef.png" />
                    <div className="gift-receive-opreate">
                        <div className="desc">礼包仅限新用户领取</div>
                        <button onClick={this.gainGift} className="gain">免费领取</button>
                    </div>
                    <div onClick={this.closeGiftDialog} className="gift-receive-close icon-close"></div>
                </div>
            </Dialog>
        );
    }
}