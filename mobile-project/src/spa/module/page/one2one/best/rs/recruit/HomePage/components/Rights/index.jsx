/**
 * 一对一优选签约-协议
 * @file hurry
 * @date 2017/04/10
 */
import React from 'react';
import Item from './Item/index';
import StepTitle from '../StepTitle/index';
import CONFIG from '../../config';

function Rights() {
    return (
        <div className="home-rights">
            <StepTitle title="现在加入优选1对1" title2="您将会获得" />
            {
                CONFIG.RIGHTS_ITEMS.map(function (item) {
                    return (
                        <Item
                            key={item.key}
                            icon={item.icon}
                            title={item.title}
                        />
                    );
                })
            }
        </div>
    );
}

export default Rights;