import React from 'react';

class StylComponent extends React.Component {
    static propTypes = {
        classProp: React.PropTypes.string.isRequired,
        content: React.PropTypes.string.isRequired
    };
    render() {
        return <div className={this.props.classProp}>{this.props.content}</div>;
    }
};

export default StylComponent;