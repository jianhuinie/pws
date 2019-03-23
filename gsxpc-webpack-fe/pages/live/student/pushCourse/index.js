/**
 * 老师端推送课程详情
 * @author fengguangyu
 */
import {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import habo from 'habo';
import {withRouter} from 'next/router';
import {getCourse} from '~/service/livePush';
import {skipScheme} from '~/util/url';
import {formatPrice} from '~/util/number';

import Icon from '~/components/Icon';
import './index.styl';

class StudentLivePushCourseDetail extends PureComponent {

    static propTypes = {
        courseNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        json: PropTypes.shape({
            code: PropTypes.number.isRequired,
            data: PropTypes.object
        }).isRequired
    }

    static async getInitialProps({query: {courseNumber}}) {
        if (!courseNumber) {
            return {};
        }

        const {code, loggerId, data, msg, path, ts} = await getCourse({number: courseNumber});
        return {json: {code, loggerId, data, msg, path, ts}, courseNumber};
    }

    constructor(props) {
        super(props);
        const {courseNumber, json} = this.props;

        let state = {
            courseNumber: courseNumber | 0,
            courseDetail: {},
            leftTime: 0,
            discountShow: false
        };

        if (json) {
            const {
                code,
                data,
                loggerId
            } = json;

            if (code === 0) {
                state = {
                    ...state,
                    courseDetail: data,
                    loggerId
                };
            }
        }

        this.state = state;
    }

    componentDidMount() {
        const {courseDetail: {discount}} = this.state;

        if (discount) {
            this.getCountDown(discount);
        }

        top.postMessage({
            cmd: 1,
            from: 'haoke',
            type: 'recommendCourse',
            data: {}
        }, '*');

        this.load();
        this.setHaboConfig();
    }

    componentWillReceiveProps({courseNumber}) {
        if (courseNumber && courseNumber !== 'undefined') {
            top.postMessage({
                cmd: 1,
                from: 'haoke',
                type: 'recommendCourse',
                data: {
                }
            }, '*');

            getCourse({number: courseNumber})
                .then(res => {
                    const {data, loggerId} = res;
                    const {discount} = data;
                    this.setState({
                        courseDetail: data,
                        loggerId
                    });
                    if (discount) {
                        this.getCountDown(discount);
                    }
                });
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    // 关闭弹窗
    onCancel = () => {
        const {loggerId} = this.state;
        // 兼容老的数据上报字段命名方式
        habo.click({loggerId, eventId: '19928240'});
        top.postMessage({
            cmd: 2,
            from: 'haoke',
            type: 'recommendCourse',
            data: {}
        }, '*');
    }

    // 确认报名
    onClick = () => {
        const {loggerId, courseDetail: {scheme}} = this.state;
        // 兼容老的数据上报字段命名方式
        habo.click({loggerId, eventId: '19928190'});
        skipScheme(scheme, true);
    }

    // 设置habo上报perf config
    setHaboConfig = () => {
        habo.perf.setConfig({
            path() {
                return window.location.pathname.replace(/\/(\d+)$/g, '');
            }
        });
    }

    async load() {
        if (!process.browser) {
            return;
        }

        let {
            json,
            courseNumber
        } = this.props;

        if (!json || json.code !== 0) {
            json = await getCourse({number: courseNumber});
            const {data, loggerId} = json;
            if (json.code === 0) {
                this.setState({
                    courseDetail: data,
                    loggerId
                });
                if (data.discount) {
                    this.getCountDown(data.discount);
                }
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
            <div className="student-course-detail">
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
                        <button type="button" className="btn btn-ok" onClick={this.onClick}>立即报名</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(StudentLivePushCourseDetail);
