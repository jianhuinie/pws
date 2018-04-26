/**
 * 权限管理模块
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
import SWIPER from 'swiper';
require('css-loader!./index.styl');
let swiper;

class Slider extends PageController {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    componentDidMount() {
        swiper = new SWIPER('.swiper-container', {
            direction: 'vertical',
            loop: true,
            pagination: '.swiper-pagination',
        });       
    }

    render() {
        const self = this;

        return (
            <div className="class-room">
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">Slide 1</div>
                        <div className="swiper-slide">Slide 2</div>
                        <div className="swiper-slide">Slide 3</div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        );
    }
};

export default Slider;