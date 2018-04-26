import React, { PropTypes } from 'react';
import CommonController from 'common/controller/CommonController';
import $ from 'zepto';
require('css-loader!./index.styl');
const $body = $('body');
const $html = $('html');
const pageMain = $('#app');
let lastScrollY = 0;
class SlideInDialog extends CommonController {
    static propTypes = {
        // 是否隐藏
        isShowDialog: PropTypes.bool,
        // 关闭回调函数，点关闭按钮关闭，参数:type=cancel
        onCloseHandler: PropTypes.func,
        children: PropTypes.node.isRequired,
        // dialog包装器样式，建议轻易不要使用
        portalClassName: PropTypes.string,
        // dialog背景mask样式，建议轻易不要使用
        maskClassName: PropTypes.string,
        // content的样式
        contentClassName: PropTypes.string,
        // 点击背景mask是否关闭，默认true
        shouldCloseOnMaskClick: PropTypes.bool,
        // 打开之后回调函数
        onAfterOpenHandler: PropTypes.func
    };
    static defaultProps = {
        isShowDialog: false,
        onCloseHandler: null,
        portalClassName: 'slide-dialog-wrapper',
        maskClassName: 'slide-mask-div',
        contentClassName: 'slide-dialog-content',
        shouldCloseOnMaskClick: true,
        onAfterOpenHandler: null
    };
    constructor(props) {
        super(props);
        this.closeHander = this.closeHander.bind(this);
        this.state = {
            isShowDialog: false
        };
    }
    componentDidMount() {
        if (typeof this.props.onAfterOpenHandler === 'function') {
            this.props.onAfterOpenHandler();
        }
        $body.attr('data-origin-overflow', $body.css('overflow'));
        $html.attr('data-origin-overflow', $html.css('overflow'));
        pageMain.attr('data-origin-overflow', pageMain.css('overflow'));
        lastScrollY = window.scrollY;
    }
    componentWillReceiveProps(nextProps) {
        const { isShowDialog } = nextProps;
        this.setState({
            isShowDialog: isShowDialog
        });
    }
    componentDidUpdate() {
        const { isShowDialog } = this.state;
        if (isShowDialog) {
            this.onShowHandler();
            return;
        }
        this.onHideHandler();
    }
    componentWillUnmount() {
        // 销毁
    }
    onShowHandler() {
        const innerHeight = window.innerHeight;
        window.scrollTo(0, 0);
        this.setCss($body, innerHeight + 'px', 'hidden');
        this.setCss($html, innerHeight + 'px', 'hidden');
    }
    onHideHandler() {
        // hurry: 先后顺序的问题
        window.scrollTo(0, lastScrollY);
        this.setCss($html, 'initial', $html.attr('data-origin-overflow'));
        this.setCss($body, 'initial', $body.attr('data-origin-overflow'));
        // hurry: 兼容小米和360浏览器
        this.setCss(pageMain, 'initial', pageMain.attr('data-origin-overflow'));
    }
    setCss(dom, height, overflow) {
        dom.css({
            maxHeight: height,
            overflow: overflow
        });
    }
    closeHander(e) {
        if (!$(e.target).hasClass('slide-dialog-mask')) {
            return;
        }
        this.setState({
            isShowDialog: false
        });
        if (typeof this.props.onCloseHandler === 'function') {
            this.props.onCloseHandler('cancel');
        }
    }
    render() {
        const { portalClassName, contentClassName, children, maskClassName, shouldCloseOnMaskClick } = this.props;
        const { isShowDialog } = this.state;
        return (
            <div className={`${portalClassName} ${!isShowDialog && 'hidden'}`}>
                <div
                    className={`slide-dialog-mask ${isShowDialog && 'on'}`}
                    style={{ height: isShowDialog ? window.innerHeight : '0px' }}
                    onClick={shouldCloseOnMaskClick && this.closeHander}
                >
                    <div className={`${contentClassName}`}>
                        {children}
                    </div>
                </div>
                <div
                    className={`${maskClassName}`}
                >
                </div>
            </div>
        );
    }
}
export default SlideInDialog;