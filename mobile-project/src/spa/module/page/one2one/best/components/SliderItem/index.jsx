/**
 * K12&留学页面轮播图模板
 */

import React from 'react';
const lazyLoadImage = require('common/lazyLoadImage');
const SlideImageControl = require('common/ui/slideImageControl/slideImageControl');
require('css-loader!./index.styl');

class SliderItem extends React.Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount() {
        const self = this;
        self.initSlider();
    }

    initSlider() {
        const cContain = $('.top-sliders-container');
        const bullets = cContain.find('.slide_position li');
        const curimage = new SlideImageControl(cContain[0], {
            auto: 3000,
            continuous: true,
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
        const dataList = self.props.item;

        const imgComponents = dataList.map(function (value, key) {
            return (
                <li className="slide" key={value.img} data-index={key}>
                    <div data-url={value.img} className="logClick showClick">
                        <img width="100%" height="100%" className="img" data-src={value.img} />
                    </div>
                </li>
            );
        });

        const positionComponents = dataList.map(function (item, index) {
            return (<li key={item.img} className={index ? '' : 'on'}><span></span></li>);
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

export default SliderItem;