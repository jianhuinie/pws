import React from 'react';
import ui from 'gsx-design/component/ui';

export default class ReactDemo extends React.Component {
    componentDidMount() {
        ui.confirm('test').then(() => {
            ui.alert('点了确定');
        }, () => {
            ui.alert('点了取消');
        });
    }
    render() {
        return <div></div>;
    }
};