/**
 * 周年文本模板
 * @file leon
 */
import React from 'react';
require('css-loader!./index.styl');

class TextItem extends React.Component {
    
    render() {
        const self = this;
        const data = self.props.item;

        return (
            <div className="text-item">
                <p>{data.content}</p>
            </div>
        );
    }
}
export default TextItem;