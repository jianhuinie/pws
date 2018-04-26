/**
 * 一对一优选招募-首页-优势
 * @file hurry
 * @date 2017/04/11
 */
import React, { PropTypes } from 'react';
require('css-loader!./index.styl');

class Item extends React.Component {
    static propTypes = {
        imgUrl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        subTitle: PropTypes.string.isRequired
    };
    render() {
        return (
            <div className="recruit-home-advantage-item">
                <img src={this.props.imgUrl} />
                <div className="item-desc">
                    <div className="title">{this.props.title}</div>
                    <div className="sub-title">{this.props.subTitle}</div>
                </div>
            </div>
        );
    }
};

export default Item;