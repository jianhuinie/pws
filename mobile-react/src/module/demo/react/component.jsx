import React, { PropTypes } from 'react';

// const ReactComponentDemo = React.createClass({
//     // propTypes: {
//     //     value: PropTypes.string.isRequired
//     // },
//     getDefaultProps: function () {
//         return {
//             value: 'default value'
//         };
//     },
//     render: function () {
//         return <h1>{this.props.value}</h1>;
//     }
// });

class ReactComponentDemo extends React.Component {
    static propTypes = {
        value: PropTypes.string
    };
    static defaultProps = {
        value: 'default value'
    };
    render() {
        return <h1>{this.props.value}</h1>;
    }
};

// ReactComponentDemo.propTypes = {
//     value: PropTypes.string.isRequired
// };

// ReactComponentDemo.defaultProps = {
//     value: 'default value'
// };

export default ReactComponentDemo;