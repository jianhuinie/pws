import React from 'react';
import Loading from 'gsx-design/component/Loading/index';

export default class ReactDemo extends React.Component {
    constructor(props) {
        super(props);
        this.loading = new Loading();
        this.loading.show();
    };
    componentDidMount() {
        window.setTimeout(() => {
            this.loading.hide();
        }, 2000);
    }
    componentWillUnmount() {
        this.loading.destroy();
    }
    render() {
        return <div></div>;
    }
};