/**
 * 
 */
module.exports = {
    responseDir: './mock/',
    post: true,
    //get请求需要手动配置路径信息
    get: [
        {
           match: '/global/app-config'
        },
        {
            match: '/one-on-one-course/teacher-sign-detail'
        },
        {
            match: '/one-on-one-course/teacher-signning'
        },
        {
            match: '/one-on-one-course/recruit-index'
        },
        {
            match: '/one-on-one-course/teacher-sign-recruit'
        },
        {
            match: '/one-on-one-course/sign-status'
        },
        {
            match: '/one-on-one-course/teacher-recruit-status'
        },
        {
            match: '/series/course-pager'
        },
        {
            match: '/series/header'
        },
        {
            match: '/series/banner'
        },
        {
            match: '/area/list'
        },
        {
            match: '/pc/classroom/getDetail'
        },
        {
            match: '/pc/image/upload'
        },
        {
            match: '/pc/classroom/banner/list'
        },
        {
            match: '/pc/course/getOptions'
        },
        {
            match: '/pc/course/list'
        },
        {
            match: '/pc/course/upDown'
        },
        {
            match: '/pc/course/upTop'
        },
        {
            match: '/pc/subject/list'
        },
        {
            match: '/pc/course/getDetail'
        },
        {
            match: '/pc/classroom/check'
        },
        {
            match: '/pc/classroom/get'
        },
        {
            match: '/pc/series/list'
        },
        {
            match: '/pc/series/getDetail'
        },
        {
            match: '/pc/series/getBaseInfo'
        },
        {
            match: '/pc/series/getCourseList'
        },
        {
            match: '/pc/video/getList'
        },
        {
            match: '/pc/finance/classroom/summary'
        },
        {
            match: '/pc/finance/classroom/list'
        },
        {
            match: '/pc/finance/order/list'
        },
        {
            match: '/pc/finance/wallet/summary'
        },
        {
            match: '/pc/finance/wallet/list'
        },
        {
            match: '/pc/finance/export'
        },
        {
            match: '/pc/course/uploadVideo'
        },
        {
            match: '/pc/video/getUploadUrl'
        },
        {
            match: '/pc/video/getToken'
        },
        {
            match: '/pc/live/createAssistant'
        }
    ]
};