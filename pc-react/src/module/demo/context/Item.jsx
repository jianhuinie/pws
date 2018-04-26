import React, { PropTypes } from 'react';

export default class Item extends React.Component {
    static contextTypes = {
        name: PropTypes.string
    }
    render() {
        return <div>{this.context.name}</div>;
    }
};
