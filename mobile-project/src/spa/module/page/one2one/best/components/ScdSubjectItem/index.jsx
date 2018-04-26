/**
 * 一对一优选 -- 选择二三级科目
 * @file leon
 */
import React from 'react';
require('css-loader!./index.styl');
import { hashHistory } from 'react-router';


class ScdSubjectItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: {
                
            }
        };
    }

    clickHandler(item) {
        hashHistory.push('one2one/best/se/search?subject_id=' + item.id); 
    }
    
    render() {
        const self = this;
        const data = self.props.item;

        const subjectComponet = data.child.map(function (item) {
            return (<span className="item" key={item.name} onClick={self.clickHandler.bind(this, item)}>{item.name}</span>);
        });

        return (
            <div className="scd-subject-item">
                <div className="title">{data.name}</div>
                <div className="detail">
                    {subjectComponet}
                </div>
            </div>
        );
    }
}
export default ScdSubjectItem;