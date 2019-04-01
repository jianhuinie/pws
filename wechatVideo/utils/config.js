const devServer = 'http://127.0.0.1:8208/'
const testServer = 'https://www.wechatvideo.top'
const betaServer = 'https://www.wechatvideo.top'
const proServer = 'https://www.wechatvideo.top'

let path = null;
// es6 版本
// if (NODE_ENV === 'dev') {
//     path = devServer;
// }
// else if (NODE_ENV === 'test') {
//     path = testServer;
// }
// else if (NODE_ENV === 'beta') {
//     path = betaServer;
// }
// else if (NODE_ENV === 'production') {
//     path = proServer;
// }

const config = {
    // 服务地址
    SERVER_HOST: testServer,
    TOKEN: 'TOKEN',
    PATHS: {
    },
    NAV_TABS: [
        {
            id: 53,
            name: '推荐'
        },
        {
            id: 54,
            name: '搞笑'
        },
        {
            id: 57,
            name: '生活'
        },
        {
            id: 65,
            name: '音乐'
        },
        {
            id: 60,
            name: '健康'
        },
        {
            id: 74,
            name: '随拍'
        },
        {
            id: 58,
            name: '奇葩'
        },
        {
            id: 67,
            name: '牛人'
        },
        {
            id: 63,
            name: '母婴'
        },
        {
            id: 66,
            name: '影视'
        },
        {
            id: 68,
            name: '社会'
        },
        {
            id: 79,
            name: '历史'
        }
    ],
    JSONDATA: {
        androidId: '867909035595374',
        cateid: '53',
        connectionType: 4,
        imei: '867909035595374',
        operatorType: 3,
        optaction: 'down',
        page: '2',
        pagesize: '12',
        searchtext: '',
        appid: 'xzwl',
        apptoken: 'xzwltoken070704',
        appversion: '6.1.6',
        appversioncode: 616,
        channel: 'sc_baidu_a',
        mobileinfo: 'HUAWEI',
        openid: 'f7ff48f0a5ff4a4c83f7ef040723784a',
        os: 'android',
        sdktype: 'bd_jssdk;bd_sdk;gdt_sdk;tt_sdk;sg_sdk;gdt_api;tt_api;zk_api;dk_api',
        token: '5cVugf8KZWm0UtF0xeqcwseg0bAq5wf8quKMys3oW1NmUA9fmdGQ%252BDbkHBLo3Eqh%250A'
    },
    REQUSETURL: 'https://www.xiaodouzhuan.cn/jkd/newmobile/artlist.action'
};

export default config;
