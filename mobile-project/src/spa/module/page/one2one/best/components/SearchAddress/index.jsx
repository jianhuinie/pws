/**
 * 搜索地址输入框
 */

import React from 'react';
const uiNew = require('common/ui');
const app = require('common/app');
require('css-loader!./index.styl');

class SearchAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropdownList: 0,
            dropList: [],
            currentAddress: ''
        };
        this.getAddressList = this.getAddressList.bind(this);
        this.clearAddress = this.clearAddress.bind(this);
    }

    componentDidMount() {
        this.getCurrentAddress();
    }

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

    getAddressList() {
        const self = this;
        const val = $.trim(self.refs.myTextInput.value);
        const url = 'https://api.map.baidu.com/place/v2/suggestion';
        const params = {
            query: val,
            region: '全国',
            output: 'json',
            ak: '2MrTdwjxa074wgqs6vhuWppfW57twsaB'
        };
        
        if (val) {
            $.ajax({
                url: url,
                data: params,
                dataType: 'jsonp'
            }).done(function (res) {
                if (+res.status === 0) {
                    const dropList = res.result;
                    const addressArr = [];
                    if (dropList.length > 0) {
                        $.each(dropList, function (key, value) {
                            value.showAddressStr = value.city + value.district + value.name;
                            if (value.location) {
                                addressArr.push(value);
                            }
                        });
                        self.setState({
                            showDropdownList: 1,
                            dropList: addressArr
                        });
                    }
                } else {
                    uiNew.alert(res.message);
                }
            });
        }
    }

    clearAddress() {
        const self = this;

        self.refs.myTextInput.value = '';
        self.setState({
            showDropdownList: 0,
            dropList: []
        });
    }

    choosedAddress(item) {
        const self = this;
        self.setState({
            showDropdownList: 0,
            dropList: []
        });
        self.refs.myTextInput.value = item.showAddressStr;
        if (self.props.callback && typeof self.props.callback === 'function') {
            this.props.callback(item);
        }
    }
    
    render() {
        const self = this;
        const dataList = self.state.dropList;

        const addressComponents = dataList.map(function (item) {
            return (
                    <li className="subject-li" key={item.uid} onClick={self.choosedAddress.bind(self, item)}>
                        <div className="address">{item.name}</div>
                        <div className="area">{item.city}{item.district}</div>
                    </li>
            );
        });

        return (
            <div className="subject-box input-border">
                <input 
                    className="subject" type="text" name="subject-search"
                    required="required" ref="myTextInput"
                    maxLength="20" placeholder="请输入小区/大厦/学校等" onChange={self.getAddressList} />
                <div className="clear-address" onClick={self.clearAddress}>
                    <i className="icon-close"></i>
                </div>
                <div className="shadow"></div>
                <div className="current-address">
                    {self.state.currentAddress}
                    <span className="icon-ditu"></span>
                </div>
                <ul 
                    className={self.state.showDropdownList ? 'search-address' : 'search-address hide'} 
                    data-type="liudan">
                    {addressComponents}
                </ul>
            </div>
        );
    }
};

export default SearchAddress;