/**
 * 1对1优选签约-头部banner
 * @file hurry
 * @date 2017/04/10
 */
import React, { PropTypes } from 'react';
require('css-loader!./index.styl');
const lazyLoadImage = require('common/lazyLoadImage');

class Header extends React.Component {
    static propTypes = {
        containerClass: PropTypes.string,
        imgUrl: PropTypes.string,
        title: PropTypes.string
    };
    static defaultProps = {
        containerClass: '',
        imgUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/04/58eb402419b1d.png',
        title: '加入优选1对1'
    };
    componentDidMount() {
        lazyLoadImage.init();
    }
    render() {
        return (
            <div className={`sign-home-header ${this.props.containerClass}`}>
                <img data-src={this.props.imgUrl} />
                <span>{this.props.title}</span>
            </div>
        );
    }
};

export default Header;