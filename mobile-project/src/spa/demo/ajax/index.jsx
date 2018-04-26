import React from 'react';
const service = require('common/service');

export default class AjaxDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            childDom: <span>hello</span>
        };
    }
    componentDidMount() {
        service
            .post('/area/list', {})
            .then((res) => {
                this.setState({
                    childDom: <div>{res.data[0].name}</div>
                });
            });
    }
    render() {
        return <div>{this.state.childDom}</div>;
    }
};

// AjaxDemo.propTypes = {
//     children: React.PropTypes.node
// };