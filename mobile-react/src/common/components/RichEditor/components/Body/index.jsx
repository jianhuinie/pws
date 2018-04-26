/**
 * 富文本编辑器 body
 * @author niejianhui
 */
import React from 'react';
import PageController from 'common/controller/PageController';

require('css-loader!./index.styl');

class Body extends PageController {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            fontWeight: 'normal',
            fontSize: '15px',
            textAlign: 'left',
            color: '#000000'
        };
    };

    componentDidMount() { 
        const self = this;
        if (self.props.options.text) {
            const options = this.props.options;
            self.setState({
                text: options.text,
                fontWeight: options.fontWeight,
                fontSize: options.fontSize,
                textAlign: options.textAlign,
                color: options.color
            });
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.options.text !== self.props.options.text) {
    //         this.setState({
    //             text: nextProps.options.text
    //         });
    //     }
    // }

    onContentChange = (key, val) => {
        const self = this;
        const obj = {
            text: self.state.text,
            fontWeight: self.state.fontWeight,
            fontSize: self.state.fontSize,
            textAlign: self.state.textAlign,
            color: self.state.color
        };
        obj[key] = val;
        self.props.onContentChange({
            index: self.props.index,
            curItem: {
                uniqueId: self.props.uniqueId,
                type: 'body',
                options: obj
            }
        });
    }


    onTextChange = (e) => {
        const newVal = e.target.value;
        const self = this;
        self.setState({
            text: newVal
        });
        self.onContentChange('text', newVal);
    }

    onColorChange = (e) => {
        const self = this;
        const color = e.target.dataset.color;
        if (color && color !== self.state.color) {
            self.setState({
                color
            });
            self.onContentChange('color', color);
        }
    }

    setTextAlign = (e) => {
        const self = this;
        const align = e.target.dataset.align;
        if (align && align !== self.state.textAlign) {
            self.setState({
                textAlign: align
            });
            self.onContentChange('textAlign', align);
        }
    }

    setFontWeight = () => {
        const self = this;
        let fontWeight = self.state.fontWeight;
        if (fontWeight === 'bold') {
            fontWeight = 'normal';
        } else {
            fontWeight = 'bold';
        }
        self.setState({
            fontWeight
        });
        self.onContentChange('fontWeight', fontWeight);
    }

    setFontSize = () => {
        const self = this;
        let fontSize = self.state.fontSize;
        if (fontSize === '17px') {
            fontSize = '15px';
        } else {
            fontSize = '17px';
        }
        self.setState({
            fontSize
        });
        self.onContentChange('fontSize', fontSize);
    }

    onDeleteItem = (e) => {
        let flag = false;
        if (this.state.text) {
            flag = true;
        }
        this.props.onDeleteItem(+e.currentTarget.dataset.index, flag);
    }


    render() {
        const self = this;
        const colorClassMap = {
            '#000000': 'black',
            '#999999': 'grey',
            '#FC5C5A': 'pink',
            '#FF6C00': 'yellow',
            '#0F86E8': 'blue',
            '#43B244': 'green',
            '#3D618A': 'brown',
            '#9900CC': 'purple'
        };
        return (
            <div className="editor-body editor-item" data-index={self.props.index}>
                <i className="icon icon-item icon-text-o"></i>
                <textarea 
                    className={(colorClassMap[self.state.color]) + (self.state.fontWeight === 'bold' ? ' font-bold' : '') 
                    + (self.state.fontSize === '17px' ? ' font-big' : '') + (self.state.textAlign === 'center' ? ' align-center' : '')}
                    type="textarea"
                    value={self.state.text}
                    placeholder="编辑正文"
                    onChange={self.onTextChange}
                >
                </textarea>
                <span 
                    className="icon-close" 
                    data-index={self.props.index} 
                    onClick={self.onDeleteItem}
                >
                </span>
                <div className="style-toolbar">
                    <span 
                        className={'toolbar-item icon-bold' + (self.state.fontWeight === 'bold' ? ' active' : '')}
                        onClick={self.setFontWeight}>
                        
                    </span>
                    <span 
                        className={'toolbar-item icon-font' + (self.state.fontSize === '17px' ? ' active' : '')}
                        onClick={self.setFontSize}>
                        
                    </span>
                    <span 
                        className={'toolbar-item icon-align-left' + (self.state.textAlign === 'left' ? ' active' : '')}
                        data-align="left"
                        onClick={self.setTextAlign}>
                        
                    </span>
                    <span 
                        className={'toolbar-item icon-align-center' + (self.state.textAlign === 'center' ? ' active' : '')}
                        data-align="center"
                        onClick={self.setTextAlign}>
                        
                    </span>
                    <ul className="color-list" onClick={self.onColorChange}>
                        <li 
                            className={'color-item black' + (self.state.color === '#000000' ? ' active' : '')}
                            data-color="#000000">
                        </li>
                        <li 
                            className={'color-item grey' + (self.state.color === '#999999' ? ' active' : '')}
                            data-color="#999999">
                        
                        </li>
                        <li 
                            className={'color-item pink' + (self.state.color === '#FC5C5A' ? ' active' : '')}
                            data-color="#FC5C5A">
                        </li>
                        <li 
                            className={'color-item yellow' + (self.state.color === '#FF6C00' ? ' active' : '')}
                            data-color="#FF6C00">
                        </li>
                        <li 
                            className={'color-item blue' + (self.state.color === '#0F86E8' ? ' active' : '')}
                            data-color="#0F86E8">
                        </li>
                        <li 
                            className={'color-item green' + (self.state.color === '#43B244' ? ' active' : '')}
                            data-color="#43B244">
                        </li>
                        <li 
                            className={'color-item brown' + (self.state.color === '#3D618A' ? ' active' : '')}
                            data-color="#3D618A">
                        </li>
                        <li 
                            className={'color-item purple' + (self.state.color === '#9900CC' ? ' active' : '')}
                            data-color="#9900CC">
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
};

export default Body;