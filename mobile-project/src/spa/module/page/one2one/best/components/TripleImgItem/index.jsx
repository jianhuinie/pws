/**
 * 周年模板三个图片模板
 * @file leon
 */
import React from 'react';
const lazyLoadImage = require('common/lazyLoadImage');
require('css-loader!./index.styl');

class TripleImgItem extends React.Component {

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
        const imgArr = data.images;

        return (
            <div className="triple-img-item" onClick={self.jump.bind(self, data)}>
                <section>
                    <div className="container">
                        <h3 className="">{data.title}</h3>
                        <div className="list-image">
                            <ul className="">
                                <li className="">
                                    <img data-src={imgArr[0].url} />
                                </li>
                                <li className="">
                                    <img data-src={imgArr[1].url} />
                                </li>
                                <li className="">
                                    <img data-src={imgArr[2].url} />
                                </li>
                                <div className="clear"></div>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
export default TripleImgItem;