/**
 * 课程页面详情和目录tab
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
require('css-loader!./index.styl');

class CourseTab extends PageController {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    clickTab = (e) => {
        const self = this;
        const ele = $(e.target);

        if (ele.hasClass('tab-name') && !ele.hasClass('active')) {
            self.props.callbackParent(ele.data('index'));
        }
    }

    render() {
        const self = this;

        return (
            <div className="course-tab" onClick={self.clickTab}>
                <div className="course-tab-item">
                    <span data-index="1" className={self.props.tab === 1 ? 'tab-name active' : 'tab-name'}>课程详情</span>
                </div>
                <div className="course-tab-item">
                    <span data-index="2" className={self.props.tab === 2 ? 'tab-name active' : 'tab-name'}>目录</span>
                </div>
            </div>
        );
    }
};

export default CourseTab;