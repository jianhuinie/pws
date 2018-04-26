/**
 * 图片组件
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
import LazyLoadImage from 'gsx-design/component/lazyLoadImage/index';
require('css-loader!./index.styl');

class ImgItem extends PageController {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    componentDidMount() {
        LazyLoadImage.init();
    }

    componentDidUpdate() {
        LazyLoadImage.init();
    }

    jump = (e) => {
        const ele = $(e.target);
        const url = ele.data('url');
        if (url) {
            location.href = url;
        }
    }

    render() {
        const self = this;
        let clsName;
        if (!self.props.img) {
            clsName = 'hide';
        } else if (self.props.isCourse) {
            clsName = 'img-item course-detail-content-item';
        } else {
            clsName = 'img-item';
        }

        if (self.props.isTop) {
            clsName += ' page-top-img';
        }

        return (
            <div className={clsName} onClick={self.jump}>
                <img className="" data-src={self.props.img} data-url={self.props.url} />
            </div>
        );
    }
};

export default ImgItem;