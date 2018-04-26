import React from 'react';
import { createStore } from 'redux';
import Counter from './components/Counter';
import counter from './reducers/index';

const store = createStore(counter);

export default class CounterContainerDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: store.getState()
        };
    };
    // getInitialState: function () {
    //     return {
    //         value: store.getState()
    //     };
    // },
    componentDidMount() {
        store.subscribe(function () {
            this.setState({
                value: store.getState()
            });
        });
    }
    render() {
        return (
            <Counter
                value={this.state.value}
                onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
                onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
            />
        );
        // ReactDOM.render((
        //     <Counter
        //     value={store.getState()}
        //     onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
        //     onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
        //   />
        // ), document.getElementById('app'));
    }
};
