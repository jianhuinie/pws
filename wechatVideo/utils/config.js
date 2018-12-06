const devServer = 'http://127.0.0.1:8208/yunLucky'
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
        PV0: 'https://pb0.genshuixue.com/pv0.gif',
        /**
         * habo上报
         */
        HABO: 'https://click.genshuixue.com/gs.gif',
        RECOMMEND: '/recommend'
    },
    NAV_TABS: [
        {
            id: 0,
            name: '推荐'
        }, 
        {
            id: 5,
            name: '搞笑'
        }, 
        {
            id: 6,
            name: '情感'
        }, 
        {
            id: 13,
            name: '美文'
        }, 
        {
            id: 10,
            name: '祝福'
        }, 
        {
            id: 3,
            name: '健身'
        }, 
        {
            id: 4,
            name: '美食'
        }
    ]
};

export default config;
