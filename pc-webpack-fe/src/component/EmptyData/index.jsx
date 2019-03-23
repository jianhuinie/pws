/**
 * 空数据展示
 * @author niejianhui
 */

import React from 'react';

import './index.styl';

export default function EmptyData(props) {
    const {text, btnText, skipUrl} = props;
    return (
        <div className="empty-data">
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2018/03/5abdf37f95aa2.png" alt="" />
            <div className="text">
                {text}
            </div>
            {btnText && (
                <a href={skipUrl} target="_blank">
                    {btnText}
                </a>
            )}
        </div>
    );
}
