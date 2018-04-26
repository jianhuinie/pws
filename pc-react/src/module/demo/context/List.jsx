import React, { PropTypes } from 'react';
import Item from './Item';

export default class List extends React.Component {
    static childContextTypes = {
        name: PropTypes.string
    }
    getChildContext() {
        return {
            name: 'hurry'
        };
    }
    render() {
        return <Item></Item>;
    }
};
