import {PureComponent} from 'react';
import {connect} from 'react-redux';
import util from '~/util/util';
import http from '~/service/http';
import constant from '~/service/constant';
import {Modal, message} from 'antd';

import config from '../config';
import cellClass from '~/model/cellClass';

const downLoadTime = new Date().getTime();
class PublickFunction extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            linkVisible: false
        };
    }

    componentDidMount() {
        this.freeOrder();
    }

    freeOrder = () => {
        const {
            componentType,
            currentTabIndex,
            cellClass: {
                classInfo: {clazz: {number}},
                bottomInfo,
                linkInfo: {linkItems},
                userInfo
            }
        } = this.props;
        const {user_name, user_type} = userInfo;
        let discount;
        let scheme;
        // 根据联报课和普通课，返回不同的scheme和discount
        if (componentType === 'linkCourse') {
            scheme = linkItems[currentTabIndex].scheme;
            discount = linkItems[currentTabIndex].discount;
        } else {
            scheme = bottomInfo.scheme;
            discount = bottomInfo.discount;
        }
        const {
            a,
            cellClazzNumber,
            courseType,
            cellSubclazzNumbers,
            linkClazzNumber,
            orderNumber,
            subclazzNumber
        } = util.parseUrl(scheme);

        let price = bottomInfo.price;
        let discountNumber;
        if (discount) {
            let {beginTime, endTime, currentTime} = discount;
            beginTime = util.getTime(beginTime);
            endTime = util.getTime(endTime);
            currentTime = util.getTime(currentTime) + (new Date().getTime() - downLoadTime);
            if (currentTime >= beginTime && currentTime < endTime) {
                price = discount.price;
                discountNumber = discount.number;
            }
        }
        const {linkToast, CLAZZTOAST} = config;
        let linkUrl = null;
        // 已登录
        if (user_name) {
            // 老师身份
            if (+user_type === 0) {
                Modal.confirm({
                    title: '温馨提示',
                    content: '你目前是老师身份，需要切换到学生身份才能购买课程',
                    width: 600,
                    iconType: '',
                    okText: '切换',
                    cancelText: '不切换',
                    onOk: () => {
                        http
                            .get(constant.USER.SWITCHROLE, {role: 2})
                            .then(() => {
                                location.reload();
                            });
                    }
                });
            } else {
                switch (a) {
                    case 'goBuy':
                        // 正价课
                        if (+price) {
                            let url = '/pcweb/#/student/submitOrder/' + number;
                            if (subclazzNumber) {
                                url += '/' + subclazzNumber;
                            }
                            this.bindMobile(url);
                        } else {
                            http
                                .post(constant.PURCHASE.CREATEORDER, {
                                    isAssign: false,
                                    subclazzNumber,
                                    addressNumber: '',
                                    orderUrl: location.origin + '/pcweb/#/student/paySuccess',
                                    quitUrl: location.origin + '/pcweb/#/student/manage/orderList',
                                    reorderUrl: location.href
                                })
                                .then(res => {
                                    // 报名成功
                                    const {dispatch} = this.props;
                                    dispatch(cellClass.changeInitState({
                                        type: 'showEnrollSuccess',
                                        subclazzNumber
                                    }));
                                });
                        }
                        break;
                    case 'goBuyLinkClazz':
                        linkUrl = `/pcweb/#/student/submitLinkOrder/
                                    ${linkClazzNumber}/
                                    ${cellSubclazzNumbers}/${linkClazzNumber}`;
                        // 正价课检验是否绑定手机号
                        this.bindMobile(linkUrl);
                        break;
                    case 'goPay':
                        // 有待支付订单  跳订单详情页
                        if (courseType === 15) {
                            linkUrl = '/pcweb/#/student/orderDetail/' + orderNumber + '/0';
                        } else if (courseType === 17) {
                            linkUrl = '/pcweb/#/student/orderDetail/' + orderNumber + '/1';
                        }
                        this.openModal(linkToast[2], linkUrl);
                        break;
                    case 'clazzHasBought':
                        this.openModal(linkToast[3], linkUrl, 'clazzHasBought');
                        break;
                    case 'linkClazzHasBought':
                        this.openModal(linkToast[1], linkUrl, 'linkClazzHasBought');
                        break;
                    case 'classroomCellCourseDetail':
                        // 跳到学习中心
                        linkUrl = '/pcweb/#/student/courseCenter/' + cellClazzNumber;
                        location.href = linkUrl;
                        break;
                    case 'cellClazzFull':
                        message.info('满班了');
                        break;
                    case 'cellClazzStopEnroll':
                        message.info('满班了');
                        break;
                    case 'cellLinkClazzFull':
                        message.info('满班了');
                        break;
                    case 'cellLinkClazzStopEnroll':
                        message.info('满班了');
                        break;
                    default:
                        break;
                }
            }
        } else {
            const url = '/static/login?next=' + encodeURIComponent(location.href);
            location.href = url;
        }
    }

    bindMobile = url => {
        http
            .get('/sapi/auth/bindMobile')
            .then(res => {
                if (res.data && res.data.binded) {
                    location.href = url;
                } else {
                    // 退出重新登录，再跳转到提交订单页
                    util.logoutBindPhone(url);
                }
            });
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
            onOk: () => {},
        };
        if (type === 'linkClazzHasBought' || type === 'clazzHasBought') {
            Modal.info(infoParams);
        } else {
            Modal.confirm(confirmParams);
        }
    }

    render() {
        const {linkVisible} = this.state;
        return (
            <span></span>
        );
    }
}

export default connect(s => s)(PublickFunction);

