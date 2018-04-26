/**
 * 购买须知
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
require('css-loader!./index.styl');

class PurchaseTip extends PageController {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    render() {
        const self = this;
        let text = '该课程为付费课，购买后可反复学习';
        if (self.props.isSeries) {
            text = '该课程为付费系列课，将按计划定期更新，每节课可在开课时学习，也可反复温习';
        }
        return (
            <div className={self.props.show ? 'course-purchase-tip' : 'course-purchase-tip hide'}>
                <div className="course-purchase-tip-title">购买须知</div>
                <div className="course-purchase-tip-text">1. {text}</div>
                <div className="course-purchase-tip-text">2. 购买课程后，关注“微师”公众号，可在菜单【已购课程】里查看课程</div>
                <div className="course-purchase-tip-text">3. 该课程为虚拟内容服务，购买成功后概不退款，敬请谅解</div>
            </div>
        );
    }
};

export default PurchaseTip;