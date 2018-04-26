import React from 'react';
import ui from 'gsx-design/component/ui';

export default class ReactDemo extends React.Component {
    componentDidMount() {
        ui.alert('test');
    }
    render() {
        return <div></div>;
    }
};