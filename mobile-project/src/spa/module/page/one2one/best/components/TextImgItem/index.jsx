/**
 * 周年模板左文字右图片模板
 * @file leon
 */
import React from 'react';
const lazyLoadImage = require('common/lazyLoadImage');
require('css-loader!./index.styl');

class TextImgItem extends React.Component {

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
        const data = self.props.item || {};

        return (
            <div className="text-img-item" onClick={self.jump.bind(self, data)}>
                <div className="container">
                    <div className="left-text">
                        <h3 className="">{data.title}</h3>
                        <h3 className={data.subtitle ? '' : 'hide'}>{data.subtitle}</h3>
                        <div className="subtitle">
                            <span className={data.content_type ? 'video' : 'video hide'}>{data.content_type}</span>
                            <span className="title">{data['abstract']}</span>
                        </div>
                    </div>
                    <div className="right-img">
                        <img data-src={data.url} />
                    </div>
                    <div className="clear"></div>
                </div>
            </div>
        );
    }
}
export default TextImgItem;