/**
 * 
 */
module.exports = {
    responseDir: './mock/',
    post: true,
    // get请求需要手动配置路径信息
    get: [
        {
           match: '/m/classroom/getKefu'
        },
        {
            match: '/m/user/get'
        },
        {
            match: '/m/classroom/showBase'
        },
        {
            match: '/m/classroom/getSummary'
        },
        {
            match: '/m/user/giftCourses'
        },
        {
            match: '/m/area/list'
        },
        {
            match: '/m/user/getStudentInfo'
        },
        {
            match: '/m/user/getFollowClasses'
        },
        {
            match: '/m/user/purchaseRecord'
        },
        {
            match: '/m/wallet/summary'
        },
        {
            match: '/m/wallet/detail'
        }, 
        {
            match: '/m/wallet/detailSum'
        },
        {
            match: '/m/wallet/withdrawDetail'
        },
        {
            match: '/m/wallet/withdrawSummary'
        },
        {
            match: '/m/myCourse/willBegin'
        },
        {
            match: '/m/myCourse/haveBuy'
        },
        {
            match: '/m/myCourse/recentLearn'
        },
        {
            match: '/m/classroom/singleCourseList'
        },
        {
            match: '/m/classroom/seriesCourseList'
        },
        {
            match: '/m/course/info'
        },
        {
            match: '/m/course/courses'
        }, 
        {
            match: '/m/course/detail'
        }, 
        {
            match: '/m/live/signin'
        }, 
        {
            match: '/m/videoCourse/play'
        }, 
        {
            match: '/m/course/getList'
        }, 
        {
            match: '/m/banner/getList'
        }, 
    ]
};