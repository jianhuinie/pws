import React from 'react';
import { Select } from 'antd';
require('css-loader!./index.styl');

export default function Selection(props) {
    const Option = Select.Option;
    return (
        <div className="selection">
            <Select 
                className="selection-content" 
                placeholder={props.placeholder} 
                dropdownClassName="seletion-content-item" 
                onChange={props.onSelectionChange} 
                getPopupContainer={triggerNode => triggerNode.parentNode}
                defaultValue={props.defaultValue}
            >
                {props.options.map((item) => {
                    return (
                        <Option value={item.id} key={item.id}>{item.name}</Option>
                    );
                })}
            </Select>
        </div>
    );
}
