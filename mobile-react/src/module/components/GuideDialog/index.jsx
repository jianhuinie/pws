import React, { PropTypes } from 'react';
import Dialog from 'common/components/Dialog/index';
require('css-loader!./index.styl');

export default class GuideDialog extends React.Component {

    static propTypes = {
        isShowDialog: PropTypes.bool
    };

    static defaultProps = {
        isShowDialog: true
    }

    constructor(props) {
        super(props);
        this.state = {
            isShowDialog: props.isShowDialog
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isShowDialog: nextProps.isShowDialog });
    }

    /**
     * 关闭弹窗
     */
    closeGuideDialog = () => {
        this.setState({
            isShowDialog: false
        });
    }

    render() {
        return (
            <Dialog 
                shouldCloseOnOverlayClick={false}
                dialogClassName="guide-dialog" 
                isShowDialog={this.state.isShowDialog} 
                isHiddenClose={Boolean(true)}
            >
                <div className="new-guide">
                        <div className={this.props.isAuth ? 'hide' : 'new-guide-desc'}>
                            点击操作，进入课堂管理,<br />
                            进行实名加V认证。
                        </div>
                        <div className={this.props.isAuth ? 'new-guide-desc' : 'hide'}>
                            点击操作，进入课堂管理。
                        </div>
                        <div className="new-guide-arrow icon-arrow-right-bottom" />
                        <div className="new-guide-operate">
                            <div className="new-guide-operate-btn">
                                <div className="icon-operate" />
                                操作
                            </div>
                        </div>
                        <div onClick={this.closeGuideDialog} className="new-guide-close">我知道了</div>
                    </div>
            </Dialog>
        );
    }
}