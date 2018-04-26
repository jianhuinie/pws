import React, { PropTypes } from 'react';
import ReactModal from 'react-modal';
require('css-loader!./index.styl');

class Dialog extends React.Component {
    static propTypes = {
        isShowDialog: PropTypes.bool,
        // 关闭回调函数，点关闭按钮关闭，参数:type=cancel
        onCloseHandler: PropTypes.func,
        children: PropTypes.node.isRequired,
        // dialog包装器样式，建议轻易不要使用
        portalClassName: PropTypes.string,
        // dialog背景mask样式，建议轻易不要使用
        overlayClassName: PropTypes.string,
        // dialog弹框的样式
        dialogClassName: PropTypes.string,
        // 点击背景mask是否关闭，默认true
        shouldCloseOnOverlayClick: PropTypes.bool,
        // 打开之后回调函数
        onAfterOpenHandler: PropTypes.func
    };
    static defaultProps = {
        isShowDialog: false,
        onCloseHandler: null,
        portalClassName: 'dialog-wrapper',
        overlayClassName: 'overlay',
        dialogClassName: 'content',
        shouldCloseOnOverlayClick: true,
        onAfterOpenHandler: null
    };
    constructor(props) {
        super(props);
        this.closeHander = this.closeHander.bind(this);
        this.state = {
            isOpen: props.isShowDialog
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ isOpen: nextProps.isShowDialog });
    }
    closeHander() {
        this.setState({ isOpen: false });
        if (typeof this.props.onCloseHandler === 'function') {
            this.props.onCloseHandler('cancel');
        }
    }
    render() {
        // ReactModal详细demo见这里：https://reactcommunity.org/react-modal/
        return (
            <ReactModal
                /*
                    Boolean describing if the modal should be shown or not.
                */
                isOpen={this.state.isOpen}
                /*
                    Function that will be run after the modal has opened.
                */
                onAfterOpen={this.props.onAfterOpenHandler}
                /*
                    Function that will be run when the modal is requested to be closed, 
                    prior to actually closing.
                */
                onRequestClose={this.closeHander}
                /*
                    Number indicating the milliseconds to wait before closing the modal.

                    closeTimeoutMS={0}
                */
                
                /*
                    Object indicating styles to be used for the modal.  
                    It has two keys, `overlay` and `content`.  
                    See the `Styles` section for more details.

                    style={{ overlay: {}, content: {} }}
                */
                
                /*
                    String indicating how the content container should be announced to screenreaders
                */
                contentLabel="genshuixue"                
                /*
                    String className to be applied to the portal.
                    See the `Styles` section for more details.
                */
                portalClassName={this.props.portalClassName}
                /*
                    String className to be applied to the overlay.
                    See the `Styles` section for more details.
                */
                overlayClassName={this.props.overlayClassName}
                /*
                    String className to be applied to the modal content.
                    See the `Styles` section for more details.
                */
                className={this.props.dialogClassName}
                /*
                    Boolean indicating if the appElement should be hidden

                    ariaHideApp={true}
                */
                
                /*
                    Boolean indicating if the overlay should close the modal
                */
                shouldCloseOnOverlayClick={this.props.shouldCloseOnOverlayClick}
                /*
                    String indicating the role of the modal, 
                    allowing the 'dialog' role to be applied if desired.
                */
                role="dialog"
                /*
                    Function that will be called to get the parent 
                    element that the modal will be attached to.
                */
                parentSelector={() => document.body}
            >
                <div className="header">
                    <i
                        className="icon-close"
                        onClick={this.closeHander}
                    />
                </div>
                <div className="body">
                    {this.props.children}
                </div>
            </ReactModal>
        );
    }
}

export default Dialog;