import React, { PropTypes } from 'react';
import SlideInDialog from 'common/components/SlideInDialog/index';
require('css-loader!./index.styl');

export default class GuideDialog extends React.Component {

    static propTypes = {
        isShow: PropTypes.bool
    };

    static defaultProps = {
        isShow: true
    }

    constructor(props) {
        super(props);
        this.state = {
            isShowDialog: false
        };
    }

    /**
     * 开启/关闭弹窗
     */
    toggleDialog = () => {
        const isShowDialog = this.state.isShowDialog;
        this.setState({
            isShowDialog: !isShowDialog
        });
    }

    /**
     * 关闭弹窗
     */
    closeDialog = () => {
        this.setState({
            isShowDialog: false
        });
    }

    jumpTo = () => {
        location.href = '/mweb/teacher/manager/center';
    }

    render() {
        return (
            <div className={`center-operate ${this.props.isShow ? '' : 'hide'}`}>
                <div className="center-operate-btn" onClick={this.toggleDialog}>
                    <div className="icon-operate" />
                    操作
                </div>
                <div className={`center-operate-wrapper ${this.state.isShowDialog ? '' : 'hide'}`}>
                    <div className="operation-component">
                        <div className="operation-component-content" onClick={this.jumpTo}>
                            <div className="operation-item">
                                <div className="icon-room-manager operation-item-icon" />
                                <div className="operation-item-desc">课堂管理</div>
                            </div>
                        </div>
                        <div onClick={this.closeDialog} className="operation-component-close">取消</div>
                    </div>
                    <div className="center-operate-mask" onClick={this.closeDialog}></div>
                </div>
            </div>
        );
    }
}