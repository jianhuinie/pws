/**
 * 一对一优选签约-协议
 * @file hurry
 * @date 2017/04/10
 */
import React, { PropTypes } from 'react';
require('css-loader!./index.styl');

class Step extends React.Component {
    static propTypes = {
        index: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        subTitle: PropTypes.string.isRequired
    };
    render() {
        return (
            <div className="recruit-home-flow-item">
                <div className="item-index">
                    <span>{this.props.index}</span>
                </div>
                <div className="title">{this.props.title}</div>
                <div className="sub-title">{this.props.subTitle}</div>
            </div>
        );
    }
};

export default Step;