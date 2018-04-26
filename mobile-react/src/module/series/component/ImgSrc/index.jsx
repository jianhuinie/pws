/**
 * 图片组件
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
require('css-loader!./index.styl');

class ImgItem extends PageController {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

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
        } else {
            clsName = 'img-item';
        }

        return (
            <div className={clsName} onClick={self.jump}>
                <img className="" src={self.props.img} data-url={self.props.url} />
            </div>
        );
    }
};

export default ImgItem;