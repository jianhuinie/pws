/**
 * @file 常量定义
 * @author dafo<huanghoujin@baijiahulian.com>
 */

// 直播
export const Live = {
    // 推课
    // 学生端直播教室推课详情
    STUDENTPUSHCOURSEDETAIL: '/sapi/liveRecommendCourse/detail',
    // 老师端 直播教室退课详情
    TEACHERPUSHCOURSEDETAIL: '/tapi/liveRecommendCourse/detail',
    // 老师端 直播教室推课列表
    TEACHERPUSHCOURSELIST: '/tapi/liveRecommendCourse/list',

};

// 搜索
export const Search = {
    // 获取热词
    POPULARKEYWORDS: '/sapi/search/popularKeywords',
    // 关键字搜索
    SEARCH: '/sapi/search/search',
    // 联想词搜索
    SUGGESTIONKEYWORDS: '/sapi/search/suggestionKeywords',
};
