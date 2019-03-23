/**
 * 联报优惠弹框
 * @author xiazhiyao
 */
import {PureComponent} from 'react';
import {connect} from 'react-redux';
import LinkClazzList from '../LinkClazzList/index';
import {Modal, Tooltip} from 'antd';
import util from '~/util/util';
import cellClass from '~/model/cellClass';
import PublicFunction from '~/page/detail/cellClass/publicFunction/index';
import './index.styl';

class linkModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
            selectToggle: false,
            showPublickFunction: false,
            currentTabIndex: this.props.cellClass.currentTabIndex || 0
        };
    }

    getHtml = selectToggle => {
        // 判断首次是用默认调用参数   点击切换调用切换参数
        let html;
        if (selectToggle) {
            html = (
                <img
                    role="presentation"
                    className="img left"
                    src="https://imgs.genshuixue.com/0cms/d/file/content/2018/06/5b160a954e75e.png"
                    onClick={this.toggleDiscount}
                    alt=""
                />
            );
        } else {
            html = (<div role="presentation" className="circle left" onClick={this.toggleDiscount}></div>);
        }
        return html;
    }

    selectNoDiscountHtml = () => {
        const {selectToggle} = this.state;
        return this.getHtml(!selectToggle);
    }

    selectLinkHtml = () => {
        const {selectToggle} = this.state;
        return this.getHtml(selectToggle);
    }

    toggleDiscount = () => {
        this.setState({selectToggle: !this.state.selectToggle});
    }

    maxStrHander = (tag, linkDiscountPrice) => {
        const priceHander = util.formatPrice(linkDiscountPrice);
        const titleText = `一键联报${tag}立减${priceHander}元`;
        let html;
        if (titleText.length > 13) {
            html = (
                <Tooltip title={titleText}>
                    <span>{titleText.slice(0, 15) + '...'}</span>
                </Tooltip>
            );
        } else {
            html = titleText;
        }
        return html;
    }

    closeModal = () => {
        const {dispatch} = this.props;
        dispatch(cellClass.changeInitState({
            type: 'hideLinkModal',
        }));
        this.setState({
            showPublickFunction: false
        });
    }

    linkSubmit = () => {
        this.setState({
            showPublickFunction: true
        });
    }

    render() {
        const {
            visible,
            selectToggle,
            showPublickFunction,
            currentTabIndex
        } = this.state;
        const {
            cellClass: {
                classInfo: {
                    clazz
                },
                linkInfo: {
                    linkItems
                },
                bottomInfo
            }
        } = this.props;
        let classInfoPrice = bottomInfo.price;
        if (status === 2 && bottomInfo.discount) {
            classInfoPrice = bottomInfo.discount.price;
        }
        // 结算价格
        let resultPrice;
        let componentType;
        if (selectToggle) {
            resultPrice = linkItems[currentTabIndex].price;
            componentType = 'linkCourse';
        } else {
            resultPrice = classInfoPrice;
            componentType = 'bottom';
        }
        const {tag, originalPrice, price} = linkItems[currentTabIndex];
        const linkDiscountPrice = originalPrice - price;
        return (
            <Modal
                wrapClassName="link-clazz-modal"
                visible={visible}
                footer={null}
                closable={null}
            >
                <div>
                    <div className="link-modal-header">
                        <div className="modal-title left" >选择课程</div>
                        <div
                            role="presentation"
                            className="close-modal right"
                            onClick={this.closeModal}
                        >
                            <span className="chahao icon-guanbi"></span>
                        </div>
                    </div>
                    <div className="content">
                        <div className="no-discount">
                            {this.selectNoDiscountHtml()}
                            <div className="link-course-info left">
                                <span className="course-title">{clazz.name}</span>
                                <span className="mony">￥</span>
                                <span className="price">{classInfoPrice}</span>
                            </div>
                        </div>
                        <div className="discount">
                            <div className="course-title">
                                <img className="img" src="https://imgs.genshuixue.com/0cms/d/file/content/2018/06/5b160a96ca948.png" alt="" />
                                <div className="price">{this.maxStrHander(tag, linkDiscountPrice)}</div>
                            </div>
                            <div className="course-main">
                                {this.selectLinkHtml()}
                                <div className="more-link-course-info left">
                                    {
                                        linkItems[currentTabIndex].cellClazzs.map(item => {
                                            return (
                                                <LinkClazzList
                                                    key={Math.random() + 1000}
                                                    item={item}
                                                    fromPage="linkModal"
                                                />
                                            );
                                        })
                                    }
                                </div>
                            </div>
                            <div
                                role="presentation"
                                className="link-button analysis-haoke-log"
                                data-event-id="14250543"
                                onClick={this.linkSubmit}
                            >
                                <span className="settlement">结算</span>
                                <span className="mony">￥</span>
                                <span className="price">{util.formatPrice(resultPrice)}</span>
                                <span className="kong"></span>
                            </div>
                        </div>
                    </div>
                    <div className="modal-toast">
                        {/* <Toast refs="Toast" /> */}
                    </div>
                    {showPublickFunction ? <PublicFunction componentType={componentType} /> : null}
                </div>
            </Modal>
        );
    }
}

export default connect(s => s)(linkModal);
