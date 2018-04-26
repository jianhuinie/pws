import React from 'react';
import ReactDom from 'react-dom';
import StyleComponent from './Component';
require('css-loader!./main.styl');

// export default class StylDemo extends React.Component{
//     render() {
//         return <div className="test">styl</div>;
//     }
// };

// function StylDemo({ hello }) {
//     return <div className="test">{hello}</div>;
// }

function StyleDemo() {
    return (
        <StyleComponent
            classProp="test"
            content="style demo"
        />
    );
}

export default StyleDemo;