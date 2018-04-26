/**
 * 一对一优选签约-入口
 * @file hurry
 * @date 2017/04/10
 */
import React, { PropTypes } from 'react';
// import { browserHistory } from 'react-router';
import FailTips from 'spa/common/components/FailTips/index';
import TAppDownload from 'spa/common/components/TAppDownload/index';
require('css-loader!./index.styl');

class FailPage extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        reason: PropTypes.string.isRequired,
        serviceTitle: PropTypes.string.isRequired,
    };
    render() {
        return (
            <div className="sign-fail-page">
                <FailTips title={this.props.title} />
                <div className="body">
                    <p className="title">
                        {this.props.reason}
                    </p>
                    <p className="service">
                        {this.props.serviceTitle}
                    </p>
                </div>
                <TAppDownload />
            </div>
        );
    }
};

export default FailPage;