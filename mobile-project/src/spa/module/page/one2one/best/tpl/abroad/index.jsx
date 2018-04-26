/**
 * K12&留学页面
 * @author leon
 */
import React from 'react';
import CONFIG from './config';
// import { hashHistory } from 'react-router';
const service = require('common/service');
// import BannerSlider from 'spa/module/page/one2one/best/components/BannerSlider/index';
import ImgItem from 'spa/module/page/one2one/best/components/ImgItem/index';
import VideoItem from 'spa/module/page/one2one/best/components/VideoItem/index';
import FormItem from 'spa/module/page/one2one/best/components/FormItem/index';
import SliderItem from 'spa/module/page/one2one/best/components/SliderItem/index';
import FooterItem from 'spa/module/page/one2one/best/components/FooterItem/index';
import PageController from 'spa/common/controller/PageController';

const URL = require('util/url');
// const UI = require('common/ui');
const APP = require('common/app');
const setShare = require('common/share/initialize');
require('css-loader!./index.styl');
const shareInfo = {
    url: location.href,
    content: '400+城市覆盖，8000万家长信赖。全国优选老师，个性化学习方案，全程助教服务，带给你最好的学习体验。',
    img: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/590fa1bf33f1d.png',
    title: '跟谁学 - 找好老师，上跟谁学'
};

class abroadContainer extends PageController {
    constructor(props) {
        super(props);
        this.state = {
            title: '跟谁学 - 找好老师，上跟谁学',
            type: this.getUrlParams().type || 'k12',
            tplInfo: []
        };
    };

    componentDidMount() {
        const self = this;
        
        const params = {
            type: self.state.type
        };

        service.post(CONFIG.PATHS.GETTPL, params)
            .then(function (res) {
                if (+res.code === 0) {
                    const resData = res.data;
                    self.setState({
                        title: resData.title,
                        tplInfo: resData.tpl_info
                    });

                    const newShareInfo = resData.share_info || shareInfo;
                    setShare({
                        title: newShareInfo.title,
                        content: newShareInfo.content,
                        img: newShareInfo.img,
                        url: location.href
                    });
                }
            });
    }


    getUrlParams() {
        const urlStr = URL().hash.split('?')[1];
        const dataObj = {};

        if (urlStr) {
            const urlArr = urlStr.split('&');
            $.each(urlArr, function (key, value) {
                const tempArr = value.split('=');
                dataObj[tempArr[0]] = decodeURIComponent(tempArr[1]);
            });
        }
        return dataObj;
    }

    render() {
        const self = this;

        APP.setPageTitle(self.state.title);

        const listComponet = this.state.tplInfo.map(function (item, index) {
            const listType = item.type;
            let listShow = null;
            const keyVal = 'img' + index;

            switch (listType) {
                case 'image':
                    listShow = (<ImgItem key={keyVal} item={item} />);
                    break;
                case 'form':
                    listShow = (<FormItem key={keyVal} item={item} />);
                    break;
                case 'slider':
                    listShow = (<SliderItem key={keyVal} item={item.imgs} />);
                    break;
                case 'video':
                    listShow = (<VideoItem key={keyVal} item={item} />);
                    break;
                default:
                    ;
            }
            return listShow;
        });

        return (
            <div className="one2one-tpl">
                {listComponet}
                <FooterItem title="预约名师1对1" classEle="abroad-post" />
            </div>
        );
    }
};

export default abroadContainer;