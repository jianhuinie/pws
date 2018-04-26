/**
 * @file品宣留单
 * @author hurry
 * @date 2016/5/30
 */
import config from '../../../utils/config.js';
import util from '../../../utils/util.js';

const PATHS = config.PATHS;
const app = getApp();

Page({
    data: {
        // 要保存的数据
        saveDataParams: {
            user_name: '',
            course_name: '',
            mobile: '',
            from: 'xiaochengxu'
        },
        sendSMSParams: {
            type: config.TYPE,
            captcha: '',
            is_voice: 0,
            captcha_name: config.TYPE,
            captcha_uniq_id: ''
        },
        type: 'k12',
        subject1Index: -1,
        subject2Index: -1,
        subject1List: [],
        subject2List: [],
        tpl_info: {},
        share_info: {},
        toView: '',
        // 获取验证码
        sendSMSCodeTip: '获取验证码',
        isHiddenBottom: true,
        isShowSMSCode: false,
        isShowVideo: false,
        autoplay: false
    },
    onLoad: function (opt) {
		var me = this;
        me.setData({
            type: opt.type || 'k12'
        });
        wx.request({
            url: config.SERVER_HOST + PATHS.GET_ORDER_INDEX,
            method: 'GET',
            data: {
                type: me.data.type
            },
            success: function (res) {
                var dt = res.data.data;
                var tplInfo = dt.tpl_info;
                me.setData({
                    tpl_info: tplInfo
                });
                me.setData({
                    share_info: dt.share_info
                });
                for (var i = 0, item; item = tplInfo[i++];) {
                    if (item.type === 'form') {
                        me.setData({
                            subject1List: item.subjects
                        });
                        break;
                    }
                }
                wx.setNavigationBarTitle({
                    title: dt.title
                });
            },
            fail: function (err) {
                wx.showModal({
                    title: '提示',
                    content: err,
                });
            }
        });

		wx.setNavigationBarTitle({
			title: '找好老师，上跟谁学'
	    });
		app.getUserInfo(function (userInfo){
			// 更新数据
            me.setData({
                'saveDataParams.user_name': userInfo.nickName
            });
            debugger;
            wx.request({
                url: PATHS.PV0,
                method: 'GET',
                data: {
                    page_str: '/xiaochengxu/liudan@nickName=' + userInfo.nickName + '@province=' + userInfo.province + '@city=' + userInfo.city
                }
            });
			console.log(userInfo);
		});
        wx.getSystemInfo({
            success: function (res) {
                me.setData({
                    pixelRatio: res.pixelRatio
                });
                me.setData({
                    screenHeight: res.screenHeight * 2,
                    contentHeight: res.screenHeight * 2 + 100,
                    isIOS: res.system.toUpperCase().indexOf('IOS') > -1
                });
            }
        });
	},
    onShareAppMessage: function () {
        var shareInfo = this.data.share_info;
        return {
            title: shareInfo.title,
            path: '/pages/findTeacher/order/index?type=k12'
        };
    },
    onPlay: function () {
        debugger;
        this.setData({
            isShowVideo: true,
            autoplay: true
        });
    },
    // 获取短信验证码
    bindSMSCodeTap: function (e) {
        this.sendSMSCode(e);
    },
    sendSMSCodeValidator: function () {
        const me = this;
        if (me.data.isGetSMSCode) {
            return;
        }
        var mobile = +me.data.saveDataParams.mobile;
        if (!mobile) {
            wx.showModal({
                title: '提示',
                content: '手机号不能为空',
                showCancel: false
            });
            return;
        }
        if (!/\d{11}/.test(mobile)) {
            wx.showModal({
                title: '提示',
                content: '请输入11位数字的手机号',
                showCancel: false
            });
            return;
        }
        return true;
    },
    // 图片验证码
    bindCaptchaKeyInput: function (e) {
        const me = this;
        const val = util.toSBC(e.detail.value);
        if (val.length === 4 && !/^[a-zA-Z0-9]{4}$/.test(val)) {
            wx.showModal({
                title: '提示',
                content: '只能输入字母和字符，当前输入为:' + val,
                showCancel: false
            });
            return;
        }
        this.setData({
            'sendSMSParams.captcha': val,
            'sendSMSParams.captcha_name': this.data.sendSMSParams.type
        });
        if (val.length === config.CAPTCHA_LENGTH) {
            me.sendSMSCode();
        }
    },
    // 显示
    showPicCaptcha: function () {
        this.setData({
            isPicCaptchaValidate: false,
            isShowPicCaptcha: true,
            captchaUrl: ''
                + config.SERVER_HOST
                + PATHS.CAPTCHA
                + '?captcha_name=' + config.TYPE
                + '&captcha_uniq_id=' + this.data.sendSMSParams.captcha_uniq_id
                + '&' + new Date().getTime()
        });
    },
    sendSMSCode: function () {
        const me = this;
        if (!me.sendSMSCodeValidator()) {
            return;
        }
        let timeRange = 59;
        me.setData({
            isGetSMSCode: true
        });
        const timer = setInterval(() => {
            if (timeRange <= 0) {
                me.setData({
                    isGetSMSCode: false,
                    sendSMSCodeTip: '重新发送'
                });
                clearInterval(timer);
            } else {
                me.setData({
                    sendSMSCodeTip: '重新发送(' + timeRange-- + 's)'
                });
            }
        }, 1000);
        me.setData({
            'sendSMSParams.mobile': this.data.saveDataParams.mobile
        });
        wx.request({
            url: config.SERVER_HOST + PATHS.SMS_CODE,
            data: this.data.sendSMSParams,
            method: 'POST',
            dataType: 'json',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            success: function (res) {
                const dt = res.data;
                if (dt.code !== 0) {
                    wx.showModal({
                        title: '提示',
                        content: dt.msg,
                        showCancel: false
                    });
                    me.setData({
                        isGetSMSCode: false,
                        sendSMSCodeTip: '获取验证码'
                    });
                    if (dt.code === 1000111) {
                        me.getCaptchaUniqId(me.getNewCaptcha.bind(me, timer));
                    }
                    if (dt.code === 110056) {
                        me.getNewCaptcha(timer);
                    }
                }
            }
        });
    },
    getNewCaptcha: function (timer) {
        const me = this;
        me.showPicCaptcha()
        clearInterval(timer);
    },
    getCaptchaUniqId: function (cb) {
        const me = this;
        wx.request({
            url: config.SERVER_HOST + PATHS.CAPTCHA_START,
            dataType: 'json',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            success: function (res) {
                const dt = res.data;
                if (dt.code === 0) {
                    me.setData({
                        'sendSMSParams.captcha_uniq_id': dt.data.captcha_uniq_id
                    });
                    cb();
                }
            }
        });
    },
    bindSubject1Change: function (e) {
        var me = this;
        var dt = me.data;
        var index = +e.detail.value;
        me.setData({
            subject1Index: index,
            subject2Index: -1,
            'saveDataParams.course_name': ''
        });
        wx.request({
            url: config.SERVER_HOST + PATHS.GET_SUBJECT_LIST,
            method: 'GET',
            data: {
                subject_id: me.data.subject1List[index].id
            },
            success: function (res) {
                var subjects = res.data.data.subject_list;
                me.setData({
                    subject2List: subjects
                });
            },
            fail: function (err) {
                wx.showModal({
                    title: '提示',
                    content: err,
                });
            }
        });
    },
    bindSubject2Change: function (e) {
        var index = +e.detail.value;
        var dt = this.data;
        this.setData({
            subject2Index: index
        });
        this.setData({
            'saveDataParams.course_name': dt.subject1List[dt.subject1Index].name + dt.subject2List[dt.subject2Index].name
        });
    },
    bindNameInput: function (e) {
        this.setSaveDataParams('user_name', e);
    },
    bindSMSCodeInput: function (e) {
        this.setData({
            'saveDataParams.sms_code': util.toSBC(e.detail.value)
        });
    },
    bindMobileInput: function (e) {
        debugger;
        var val = util.toSBC(e.detail.value);
        var me = this;
        me.setData({
            isShowSMSCode: false,
            isShowPicCaptcha: false,
            sendSMSCodeTip: '获取验证码'
        });
        if (/\d{11}/.test(val)) {
            wx.request({
                url: config.SERVER_HOST + PATHS.CHECK_MOBILE,
                data: {
                    mobile: val
                },
                method: 'POST',
                dataType: 'json',
                header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                success: function (res) {
                    const dt = res.data;
                    if (dt.code === 0) {
                        me.setData({
                            isShowSMSCode: !dt.data.exist
                        });
                    } else {
                        wx.showModal({
                            title: '提示',
                            content: dt.msg,
                            showCancel: false
                        });
                    }
                }
            });
        } else if (val.length === 11) {
            wx.showModal({
                title: '提示',
                content: '手机号输入错误',
                showCancel: false
            });
        }
        this.setData({
            'saveDataParams.mobile': val
        });
        // this.setSaveDataParams('mobile', e);
    },
    // 统一设置saveDataParams函数
    setSaveDataParams: function (field, e) {
        var data = {};
        data['saveDataParams.' + field] = e.detail.value;
        this.setData(data);
    },
    validator: function () {
        const me = this;
        let result = true;
        const mobile = +me.data.saveDataParams.mobile;
        if (!mobile || !/\d{11}/.test(mobile)) {
            wx.showModal({
                title: '提示',
                content: '请输入11位数字的手机号',
                showCancel: false
            });
            result = false;
            me.setData({
                'saveDataParams.mobile': ''
            });
        }
        
        return result;
    },
    bindWechatTap: function () {
        util.sendHabo({
            type: 'x_clueC',
            stype: 'message'
        });
    },
    bindGSXCallTap: function () {
        util.sendHabo({
            type: 'x_clueC',
            stype: 'phone'
        });
        wx.makePhoneCall({
            phoneNumber: '4000910910'
        });
    },
    bindOrderTap: function () {
        this.setData({
            toView: 'order-form',
        });
    },
    bindScroll: function (e) {
        if (e.detail.scrollTop > 654) {
            this.setData({
                isHiddenBottom: false,
                // hurry: 正常应该都-100，但是ios需要-230，我真的不知道为什么，230也是试出来的
                contentHeight: this.data.screenHeight
            });
        } else {
            this.setData({
                isHiddenBottom: true,
                contentHeight: this.data.screenHeight + 100
            });
        }
    },
    /**
     * 保存操作
     */
    bindSaveTap: function () {
        var me = this;
        if (!me.validator()) {
          return;
        }
        me.setData({
            'saveDataParams.tpl_type': me.data.type
        });
        wx.request({
            url: config.SERVER_HOST + PATHS.ORDER_SUBMIT,
            data: me.data.saveDataParams,
            method: 'POST',
            dataType: 'json',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            success: function (res) {
                const dt = res.data;
                if (dt.code === 0) {
                    wx.showModal({
                        title: '发布成功',
                        content: '课程顾问老师近期会与您联系',
                        showCancel: false,
                        confirmText: '知道了'
                    });
                } else {
                    wx.showModal({
                        title: '提示',
                        content: dt.msg,
                        showCancel: false
                    });
                }
            }
        });
    }
});