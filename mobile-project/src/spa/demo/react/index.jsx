import React from 'react';
import Hello from './component';
const service = require('common/service');

export default class ReactDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
    }
    componentDidMount() {
        service
            .post('/area/list', {})
            .then((res) => {
                this.setState({
                    content: <div>{res.data[0].name}</div>
                });
                return;
            });
    }
    render() {
        return <Hello />;
    }
};