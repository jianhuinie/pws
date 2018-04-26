import React from 'react';
import PageController from 'common/controller/PageController';
import PhoneVerify from '../../../components/PhoneVerify/index';
import ajax from 'common/util/ajaxService';
import ajaxConfig from 'common/ajaxConfig';
import Loading from 'gsx-design/component/Loading/index';
import Url from 'gsx-design/util/url';
// import Util from 'common/util/util';
const url = Url();
export default class StepTwo extends PageController {

    constructor(props) {
        super(props);
        this.state = {
            headUrl: '',
            name: '',
            intro: '',
            headStorageId: null,
            nameValid: false,
            submiting: false
        };
        this._hackIos();
        this.loading = new Loading();
        this.loading.show();
    }

    componentDidMount() {
        document.title = '短信验证';
        ajax.get(ajaxConfig.USER.GET_USER).then((res) => {
            const { isTeacher } = res.data.user;
            // const { classId } = res.data.classroom;
            const classId = res.data.classroom && res.data.classroom.classId;
            this.loading.hide();
            if (isTeacher) {
                location.replace(`/mweb/classroom?id=${classId}`);
            }
        });
        // Util.sharePage();
    }

    handleSubmitSuccess = () => {
        url.hash = '#/step-three';
        location.href = url.toString();
    }

    /**
     * 解决ios在返回上一页面时，页面不自动刷新的问题
     */
    _hackIos() {
        window.onpageshow = function (event) {
            if (event.persisted) {
                window.location.reload();
            }
        };
    }

    render() {
        return (
            <PhoneVerify
                submitLabel="下一步"
                onSubmitSuccess={this.handleSubmitSuccess}
            />
        );
    }
};
