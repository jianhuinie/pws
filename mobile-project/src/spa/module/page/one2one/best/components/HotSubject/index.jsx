/**
 * 一对一首页热门科目区域
 */

import React from 'react';
import { hashHistory } from 'react-router';
require('css-loader!./index.styl');

class HotSubject extends React.Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(value) {
        if (value && value.id) {
            if (value.child && value.child.length) {
                sessionStorage.setItem('scdSubject', JSON.stringify(value.child));
                hashHistory.push('one2one/best/se/scdSubject');
            } else {
                hashHistory.push('one2one/best/se/search?subject_id=' + value.id);
            }
        } else {
            hashHistory.push('one2one/best/se/subject');
        }
    }
                    
    render() {
        const self = this;
        const dataList = self.props.hotClassify;

        const subjectComponents = dataList.map(function (value, key) {
            return (<span className={key < 4 ? 'subject-item orange' : 'subject-item'} key={value.name} onClick={self.clickHandler.bind(self, value)}>
                        {value.name}
                    </span>);
        });

        return (
            <div className="subject_group clearfix">
                {subjectComponents}
            </div>
        );
    }
};

export default HotSubject;