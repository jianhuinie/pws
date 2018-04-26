import React from 'react';
import { Input } from 'antd';
require('css-loader!./index.styl');

export default function IntroTextArea(props) {
    const { TextArea } = Input;
    return (
        <div className="intro-text-area">
            <TextArea defaultValue={props.defaultValue} onChange={(e) => { props.onChange(props.seq, e.target.value); }} className="intro-text-area-input" />
            <a onClick={() => { props.onDelete(props.seq); }} className="intro-text-area-operate" ><span className="icon-Combined-Shape" /></a>
        </div>
    );
}