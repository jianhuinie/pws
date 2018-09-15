const devServer = 'http://127.0.0.1:8208/yunLucky'
const testServer = 'https://test-m.genshuixue.com'
const betaServer = 'https://beta-m.genshuixue.com'
const proServer = 'https://m.genshuixue.com'

let path = null;
// es6 版本
if (NODE_ENV === 'dev') {
    path = devServer;
} 
else if (NODE_ENV === 'test') {
    path = testServer;
}
else if (NODE_ENV === 'beta') {
    path = betaServer;
}
else if (NODE_ENV === 'production') {
    path = proServer;
}

const config = {
    // 服务地址
    SERVER_HOST: path,
    ACTIVITY_NUMBER: '123456',
    TOKEN: 'TOKEN',
    PATHS: {
        PV0: 'https://pb0.genshuixue.com/pv0.gif',
        /**
         * habo上报
         */
        HABO: 'https://click.genshuixue.com/gs.gif',
        /**
         * 获取用户openid
         */
        GET_OPENID: '/auth/get-openid',
        /**
         * 获取有多少人注册
         */
        GET_LUCK_SIGN: '/bless-cloud/count', 
        /**
         * 客服消息
         */
        GET_KEFU_MSG: '/bless-cloud/send-service-msg'
    }
};

export default config;
