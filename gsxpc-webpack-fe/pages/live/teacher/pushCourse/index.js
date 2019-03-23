/**
 * 老师端推送课程详情
 * @author zhainingning
 */
import {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import habo from 'habo';
import {withRouter} from 'next/router';
import {getTeacherCourse} from '~/service/livePush';
import {formatPrice} from '~/util/number';

import Icon from '~/components/Icon';
import Toast from '~/components/Toast';
import Config from '../../config';
import './index.styl';

// const interMod = mod => mod.default || mod;


class TeacherLivePushCourseDetail extends PureComponent {

    static propTypes = {
        onGoBack: PropTypes.func,
        selectCourseNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }

    static defaultProps = {
        onGoBack() {},
        selectCourseNumber: 0,
    }

    constructor(props) {
        super(props);
        this.state = {
            courseDetail: {},
            leftTime: 0,
            discountShow: false
        };
    }

    componentDidMount() {
        const {courseDetail: {discount}} = this.state;

        if (discount) {
            this.getCountDown(discount);
        }

        this.load();
        this.setHaboConfig();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    // 关闭弹窗
    onCancel = () => {
        top.postMessage({
            cmd: 2,
            from: 'haoke',
            type: 'recommendCourse',
            data: {}
        }, '*');
    }

    // 返回列表
    onGoBack = () => {
        clearInterval(this.timer);
        if (this.props.onGoBack) {
            this.props.onGoBack();
        }
    }

    // 确认推送
    onPush = () => {
        // this.refs.Toast.toast(Config.RECOMMENDTIP.success);
        this.ToastRef.toast(Config.RECOMMENDTIP.success);
        const {courseDetail: {recommendType}} = this.state;
        const courseNumber = this.props.selectCourseNumber;
        setTimeout(() => {
            top.postMessage({
                cmd: 4,
                from: 'haoke',
                type: 'recommendCourse',
                data: {
                    courseNumber,
                    recommendNumber: courseNumber,
                    recommendType
                },
                delay: 3
            }, '*');
            this.onGoBack();
        }, 1000);
    }


    async load() {
        if (!process.browser) {
            return;
        }

        const {selectCourseNumber} = this.props;
        const json = await getTeacherCourse({number: selectCourseNumber});
        const {data} = json;
        if (json.code === 0) {
            this.setState({
                courseDetail: data,
            });
            if (data.discount) {
                this.getCountDown(data.discount);
            }
        }
    }

    // 倒计时
    getCountDown = discount => {
        const nowTime = +new Date(discount.currentTime);
        const endTime = +new Date(discount.endTime);
        let leftTime = endTime - nowTime;
        if (
            (leftTime > 0 && discount.type === 1)
            || (
                leftTime > 0 && discount.type === 2
                && (discount.limitCount - discount.count > 0)
            )
        ) {
            leftTime = Math.ceil(leftTime / 1000);
            this.setState({
                leftTime,
                discountShow: true,
            });
            this.timer = setInterval(() => {
                leftTime--;
                this.setState({leftTime});
                if (leftTime <= 0) {
                    clearInterval(this.timer);
                    this.setState({
                        leftTime: 0,
                        discountShow: false,
                    });
                }
            }, 1000);
        }
    }

    // 格式化时间
    formatTime = leftTime => {
        const addZero = (number, type) => {
            if (number) {
                if (number <= 9 && type !== '天') {
                    return `0${number}${type}`;
                }
                return number + type;
            }
            if (type === '秒') {
                return `0${number}${type}`;
            }
            return '';
        };
        if (leftTime > 0) {
            const days = Math.floor(leftTime / (60 * 60 * 24));
            const hours = Math.floor((leftTime % (60 * 60 * 24)) / (60 * 60));
            const minutes = Math.floor((leftTime % (60 * 60)) / 60);
            const seconds = leftTime % 60;
            return addZero(days, '天') + addZero(hours, '时') + addZero(minutes, '分') + addZero(seconds, '秒');
        }
        return '';
    }

    // 设置habo上报perf config
    setHaboConfig = () => {
        habo.perf.setConfig({
            path() {
                return window.location.pathname.replace(/\/(\d+)$/g, '');
            }
        });
    }

    render() {
        const {courseDetail, leftTime, discountShow} = this.state;
        const {
            coverUrl,
            discount = {},
            name,
            linkCount,
            recommendType
        } = courseDetail || {};

        let nowPrice;
        let oldPrice = 0;
        if (discountShow) {
            oldPrice = courseDetail.price;
            nowPrice = discount.discountPrice;
        }
        else {
            if (courseDetail.originPrice) {
                oldPrice = courseDetail.originPrice;
            }
            nowPrice = courseDetail.price;
        }

        return (
            <div className="teacher-course-detail">
                <Head>
                    <title>
                        {`课程推荐 - ${name}`}
                    </title>
                </Head>
                <div className="view-title">
                    <p>
                        <span>课程推荐</span>
                        <Icon type="guanbi" onClick={this.onCancel} />
                    </p>
                </div>
                <div className="view-content">
                    <img src={coverUrl} alt={name} />
                    <div>
                        <p className="course-name" title={name}>
                            {
                                recommendType === 4 && (
                                    <span className="union-label">
                                        {linkCount}
                                        门课程联报
                                    </span>
                                )
                            }
                            {name}
                        </p>
                        <p>
                            <span className={+nowPrice === 0 ? 'course-nowprice text-green' : 'course-nowprice'}>
                                {+nowPrice === 0 ? '免费' : `¥${formatPrice(nowPrice)}`}
                            </span>
                            {
                                +oldPrice ? (
                                    <span className="course-oldprice">
                                        &nbsp;¥&nbsp;
                                        {formatPrice(oldPrice)}
                                        &nbsp;
                                    </span>
                                ) : ''
                            }
                        </p>

                        {
                            discountShow && discount.type === 1 && (
                                <p className="course-countdown">
                                距离结束时间：
                                    {this.formatTime(leftTime)}
                                </p>
                            )
                        }
                        {
                            discountShow && discount.type === 2 && (
                                <p className="course-countdown">
                                    优惠名额仅剩
                                    {discount.limitCount - discount.count}
                                    人
                                </p>
                            )
                        }
                        <div className="view-btn">
                            <button type="button" className="btn btn-cancel" onClick={this.onGoBack}>返回</button>
                            <button type="button" className="btn btn-push" onClick={this.onPush}>确认推荐</button>
                        </div>
                    </div>
                    <div className="view-tost">
                        <Toast
                            ref={c => this.ToastRef = c}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(TeacherLivePushCourseDetail);
