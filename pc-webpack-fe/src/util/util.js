/**
 * 公共方法
 * @file leon
 * @date 2017/11/16
 */
const util = {
    // underscore的findeWhere方法
    findWhereNew: (arr, attribute, val) => {
        let i = 0;
        const len = arr.length;

        for (i = 0; i < len; i++) {
            if (arr[i][attribute] === val) {
                return arr[i];
            }
        }
        return null;
    },

    // 获取对象数组的某个属性为特定值的索引值
    getIndexForVal: (arr, attribute, val) => {
        let i = 0;
        const len = arr.length;

        for (i = 0; i < len; i++) {
            if (arr[i][attribute] === val) {
                return i;
            }
        }
        return -1;
    },

    // 左导点击后的操作
    renderLeftSider: () => {
        const eleArr = $('.nav-page .path-tab');
        $.map(eleArr, function (item) {
            const ele = $(item);
            ele.removeClass('active');
            if (location.hash.indexOf(ele.data('path')) >= 0) {
                ele.addClass('active');
            }
        });
    },

    /**
     * 替换字符串中所有空格
     */
    replaceSpace: str => {
        if (str === null || str === void 0) {
            return '';
        }
        return str.replace(/\s/g, '');
    },

    /**
     * 返回距 1970 年 1 月 1 日之间的毫秒数
     */
    getTime: date => {
        return new Date(date.replace(/-/g, '/')).getTime();
    },

    /**
    * 返回今天的对象
    * 如:today={
    *     value: '2018-04-21',
    *     year: 2018,
    *     month: 04,
    *     date: 08,
    *     day: 5
    *  }
    */
    getToday: () => {
        const today = {};
        const year = new Date().getFullYear();
        const month = util.addZero(new Date().getMonth() + 1);
        const date = util.addZero(new Date().getDate());
        const day = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
        const value = year + '-' + month + '-' + date;
        today.value = value;
        today.year = year;
        today.month = month;
        today.date = date;
        today.day = day;
        return today;
    },
    /**
     * 返回指定格式的时间字符串 x月x日
     */
    getMdDate: dateStr => {
        const newDateStr = util.dateSafariFomat(dateStr);
        const date = new Date(newDateStr);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return month + '月' + day + '日';
    },
    /**
     * 返回指定格式的时间字符串 x年x月x日
     */
    getYMdDate: dateStr => {
        const newDateStr = util.dateSafariFomat(dateStr);
        const date = new Date(newDateStr);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return year + '年' + util.addZero(month) + '月' + util.addZero(day) + '日';
    },
    /**
     * 返回指定格式的时间字符串 x-x-x
     */
    getYMdDateSpecialCharacter: (dateStr, SpecialCharacter) => {
        const newDateStr = util.dateSafariFomat(dateStr);
        const date = new Date(newDateStr);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return year + SpecialCharacter + util.addZero(month) + SpecialCharacter + util.addZero(day);
    },

    /**
     * Safari 日期格式转换
     */
    dateSafariFomat: dateStr => {
        // 针对有些场景传进来的是时间戳或者已转换的 做下兼容 by niejianhui
        return typeof dateStr === 'string' && dateStr.indexOf('-') > -1 ? dateStr.replace(/-/g, '/') : dateStr;
    },
    /**
     * 日历点击加一个月的处理函数
     * 传入年和月
     * 返回数组  第一项是年，第二项是月
     */
    addMonthHandler: (year, month) => {
        year = Number(year);
        month = Number(month);
        const arr = [];
        if (month + 1 === 13) {
            arr[0] = year + 1;
            arr[1] = util.addZero(1);
        } else {
            arr[0] = year;
            arr[1] = util.addZero(month + 1);
        }
        return arr;
    },
    /**
    * 日历点击减一个月的处理函数
    * 传入年和月
    * 返回数组  第一项是年，第二项是月
    */
    minusMonthHandler: (year, month) => {
        year = Number(year);
        month = Number(month);
        const arr = [];
        if (month - 1 === 0) {
            arr[0] = year - 1;
            arr[1] = 12;
        } else {
            arr[0] = year;
            arr[1] = util.addZero(month - 1);
        }
        return arr;
    },
    /**
     * 补零
     */
    addZero: number => {
        if (typeof number !== 'number') {
            number = Number(number);
        }
        if (number < 10) {
            return '0' + number;
        }
        return number;
    },

    // 提取cookie 返回一个对象
    parseCookie: cookie => {
        const queryArr = cookie.split(';');
        const resultObj = {};
        let arrayItem = [];
        let key = '';
        let value = '';
        queryArr.forEach(item => {
            arrayItem = item.split('=');
            key = arrayItem[0].trim();
            value = arrayItem[1];
            resultObj[key] = value;
        });
        return resultObj;
    },
    /**
     * 提取url后面的参数 返回一个对象
     */
    parseUrl: url => {
        const obj = {};
        let paraArray = [];
        let arrayItem = [];
        let key = '';
        let value = '';
        paraArray = url.substring(url.indexOf('?') + 1).split('&');
        for (let i = 0, len = paraArray.length; i < len; i++) {
            arrayItem = paraArray[i].split('=');
            key = arrayItem[0];
            value = arrayItem[1];
            obj[key] = value;
        }
        return obj;
    },
    /**
     * js 抖动
     */
    debounce: (fn, delay) => {
        let timer = null;
        return function () {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(fn, delay);
        };
    },
    /**
     * js 节流
     */
    throttle: (fn, delay) => {
        let lastCalledTime = +new Date();
        return function () {
            const nowTime = +new Date();
            if (nowTime - lastCalledTime >= delay) {
                fn();
                lastCalledTime = nowTime;
            }
        };
    },
    /**
    * 拼接详细地址
    */
    getFullArea: area => {
        return area.province.name + area.city.name + area.district.name;
    },
    /**
     *   格式化价格 现在价格精确到分
     */
    formatPrice: price => {
        return (Number(price) / 100);
    },
    /**
     *  获取originPath
     */
    getOriginPath: () => {
        const origin = location.origin;
        const pathname = location.pathname;
        return origin + pathname;
    },
    /**
     *  获取当前环境
     */
    getCurrentEnv: () => {
        let env;
        env = location.host.split('.')[0].split('-')[0];
        if (env.indexOf(':') > -1 || env.indexOf('127') > -1) {
            env = 'develop';
        }
        return env;
    },
    /**
     *  处理请求url  后端改成api.genshuixue了 不能用相对路径请求
     */
    formatRequestUrl: url => {
        const env = util.getCurrentEnv();
        if (env === 'www') {
            url = 'https://www-api.genshuixue.com' + url;
        } else if (env === 'test' || env === 'beta' || env === 'dev') {
            url = 'https://' + env + '-www-api.genshuixue.com' + url;
        }
        return url;
    },

    // 获取更多数据，
    // isClear为true返回newList,
    // isClear为false拼接oldList, newList
    contactMoreDataList: (oldList, newList, isClear) => {
        if (isClear) {
            return newList || [];
        }
        const oldL = oldList || [];
        const newL = newList || [];
        if (!newL.length) {
            return oldL;
        }
        if (!oldL.length) {
            return newL;
        }
        const list = oldList.concat(newList);
        return list;
    },
    // scheme跳转处理
    skipScheme: (scheme, isOpenNewTab) => {
        const schemeObj = util.parseUrl(scheme);
        const type = schemeObj.a;
        // const courseType = schemeObj.courseType;
        let url;
        switch (type) {
            // 订单详情页
            case 'orderDetail':
                url = '/pcweb/#/student/orderDetail/' + schemeObj.orderNumber + '/0';
                break;
            // 订单列表页
            case 'orderList':
                url = '/pcweb/#/student/manage/orderList';
                break;
            // 细胞课学习中心
            case 'classroomCellCourseDetail':
                url = '/pcweb/#/student/courseCenter/' + schemeObj.cellClazzNumber;
                break;
            // 细胞课详情页
            case 'classDetail':
                url = '/pcweb/#/detail/cellClass/' + schemeObj.courseNumber;
                if (schemeObj.subclazzNumber) {
                    url += '/' + schemeObj.subclazzNumber;
                }
                break;
            // 联报课详情页
            case 'linkClassDetail':
                url = '/pcweb/#/detail/comboCourse/' + schemeObj.linkClazzNumber;
                if (schemeObj.cellClazzNumbers) {
                    url += '/' + schemeObj.cellClazzNumbers;
                }
                if (schemeObj.subclazzNumbers) {
                    url += '/' + schemeObj.subclazzNumbers;
                }
                break;
            //  联报课订单详情页
            case 'goBuyLinkClazz':
                url = '/pcweb/#/student/submitLinkOrder/'
                    + schemeObj.linkClazzNumber + '/'
                    + schemeObj.cellSubclazzNumbers + '/'
                    + schemeObj.cellClazzNumbers;
                break;
            // 跳转订单详情页
            case 'goPay':
                if (+schemeObj.courseType === 15) {
                    url = '/pcweb/#/student/orderDetail/' + schemeObj.orderNumber + '/0';
                } else if (+schemeObj.courseType === 17) {
                    url = '/pcweb/#/student/orderDetail/' + schemeObj.orderNumber + '/1';
                }
                break;
            default:
                break;
        }
        if (isOpenNewTab) {
            window.open(url, '_blank');
        } else {
            location.href = url;
        }
    },

    // 时间格式转换
    // 如 2018-04-08 => 2018.04.08
    //
    timeHandler: time => {
        const timeSlice = time.slice(0, 10);
        const resultTime = timeSlice.replace(/-/g, '.');
        return resultTime;
    },
    /**
     * 返回时间差倒计时
     * beginTime 开始时间
     * endTime 结束时间
     * daySecond 是否显示秒
     */
    countDown: (sub, daySecond) => {
        if (sub < 0) {
            return;
        }
        let dayStr = '';
        let day = parseInt(sub / (24 * 60 * 60), 10);
        let hour = '';
        let min = '';
        let second = '';
        if (day > 0) {
            dayStr += day + '天';
            hour = parseInt((sub - day * 24 * 60 * 60) / (60 * 60), 10);
            dayStr += hour + '小时';
            min = parseInt((sub - day * 24 * 60 * 60 - hour * 60 * 60) / 60, 10);
            dayStr += min + '分';
            if (daySecond) {
                if (min > 0) {
                    second = parseInt(sub - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60, 10);
                    dayStr += second + '秒';
                }
            }
        } else {
            hour = parseInt(sub / (60 * 60), 10);
            if (hour > 0) {
                dayStr += hour + '小时';
                min = parseInt((sub - hour * 60 * 60) / 60, 10);
                dayStr += min + '分';
                if (min > 0) {
                    second = parseInt(sub - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60, 10);
                    dayStr += second + '秒';
                }
            } else {
                min = parseInt(sub / 60, 10);
                dayStr += min + '分';
                if (min > 0) {
                    second = parseInt(sub - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60, 10);
                    dayStr += second + '秒';
                } else {
                    dayStr += sub + '秒';
                }
            }
        }
        return dayStr;

    },
    // 限时折扣价格展示
    priceHander: (discount, originalPrice, price, countDownStatus) => {
        const showPriceObj = {};

        // 没走折扣价判断时return；
        if (countDownStatus === 0) {
            return showPriceObj;
        }

        if (discount !== null) {
            // 有限时折扣区分是预告还是折扣中  1 = 预告； 2 = 折扣中； 3 = 折扣过期；
            switch (countDownStatus) {
                case 1:
                    showPriceObj.type = 1;
                    showPriceObj.nowPrice = price;
                    showPriceObj.prevPrice = discount.price;
                    break;
                case 2:
                    showPriceObj.type = 2;
                    showPriceObj.nowPrice = discount.price;
                    showPriceObj.prevPrice = price;
                    break;
                case 3:
                    showPriceObj.type = 3;
                    showPriceObj.nowPrice = price;
                    showPriceObj.prevPrice = originalPrice || '';
                    break;
                default:
            }
        } else {
            showPriceObj.type = 3;
            showPriceObj.nowPrice = price;
            showPriceObj.prevPrice = originalPrice || '';
        }

        return showPriceObj;
    },

    /**
     * 获取课件上传接口地址
     */
    getUploadFileUrl: function () {
        let env;
        let url;
        env = location.host.split('.')[0].split('-')[0];
        if (env.indexOf(':') > -1 || env.indexOf('127') > -1) {
            env = 'dev';
        }
        if (env === 'www') {
            url = 'https://api.wenzaizhibo.com/web/doc/fileUpload';
        } else if (env === 'beta') {
            url = 'https://beta-api.wenzaizhibo.com/web/doc/fileUpload';
        } else if (env === 'test' || env === 'dev') {
            url = 'https://test-api.wenzaizhibo.com/web/doc/fileUpload';
        }
        return url;
    },
    /**
     * 格式化时间  后端返回格式为2018-04-08 Safari解析有问题  应改为／
     */
    formatDate: (date, formatter) => {
        formatter = formatter || '/';
        date = date || '';
        return date.replace(/-/g, formatter);
    },
    /**
     * 课程是否在直播中逻辑  前一后三
     */
    // courseIsLiving: (beginTime, endTime) => {
    //     beginTime = util.formatDate(beginTime);
    //     endTime = util.formatDate(endTime);
    //     const oneHourMilliseconds = 60 * 60 * 1000;
    //     const nowTimeStamp = +new Date();
    //     const beginTimeStamp = +new Date(beginTime);
    //     const endTimeStamp = +new Date(endTime);
    //     const beforeLiving = beginTimeStamp - nowTimeStamp > oneHourMilliseconds;
    //     const afterLiving = nowTimeStamp - endTimeStamp > oneHourMilliseconds * 3;
    //     if (!beforeLiving && !afterLiving) {
    //         return 'ING';
    //     } else if (beforeLiving) {
    //         return 'BEFORE';
    //     } else {
    //         return 'AFTER';
    //     }
    // },
    /**
     * 调起客服IM聊天
     */
    chatToKefuIm: function () {
        window.frames[0].postMessage({
            isSetIframeParam: true,
            isChatToKefu: true
        }, '*');
    },
    /**
     * 退出绑定手机
     */
    logoutBindPhone: function (jumpUrl) {
        const nextUrl = '/static/login?next=' + encodeURIComponent(jumpUrl);
        location.href = '/auth/logout?next=' + encodeURIComponent(nextUrl);
    }
};

export default util;
