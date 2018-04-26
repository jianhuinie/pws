/**
 * 发现首页科目选择
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
import Swiper from 'swiper';
require('css-loader!./index.styl');

class SubjectTab extends PageController {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    changeTab = (e) => {
        const self = this;
        const id = $(e.target).data('id');
        if (id && id !== self.props.id) {
            self.props.callbackParent(id);
        }
    }

    swiperFunc = () => {
        const swiper = new Swiper('.subject-container', {
            slidesPerView: 'auto',
            spaceBetween: 0,
            freeMode: true
        });
    };

    componentDidUpdate() {
        const self = this;
        self.swiperFunc();
    }

    render() {
        const self = this;
        const listComponet = self.props.tab.map(function (item) {
            const html = (
                <span 
                    className={`good-course-second-nav-item swiper-slide ${item.id === self.props.id && 'on'}`}
                    data-id={item.id}
                    data-name={item.name}
                    key={item.id}
                >
                    {item.name}
                </span>
            );
            return html;
        });

        return (
            <div className="subject-tab">
                <div className="subject-container good-course-swiper-container">
                    <div 
                        className="good-course-second-nav swiper-wrapper" 
                        onClick={self.changeTab}
                    >
                        {listComponet}
                    </div>
                </div>
            </div>
        );
    }
};

export default SubjectTab;