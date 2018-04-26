import React from 'react';
import PageController from 'common/controller/PageController';
import PhoneVerify from '../../components/PhoneVerify/index';
import ui from 'gsx-design/component/ui';
import Util from 'common/util/util';

export default class StepTwo extends PageController {
    constructor(props) {
        super(props);
        this.handleSubmitSuccess = this.handleSubmitSuccess.bind(this);
    }

    componentDidMount() {
        document.title = '短信验证'; 
        Util.sharePage();
    }

    handleSubmitSuccess = () => {
        ui.alert('修改成功').done(() => {
            location.replace('/mweb/student/home');
        });
    }

    render() {
        return (
            <PhoneVerify
                onSubmitSuccess={this.handleSubmitSuccess}
            />
        );
    }
};
