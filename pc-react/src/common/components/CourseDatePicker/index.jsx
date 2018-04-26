import React, { PropTypes } from 'react';
import { DatePicker } from 'antd';
import CommonController from 'common/controller/CommonController';
import CONFIG from 'common/config';
import moment from 'moment';
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');
require('css-loader!./index.styl');

export default class CourseDatePicker extends CommonController {

    static propTypes = {
        onChange: PropTypes.func,
        defaultBegin: PropTypes.number,
        defaultEnd: PropTypes.number,
        isRange: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            endOpen: false,
            startValue: props.defaultBegin ? moment(props.defaultBegin) : null,
            endValue: props.defaultEnd ? moment(props.defaultEnd) : null
        };
    }

    /**
     * @override
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        const me = this;
        if (nextProps.defaultBegin && nextProps.defaultBegin !== me.props.defaultBegin) {
            me.setState({
                startValue: moment(nextProps.defaultBegin),
                endValue: moment(nextProps.defaultEnd)
            });
        }
    }


    /**
     * 处理第一个日期选择器打开关闭
     */
    handleStartOpenChange = (open) => {
        // 如果没有打开
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    /**
     * 处理第一个日期选择器打开关闭
     */
    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }

    /**
     * 处理第一个日期选择器变化
     */
    handleStartChange = (date) => {
        this.setState({
            startValue: date
        });
        this.props.onStartChange(date.valueOf());
    }   

    /**
     * 处理第二个日期选择器变化
     */
    handleEndChange = (date) => {
        this.setState({
            endValue: date
        });
        this.props.onEndChange(date.valueOf());
    }

    /**
     * 不可选开始日期
     */
    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue) {
            return false;
        }
        // 没有结束时间
        if (!endValue) {
            // 可选当天
            const today = new Date(new Date().setHours(0, 0, 0, 0));
            return startValue.valueOf() < today.valueOf();
        }
        return startValue.valueOf() > endValue.clone().add(1, 'd').valueOf();
    }

    /**
     * 单独的日期选择器
     */
    disabledSingleStartDate = (value) => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        if (!value) {
            return false;
        }
        return value.valueOf() < today.valueOf();
    }

    /**
     * 不可选结束日期
     */
    disabledEndDate = (endValue) => {
        if (!endValue) {
            return false;
        }
        const startValue = this.state.startValue;
        // 没有结束日期
        if (!startValue) {
            const today = new Date(new Date().setHours(0, 0, 0, 0));
            return endValue.valueOf() < today.valueOf();
        }
        return endValue.valueOf() < startValue.clone().startOf('day').valueOf();
    }

    /**
     * @override
     */
    render() {
        const { startValue, endValue, endOpen } = this.state;
        const falseFlag = false;

        return (
            this.props.isRange ?
                <div className="course-date-picker">
                    <DatePicker
                        disabledDate={this.props.disabledDate || this.disabledStartDate}
                        format={CONFIG.MOMENT_DATE_FORMAT}
                        value={startValue}
                        showToday={false}
                        allowClear={false}
                        // showTime={{ format: CONFIG.HOUR_SECOND_FORMAT }}
                        showTime={falseFlag}
                        placeholder="请选择开始时间"
                        onChange={this.handleStartChange}
                        onOpenChange={this.handleStartOpenChange}
                        getCalendarContainer={triggerNode => triggerNode.parentNode}
                    />
                    至
                    <DatePicker
                        disabledDate={this.disabledEndDate}
                        // showTime={{ format: CONFIG.HOUR_SECOND_FORMAT }}
                        showTime={falseFlag}
                        format={CONFIG.MOMENT_DATE_FORMAT}
                        value={endValue}
                        showToday={false}
                        allowClear={false}
                        placeholder="请选择结束时间"
                        onChange={this.handleEndChange}
                        open={endOpen}
                        onOpenChange={this.handleEndOpenChange}
                        getCalendarContainer={triggerNode => triggerNode.parentNode}
                    />
                </div>
                :
                <div className="course-date-picker course-date-picker-single">
                    <DatePicker
                        disabledDate={this.props.disabledDate || this.disabledSingleStartDate}
                        // showTime={{ format: CONFIG.HOUR_SECOND_FORMAT }}
                        showTime={falseFlag}
                        format={CONFIG.MOMENT_DATE_FORMAT}
                        value={startValue}
                        showToday={false}
                        allowClear={false}
                        placeholder="请选择开始时间"
                        onChange={this.handleStartChange}
                        getCalendarContainer={triggerNode => triggerNode.parentNode}
                    />
                </div>
        );
    }
}