/**
 * 阿里云图片裁剪
 * @author niejianhui
 * props.width 图片展示宽度  必选
 * props.height 图片展示高度  必选
 * props.imgSrc 图片url   必选
 * props.domClass 图片类名
 * props.cropParams {} 裁剪参数  不传用默认值
 * props.cropParams.e 缩放优先边 0 长边  1 短边  默认1
 * 如原图200 * 400（比例1:2），需要缩放为100 * 100（比例1:1）.长边优先时，缩放为50 100；短边优先时(e=1)，缩放为`100 200`
 * props.cropParams.c 是否进行裁剪  0不裁剪  1裁剪  默认1
 * props.cropParams.o 是否进行旋转  0不旋转  1先缩略再旋转 2先旋转再缩略 默认0
 * props.cropParams.Q 决定图片的绝对质量 取值 1-100
 * 把原图质量压到Q%，如果原图质量小于指定数字，则不压缩。如果原图质量是100%
 * 如果原图质量是80%，使用“90Q”不会压缩，返回质量80%的原图。
 * props.cropParams.x 放大倍数 默认1
 * props.cropParams.i  这个暂时没找到文档  默认0
 * cropParams一般用默认值就好了
 */

import {PureComponent} from 'react';
import $ from 'jquery';

class CropImage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {
            width,
            height,
            domClass,
            isLazyLoad,
            cropParams,
        } = this.props;
        const defaultCropParams = {
            e: 1,
            c: 1,
            o: 0,
            Q: 90,
            x: 1,
            i: 0
        };
        // 是否支持阿里云裁剪
        function isSupportALiYunParams(imgSrc) {
            return imgSrc.indexOf('gsxservice') !== -1
                || imgSrc.indexOf('genshuixue') !== -1
                || imgSrc.indexOf('baijiayun') !== -1;
        }

        // 获取裁剪后的图片src
        function getCropedImgSrc(imgSrc, cropParams) {
            const arr = imgSrc.split('.');
            let extendName = arr[arr.length - 1];
            if (extendName === 'gif') {
                extendName = 'jpg';
            }
            return imgSrc
                + '@'
                + cropParams.e
                + 'e_'
                + width
                + 'w_'
                + height
                + 'h_'
                + cropParams.c
                + 'c_'
                + cropParams.i
                + 'i_'
                + cropParams.o
                + 'o_'
                + cropParams.Q
                + 'Q_'
                + cropParams.x
                + 'x.'
                + extendName;
        }

        const newCropParams = Object.assign(true, {}, defaultCropParams, cropParams || {});
        let imgSrc = this.props.ImgSrc;

        if (imgSrc && isSupportALiYunParams(imgSrc)) {
            imgSrc = getCropedImgSrc(imgSrc, newCropParams, width, height);
        }

        return (
            <img className={domClass || ''} src={isLazyLoad ? '' : imgSrc} data-src={imgSrc} alt="" />
        );
    }
}
export default CropImage;
