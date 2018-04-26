/**
 * K12&留学页面图片模板
 * @file leon
 */
import React from 'react';
const lazyLoadImage = require('common/lazyLoadImage');
require('css-loader!./index.styl');

class ImgItem extends React.Component {

    componentDidMount() {
        lazyLoadImage.init();
    }

    jump(data) {
        if (data && data.href) {
            window.location.href = data.href;
        }
    }
    
    render() {
        const self = this;
        const data = self.props.item;
        const baseWidth = 375;

        const screenWidth = $(window).width();

        const style = {
            height: (data.height * screenWidth / baseWidth) + 'px'
        };

        return (
            <div className="img-item" onClick={self.jump.bind(self, data)}>
                <img className="tpl-img" data-src={data.url} alt="" style={style} />
                <p className={data.under_title ? '' : 'hide'}>{data.under_title}</p>
            </div>
        );
    }
}
export default ImgItem;