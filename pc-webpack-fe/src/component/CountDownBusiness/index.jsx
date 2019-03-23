/**
 * 显示活动倒计时
 * @author zj
 */

import {PureComponent} from 'react';
import CountDownHour from '../CountDownHour/index';
import config from '~/component/config';
import './index.styl';

class CountDownBusiness extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            countDownTime: Object.assign({}, props.countDownTime) || {},
            discountInfoFromPage: props.discountInfoFromPage || '',
            // 用来切换tab更新数据
            currentTabIndex: props.currentTabIndex || 0,
            countDownStatus: props.countDownStatus,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentTabIndex !== nextProps.currentTabIndex) {
            this.setState({
                countDownTime: nextProps.countDownTime,
                currentTabIndex: nextProps.currentTabIndex
            });
        }
    }


    // 倒计时选择开始还是结束时间函数
    startOrEndStartTime = () => {
        const {countDownTime, countDownStatus} = this.props;
        const {beginTime, endTime} = countDownTime;
        let selectTime;
        if (countDownStatus === 1) {
            selectTime = beginTime;
        } else if (countDownStatus === 2) {
            selectTime = endTime;
        }
        return selectTime;
    }

    showActivityDayStyle = () => {
        const {discountInfoFromPage, countDownStatus} = this.state;
        let html;
        switch (discountInfoFromPage) {
            case 'linkCell':
                html = countDownStatus === 2 ? <span className="special-color">剩 </span> : '';
                break;
            default:
                html = (<span className="count-down-text">{config.COUNTDOWN[countDownStatus]}</span>);
                break;
        }
        return html;
    }


    render() {
        const {discountInfoFromPage, countDownTime, currentTabIndex} = this.state;
        const {currentTime, endTime} = countDownTime;
        const selectTimeOrEndTime = this.startOrEndStartTime();
        return (
            <div className={`count-down ${currentTime > endTime && 'hide'}`} >
                {this.showActivityDayStyle()}
                {
                    selectTimeOrEndTime && (
                        <CountDownHour
                            startTime={selectTimeOrEndTime}
                            currentTime={currentTime}
                            discountInfoFromPage={discountInfoFromPage}
                            currentTabIndex={currentTabIndex}
                        />
                    )
                }
            </div>
        );
    }
}
export default CountDownBusiness;
