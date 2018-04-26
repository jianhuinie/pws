/**
 * 周年footer模板
 * @file leon
 */
import React from 'react';
require('css-loader!./index.styl');

class AnniversaryFooter extends React.Component {
    
    render() {
        const self = this;
        const data = self.props.item || {};
        const dataList = data.content || [];
        
        const textComponents = dataList.map(function (value) {
            return (
                <p className="" key={value.text}>
                    {value.text}
                </p>
            );
        });

        return (
            <div className="anniversary-footer-item">
                {textComponents}
            </div>
        );
    }
}
export default AnniversaryFooter;