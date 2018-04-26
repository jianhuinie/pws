import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';
const URL = require('util/url');
const UTIL = require('common/util');
const app = require('common/app');
require('css-loader!./index.styl');
class LessonWay extends React.Component {

    static propTypes = {
        callback: PropTypes.func.isRequired,
        lessonWayIndex: PropTypes.number.isRequired,
        lessonWayArray: PropTypes.array.isRequired,
        show: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
        const urlObj = UTIL.getHashParams();
        this.state = {
            index: this.props.lessonWayIndex,
            currentAddress: '',
            urlObj: urlObj
        };
        this.chooseAddress = this.chooseAddress.bind(self);
    }

    componentDidMount() {
        this.showAddress();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            index: +nextProps.lessonWayIndex,
            show: nextProps.show
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

    getCurrentAddress() {
        const self = this;
        const str = '暂时无法获取到定位';

        if (app.isStudentApp()) {
            Jockey.on('setLocation', function (res) {
                const position = {
                    coords: {
                        latitude: res.lat,
                        longitude: res.lng
                    }
                };
                onSuccess(position);
                Jockey.off('setLocation');
            });
            Jockey.send('getLocation');
        } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        } else {
            self.setState({
                currentAddress: str
            });
        }

        function onSuccess(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            const url = 'https://api.map.baidu.com/geocoder/v2/';
            const params = {
                location: lat + ',' + lng,
                output: 'json',
                ak: '2MrTdwjxa074wgqs6vhuWppfW57twsaB'
            };

            $.ajax({
                url: url,
                data: params,
                dataType: 'jsonp'
            }).done(function (res) {
                const detailAddress = res.result.formatted_address;
                self.setState({
                    currentAddress: detailAddress
                });
            });
        }

        function onError() {
            self.setState({
                currentAddress: str
            });
        }
    }

    showAddress() {
        const self = this;
        const urlAddress = self.state.urlObj.addressName;

        if (urlAddress) {
            self.setState({
                currentAddress: urlAddress
            });
        } else {
            self.getCurrentAddress();
        }
    }

    chooseLessonWay(item) {
        const data = {
            lessonWayName: item.name,
            value: +item.value
        };
        this.setState({
            index: +item.value
        });
        if (typeof this.props.callback === 'function') {
            this.props.callback(data);
        }
    }

    chooseAddress() {
        let hashVal = 'one2one/best/se/address';
        const urlStr = URL().hash.split('?')[1];

        if (urlStr) {
            hashVal += '?' + urlStr;
        }
        hashHistory.push(hashVal);
    }

    render() {
        const self = this;
        return (
            <div className={this.props.show ? 'lessonWay-content' : 'lessonWay-content hide'}>
                <div className="address" onClick={self.chooseAddress}>
                    <i className="icon-ditu"></i>
                    <span className="text">{self.state.currentAddress}</span>
                    <i className="icon-chevron-thin-right"></i>
                </div>

                <div className="lesson-way-content">
                    {
                        this.props.lessonWayArray.map(function (item, index) {
                            return (
                                <div
                                    className="item"
                                    onClick={self.chooseLessonWay.bind(self, item)}
                                    key={index}
                                >
                                    <span className={+self.state.index === +item.value ? 'text text-active' : 'text'}>{item.name}</span>
                                    <span className={+item.value === 2 ? 'recommend' : 'recommend hide'}>推荐</span>
                                    <i className={+self.state.index === +item.value ? 'icon-checkmark' : 'icon-checkmark hide'}></i>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default LessonWay;