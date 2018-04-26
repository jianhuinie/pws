import React from 'react';
require('css-loader!./index.styl');

export default function IntroImage(props) {
    return (
        <div className="intro-image">
            <img src={props.url} alt="tag" className="intro-image-picture" />
            <a onClick={() => { props.onDelete(props.seq); }} className="intro-image-delete"><span className="icon-carousel-delete"><span className="path1"></span><span className="path2"></span></span></a>
        </div>
    );
}