import Swiper from 'swiper';
import React, { PropTypes } from 'react';
import PageController from 'common/controller/PageController';
require('css-loader!./index.styl');
export default class Carousel extends PageController {

    static propTypes = {
        images: PropTypes.array.isRequired,
        onSlideChange: PropTypes.func,
        initialSlide: PropTypes.number,
    }

    static defaultProps = { 
        initialSlide: 0,
        onSlideChange: () => {

        }
    }

    componentDidUpdate() {
        const me = this;
        this.swiper = new Swiper('.swiper-container', {
            initialSlide: me.props.initialSlide,
            // paginationClickable: true,
            autoplay: 3000,
            loop: true,
            pagination: '.swiper-pagination',
            onSlideChangeEnd: function (swiper) {
                const fun = me.props.onSlideChange;
                if (fun && typeof fun === 'function') {
                    fun(swiper.activeIndex);
                }
                // me.props.onSlideChange(swiper.activeIndex);
            }
        });
    }

    jump = (e) => {
        const url = $(e.target).data('url');
        if (url) {
            location.href = url;
        }
    }

    render() {
        const self = this;
        return (
            <div className="swiper-container" id="swiper-container">
                <div className="swiper-wrapper">
                    {
                        self.props.images.map((image) => {
                            return (
                                <div key={image.id} className="swiper-slide">
                                    <img 
                                        className="swiper-slide-img" 
                                        src={image.coverUrl} 
                                        data-url={image.clickUrl} 
                                        onClick={self.jump}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
                <div className="swiper-pagination"></div>
            </div>
        );
    }
};