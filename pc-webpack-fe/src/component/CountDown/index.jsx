/**
 * 倒计时
 * @author niejianhui
 */

import {PureComponent} from 'react';

class CountDown extends PureComponent {
    constructor(props) {
        super(props);
        const nowTime = +new Date();
        const endTime = +new Date(props.endTime);
        let leftTime = endTime - nowTime;
        let timer;
        if (leftTime > 0) {
            leftTime = Math.ceil(leftTime / 1000);
            timer = setInterval(() => {
                leftTime--;
                this.setState({leftTime});
                if (leftTime <= 0) {
                    clearInterval(timer);
                    this.setState({leftTime: 0});
                }
            }, 1000);
        }
        this.state = {
            leftTime,
        };
    }

    render() {
        const state = this.state;
        const addZero = number => {
            if (number <= 9) {
                return '0' + number;
            }
            return number;
        };
        const formatTime = leftTime => {
            if (leftTime) {
                const leftMinute = Math.floor(leftTime / 60);
                const leftSeconds = leftTime % 60;
                return addZero(leftMinute) + ':' + addZero(leftSeconds);
            }
            return '00:00';
        };
        return (
            <span>{formatTime(state.leftTime)}</span>
        );
    }
}
export default CountDown;
