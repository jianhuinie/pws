/**
 * 二维码公众号关注组件
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
import EventProxy from 'common/eventProxy';
require('css-loader!./index.styl');

class QrcodeImg extends PageController {
    constructor(props) {
        super(props);
        this.state = {
            showQrcode: false,
        };
    };

    componentDidMount() {
        const self = this;
        EventProxy.on('showQrcode', function () {
            self.show();
        });
    }

    close = (e) => {
        const self = this;
        const ele = $(e.target);
        if (!ele.hasClass('qrcode-page-dialog-img')) {
            $('#app').removeClass('no-scroll-page');
            const showQrcode = false;
            self.setState({ showQrcode });
            if (self.props.callbackParent && typeof self.props.callbackParent) {
                self.props.callbackParent();
            }
        }
    }

    show = () => {
        const self = this;
        $('#app').addClass('no-scroll-page');
        const showQrcode = true;
        self.setState({ showQrcode });
    }
    
    render() {
        const self = this;

        return (
            <div 
                onClick={self.close} 
                className={self.state.showQrcode ? 'qrcode-page' : 'qrcode-page hide'}
            >
                <div className="qrcode-page-mask"></div>
                <div className="qrcode-page-dialog">
                    <img className="qrcode-page-dialog-img" src={self.props.img} />
                </div>
            </div>
        );
    }
};

export default QrcodeImg;