/**
 * @file mock data
 * @author autoresponse
 */

/* eslint-disable fecs-camelcase */

/**
 * 获取 mock 响应数据
 *
 * @param {string} path 请求路径名
 * @param {Object} queryParam 查询参数信息
 * @param {Object} postParam post 的查询参数信息
 * @return {Object}
 */
module.exports = function (path, queryParam, postParam) {
    return {
        // 可以通过该属性来设置响应的延时，也可以设为值为'0,100'，表示随机 0-100ms 的延时，默认 0
        _timeout: 0,

        // 通过该状态来设置响应的 http 的状态码，默认 200
        _status: 200,

        // 对于要响应的 json 数据可以统一放在该字段里，也可以不使用该字段，直接跟 _xx 属性平级放
        _data: {"code":0,"message":"\u83b7\u53d6\u8bfe\u7a0b\u5217\u8868\u6210\u529f","data":{"course":[{"display_name":"kaksknf","number":170210804693,"price":1,"cover_url_for_mobile":"http:\/\/test-img.gsxservice.com\/752660_e3ac9fkz.jpeg","type":2,"create_time":"2017-02-10 16:21:03","m_detail_url":"http:\/\/test-m.genshuixue.com\/teacher\/classCourseDetail\/170210804693"},{"display_name":"jjdjkd","number":170210804689,"price":1,"cover_url_for_mobile":"http:\/\/test-img.gsxservice.com\/752660_e3ac9fkz.jpeg","type":2,"create_time":"2017-02-10 16:20:09","m_detail_url":"http:\/\/test-m.genshuixue.com\/teacher\/classCourseDetail\/170210804689"},{"display_name":"qpqpqpqpq","number":17011290153,"price":"0","cover_url_for_mobile":"http:\/\/test-img.gsxservice.com\/823727_vu6tvjb5.jpeg","type":3,"create_time":"2017-01-12 20:25:54","m_detail_url":"http:\/\/test-m.genshuixue.com\/video_course\/getcourseshowdetail?number=17011290153"},{"display_name":"jkasdhfksdhfk","number":17011157393,"price":"1","cover_url_for_mobile":"http:\/\/test-img.gsxservice.com\/823529_9inmddqv.jpeg","type":3,"create_time":"2017-01-11 14:50:01","m_detail_url":"http:\/\/test-m.genshuixue.com\/video_course\/getcourseshowdetail?number=17011157393"},{"display_name":"kakasd","number":17011098233,"price":"0.01","cover_url_for_mobile":"http:\/\/test-img.gsxservice.com\/823411_bk9p2qf4.jpeg","type":3,"create_time":"2017-01-10 19:49:51","m_detail_url":"http:\/\/test-m.genshuixue.com\/video_course\/getcourseshowdetail?number=17011098233"},{"display_name":"aslkdafjs","number":17011098217,"price":"0","cover_url_for_mobile":"http:\/\/test-img.gsxservice.com\/823410_bgdm0wks.jpeg","type":3,"create_time":"2017-01-10 19:47:55","m_detail_url":"http:\/\/test-m.genshuixue.com\/video_course\/getcourseshowdetail?number=17011098217"},{"display_name":"jjjjjjjjjjjjjjja","number":17010365457,"price":"0.01","cover_url_for_mobile":"http:\/\/test-img.gsxservice.com\/822045_6k8nv3ky.jpeg","type":3,"create_time":"2017-01-03 16:09:12","m_detail_url":"http:\/\/test-m.genshuixue.com\/video_course\/getcourseshowdetail?number=17010365457"},{"display_name":"1207\u6d4b\u8bd5","number":16120795391,"price":"0","cover_url_for_mobile":"http:\/\/test-img.gsxservice.com\/813486_fujqyrp0.jpeg","type":3,"create_time":"2016-12-07 16:19:15","m_detail_url":"http:\/\/test-m.genshuixue.com\/video_course\/getcourseshowdetail?number=16120795391"},{"display_name":"\u68d2\u68d2\u7cd6","number":16102795123,"price":"12","cover_url_for_mobile":"http:\/\/test-img.gsxservice.com\/782595_67aczd0x.jpeg","type":3,"create_time":"2016-10-27 11:11:02","m_detail_url":"http:\/\/test-m.genshuixue.com\/video_course\/getcourseshowdetail?number=16102795123"},{"display_name":"\u63a8\u9001\u6d4b\u8bd5012","number":289061961,"price":"1","cover_url_for_mobile":"http:\/\/test-img.gsxservice.com\/782207_5svenbh0.jpeg","type":3,"create_time":"2016-10-25 11:02:17","m_detail_url":"http:\/\/test-m.genshuixue.com\/video_course\/getcourseshowdetail?number=289061961"},{"display_name":"\u63a8\u9001\u6d4b\u8bd5011","number":16101354171,"price":"0","cover_url_for_mobile":"http:\/\/test-img.gsxservice.com\/780674_ugpqq91d.jpeg","type":3,"create_time":"2016-10-13 15:45:06","m_detail_url":"http:\/\/test-m.genshuixue.com\/video_course\/getcourseshowdetail?number=16101354171"},{"display_name":"\u63a8\u9001\u6d4b\u8bd5010","number":16101354155,"price":"5","cover_url_for_mobile":"http:\/\/test-img.gsxservice.com\/780667_g7j14y9w.jpeg","type":3,"create_time":"2016-10-13 14:14:41","m_detail_url":"http:\/\/test-m.genshuixue.com\/video_course\/getcourseshowdetail?number=16101354155"},{"display_name":"\u63a8\u9001\u6d4b\u8bd5009","number":16101354163,"price":"501.5","cover_url_for_mobile":"http:\/\/test-img.gsxservice.com\/780663_str9zg8s.jpeg","type":3,"create_time":"2016-10-13 13:50:25","m_detail_url":"http:\/\/test-m.genshuixue.com\/video_course\/getcourseshowdetail?number=16101354163"},{"display_name":"\u6d4b\u8bd5\u65e7\u7248\u672c\u6dfb\u52a0\u73ed\u8bfe","number":161009491416,"price":9999,"cover_url_for_mobile":"http:\/\/test-img.gsxservice.com\/747304_t410ax9c.png","type":2,"create_time":"2016-10-09 14:39:55","m_detail_url":"http:\/\/test-m.genshuixue.com\/teacher\/classCourseDetail\/161009491416"},{"display_name":"\u518d\u6765\u6d17\u767d","number":161008557016,"price":0,"cover_url_for_mobile":"http:\/\/test-img.gsxservice.com\/747305_sf5co57p.png","type":2,"create_time":"2016-10-08 15:23:13","m_detail_url":"http:\/\/test-m.genshuixue.com\/teacher\/classCourseDetail\/161008557016"},{"display_name":"\u518d\u6765\u6d17\u767d","number":160930490652,"price":0,"cover_url_for_mobile":"http:\/\/test-img.gsxservice.com\/747305_sf5co57p.png","type":2,"create_time":"2016-09-30 10:03:40","m_detail_url":"http:\/\/test-m.genshuixue.com\/teacher\/classCourseDetail\/160930490652"},{"display_name":"ooooooo","number":16041873865,"price":"0.1","cover_url_for_mobile":"http:\/\/test-img.gsxservice.com\/824891_eu5uar3e.jpeg","type":3,"create_time":"2016-04-18 11:04:02","m_detail_url":"http:\/\/test-m.genshuixue.com\/video_course\/getcourseshowdetail?number=16041873865"}]},"render":null}
    };
};

/* eslint-enable fecs-camelcase */
