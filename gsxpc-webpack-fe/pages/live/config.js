const config = {
    TEACHERPUSHORIGIN: {
        test: 'https://test.genshuixue.com',
        beta: 'https://beta.genshuixue.com',
        prod: 'https://www.genshuixue.com',
    },
    STUDENTPUSHORIGIN: {
        test: 'https://test.genshuixue.com',
        beta: 'https://beta.genshuixue.com',
        prod: 'https://www.genshuixue.com',
    },

    RECOMMENDTIP: {
        success: '课程已发送给学生，可以让同学们点击购买了哦～',
        hasSave: '抽奖设置成功',
    },
    SETLOTTERYTIP: {
        success: '发起抽奖成功'
    },
    // 最多20个字
    MAX_30: 30,
    // 最多999
    MAX_999: 999,
    // ajax自执行错误处理
    ISREJECT: true,
    DEFAULTERRORMESSAGE: '网络请求失败，请稍后再试'
};
export default config;
