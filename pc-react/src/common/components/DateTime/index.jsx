/**
 * 顶部banner
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
import Moment from 'moment';
require('css-loader!./index.styl');

class DateTime extends PageController {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    componentDidMount() {
        const self = this;
        console.log(self.props);
        $('.form_datetime').datetimepicker({
            language: 'zh-CN',
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            showMeridian: 1
        });
    }

    render() {
        const self = this;
        const initTime = Moment().format('YYYY-MM-DD HH:mm');
        console.log(initTime);
        return (
            <div className="date-time">
                <div className="input-group date form_datetime col-md-4 date-time-content" data-date={initTime} data-date-format="yyyy-mm-dd hh:ii" data-link-field={self.props.idName}>
                    <input className="form-control" size="16" type="text" value="" readOnly />
                    <span className="input-group-addon">
                        <span className="glyphicon glyphicon-remove"></span>
                    </span>
                    <span className="input-group-addon">
                        <span className="glyphicon glyphicon-th"></span>
                    </span>
                </div>
                <input type="hidden" id={self.props.idName} value="" /><br />
            </div>
        );
    }
};

export default DateTime;