import React, { PropTypes } from 'react';

export default class CounterDemo extends React.Component {
    static propTypes = {
        value: PropTypes.number.isRequired,
        onIncreaseClick: PropTypes.func.isRequired
    }
    render() {
        const { value, onIncreaseClick } = this.props;
        return (
            <div>
                <span>{value}</span>
                <button onClick={onIncreaseClick}>Increase</button>
            </div>
        );
    }
};