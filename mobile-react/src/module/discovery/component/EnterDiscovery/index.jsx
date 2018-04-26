/**
 * 发现首页刚进入页面
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
import LazyLoadImage from 'gsx-design/component/lazyLoadImage/index';
import LivingAnimation from 'common/components/LivingAnimation/index';
require('css-loader!./index.styl');

class enterDiscoveryContainer extends PageController {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    componentDidMount() {
        const self = this;
        if (self.props.show) {
            LazyLoadImage.init();
        }
    }

    render() {
        const self = this;

        return (
            <div className={self.props.show ? 'enter-discovery' : 'enter-discovery hide'}>
                {/* <div id="live-area">
                    <LivingAnimation isMain />
                </div> */}
                <div className="logo">
                    <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a587be58971a.png" />
                </div>
            </div>
        );
    }
};

export default enterDiscoveryContainer;