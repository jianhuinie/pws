import React from 'react';
import SlideInDialog from 'gsx-design/component/SlideInDialog/index';

export default class ReactDemo extends React.Component {
    constructor(props) {
        super(props);
        this.slideInDialog = new SlideInDialog({
            content: '<div>test</div>'
        });
        this.slideInDialog.show();
    };
    componentDidMount() {
        // window.setTimeout(() => {
        //     this.slideInDialog.hide();
        // }, 2000);
    }
    componentWillUnmount() {
        this.slideInDialog.destroy();
    }
    render() {
        return <div></div>;
    }
};