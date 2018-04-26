/**
 * 一对一优选 -- 顶导
 * @file leon
 */
import React from 'react';
const navBar = require('common/navBar');
const lazyLoadImage = require('common/lazyLoadImage');
require('css-loader!./index.styl');

class TopBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        lazyLoadImage.init();
        navBar.init();
    }
    
    render() {
        const self = this;
        const changeCityUrl = location.origin + '/static/changeCity'
                            + '?redirectUrl=' + encodeURIComponent(location.href);
        
        return (
            <div className={self.props.isShow ? 'one-top-bar' : 'one-top-bar hide'}>
                <div className="change-city">
                    <div className="top-bar-logo">
                        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/04/5902a4d0a855c.png" />
                    </div>
                    <a href={changeCityUrl}>
                        <span>{self.props.cityName}</span>
                        <span className="staticv2_index icon-angle-down"></span>
                    </a>
                </div>
                <span className="menu-nav-button">
                    <i className="icon icon-menu"></i>
                </span>
            </div>
        );
    }
}
export default TopBar;