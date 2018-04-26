/**
 * Created by xuzheng on 16/1/4.
 */
define(function (require, exports) {
    'use strict';

    var config = {};

    config['toNewWindow'] = {
        'jockey': 1,
        'old': 1
    };
    config['toNewOnlineWindow'] = {
        'jockey': 1,
        'app': 'student',
        'ios': ['2.6.0'],
        'android': ['2.6.0'],
        'old': 1
    };
    /*
    * Android 吊起qq群功能
    * 仅Android APP需要这个接口，因为ios可以直接支持url吊起。其他app均未实现该接口
    */
    config['joinQQGroup'] = {
        'app': 'student',
        'android': ['3.1.2']
    };

    config['toTeacherDetail'] = {
        'app': 'student',
        'jockey': 1,
        'schema': 0,
        'old': 1
    };
    /* 考研app：跳转支付 */
    config['toKaoYanAppPay'] = {
        'app': 'kaoyan',
        'jockey': 1,
        'schema': 0,
        'old': 1
    };
    config['toViewImages'] = {
        'app': 'student',
        'ios': ['3.0.2'],
        'android': ['3.1.2'],
        'jockey': 1,
        'schema': 0,
        'old': 1
    };
    config['toViewImage'] = {
        'app': 'student',
        'jockey': 1,
        'schema': 0,
        'old': 1
    };

    config['s_teacher_course'] = {
        'app': 'student',
        'ios': ['2.1.0'],
        'android': ['2.1.0'],
        'jockey': true,
        'schema': false
    };
    //app init share分享接口
    config["setShareInfo"] = {
        'old': 1,
        'jockey': 1
    };
    //app do share分享接口
    config["doShare"] = {
        'ios': ['3.0.2'],
        'android': ['3.0.2'],
        'old': 1,
        'jockey': 1
    };
    //app share panel分享接口
    config["doSharePanel"] = {
        "old": 1,
        'jockey': 1
    };
    //跳转到第三方支付页面
    config["toThirdPartyPayment"] = {
        "old": 1,
        'jockey': 1
    };
    //跳转订单支付页面
    config["toPayCoursePurchase"] = {
        "old": 1,
        'jockey': 1
    };
    //调用app聊天功能
    config["toChat"] = {
        "old": 1,
        'jockey': 1
    };
    //新版im聊天功能
    config["IM"] = {
        "old": 1,
        'jockey': 1
    };
    //点击im咨询,若未登录,则调起此Jockey接口(支持3.0.7及以上版本)
    config["anonymousIM"] = {
        'app': 'student',
        'ios': ['3.0.7'],
        'android': ['3.0.7'],
        'old': 1,
        'jockey': 1
    };
    //安卓打电话协议
    config["toMakePhoneCall"] = {
        'old': 1,
        'jockey': 1
    };

    // 视频课
    config["toVideoCourseDetail"] = {
        'jockey': 1,
        'old': 1
    };

    // 设置app navBar头部标题
    config["setPageTitle"] = {
        'jockey': 1,
        'old': 1
    };

    // 设置app navBar头部标题
    config["toChangeCoverBackground"] = {
        'app': 'teacher',
        'ios': ['2.8.0'],
        'android': ['2.8.0'],
        'jockey': 1,
        'old': 1
    };

    config["urlSchemeRoute"] = {
        'ios': ['3.2.0'],
        'android': ['3.2.0'],
        'jockey': 1,
        'old': 1
    };

    // 设置app navBar头部标题
    config["toNews"] = {
        // 'app': 'student',
        'jockey': 1,
        'old': 1
    };

    // 添加app搜索功能
    config["setSearchInfo"] = {
        'ios': ['3.2.4'],
        'android': ['3.2.4'],
        'jockey': 1,
        'old': 1
    };

    //设置用户登陆
    config["getUserInfo"] = {
        'old': 1,
        'jockey': 1
    };

    //设置用户登陆
    config["uploadImage"] = {
        'old': 1,
        'jockey': 1
    };

    //用户举报
    config["toReport"] = {
        'old': 1,
        'jockey': 1
    };

    //设置用户登陆
    config["uploadImageComplete"] = {
        'old': 1,
        'jockey': 1
    };

    function version2Number(strVersion) {
        if (!strVersion) {
            return 0;
        }
        var arr = strVersion.split('.');
        var num = 0;
        num += Number(arr[0]) * 1E4;
        num += Number(arr[1]) * 1E2;
        num += Number(arr[2]);
        return isNaN(num) ? 0 : num;
    }

    function isSupport(itemConfig, filterObject) {
        if (!filterObject) {
            return true;
        }
        var rst = 1;
        for (var filterName in filterObject) {
            if (filterObject.hasOwnProperty(filterName)) {
                switch (filterName) {
                    case 'app':
                        if (itemConfig['app']) {
                            rst &= filterObject['app'] == itemConfig['app'];
                        }
                        break;
                    case 'jockey':
                    case 'schema':
                        rst &= filterObject[filterName] == itemConfig[filterName];
                        break;
                    case 'ios':
                    case 'android':
                        if (itemConfig[filterName]) {
                            var currentVersion = version2Number(filterObject[filterName]);
                            var startVersion = -Infinity;
                            var endVersion = Infinity;
                            if (itemConfig[filterName][0]) {
                                startVersion = version2Number(itemConfig[filterName][0]);
                            }
                            if (itemConfig[filterName][1]) {
                                endVersion = version2Number(itemConfig[filterName][1]);
                            }
                            if (currentVersion < startVersion || currentVersion >= endVersion) {
                                rst &= 0;
                            }
                        }
                        break;
                }
            }
        }
        return !!rst;
    }

    exports.get = function (filterObject) {
        var rst = {};
        for (var actionName in config) {
            if (config.hasOwnProperty(actionName)) {
                if (isSupport(config[actionName], filterObject)) {
                    rst[actionName] = config[actionName];
                }
            }
        }
        return rst;
    };
});