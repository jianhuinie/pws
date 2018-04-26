/**
 * 富文本编辑器 title
 * @author niejianhui
 */
import React from 'react';
import PageController from 'common/controller/PageController';

require('css-loader!./index.styl');

class Title extends PageController {

    onTextChange = (e) => {
        const newVal = e.target.value;
        const self = this;
        self.props.onContentChange({
            index: self.props.index,
            curItem: {
                uniqueId: self.props.uniqueId,
                type: 'title',
                options: {
                    text: newVal
                }
            }
        });
    }

    onDeleteItem = (e) => {
        let flag = false;
        if (this.props.options.text) {
            flag = true;
        }
        this.props.onDeleteItem(+e.currentTarget.dataset.index, flag);
    }

    render() {
        const self = this;
        return (
            <div className="editor-title editor-item" data-index={self.props.index}>
            <i className="icon icon-item icon-text"></i>
                <input 
                    className="title-input"
                    value={self.props.options.text}
                    placeholder="编辑段落标题，最多10个字"
                    maxLength="10"
                    onChange={self.onTextChange}
                />
                <span 
                    type="close" 
                    className="icon-close" 
                    data-index={self.props.index} 
                    onClick={self.onDeleteItem}
                >
                </span>
            </div>
        );
    }
};

export default Title;