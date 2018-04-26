/**
 * 一对一优选签约-头部banner
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
        firstTitle: PropTypes.string,
        secondTitle: PropTypes.string,
        thirdTitle: PropTypes.string
    };
    static defaultProps = {
        containerClass: '',
        imgUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/04/58ecbf7e7a091.png',
        firstTitle: '优选1对1',
        secondTitle: '现已公开招募老师啦',
        thirdTitle: '--INVITATION--'
    };
    componentDidMount() {
        lazyLoadImage.init();
    }
    render() {
        return (
            <div className={`recruit-home-header ${this.props.containerClass}`}>
                <img data-src={this.props.imgUrl} />
                <div>
                    <p className="first">{this.props.firstTitle}</p>
                    <p className="second">{this.props.secondTitle}</p>
                    <p className="third">{this.props.thirdTitle}</p>
                </div>
            </div>
        );
    }
};

export default Header;