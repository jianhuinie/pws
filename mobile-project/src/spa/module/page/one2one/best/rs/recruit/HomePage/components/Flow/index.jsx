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

function Rights() {
    return (
        <div className="recruit-home-rights">
            <StepTitle title="只需4步加入优选1对1" />
            {
                CONFIG.FLOW_ITEMS.map(function (item) {
                    return (
                        <Item
                            key={item.index}
                            index={item.index}
                            title={item.title}
                            subTitle={item.subTitle}
                        />
                    );
                })
            }
        </div>
    );
}

export default Rights;