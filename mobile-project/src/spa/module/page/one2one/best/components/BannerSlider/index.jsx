/**
 * 一对一首页顶部轮播图
 */

import React from 'react';
const lazyLoadImage = require('common/lazyLoadImage');
const SlideImageControl = require('common/ui/slideImageControl/slideImageControl');
require('css-loader!./index.styl');

class BannerSlider extends React.Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount() {
        console.log(123);
    }

    componentDidUpdate() {
        const self = this;
        self.initSlider();
    }

    /**
     * 初始化轮播数据
     * @param {Array} data 轮播数据
     */
    initSlider() {
        const cContain = $('.top-sliders-container');
        const bullets = cContain.find('.slide_group li');
        const curimage = new SlideImageControl(cContain[0], {
            auto: 3000,
            continuous: false,
            callback: lazyloadSlideImg
        });
        // 判断图片是否已经加载，并执行加载
        // 设置当前active的dot效果
        function lazyloadSlideImg(index) {
            const dom = curimage.slides[index];
            if (!dom.imageLoaded) {
                lazyLoadImage.init(dom);
                dom.imageLoaded = true;
            }
            bullets.removeClass('on');
            bullets.eq(index).addClass('on');
        }

        lazyloadSlideImg(curimage.get('index'));
    }

    clickHandler(value) {
        if (value && value.url) {
            window.location.href = value.url;
        }
    }
            
    render() {
        const self = this;
        const dataList = self.props.banner;

        const imgComponents = dataList.map(function (value, key) {
            return  <li className="slide" key={value.img} data-index={key} onClick={self.clickHandler.bind(self, value)}>
                        <div data-url={value.img} className="logClick showClick">
                            <img width="100%" height="100%" className="img" data-src={value.img} />
                        </div>
                    </li>;
        });

        const positionComponents = dataList.map(function (item, index) {
            return <li key={item.img} className={index ? '' : 'on'}><span></span></li>;
        });

        return (
            <div className="top-slider top-sliders-container myslider">
                <ul className="slide_group clearfix">
                    {imgComponents}
                </ul>
                <ul className="slide_position clearfix">
                    {positionComponents}
                </ul>
            </div>
        );
    }
};

export default BannerSlider;