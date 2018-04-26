/**
 * 一对一优选签约-协议
 * @file hurry
 * @date 2017/04/10
 */
import React from 'react';
import Item from './Item/index';
import StepTitle from '../StepTitle/index';
import CONFIG from '../../config';
require('css-loader!./index.styl');

function Advantage() {
    return (
        <div className="recruit-home-advantage">
            <StepTitle title="优选1对1的优势" />
            {
                CONFIG.ADVANTAGE_ITEMS.map(function (item) {
                    return (
                        <Item
                            key={item.id}
                            imgUrl={item.url}
                            title={item.title}
                            subTitle={item.subTitle}
                        />
                    );
                })
            }
        </div>
    );
}

export default Advantage;