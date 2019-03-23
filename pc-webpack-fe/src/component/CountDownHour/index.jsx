/**
 * 倒计时
 * @author zj
 */

import {PureComponent} from 'react';
import './index.styl';

class CountDownHour extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            discountInfoFromPage: props.discountInfoFromPage,
            startTime: props.startTime,
            currentTime: props.currentTime || '',
            // 用来更新数据
            currentTabIndex: props.currentTabIndex || 0,
            leftTime: 0,
        };
    }

    componentDidMount() {
        this.countDown();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentTabIndex !== nextProps.currentTabIndex) {
            this.setState({
                currentTabIndex: nextProps.currentTabIndex
            });
            clearInterval(this.timer);
            this.countDown(nextProps.currentTime, nextProps.startTime);
        }
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        // 重写组件的setState方法，直接返回空
        this.setState = () => {
            return false;
        };
    }

    countDown = (propsCurrentTime, propsStartTime) => {
        const currentTime = propsCurrentTime || this.state.currentTime;
        const currentStartTime = propsStartTime || this.state.startTime;
        const nowTime = currentTime ? +new Date(currentTime) : +new Date();
        const startTime = +new Date(currentStartTime);
        let leftTime = startTime - nowTime;
        if (leftTime > 0) {
            leftTime = Math.ceil(leftTime / 1000);
            this.setState({leftTime});
            this.timer = setInterval(() => {
                leftTime--;
                this.setState({leftTime});
                if (leftTime <= 0) {
                    clearInterval(this.timer);
                    this.setState({leftTime: 0});
                }
            }, 1000);
        }
    }

    changeDayStyl = day => {
        const {discountInfoFromPage, currentTabIndex} = this.state;
        let html;
        if (day) {
            html = (
                <span>
                    <span>{day}</span>
                    <span className={discountInfoFromPage === 'linkCell' ? 'special-color' : ''}> 天 </span>
                </span>
            );
        } else {
            html = '';
        }
        return html;
    }

    render() {
        const {leftTime} = this.state;
        const addZero = number => {
            if (number <= 9) {
                return '0' + number;
            }
            return number;
        };
        const formatTime = newleftTime => {
            const timeParams = {};
            if (newleftTime) {
                const leftDay = Math.floor(newleftTime / 60 / 60 / 24 % 24);
                const leftHour = Math.floor(newleftTime / 60 / 60 % 24);
                const leftMinute = Math.floor(newleftTime / 60 % 60);
                const leftSeconds = newleftTime % 60;
                timeParams.day = leftDay;
                timeParams.hour = addZero(leftHour);
                timeParams.minute = addZero(leftMinute);
                timeParams.seconds = addZero(leftSeconds);
                return timeParams;
            }
            return timeParams;
        };

        const timeParams = formatTime(leftTime);
        return (
            <div className="count-down-component">
                {
                    Object.keys(timeParams).length !== 0
                        ? (
                            <div>
                                {this.changeDayStyl(timeParams.day)}
                                <span>{timeParams.hour + ' : '}</span>
                                <span>{timeParams.minute + ' : '}</span>
                                <span>{timeParams.seconds}</span>
                            </div>
                        )
                        : '00:00:00'
                }
            </div>
        );
    }
}
export default CountDownHour;
