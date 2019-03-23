const config = {
    COURSETABS: [
        {
            name: '课程详情',
            moduleName: 'course-detail'
        },
        {
            name: '主讲老师',
            moduleName: 'master-teachers'
        },
        {
            name: '课程表',
            moduleName: 'course-plan'
        },
        {
            name: '课程评价',
            moduleName: 'course-comments'
        }
    ],
    // 详情页底部按钮状态
    SCHEMEMAPS: {
        goBuy: {
            className: 'orange',
            text: '立即报名',
            name: 'goBuy',
            eventId: 9490042,
        },
        goPay: {
            className: 'orange',
            text: '立即报名',
            name: 'goPay',
            eventId: 9490081,
        },
        classroomCellCourseDetail: {
            className: 'orange',
            text: '已报名去学习',
            name: 'center',
            eventId: 9490118,
        },
        cellClazzFull: {
            className: 'grey',
            text: '已满班',
            name: 'full',
            eventId: 9490100,
        },
        cellClazzStopEnroll: {
            className: 'grey',
            text: '停售',
            name: 'stop',
            eventId: 9490109,
        }
        // goBuyLinkClazz: '立刻报名',
    },
    LINKSCHEMEMAPS: {
        // 有待支付的订单
        goPay: '立即报名',
        linkClazzHasBought: '立即报名',
        clazzHasBought: '立即报名',
        cellLinkClazzStopEnroll: '暂停招生',
        cellLinkClazzFull: '已报满',
        goBuyLinkClazz: '立刻报名',
    },
    LINKCLAZZTOAST: {
        1: '您已报名过联报中的课程，请勿重复购买',
        2: '您有课程的待支付订单，是否前往',
        3: '您已购买过其中的课程，请勿重复支付',
    },
    CLAZZTOAST: {
        1: '您已报名过该课程，请勿重复购买',
        2: '您有课程的待支付订单，是否前往',
        3: '您已购买过其中的课程，请确认是否前往课程中心',
    },
    GETCOUPONMESSAGE: {
        success: '领取成功',
    }
};
export default config;
