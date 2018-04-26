/**
 * 一对一优选签约-头部banner
 * @file hurry
 * @date 2017/04/11
 */
import React, { PropTypes } from 'react';
require('css-loader!./index.styl');

const APP_ICON = {
    0: '',
    1: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/04/58eb7e93724d7.png',
    2: ''
};

class Header extends React.Component {
    static propTypes = {
        containerClass: PropTypes.string,
        // app类型：0-学生，1-老师，2-机构
        type: PropTypes.number
    };
    static defaultProps = {
        containerClass: '',
        type: 1
    };
    render() {
        return (
            <div className={`app-icon ${this.props.containerClass}`}>
                <img src={APP_ICON[this.props.type]} />
            </div>
        );
    }
};

export default Header;