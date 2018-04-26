/**
 * 一对一搜索地址页面
 * @author leon
 */
import React from 'react';
import { hashHistory } from 'react-router';
import SearchAddress from 'spa/module/page/one2one/best/components/SearchAddress/index';
import PageController from 'spa/common/controller/PageController';

// const URL = require('util/url');
const UTIL = require('common/util');
const app = require('common/app');
const setShare = require('common/share/initialize');

class AddressContainer extends PageController {
    constructor(props) {
        super(props);
        this.state = {
            urlParams: UTIL.getHashParams()
        };
        this.choosedAddress = this.choosedAddress.bind(this);
    };

    componentDidMount() {
        setShare({
            title: '跟谁学『优选1对1』 - 名师个性化辅导',
            content: '400+城市覆盖，8000万家长信赖。全国优选老师，个性化学习方案，全程助教服务，带给你最好的学习体验。',
            img: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/590fa1bf33f1d.png',
            url: location.origin + '/webapp/#/one2one/best/se/detail'
        });
    }

    // getUrlParams() {
    //     const urlStr = URL().hash.split('?')[1];
    //     const dataObj = {};

    //     if (urlStr) {
    //         const urlArr = urlStr.split('&');
    //         $.each(urlArr, function (key, value) {
    //             const tempArr = value.split('=');
    //             dataObj[tempArr[0]] = decodeURIComponent(tempArr[1]);
    //         });
    //     }
    //     return dataObj;
    // }

    choosedAddress(item) {
        const self = this;
        let str = '';
        const newParamsObj = {};
        const Obj = {
            lat: item.location.lat,
            lng: item.location.lng,
            addressName: item.showAddressStr
        };
        $.extend(true, newParamsObj, self.state.urlParams);
        $.extend(true, newParamsObj, Obj);
        $.each(newParamsObj, function (key, value) {
            str += '&' + key + '=' + encodeURIComponent(value);
        });
        const hashValue = 'one2one/best/se/search?' + str.substr(1);
        hashHistory.push(hashValue);
    }

    render() {
        const self = this;

        app.setPageTitle('我的上课地址');

        return (
            <div className="">
                <SearchAddress callback={self.choosedAddress} />
            </div>
        );
    }
};

export default AddressContainer;