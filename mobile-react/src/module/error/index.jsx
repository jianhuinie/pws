/**
 * 404页面
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
import LazyLoadImage from 'gsx-design/component/lazyLoadImage/index';
require('css-loader!./index.styl');
let num = 3;

class errorContainer extends PageController {
    constructor(props) {
        super(props);
        this.state = {
            secondNum: num
        };
    };

    componentDidMount() {
        const self = this;
        LazyLoadImage.init();
        const timer = setInterval(function () {
            if (num > 0) {
                const secondNum = --num;
                self.setState({ secondNum });
            } else {
                location.href = '/mweb/discovery/';
            }
        }, 1000);
    }
    
    render() {
        const self = this;

        return (
            <div className="error-page">
                <div className="error-text">
                    <div>糟糕，页面潜水去了</div>
                    <div>等待 <span>{self.state.secondNum}</span> 秒返回微师首页</div>
                </div>
                <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a8961f975be2.png" />
            </div>
        );
    }
};

export default errorContainer;