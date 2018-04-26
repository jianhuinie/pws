/**
 * 支付成功页面
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
import Url from 'gsx-design/util/url';
import AJAXCONFIG from 'common/ajaxConfig';
import AJAXSERVICE from 'common/util/ajaxService';
import EventProxy from 'common/eventProxy';
import QrcodeImg from 'module/components/QrcodeImg/index';
// import Ui from 'gsx-design/component/ui';
import Util from 'common/util/util';
require('css-loader!./index.styl');

class paySuccessContainer extends PageController {
    constructor(props) {
        super(props);
        this.state = {
            qrcodeImg: '',
        };
    };

    componentDidMount() {
        const self = this;
        const params = Url().params;
        if (params.classId) {
            self.getQrcodeImg();
        }
        Util.sharePage();
    }

    getQrcodeImg = () => {
        const self = this;
        const paramsObj = Url().params;
        const params = {
            classId: paramsObj.classId,
            courseId: paramsObj.id,
            courseMode: paramsObj.courseMode,
            followType: 3
        };
            
        AJAXSERVICE.post(AJAXCONFIG.CLASSROOM.GET_QRCODE, params).then(function (res) {
            if (res && res.code === 200) {
                const qrcodeImg = res.data.qrcodeUrl;
                self.setState({ qrcodeImg });
                EventProxy.trigger('showQrcode');
                // Ui.alert({
                //     content: '<img src="' + publicQrcodeUrl + '">',
                // });
            }
        });
    }

    jump = () => {
        const params = Url().params;
        const id = params.id;
        const mode = +params.mode;

        if (mode === 1) {
            location.href = '/mweb/single/?id=' + id;
        } else if (mode === 2) {
            location.href = '/mweb/series/?id=' + id;
        }
    }

    render() {
        const self = this;

        return (
            <div className="pay-success-page">
                <div className="success-icon">
                    <i className="icon icon-success-o"></i>
                </div>
                <div className="pay-success-text">购买成功</div>
                <div className="view-purchase-text">可在【个人中心】-【购买记录】里查看</div>
                <div className="enter-study-btn" onClick={self.jump}>点击进入学习</div>
                <QrcodeImg 
                    img={self.state.qrcodeImg}
                />
            </div>
        );
    }
};

export default paySuccessContainer;