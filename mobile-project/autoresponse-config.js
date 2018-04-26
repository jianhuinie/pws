/**
 * Created by xuzheng on 15/12/22.
 */
module.exports = {
    responseDir: './mock_ajax/',
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
        }
    ]
};