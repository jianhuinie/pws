import React from 'react';
import service from 'common/util/ajaxService';

export default class AjaxDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            childDom: <span>hello</span>
        };
    }
    componentDidMount() {
        service
            .post('/area/list', {
                id: 11
            })
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