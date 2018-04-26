/**
 * 一对一优选招募-首页-权益
 * @file hurry
 * @date 2017/04/11
 */
import React, { PropTypes } from 'react';
const lazyLoadImage = require('common/lazyLoadImage');
require('css-loader!./index.styl');

class Item extends React.Component {
    static propTypes = {
        icon: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    };
    componentDidMount() {
        lazyLoadImage.init();
    }
    render() {
        return (
            <div className="recruit-home-rights-item">
                <img data-src={this.props.icon} />
                <p>{this.props.title}</p>
            </div>
        );
    }
};

export default Item;