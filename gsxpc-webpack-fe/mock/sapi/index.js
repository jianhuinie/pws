const {mock} = require('mockjs');

module.exports = {

    // 使用 mockjs 生成数据，参考：https://github.com/nuysoft/Mock/wiki/Syntax-Specification
    'GET /sapi/liveRecommendCourse/detail': { code: 0, msg: '请求成功', loggerId: 'D33A27DFA54163E1E5CB4A1F45FEA513', data: { cellCourseNumber: '1639796942259200', number: '1639820389991424', recommendNumber: '1639820389991424', recommendType: 1, name: '【2019】寒春五年级作文提分班', coverUrl: 'https:\/\/imgs.genshuixue.com\/76717149_bysp1sf1.jpeg', price: 298800, originPrice: 338800, discount: { number: '2185356737620480', entityNumber: '1639820389991424', discountPrice: 248800, name: '张镇老师寒春班限时优惠', price: 248800, status: 2, beginTime: '2019-01-12 20:31:00', endTime: '2019-01-12 23:59:00', repeatType: 2, showType: 2, currentTime: '2019-01-11 16:00:09', type: 1, limitCount: 0, count: 185 }, scheme: 'bjhlstudent:\/\/o.c?a=classDetail&courseNumber=1639820389991424&subclazzNumber=&courseType=15', linkCount: 0 }, ts: 1547193609, path: '\/sapi\/liveRecommendCourse\/detail' }
};
