/**
 * @file 带有标签的图片
 * 
 * @author zhaoxiudan@baijiahulian.com
 */
import React from 'react';
require('css-loader!./index.styl');

export default function TagImage(props) {
    return (
        <div className="tag-image">
            <img src={props.url} alt="tag" className="tag-image-picture" />
            <span className="tag-image-text">{props.tag}</span>
        </div>
    );
}