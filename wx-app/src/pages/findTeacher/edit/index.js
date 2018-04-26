/**
 * 留单首页
 */
import config from '../../../utils/config.js';
const PATHS = config.PATHS;
const app = getApp();
Page({
    data: {
        // 要保存的数据
        saveDataParams: {
            user_name: '',
            mobile: '',
            info: '',
            sms_code: '',
            exp_price: '',
            detail_info: '',
            support_online: 1,
            // TODO: 以下三个字段不知道干嘛
            page_type: 'index-index',
            detail_url: 'http://m.genshuixue.com/bj/',
            source: 'xiaochengxu'
        },
        // 愿意支付的课时费
        expPrice: [
            '¥100以内',
            '¥100-¥200',
            '¥200-¥300',
            '¥300-¥500',
            '¥500以上',
            '双方协商',
        ],
        sendSMSParams: {
            type: config.TYPE,
            captcha: '',
            is_voice: 0,
            captcha_name: config.TYPE,
            captcha_uniq_id: ''
        },
        // 是否校验通过
        isValidate: true,
        // 图片验证码校验
        isPicCaptchaValidate: true,
        // 愿意支付的课时费默认选中的值
        priceIndex: -1,
        // 获取验证码
        sendSMSCodeTip: '获取验证码',
        // 是否获取验证码
        isGetSMSCode: false,
        // 科目suggestion
        suggOpt: {
            className: ''
        },
        // 科目id
        subjectId: ''
    },
    bindPageTap: function () {
        this.setData({
            'suggOpt.source': []
        });
    },
    subjectHandler: function (e) {
        const ds = e.target.dataset;
        let saveDataParams = this.data.saveDataParams;
        saveDataParams.info = ds.title;
        // 不知道为毛，suggestion滑动再选择可以，直接选择不可以
        setTimeout(() => {
            this.setData({
                'saveDataParams.info': ds.title,
                'subjectId': ds.id,
                'suggOpt.source': []
            });
        }, 100);
    },
    onShareAppMessage: function () {
        return {
            title: '发布找老师需求',
            path: '/pages/findTeacher/edit/index'
        };
    },
    onLoad: function () {
        var me = this;
        wx.setNavigationBarTitle({
            title: '发布找老师需求'
        });
        app.getUserInfo(function (userInfo) {
            // 更新数据
            me.setData({
                'saveDataParams.user_name': userInfo.nickName
            });
            console.log(userInfo);
        });
    },
    bindTapTextareaView: function () {
        this.setData({
            isShowTextarea: true
        });
    },
    // 科目
    bindSubjectInput: function (e) {
        const me = this;
        const val = e.detail.value;
        me.setData({
            isShowTextarea: false
        });
        wx.request({
            url: 'https://suggestion.genshuixue.com/s',
            method: 'GET',
            data: {
                key: val,
                type: 1
            },
            success: function (res) {
                const source = res.data.result.r.map((item) => {
                    return {
                        id: item.sub_id,
                        title: item.title
                    };
                });
                me.setData({
                    'suggOpt.source': source
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
    // 详细描述
    bindDetailKeyInput: function (e) {
        this.setSaveDataParams('detail_info', e);
    },
    bindNameKeyInput: function (e) {
        this.setSaveDataParams('user_name', e);
    },
    // 学费
    bindPriceChange: function (e) {
        var index = +e.detail.value;
        this.setData({
            priceIndex: index,
            'saveDataParams.exp_price': this.data.expPrice[index]
        });
    },
    // 是否线上授课
    bindOnlineChange: function (e) {
        this.setSaveDataParams('support_online', e);
    },
    // 姓名
    bindNameChange: function (e) {
        this.setSaveDataParams('user_name', e);
    },
    // 手机号
    bindPhoneKeyInput: function (e) {
        this.setSaveDataParams('mobile', e);
    },
    // 短信验证码
    bindSMSCodeKeyInput: function (e) {
        // this.data.saveDataParams
        this.setSaveDataParams('sms_code', e);
    },
    // 图片验证码
    bindCaptchaKeyInput: function (e) {
        const me = this;
        const val = e.detail.value;
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
        if (!/\d{5,}/.test(mobile)) {
            wx.showModal({
                title: '提示',
                content: '请输入正确的手机号',
                showCancel: false
            });
            return;
        }
        if (me.isShowPicCaptcha && !me.data.sendSMSParams.captcha) {
              wx.showModal({
                  title: '提示',
                  content: '请输入图片验证码',
                  showCancel: false
              });
              return;
        }
        return true;
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
    // 获取短信验证码
    bindSMSCodeTap: function (e) {
        this.sendSMSCode(e);
    },
    getNewCaptcha: function (timer) {
        const me = this;
        me.showPicCaptcha()
        clearInterval(timer);
        me.setData({
            isGetSMSCode: false,
            sendSMSCodeTip: '获取验证码'
        });
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
        if (!/\d{5,}/.test(mobile)) {
            wx.showModal({
                title: '提示',
                content: '请输入正确的手机号',
                showCancel: false
            });
            result = false;
            me.setData({
                'saveDataParams.mobile': ''
            });
        }
        
        return result;
    },
    // 保存
    bindSaveTap: function () {
        var me = this;
        if (!me.validator()) {
          return;
        }
        
        wx.request({
            url: config.SERVER_HOST + PATHS.ADD_RECORD,
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
                    wx.navigateTo({
                        url: './result/index'
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
    },
    bindGSXCallTap: function () {
        wx.makePhoneCall({
            phoneNumber: '4000910910'
        });
    }
});