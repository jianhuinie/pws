import React from 'react';
import CommonController from 'common/controller/CommonController';
import SlideInDialog from 'common/components/SlideInDialog/index';

export default class ReactDemo extends CommonController {
    constructor(props) {
        super(props);
        this.state = {
            isShowDialog: false
        };
    };
    componentDidMount() {
        const me = this;
        setTimeout(() => {
            me.setState({
                isShowDialog: true
            });
        }, 1000);
    }
    componentWillUnmount() {}
    render() {
        return (
            <SlideInDialog isShowDialog={this.state.isShowDialog}>
                <div>test</div>
            </SlideInDialog>
        );
    }
};