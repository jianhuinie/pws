/**
 * @file ajax 接口
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var errorCode = require('./errorCode');
    var store = require('./store');

    /**
     * 错误处理
     *
     * @inner
     * @param {Object} response 返回的 JSON 数据
     * @param {Object=} errorHandler 自定义处理的错误类型
     * @return {Object}
     */
    function errorHandler(response, errorHandler) {

        var code = response.code;

        if (code !== 0) {

            var handler;

            if (errorHandler && (handler = errorHandler[code])) {
                if ($.isFunction(handler)) {
                    handler(response);
                }
            }
            else {

                var msg = errorCode[code] || response.msg;

                if (!msg) {

                    msg = [ ];

                    $.each(
                        response.data || { },
                        function (key, value) {
                            if (value) {
                                msg.push(value);
                            }
                        }
                    );

                    msg = msg.join('<br />');
                }

                if (msg) {
                    // 机构不弹
                    if (store.get('user').type != 6) {
                        alert({
                            title: '温馨提示',
                            content: msg,
                            width: 400
                        });
                    }
                }
            }
        }

        return response;
    }

    /**
     * 需要缓存的接口
     * 缓存策略：不发_user_number
     *
     * @inner
     * @type {Object}
     */
    var cacheMap = {
        '/area/list': 1,
        '/subject/getList': 1
    };

    /**
     * 需要缓存的接口
     * 缓存策略：不发请求
     */
    var dataCacheMap = {
        '/user/basicInfo': 1
    };

    /**
     * 缓存接口数据
     *
     * @inner
     * @type {Object}
     */
    var dataCache = { };

    /**
     * 获取缓存的 key
     *
     * @param {string} url
     * @param {Object=} data
     * @return {Object=}
     */
    function getCacheKey(url, data) {

        var key = url;

        if (data) {
            key += $.param(data);
        }

        return key;
    }

    /**
     * 发送 post 请求
     *
     * @inner
     * @param {string} url 请求 url
     * @param {Object} data 发送的数据
     * @param {Object=} options
     * @property {boolean} options.sync 是否是同步请求
     * @property {Object=} options.errorHandler 自定义 error 处理
     *
     * @return {Promise}
     */

    function post(url, data, options) {
        options = options || { };
        data = data || { };

        var cache;
        var cacheKey;

        if (dataCacheMap[url]) {
            cacheKey = getCacheKey(url, data);
            cache = dataCache[ cacheKey ];
        }

        if (cache) {

            var deferred = $.Deferred();

            if (!cache.response) {
                cache.deferredList.push(deferred);
            }
            else {
                deferred.resolve(cache.response);
            }

            return deferred.promise();
        }
        else {

            var number = store.get('user') ? store.get('user').number : 0;

            if (!cacheMap[url]) {
                data._user_number = number;
                $.extend(data, store.get('monkey'));
            }

            var params = {
                url: url,
                data: data,
                method: 'post',
                dataType: 'json',
                async: options.sync ? false : true
            };

            if (options.timeout) {
                params.timeout = options.timeout;
            }

            var post = $.ajax(params)
            .pipe(function (response) {
                if (dataCacheMap[url]) {
                    dataCache[cacheKey].response = response;
                    $.each(dataCache[cacheKey].deferredList, function (index, item) {
                        item.resolve(response);
                    });
                }
                return errorHandler(response, options.errorHandler);
            });

            if (dataCacheMap[url]) { //首先注入第一个请求的deferred
                var deferred = $.Deferred();
                dataCache[cacheKey] = {};
                dataCache[cacheKey].deferredList = [deferred];

                return deferred.promise();
            }
            return post;
        }
    }

    /**
     * 发送跨域的 jsonp请求
     *
     * @param  {string} url
     * @param  {Object} data
     * @return {Promise}
     */
    function getJsonp(url, data, timeout) {
        return $.ajax({
            url: url,
            data: data,
            dataType: 'jsonp',
            timeout: timeout
        });
    }

    exports.post = post;

    /**
     * 获取地区列表
     *
     * @param {Object} data
     * @property {?string} data.level 0：全国 1: 省 2：市 3：区 4：县
     * @property {?string} data.id 父级 ID
     * @property {?boolean} data.includeSubway 是否包含地铁，默认为 false
     * @return {Promise}
     */
    exports.getRegionList = function (data) {

        data = data || {};

        var params = { };

        if (data.id != null) {
            params.p_id = data.id;
        }

        if (data.level != null) {
            params.level = data.level;
        }

        if (!data.includeSubway) {
            params.exclude_subway = 1;
        }

        if (data.filter) {
            params.filter = data.filter;
        }

        return post(
            '/area/list',
            params
        )
        .done(function (response) {
            return {
                code: 0,
                data: {
                    list: response
                }
            };
        });
    };


    /**
     * 获取行业列表
     *
     * @param {Object} data
     * @property {?string} data.id 父级 ID
     * @return {Promise}
     */
    exports.getIndustryList = function (data) {

        var params = {
            p_id: data.id
        };

        return post(
            '/industry/list',
            params
        )
        .done(function (response) {
            return {
                code: 0,
                data: {
                    list: response
                }
            };
        });
    };


    /**
     * 获取职位列表
     *
     * @param {Object} data
     * @property {?string} data.id 父级 ID
     * @return {Promise}
     */
    exports.getJobList = function (data) {

        var params = {
            p_id: data.id
        };

        return post(
            '/job/list',
            params
        )
        .done(function (response) {
            return {
                code: 0,
                data: {
                    list: response
                }
            };
        });
    };

    /**
     * 招聘接口
     * 根据地区id获取该地区全部招聘类型
     * 根据地区id和招聘类型id获取该地区该类型的全部职位
     *
     * 返回数据
     * {
     *    code: 0,
     *    data: [{
     *        name: 技术类
     *        id: 12
     *    },{
     *        name: 销售类
     *        id: 13
     *    }]
     * }
     *
     * @param {Object} data
     * @property {string} data.addId 地区ID
     * @property {string} data.typeId 类型ID
     * @return {Promise}
     */
    exports.getJobInfoList = function (data) {
        return post(
            '/guide/jobList',
            {
                add_id: data.addId,
                type_id: data.typeId
            }
        );
    };

    /**
     * 提交招聘信息
     *
     * 返回数据
     * {
     *    code: 0,
     *    data: {}
     * }
     *
     * @param {Object} data
     * @property {string} data.name 姓名
     * @property {string} data.sex 性别
     * @property {string} data.jobCity 工作地址
     * @property {string} data.jobType 工作类型
     * @property {string} data.jobName 岗位
     * @property {string} data.mobile 手机
     * @property {string} data.education 学历
     * @property {string} data.collegeSchool 本科院校
     * @property {string} data.masterSchool 研究生院校
     * @property {string} data.doctorSchool 博士院校
     * @property {string} data.remark 附加信息
     * @property {string} data.affixUrl 上传的附件地址
     * @return {Promise}
     */
    exports.applyJob = function (data) {
        return post(
            '/guide/applyJob',
            {
                name: data.name,
                sex: data.sex,
                job_city: data.jobCity,
                job_type: data.jobType,
                job_name: data.jobName,
                affix_url: data.affixUrl,
                mobile: data.mobile,
                email: data.email,
                education: data.education,
                college_school: data.collegeSchool,
                master_school: data.masterSchool,
                doctor_school: data.doctorSchool,
                graduate_date: data.gruduateDate,
                remark: data.remark
            }
        );
    };

    /**
     * 设置视频课程封面、简介及价格 添加和修改
     *
     * 返回数据
     * {
     *    code: 0,
     *    data: {
     *        number 视频课的number
     *    }
     * }
     *
     * @param {Object} data
     * @property {number} data.user_number 用户number
     * @property {number} data.number 视频课number,如果增加视频课则不传
     * @property {string} data.title 视频课标题
     * @property {string} data.portrait 视频课封面url
     * @property {string} data.introduce 视频简介
     * @property {number} data.price 视频课价格 为0表示免费
     * @property {number} data.expire_time 过期时间单位为天
     * @property {string} data.subject_id 课程类别
     * @property {number} data.language 视频课语音
     * @property {string} data.label_ids 视频课标签为空格分割的字符串
     * @return {Promise}
     */
    exports.setVideoCourseInfo = function (data, options) {
        return post(
            '/video_course/setcourseinfo',
            {
                user_number: data.userNumber,
                number: data.number,
                title: data.title,
                portrait: data.portrait,
                introduce: data.introduce,
                price: data.price,
                expire_time: data.expireTime,
                subject_id: data.subjectId,
                language: data.language,
                label_ids: data.labelIds,
                price_ios: data.price_ios
            },
            options
        );
    };

    /**
    * 获取视频课在ios设备的价格
    * 返回数据
    * {
    *    "code": 0,
    *    "msg": "succ",
    *    "data": {
    *        "ios_price_Student": "8.00",
    *        "ios_proceeds_Student": 5.6,
    *        "ios_price_Teacher": "6.00",
    *        "ios_proceeds_Teacher": 4.2
    *    },
    *    "ts": 1443061329,
    *    "rid": "03b5b07dd92f917a3112160e5a468a71"
    * }
    * @param {Object} data
    * @property {number} data.price 用户设置的pc和android设备上的价格
    * return {Promise}
    */
    exports.getIosPrice = function(data, options) {
        return post(
            '',
            {
                price: data.price
            }
        );
    };

    /**
     * 设置视频课程详情 添加和修改
     *
     * 返回数据
     * {
     *    code: 0,
     *    data: {
     *    }
     * }
     *
     * @param {Object} data
     * @property {number} data.user_number 用户number
     * @property {number} data.number 视频课number,如果增加视频课则不传
     * @property {string} data.brief 视频课详情
     * @return {Promise}
     */
    exports.setVideoCourseBrief = function (data, options) {
        return post(
            '/video_course/setcoursebrief',
            {
                user_number: data.userNumber,
                number: data.number,
                brief: data.brief
            },
            options
        );
    };

    /**
     * 获取视频课视频上传地址
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *         upload_url: '',
     *         id: ''
     *     }
     * }
     *
     * @param {Object} data
     * @property {string} data.fileName 文件名，如 abc.mp4
     * @property {number} data.fileSize 文件大小
     * @property {number} data.userNumber 用户number
     * @property {?boolean} data.chunk 是否使用分片上传，默认不用
     * @return {Promise}
     */
    exports.getVideoCourseUploadUrl = function (data, options) {

        var params = {
            title: data.fileName,
            total_size: data.fileSize,
            user_number: data.userNumber,
            uploadtype: 1 //解决ie8下上传不了的问题
        };

        /*if (data.chunk) {
            params.uploadtype = 1;
        }*/

        return post(
            '/video_course/getuploadurl',
            params,
            options
        );
    };

    /**
     * 获取视频课视频续传地址
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *         upload_size: 10, // 已上传的大小
     *         upload_url: '',
     *         id: ''
     *     }
     * }
     *
     * @param {Object} data
     * @property {string} data.id 续传 ID
     * @property {string} data.fileName 文件名，如 abc.mp4
     * @property {number} data.fileSize 文件大小
     * @return {Promise}
     */
    exports.getVideoCourseResumeUploadUrl = function (data) {
        return post(
            '/video_course/getresumeuploadurl',
            {
                /*name: data.fileName,
                total_size: data.fileSize,
                uploadtype: 1*/
                'user_number': data.userNumber,
                'video_id': data.videoId
            }
        );
    };

    /**
     * 设置视频课单个课节信息
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *         section_id: '1212'
     *     }
     * }
     *
     * @param {Object} data
     * @property {number} data.userNumber 用户number
     * @property {number} data.number 视频课number
     * @property {number} data.sectionId 视频课课节id
     * @property {number} data.videoId 视频id
     * @property {string} data.name 视频名字
     * @property {number} data.index 视频课位置
     * @property {number} data.payStatus 免费 1，试听 2，收费 3
     * @property {number} data.type 新增 1， 修改 2 ，删除 3
     * @return {Promise}
     */
    exports.setVideoCourseSection = function (data) {

        return post(
            '/video_course/setvideoinfo',
            {
                user_number: data.userNumber,
                number: data.number,
                section_id: data.sectionId,
                video_id: data.videoId,
                name: data.name,
                file_name: data.fileName,
                index: data.index,
                pay_status: data.payStatus,
                type: data.type
            }
        );
    };

    /**
     * 保存视频课全部课节信息,此处只保存排序信息
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *     }
     * }
     *
     * @param {Object} data
     * @property {number} data.userNumber 用户number
     * @property {number} data.number 视频课number
     * @property {array} data.sectionIds 视频课课节id列表
     * @return {Promise}
     */
    exports.setAllVideoCourseSection = function (data) {

        return post(
            '/video_course/resetvideopos',
            {
                user_number: data.userNumber,
                number: data.number,
                section_ids: data.sectionIds
            }
        );
    };

    /**
     * 发布或保存至待发布视频课
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *     }
     * }
     *
     * @param {Object} data
     * @property {number} data.userNumber 用户number
     * @property {number} data.number 视频课number
     * @property {number} data.type  1发布 2保存至待发布 3下架 4取消显示在主页 5保存在主页
     * @return {Promise}
     */
    exports.saveVideoCourse = function (data) {

        return post(
            '/video_course/setcoursestatus',
            {
                user_number: data.userNumber,
                number: data.number,
                type: data.type
            }
        );
    };
    /**
     * 学生添加免费课到我的视频课
     *
     * 返回数据
     * {
     *    code: "100037",
     *    msg : "该视频不死免费课程",
     *    data: "",
     *    ts: '1423019308'
     * }
     *
     * @param {Object} data
     * @property {course_number} data.course_number 视频课number
     * @return {Promise}
     */
    exports.addFreeVideoCourse = function (data, options) {
        return post(
            '/video_course/addfree',
            {
                course_number: data.courseNumber
            },
            {
                sync: true,
                errorHandler: options && options.errorHandler
            }
        );
    };

    /**
     * 统计老师详情页访问量
     *
     * @param {number|string} teacherId 教师 id
     * @return {Promise}
     */
    exports.viewTeacher = function (data) {
        return post(
            '/track/teacher_view',
            {
                identity: data.teacherId
            }
        );
    };
    /**
     * 老师后台删除邀请评价
     *
     * @param {number|string} commentId 评价 id
     * @return {Promise}
     */
    exports.delInviteComment = function (data) {
        return post(
            '/comment/del',
            {
                comment_id: data.commentId
            }
        );
    };
    /**
     * 给老师点赞
     *
     * @param {number|string} teacher_id 教师 id
     * @return {Promise}
     */
    exports.praiseTeacher = function (teacher_id) {
        return post(
            '/teacher/praise',
            {
                teacher_id: teacher_id
            }
        );
    };
    /**
     * 收藏老师
     *
     * @param {number|string} teacher_id 教师 id
     * @return {Promise}
     */
    exports.addFavouriteTeacher = function (teacher_id,options) {
        return post(
            '/student_center/addFavouriteTeacher',
            {
                teacher_id: teacher_id
            },
            options

        );
    };
    /**
     * 取消收藏老师
     *
     * @param {number|string} teacher_id 教师 id
     * @return {Promise}
     */
    exports.delFavouriteTeacher = function (teacher_id) {
        return post(
            '/student_center/delFavouriteTeacher',
            {
                teacher_id: teacher_id
            }
        );
    };

    /**
     * 快速帮我找老师
     *
     * 返回数据
     * {
     *     code: 200001,
     *     msg: "comment exist already",
     *     data: "",
     *     ts: 14123123
     * }
     *
     * @param {Object} data
     * @property {string} data.url
     * @property {string} data.user_name 用户名
     * @property {string} data.mobile 联系方式
     * @property {string} data.course_name 课程名称
     * @property {string} data.lesson_way 上课方式
     * @return {Promise}
     */
    exports.recommendAddRecord = function (data) {

        return post(
            '/recommend/addRecord',
            {
                teacher_id: data.teacherId,
                user_name: data.userName,
                mobile: data.mobile,
                course_name: data.courseName,
                lesson_way: data.lessonWay,
                info: data.info
            }
        );

    };
    /**
     * 地图找老师
     *
     * @param {Object} data
     * @property {string} data.q 搜索词
     * @property {string} data.course 课程id,多个值用逗号分隔,也可以为_all
     * @property {string} data.area 地域id,多个值用逗号分隔,也可以为_all
     * @property {string} data.approach 上课方式同上
     * @property {string} data.date 上课时间同上
     * @property {string} data.sex 性别
     * @property {string} data.teacher_type 老师类别
     * @property {string} data.sort 排序规则,可选值all,price_asc,price_desc,popular,comment
     * @property {string} data.video 是否有视频 1/0
     * @property {string} data.video_course 是否有视频课1/0
     * @property {string} data.class_course 是否有班课1/0
     * @property {number} data.price_start 最低价格
     * @property {number} data.price_end 最高价格
     * @property {number} data.longitude 经度
     * @property {number} data.latitude 纬度
     * @property {number} data.radius 半径
     * @property {number} data.min_price_first 第一次搜索时的价格最小值
     * @property {number} data.max_price_first 第一次搜索时的价格最大值
     * @property {number} data.page 第几页
     * @property {number} data.page_size 一页有多少条数据
     * @property {number} data.ajax 为1代表异步
     * @return {Promise}
     */
    exports.searchMapTeacher = function (data) {

        return post(
            '/teacher/mapSearch',
            {
                q: data.q,
                course: data.course,
                area: data.area,
                approach: data.approach,
                date: data.date,
                sex: data.sex,
                teacher_type: data.teacherType,
                sort: data.sort,
                video: data.video,
                video_course: data.videoCourse,
                class_course: data.classCourse,
                price_start: data.priceStart,
                price_end: data.priceEnd,
                longitude: data.longitude,
                latitude: data.latitude,
                radius: data.radius,
                min_price_first: data.minPriceFirst,
                max_price_first: data.maxPriceFirst,
                page: data.page,
                page_size: data.pageSize,
                ajax: 1
            }
        );

    };
    /**
     * 评价老师或者评价学生
     *
     * 返回数据
     * {
     *     code: 200001,
     *     msg: "comment exist already",
     *     data: "",
     *     ts: 14123123
     * }
     * @param  {string} url  [评价的url]
     * @param  {object} data [评价的数据]
     * purchase_id  订单ID
     * info : info  评价内容
     * total_score  总评星级
     * photo_list:  评论晒图[{'storage_id' => 123,'title' => '图片名称'},{'storage_id' => 123,'title' => '图片名称'}]
     * @return {Promise}
     */
    exports.sendComment = function (url, data, options) {
        return post(url, data, options);
    };

    /**
     * 获得上课数据，即某个日期老师是否上课，跟谁上了课
     *
     * 返回数据
     * {
     *    code: 0,
     *    data: {
     *        lessons: {
     *            "2014-08-15": [
     *                {
     *                    "start_time" => "2014-08-29 06:00:00",
     *                    "end_time" => "2014-08-29 07:00:00",
     *                    "user_type" => 0,
     *                    "teacher_name" => "李老师",
     *                    "student_name" => "李学生"
     *                },
     *                {
     *                    "start_time" => "2014-08-29 06:00:00",
     *                    "end_time" => "2014-08-29 07:00:00",
     *                    "user_type" => 0,
     *                    "teacher_name" => "李老师",
     *                    "student_name" => "李学生"
     *                },
     *                {
     *                    "start_time" => "2014-08-29 06:00:00",
     *                    "end_time" => "2014-08-29 07:00:00",
     *                    "user_type" => 0,
     *                    "teacher_name" => "李老师",
     *                    "student_name" => "李学生"
     *                }
     *            ]
     *        },
     *        flags: {
     *            "2014-08-15": [ 1, 0, 1 ]
     *        }
     *    }
     * }
     *
     * @param {Object} data
     * @property {string} data.purchaseId 订单 ID
     * @property {string} date.startDate 开始日期，如 '2014-08-15'
     * @property {string} date.endDate 结束日期，如 '2014-08-20'
     * @return {Promise}
     */
    exports.getLessons = function (data) {
        return post(
            '/lesson/reserveLessonAjaxCal',
            {
                purchase_id: data.purchaseId,
                start_date: data.startDate,
                end_date: data.endDate
            }
        );
    };

    /**
     * 获得课程的最大可重复次数 - 废弃
     *
     * 返回数据
     * {
     *    code: 0,
     *    data: {
     *        times: 10
     *    }
     * }
     *
     * @param {Object} data
     * @property {string} data.purchaseId 订单 ID
     * @property {string} data.startTime 上课开始时间，如 '2014-08-15 12:00:00'
     * @property {string} data.endTime 上课结束时间，如 '2014-08-15 14:00:00'
     * @property {string} data.interval 重复周期，如 7 表示一周（隔 7 天再上一次）
     * @return {Promise}
     */
    exports.getCourseRepeatTimes = function (data) {
        return post(
            '/lesson/reserveLessonAjaxTimes',
            {
                purchase_id: data.purchaseId,
                start_time: data.startTime,
                end_time: data.endTime,
                interval: data.interval
            }
        );
    };

    /**
     * 约课校验，判断上课时间是否冲突 - 废弃
     *
     * 返回数据
     * {
     *    code: 0,
     *    data: {
     *        conflict_lessons: [ ]
     *    }
     * }
     *
     * @param {Object} data
     * @property {string} data.purchaseId 订单 ID
     * @property {string} data.startTime 上课开始时间，如 '2014-08-15 12:00:00'
     * @property {string} data.endTime 上课结束时间，如 '2014-08-15 14:00:00'
     * @property {number} data.interval 重复周期，如 7 表示一周（隔 7 天再上一次）
     * @property {number} data.repeatTimes 重复次数
     * @property {string} data.note 备注信息
     * @property {string} data.locationAddr 新上课地址，详细地址 [可选]
     * @return {Promise}
     */
    exports.checkReserve = function (data) {
        return post(
            '/lesson/reserveLessonAjaxCheckForm',
            {
                purchase_id: data.purchaseId,
                start_time: data.startTime,
                end_time: data.endTime,
                interval: data.interval,
                repeat_times: data.repeatTimes,
                note: data.note,
                address: data.locationAddr
            }
        );
    };

    /**
     * 约课 bak
     *
     * 返回数据
     * {
     *    code: 0
     * }
     *
     * @param {Object} data
     * @property {string} data.purchaseId 订单 ID
     * @property {string} data.startTime 上课开始时间，如 '2014-08-15 12:00:00'
     * @property {string} data.endTime 上课结束时间，如 '2014-08-15 14:00:00'
     * @property {number} data.interval 重复周期，如 7 表示一周（隔 7 天再上一次）
     * @property {number} data.repeatTimes 重复次数
     * @property {string} data.note 备注信息
     * @property {number} data.addrRadio 上课地点选项
     * @property {number} data.addressId 地址薄某地址
     * @property {number} data.areaId  新地址 - area_id [可选]
     * @property {string} data.locationAddr 新地址 - 详细地址 [可选]
     * @property {number} data.lng 新地址 - 经纬度 [可选]
     * @property {number} data.lat 新地址 - 经纬度 [可选]
     * @property {number} data.asRegularAddress,   1:设为默认地址，0：不设为默认地址​ [可选]
     * @return {Promise}

    exports.reserve = function (data) {
        return post(
            '/lesson/reserveLessonAjaxForm',
            {
                purchase_id: data.purchaseId,
                start_time: data.startTime,
                end_time: data.endTime,
                interval: data.interval,
                repeat_times: data.repeatTimes,
                note: data.note,
                use_regular_addr: data.addrRadio,
                address_id: data.addressId,
                area_id: data.areaId,
                address: data.locationAddr,
                lng: data.lng,
                lat: data.lat,
                as_regular_address: data.asRegularAddress
            }
        );
    };
     */


    /**
     * 约课
     *
     * 返回数据
     * {
     *    code: 0
     * }
     *
     * @param {Object} data
     * @property {string} data.purchaseId 订单 ID
     * @property {string} data.note 备注信息
     * @property {number} data.addrRadio 上课地点选项
     * @property {number} data.addressId 地址薄某地址
     * @property {number} data.areaId  新地址 - area_id [可选]
     * @property {string} data.locationAddr 新地址 - 详细地址 [可选]
     * @property {number} data.lng 新地址 - 经纬度 [可选]
     * @property {number} data.lat 新地址 - 经纬度 [可选]
     * @property {number} data.asRegularAddress,   1:设为默认地址，0：不设为默认地址​ [可选]
     * @property {number} data.forceSave,   1:强制保存
     * @property {number} data.courses, 预约课程列表[{...},{...}]
     *          {
     *              cid: data.cid,                  预约记录索引，方便定位冲突显示
     *              start_date: data.startDate,     上课开始日期，如 '2014-8-5'
     *              end_date: data.endDate,         上课结束日期，如 '2014-8-10'
     *              start_time: data.startTime,     上课开始时间，如 '12:00'
     *              end_time: data.endTime,         上课结束时间，如 '14:00'
     *              interval: data.interval,        重复周期，0只上一次 1每天都上 7每周都上
     *              weekday: data.weekday,        每周重复星期 如[6, 7] 周六 周日 有课
     *              repeat_times: data.repeatTimes, 上课次数
     *          }
     * @return {Promise}
     */
    exports.reserve = function (data, options) {
        return post(
            '/lesson/reserveLessonAjaxForm',
            {
                purchase_id: data.purchaseId,
                note: data.note,
                use_regular_addr: data.addrRadio,
                address_id: data.addressId,
                area_id: data.areaId,
                address: data.locationAddr,
                lng: data.lng,
                lat: data.lat,
                as_regular_address: data.asRegularAddress,
                courses: data.courses,
                force_save: data.forceSave
            },
            options
        );
    };

    /**
     * 获得学生上课信息
     *
     * 返回数据
     * {
     *    code: 0,
     *    data: {
     *        "2014-08-15": 1,
     *        "2014-08-16": 2,
     *        "2014-08-17": 4
     *    }
     * }
     *
     * @param {Object} data
     * @property {string} data.startDate 上课开始时间，如 '2014-08-15'
     * @property {string} data.endDate 上课结束时间，如 '2014-08-15'
     * @return {Promise}
     */
    exports.getStudentLessons = function (data) {
        return post(
            '/lesson/studentLessons',
            {
                start_time: data.startDate + ' 00:00:00',
                end_time: data.endDate + ' 00:00:00'
            }
        );
    };

    /**
     * 获得老师上课信息
     *
     * 返回数据
     * {
     *    code: 0,
     *    data: {
     *        "2014-08-15": 1,
     *        "2014-08-16": 2,
     *        "2014-08-17": 4
     *    }
     * }
     *
     * @param {Object} data
     * @property {string} data.startDate 上课开始时间，如 '2014-08-15'
     * @property {string} data.endDate 上课结束时间，如 '2014-08-15'
     * @return {Promise}
     */
    exports.getTeacherLessons = function (data) {
        return post(
            '/lesson/teacherLessons',
            {
                start_time: data.startDate + ' 00:00:00',
                end_time: data.endDate + ' 00:00:00'
            }
        );
    };

    /**
     * 学生获得老师列表数据
     *
     * 返回数据
     * {
     *    code: 0,
     *    data: {
     *        tpl: {
     *            person_list: ''
     *        }
     *    }
     * }
     *
     * @param {Object} data
     * @property {number} data.page 页码
     * @property {number} data.status 0:当期老师, 1:往期老师
     * @return {Promise}
     */
    exports.getTeacherList = function (data) {
        return post(
            '/student_center/teacher',
            {
                page: data.page,
                status: data.status
            }
        );
    };

    /**
     * 是否接受机构的邀请
     *
     * 返回数据
     * {
     *    code: 0,
     *    data: {
     *    }
     * }
     *
     * @param {Object} data
     * @property {number} data.shieldStatus 0:接受机构邀请, 1:不接受机构邀请
     * @return {Promise}
     */
    exports.shieldInvite = function (data) {
        return post(
            '/teacher_center/shieldInvite',
            {
                shield_status: data.shieldStatus
            }
        );
    };

    /**
     * 接受or取消机构的邀请
     *
     * 返回数据
     * {
     *    code: 0,
     *    data: {
     *    }
     * }
     *
     * @param {Object} data
     * @property {number} data.id 邀请id
     * @property {number} data.status 1:接受机构邀请, 2:不接受机构邀请
     * @return {Promise}
     */
    exports.setOrgInvite = function (data, options) {

        options && (
            options = { errorHandler: options.errorHandler }
        )

        return post(
            '/teacher_center/dealOrgInvite',
            {
                id: data.id,
                status: data.status
            },
            options
        );
    };
    /**
     * 老师中心机构列表获取机构信息
     *
     * 返回数据
     * {
     *    code: 0,
     *    data: {
            tpl: ''
     *    }
     * }
     *
     * @param {Object} data
     * @property {number} data.status 1邀请记录  2已解约
     * @property {number} data.page 第几页
     * @property {number} data.page_size 每页多少条
     * @return {Promise}
     */
    exports.getOrgList = function (data) {
        return post(
            '/teacher_center/orgList',
            {
                number: data.number,
                status: data.status,
                page: data.page,
                page_size: data.pageSize
            }
        );
    };

    /**
     * 老师获得学生列表数据
     *
     * 返回数据
     * {
     *    code: 0,
     *    data: {
     *        tpl: {
     *            person_list: ''
     *        }
     *    }
     * }
     *
     * @param {Object} data
     * @property {number} data.page 页码
     * @property {number} data.status 0:当期学生, 1:往期学生
     * @return {Promise}
     */
    exports.getStudentList = function (data) {
        return post(
            '/teacher_center/student',
            {
                page: data.page,
                status: data.status
            }
        );
    };

    /**
     * 取消对话框(取消订单，取消约课，申诉)
     *
     * 返回数据
     * {
     *    code: 0,  成功
     * }
     *
     * @param {Object} data
     * @property {string} data.url
     * @property {number} data.reason 用户提交的反馈信息下拉菜单状态码
     * @property {number} data.reason_text 用户提交的反馈信息textarea
     * @return {Promise}
     */
    exports.cancelOrderByUrl = function (data) {

        var url = data.url;
        delete data.url;

        return post(url, data);
    };

    /**
     * 我的学生页面 点击查看订单 加载某个老师订单列表
     *
     * 返回数据
     * {
     *    code: 0,  // 成功
     *    data: {
     *        tpl: {
     *            order_list: ''
     *        }
     *    }
     * }
     *
     * @param {Object} data
     * @property {string} data.number 老师的 number
     * @property {number} data.status  0：当期老师 1往期老师
     * @return {Promise}
     */
    exports.getTeacherOrderList = function (data) {
        return post(
            '/lesson/myTeacherDetail',
            {
                teacher_number: data.number,
                status: data.status
            }
        );
    };

    /**
     * 我的老师 点击查看订单 加载某个学生订单列表
     *
     * 返回数据
     * {
     *    code: 0,  // 成功
     *    data: {
     *        tpl: {
     *            order_list: ''
     *        }
     *    }
     *
     * }
     *
     * @param {Object} data
     * @property {string} data.number 学生的number
     * @property {number} data.status  0当期学生 1往期学生
     * @return {Promise}
     */
    exports.getStudentOrderList = function (data) {
        return post(
            '/lesson/myStudentDetail',
            {
                student_number: data.number,
                status: data.status
            }
        );
    };

    /**
     * 验证手机号是否属于当前用户
     *
     * 返回数据
     * {
     *    code: 0,
     *    data: '发送成功'
     * }
     *
     * @param {Object} data
     * @property {string} data.mobile 手机号，如 '15210651512'
     * @return {Promise}
     */
    exports.validateMobile = function (data) {
        return post(
            '/user/validateMobile',
            {
                mobile: data.mobile
            },
            {
                sync: true
            }
        );
    };

    /**
     * 验证登录密码是否属于当前用户
     *
     * 返回数据
     * {
     *    code: 0,
     *    data: '发送成功'
     * }
     *
     * @param {Object} data
     * @property {string} data.password 登录密码，如 '123qwe'
     * @return {Promise}
     */
    exports.Password = function (data) {
        return post(
            '/user/validatePassword',
            {
                mobile: data.password
            },
            {
                sync: true
            }
        );
    };

    /**
     * 验证邮箱是否属于当前用户
     *
     * 返回数据
     * {
     *    code: 0,
     *    data: '发送成功'
     * }
     *
     * @param {Object} data
     * @property {string} data.email 邮箱，如 '1234@qq.com'
     * @return {Promise}
     */
    exports.validateEmail = function (data) {
        return post(
            '/user/validateEmail',
            {
                mobile: data.email
            },
            {
                sync: true
            }
        );
    };

    /**
     * 发送手机验证码
     *
     * 返回数据
     * {
     *    code: 0,
     *    data: '发送成功'
     * }
     *
     * @param {Object} data
     * @property {string} data.mobile 手机号，如 '15210651512'
     * @return {Promise}
     */
    exports.sendMobileCode = function (data) {
        return post(
            '/teacher_center/account_ajax?action=verifymobile',

            {
                mobile: data.mobile
            }
        );
    };

    /**
     * 发送手机验证码——支付密码专用
     * 原接口 /user/verify_mobile
     *
     * 返回数据
     * {
     *    code: 0,
     *    data: '发送成功'
     * }
     *
     * @param {Object} data
     * @property {string} data.mobile 手机号，如 '15210651512'
     * @return {Promise}
     */
    exports.sendPayMobileCode = function (data) {
        return post(
            '/pay/verifyMobile',
            {
                mobile: data.mobile
            }
        );
    };

    /**
     * 发送邮箱验证码
     *
     * 返回数据
     * {
     *    code: 0,
     *    data: '发送成功'
     * }
     *
     * @param {Object} data
     * @property {string} data.email 邮箱，如 '1234567@qq.com'
     * @return {Promise}
     */
    exports.sendEmailCode = function (data) {
        return post(
            '/teacher_center/account_ajax?action=verifyemail',
            {
                email: data.email
            }
        );
    };


    /**
     * 获取 我的课程 json数据
     *
     * 返回数据
     * {
     *    code: 0,
     *    data: {
     *        "lessons": [
     *            {
     *                "lesson": {
     *                    "course": "latin-lorem",
     *                    "lesson_way": "online",
     *                    "start_time": "2014-01-07 09:00:00",
     *                    "end_time": "2014-01-07 11:00:00",
     *                    "status_display": "待上课"
     *                 },
     *                 "user": {
     *                     "avatar": "http://test.storage.genshuixue.com/getfile.php?fid=274&sn=radb11a5",
     *                     "name": "lorem",
     *                 }
     *            }
     *        ],
     *        "length": 99,
     *    }
     * }
     *
     * @property {string}
     * @return {Promise}
     */
    exports.getCourseList = function () {
        return post(
            '/lesson/list'
        );
    };

    /**
     * 获取科目列表
     *
     * 返回数据：
     * {
     *    code: 0,
     *    data: {
     *        level: 1,
     *        list: [
     *            { name: '语文', id: 123123 },
     *            ...
     *        ]
     *    }
     * }
     *
     * @param {Object} data
     * @param {?string} data.id 父科目 ID，如果不传，返回第一级科目列表
     * @return {Promise}
     */
    exports.getSubjectList = function (data) {

        return post(
            '/subject/getList',
            {
                id: data.id
            }
        );
    };

    /**
     * 帮我找老师 - 推荐科目列表
     *
     * 返回数据：
     * {
     *    code: 0,
     *    data: {
     *        level: 1,
     *        list: [
     *            { name: '语文', id: 123123 },
     *            ...
     *        ]
     *    }
     * }
     *
     * @param {Object} data
     * @param {?string} data.id 父科目 ID，如果不传，返回第一级科目列表
     * @param {number} data.cityId 当前城市ID
     * @return {Promise}
     */
    exports.getRecommendSubjectList = function (data) {

        return post(
            '/recommend/subjectList',
            {
                id: data.id,
                city_id: data.cityId
            }
        );
    };

    /**
     * 获取老师的课程列表（视频课，线下班课，在线直播）
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *         tpl: 'html'
     *     }
     * }
     *
     * @param {Object} data
     * @property {string} data.teacherNum 老师 ID
     * @property {number} data.page 页码
     * @property {number} data.pageSize 每页的条数
     * @property {string} data.courseType 课程类型 2在线直播  3 线下班课 4 视频课
     * @property {string} data.sortBy 排序方式，begin_time 最近开课 update_time 最近发布
     * @property {string} data.isDefault 是否是默认排序,只针对班课
     * @property {string} data.isPreview 是否是预览
     * @return {Promise}
     */
    exports.getTeacherCourseList = function (data) {
        return post(
            '/teacher/courseList',
            {
                teacher_number: data.teacherNum,
                page: data.page,
                page_size: data.pageSize,
                course_type: data.courseType,
                sort_by: data.sortBy,
                is_default: data.isDefault,
                render_type: 'ajax_tpl',
                is_preview: data.isPreview
            }
        );
    };

    /**
     * 获取一对一课程评价数据
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *         tpl: 'html'
     *     }
     * }
     *
     * @param {Object} data
     * @property {string} data.teacherNum 老师 ID
     * @property {number} data.page 页码
     * @property {number} data.pageSize 每页的条数
     * @property {string} data.courseType 课程类型 2在线直播  3 线下班课 4 视频课
     * @property {string} data.sortBy 排序方式，begin_time 最近开课 update_time 最近发布
     * @property {string} data.isDefault 是否是默认排序,只针对班课
     * @property {string} data.isPreview 是否是预览
     * /mock/comment/fromOne2oneClassAjax.php    /comment/from1v1StudentAjax
     * @return {Promise}
     */
    exports.getOne2oneCourseList = function (data) {
        return post(
            '/comment/from1v1StudentAjax',
            {
                teacher_number: data.teacherNum,
                page: data.page,
                page_size: data.pageSize,
                course_type: data.courseType,
                sort_by: data.sortBy,
                is_default: data.isDefault,
                render_type: 'ajax_tpl',
                is_preview: data.isPreview,
                number: data.number,
                face_type: data.face
            }
        );
    };
    /**
     * 获取老师的视频和图片
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *         tpl: 'html'
     *     }
     * }
     *
     * @param {Object} data
     * @property {string} data.teacherNum 老师 ID
     * @property {number} data.page 页码
     * @property {number} data.pageSize 每页的条数
     * @property {string} data.showType 模板类型 1 主页模板 2 分tab模板
     * @return {Promise}
     */
    exports.getTeacherVideoPhotoList = function (data) {
        return post(
            '/teacher/videoPhotoList',
            {
                teacher_number: data.teacherNum,
                page: data.page,
                page_size: data.pageSize,
                show_type: data.showType,
                render_type: 'ajax_tpl'
            }
        );
    };
    /**
     * 获取老师的评论列表（学生评价老师）
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *         tpl: {
     *             comment_overview: 'html',
     *             comment_list: 'html'
     *         }
     *     }
     * }
     *
     * @param {Object} data
     * @property {string} data.teacherId 老师 ID
     * @property {number} data.face 评论类型： 1 好评 2 中评 3 差评
     * @property {number} data.comment 评论分类： 0 全部评价 2 订单评价 3 邀请评价
     * @property {number} data.page 页码
     * @property {number} data.pageSize 每页的评论数量
     * @property {string} data.sortBy 排序方式，display_order 推荐排序 create_time 最近评价
     * @return {Promise}
     */
    exports.getTeacherCommentList = function (data) {
        return post(
            '/comment/fromStudentAjax',
            {
                teacher_number: data.teacherNum,
                page: data.page,
                page_size: data.pageSize,
                face_type: data.face,
                comment_type: data.comment,
                render_type: 'ajax_tpl',
                sort_by: data.sortBy
            }
        );
    };

    /**
     * 获取老师的评论列表（学生评价老师）
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *         tpl: {
     *             comment_overview: 'html',
     *             comment_list: 'html'
     *         }
     *     }
     * }
     *
     * @param {Object} data
     * @property {string} data.teacherId 老师 ID
     * @property {number} data.face 评论类型： 1 好评 2 中评 3 差评
     * @property {number} data.comment 评论分类： 0 全部评价 2 订单评价 3 邀请评价
     * @property {number} data.page 页码
     * @property {number} data.pageSize 每页的评论数量
     * @property {string} data.sortBy 排序方式，display_order 推荐排序 create_time 最近评价
     * @property {string} data.commentTag 评价标签 － 与排序互斥
     * @property {string} data.pageType 页面类型 one2one一对一课程详情页
     * @return {Promise}
     */
    exports.getTeacherCommentListNew = function (data) {
        return post(
            '/comment/fromStudentAjaxNew',
            {
                teacher_number: data.teacherNum,
                page: data.page,
                page_size: data.pageSize,
                face_type: data.face,
                comment_type: data.comment,
                render_type: 'ajax_tpl',
                sort_by: data.sortBy,
                comment_tag: data.commentTag,
                page_type: data.pageType
            }
        );
    };

    /**
     * 获取老师的班课评论列表
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *         tpl: {
     *             comment_overview: 'html',
     *             comment_list: 'html'
     *         }
     *     }
     * }
     *
     * @param {Object} data
     * @property {string} data.teacherId 老师 ID
     * @property {number} data.face 评论类型： 1 好评 2 中评 3 差评
     * @property {number} data.number 班课number
     * @property {number} data.comment 评论分类： 0 全部评价 2 订单评价 3 邀请评价
     * @property {number} data.page 页码
     * @property {number} data.pageSize 每页的评论数量
     * @return {Promise}
     */
    exports.getCourseCommentList = function (data) {
        return post(
            '/comment/fromClassStudentAjax',
            {
                teacher_number: data.teacherNum,
                page: data.page,
                page_size: data.pageSize,
                face_type: data.face,
                number: data.number,
                comment_type: data.comment,
                render_type: 'ajax_tpl'
            }
        );
    };

    /**
     * 获取机构的评论列表
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *         tpl: {
     *             comment_nav: 'html',
     *             comment_list: 'html'
     *         }
     *     }
     * }
     *
     * @param {Object} data
     * @property {string} data.orgId 机构 ID
     * @property {string} data.orgNumber 机构 number
     * @property {number} data.faceType 评论类型：0 全部评价 1 好评 2 中评 3 差评 4 邀请评价
     * @property {number} data.type 课程类型
     * @property {number} data.subject 课程类目
     * @property {string} data.sortby 排序方式 display_order 推荐排序  create_time 最近评价
     * @property {number} data.page 页码
     * @property {number} data.pageSize 每页的评论数量
     * /mock/comment/fromOrgCommentAjax.php    /org/index_comment
     * @return {Promise}
     */
    exports.getOrgCommentList = function (data) {
        return post(
            '/org/index_comment',
            {
                org_id: data.orgId,
                org_number: data.orgNumber,
                page: data.page,
                page_size: data.pageSize,
                face_type: data.faceType,
                comment_type: data.type,
                subject: data.subject,
                sort_by: data.sortby,
                render_type: 'ajax_tpl'
            }
        );
    };

    /**
     * 获取机构的课程类目下拉菜单项
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *         subjects: {
     *
     *         }
     *     }
     * }
     *
     * @param {Object} data
     * @property {string} data.orgNumber 机构 number
     * @return {Promise}
     * /mock/org/getSubjectListAjax.php    /org/subject
     */
    exports.getOrgSubjectList = function (data) {
        return post(
            '/org/subject',
            {
                number: data.orgNumber
            }
        );
    };

    /**
     * 获取视频课评论列表 ajax
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *         tpl: {
     *             comment_overview: 'html',
     *             comment_list: 'html'
     *         }
     *     }
     * }
     *
     * @param {Object} data
     * @property {string} data.courseNum 视频课number
     * @property {number} data.page 页码
     * @property {number} data.pageSize 每页的评论数量
     * @property {number} data.commentTag 标签
     * @property {number} data.faceType 好中差评
     * @return {Promise}
     */
    exports.getVideoCourseCommentList = function (data) {
        return post(
            '/comment/getTeacherVideoCommentAjax',
            {
                course_number: data.courseNum,
                page: data.page,
                page_size: data.pageSize,
                comment_tag: data.commentTag,
                face_type: data.faceType,
                render_type: 'ajax_tpl'
            }
        );
    };

    /**
     * 获取用户角色信息
     *
     * 返回数据：
     * {
     *     code: 0,   成功
     *     data: {
     *         roles: ["1","0"]
     *     }
     * }
     *
     * @return {Promise}
     */
    exports.getUserType = function () {
        return post(
            '/user/roles'
        );
    };

    /**
     * 获取用户基本信息，
     *
     * 如果传 userId 和 userType 表示获取指定用户的信息
     *
     * 如果不传，表示获取当前 session 用户的信息
     *
     * 返回数据：
     * {
     *     code: 0, 成功
     *     data: {
     *         mobile: "123",
     *         user_type: "2",
     *         user_id: "123",
     *         avatar: "url",
     *         user_name: "name",
     *         user_name_cut: "name",
     *         user_number: "123",
     *         org_id: "23" // 机构number 0为非机构
     *     }
     * }
     *
     * @param {?Object} data 可不传
     * @property {string} data.userId
     * @property {string} data.userType
     */
    exports.getUserBasicInfo = function (data) {

        var params;

        if (data && data.userId != null && data.userType != null) {
            params = {
                user_id: data.userId,
                user_type: data.userType
            };
        }

        return post(
            '/user/basicInfo',
            params
        );
    };

    /**
     * 提交邀请码 - 切换身份
     *
     * 返回数据：
     * {
     *     code: 0,   成功
     * }
     *
     * @param {Object} data
     * @property {string} data.inviteCode  邀请码
     * @property {string} data.role        目标角色类型  0: 老师, 2： 学生
     * @property {Object}  data.formData  伴随这邀请码发送到后端的登录信息
     * @property {?string} data.formData.username  登录数据中的手机号码
     * @property {?string} data.formData.next    登录之后跳转的url
     * @property {?string} data.formData.password 如果是密码登录的话就有这个
     * @property {?string} data.formData.verifycode 如果是短信校验码就有这个
     * @property {?string} data.formData.usertype 0,老师，1 学生
     * @return {Promise}
     */
    exports.sendInviteCode = function (data) {
        var postData = $.extend(data.formData || {}, {
            invite_code: data.inviteCode,
            role: data.role
        });

        return post(
            '/user/switch_role_ajax',
            postData
        );
    };

    /**
     * 登录后切换身份
     *
     * @param {Object} data
     * @property {number} data.role 切换的身份，0 老师 2 学生
     * @property {string=} data.inviteCode 邀请码
     * @return {Promise}
     */
    exports.switchRole = function (data) {
        return post(
            '/user/switch_role_ajax',
            {
                role: data.role,
                invite_code: data.inviteCode
            }
        );
    };

    /**
     * 获取视频上传地址
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *         upload_url: '',
     *         id: ''
     *     }
     * }
     *
     * @param {Object} data
     * @property {string} data.fileName 文件名，如 abc.mp4
     * @property {number} data.fileSize 文件大小
     * @property {?boolean} data.chunk 是否使用分片上传，默认不用
     * @return {Promise}
     */
    exports.getUploadVideoUrl = function (data) {

        var params = {
            name: data.fileName,
            total_size: data.fileSize
        };

        if (data.chunk) {
            params.uploadtype = 1;
        }

        return post(
            '/video/getUploadUrl',
            params
        );
    };

    /**
     * 获取视频续传地址
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *         upload_size: 10, // 已上传的大小
     *         upload_url: '',
     *         id: ''
     *     }
     * }
     *
     * @param {Object} data
     * @property {string} data.id 续传 ID
     * @property {string} data.fileName 文件名，如 abc.mp4
     * @property {number} data.fileSize 文件大小
     * @return {Promise}
     */
    exports.getResumeUploadVideoUrl = function (data) {
        return post(
            '/video/getResumeUploadUrl/' + data.id,
            {
                name: data.fileName,
                total_size: data.fileSize,
                uploadtype: 1
            }
        );
    };

    /**
     * 发送手机验证码
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     * @property {string} data.mobile 手机号码
     * @return {Promise}
     */
    exports.sendNormalSMSCode = function (data) {
        return post(
            '/auth/sendNormalSMSCode',
            {
                mobile: data.mobile
            }
        );
    };

    /**
     * 用于带有图形验证码的获取短信验证码的接口
     * 这里后端的校验逻辑是先判断是否登录，若未登录，则图形验证码是必须的
     * 未登录且没有图形验证码的场景还是用原来的sendNormalSMSCode
     * @param  {string} data.mobile 手机号码
     * @param  {?string=} data.captcha 图形验证码
     * @param  {string=} data.type 一些活动注册时需要走这个接口强制发送语音验证码 值为'activity_voice'
     * @return {JQ Promise}
     */
    exports.sendSMSCode = function (data) {
        return post(
            '/auth/sendSMSCode2',
            {
                mobile: data.mobile,
                captcha: data.captcha,
                captcha_name: data.captchaName,
                type: data.type
            }
        );
    };


    /**
     * 发送登录手机验证码
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     * @property {string} data.mobile 手机号码
     * @return {Promise}
     */
    exports.sendLoginSMSCode = function (data) {
        return post(
            '/auth/sendLoginSMSCode',
            {
                mobile: data.mobile
            }
        );
    };

     /**
     * 获取手机验证码
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * 如果返回的code 1000111表示要输入图形验证码
     *
     * @param {Object} data
     * @property {string} data.mobile 手机号码
     * @property {string} data.type 获取验证码的类型 'common'|'register'|'forgetPassword'|'voice'|'change_pay_password'
     * @property {=string} data.captcha 图形验证码
     * @property {=string} data.captcha_name 与请求图片验证码的key一致
     * @return {Promise}
     */
    exports.getSMSCode = function (data, options) {

        return post(
            '/sms/send',
            {
                mobile: data.mobile,
                type: data.type || 'common',
                captcha: data.captcha || '',
                is_voice: data.is_voice || 0,
                captcha_name: data.captcha_name || data.type || 'common'
            },
            options
        );
    };

    /**
     * 传统方式：手机+密码 登录
     *
     * 返回数据：
     * {
     *      code: 0
     * }
     *
     * @param {Object} data
     * @property {number} data.userType 以什么身份登录 0:老师 2:学生
     * @property {string} data.mobile
     * @property {string} data.password
     * @property {string} data.rememberMe 是否记住我，取值是 on off
     * @property {string=} data.captcha 图形验证码
     * @property {string=} data.captchaName 图形验证码名称
     * @return {Promise}
     */
    exports.loginByPassword = function (data) {
        return post(
            '/auth/signin_ajax',
            {
                usertype: data.userType,
                username: data.mobile,
                password: data.password,
                remember_me: data.rememberMe,
                captcha: data.captcha,
                captcha_name: data.captchaName,
                next: data.next
            }
        );
    };

    /**
     * 手机方式：手机+验证码 登录
     *
     * 返回数据：
     * {
     *      code: 0
     * }
     *
     * @param {Object} data
     * @property {number} data.userType 以什么身份登录 0:老师 2:学生
     * @property {string} data.mobile
     * @property {string} data.code 验证码
     * @property {string} data.rememberMe 是否记住我，取值是 on off
     * @return {Promise}
     */
    exports.loginBySms = function (data) {
        return post(
            '/auth/signin_mobile_ajax',
            {
                usertype: data.userType,
                username: data.mobile,
                verifycode: data.code,
                remember_me: data.rememberMe
            }
        );
    };

    /**
     * 验证手机验证码，验证后立即销毁验证码
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     * @property {string} data.mobile 手机号码
     * @property {string} data.code 手机验证码
     * @return {Promise}
     */
    exports.verifyNormalSMSCode = function (data) {
        return post(
            '/auth/verifyNormalSMSCode',
            {
                mobile: data.mobile,
                code: data.code
            }
        );
    };

    /**
     * 验证手机验证码，验证后不销毁验证码
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     * @property {string} data.mobile 手机号码
     * @property {string} data.code 手机验证码
     * @return {Promise}
     */
    exports.checkNormalSMSCode = function (data) {
        return post(
            '/auth/checkNormalSMSCode',
            {
                mobile: data.mobile,
                code: data.code
            }
        );
    };

    /**
     * 创建、编辑视频信息
     *
     * @param {Object} data
     * @param {string} data.id 视频上传后的 ID
     * @param {string} data.title 视频标题
     * @property {number} data.category 视频分类，0：自我介绍，1：讲课短片，2：才艺展示，3：其他
     * @property {string} data.labels 视频标签 以逗号分隔
     * @property {string} data.edit 是否是编辑 1编辑
     * @property {string} data.url 封面链接
     * @return {Promise}
     */
    exports.createVideo = function (data) {
        return post(
            '/video/create/' + data.id,
            {
                title: data.title,
                category: data.category,
                labels: data.labels,
                edit: data.edit,
                preface_url: data.url
            }
        );
    };

    /**
     * 新建或编辑授课科目【旧】
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     * @param {string} data.id 如果有 id，表示编辑，无 id，表示新建
     * @property {number} data.subjectId 第三级科目ID
     * @property {string} data.name 自定义科目名称，没有也必须传空字符串
     * @property {?number} data.teacher 老师上门价格
     * @property {?number} data.student 学生上门价格
     * @property {?number} data.discuss 协商地点价格
     * @property {?number} data.online 在线教学价格
     * @return {Promise}
     */
    exports.editCourse = function (data) {

        var params = {
            subject_id: data.subjectId,
            name: data.name
        };

        if (data.id != null) {
            params.id = data.id;
        }

        if ($.isNumeric(data.teacher)) {
            params.teacher = data.teacher;
        }
        if ($.isNumeric(data.student)) {
            params.student = data.student;
        }
        if ($.isNumeric(data.discuss)) {
            params.discuss = data.discuss;
        }
        if ($.isNumeric(data.online)) {
            params.online = data.online;
        }

        return post(
            '/teacher_center/editCourse',
            params
        );
    };

    /**
     * 新建或编辑授课科目【新】
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     * @param {string} data.id 如果有 id，表示编辑，无 id，表示新建
     * @property {number} data.subjectId 第三级科目ID
     * @property {string} data.courseName 课程标题
     * @property {string} data.courseRemark 专业背景介绍
     * @property {string} data.labelIds 课程标签
     * @property {?number} data.teacher 老师上门价格
     * @property {?number} data.student 学生上门价格
     * @property {?number} data.discuss 协商地点价格
     * @property {?number} data.online 在线教学价格
     * @return {Promise}
     */
    exports.upsertCourse = function (data) {

        var params = {
            subject_id: data.subjectId,
            name: data.courseName,
            remark: data.courseRemark,
            label_ids: data.labelIds,
            template_m: data.template_m
        };

        if (data.id != null) {
            params.id = data.id;
        }

        if ($.isNumeric(data.teacher)) {
            params.price_teacher = data.teacher;
        }
        if ($.isNumeric(data.student)) {
            params.price_student = data.student;
        }
        if ($.isNumeric(data.discuss)) {
            params.price_discuss = data.discuss;
        }
        if ($.isNumeric(data.online)) {
            params.price_online = data.online;
        }

        return post(
            '/teacher_course/upsert',
            params
        );
    };

    /**
     * 新建或编辑课时套餐
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     * @param {string} data.id 如果有 id，表示编辑，无 id，表示新建
     * @property {number} data.hours 套餐时长，单位是小时
     * @property {number} data.discount 套餐折扣
     * @property {string} data.name 套餐名称
     * @return {Promise}
     */
    exports.editCombo = function (data) {

        var params = {
            hours: data.hours,
            discount: data.discount,
            name: data.name
        };

        if (data.id != null) {
            params.id = data.id;
        }

        return post(
            '/teacher_combo/upsert',
            params
        );
    };

    /**
     * 删除一门课程【旧】
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     * @property {string} data.id 课程 ID
     * @return {Promise}
     */
    exports.delCourse = function (data) {
        return post(
            '/teacher_center/delCourse',
            {
                id: data.id
            }
        );
    };

    /**
     * 删除一门课程【新】
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     * @property {string} data.id 课程 ID
     * @return {Promise}
     */
    exports.deleteCourse = function (data) {
        return post(
            '/teacher_course/delete',
            {
                id: data.id
            }
        );
    };

    /**
     * 删除一个课程套餐
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     * @property {string} data.id 课程套餐 ID
     * @return {Promise}
     */
    exports.delCombo = function (data) {
        return post(
            '/teacher_combo/delete',
            {
                id: data.id
            }
        );
    };

    /**
     * 删除一个视频
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     * @property {string} data.id 视频 ID
     * @return {Promise}
     */
    exports.delVideo = function (data) {
        return post(
            '/video/delete/' + data.id
        );
    };

    /**
     * 视频重命名【遗弃...】
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     * @property {string} data.id 视频 ID
     * @property {string} data.name 视频名称
     * @return {Promise}
     */
    exports.editVideo = function (data) {
        return post(
            '/video/rename/' + data.id,
            {
                title: data.name
            }
        );
    };

    /**
     * 获取老师的授课时间
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *         '2014-08-30': 1,
     *         '2014-08-31': 2,
     *         '2014-09-01': 4
     *     }
     * }
     *
     * @param {Object} data
     * @property {string} data.number 老师 number
     * @property {string} data.start 开始日期，如 '2014-08-30'
     * @property {string} data.end 结束日期，如 '2014-09-07'
     * @return {Promise}
     */
    exports.getTeacherBusyDate = function (data) {
        return post(
            '/teacher/busyDate',
            {
                teacher_number: data.number,
                start: data.start,
                end: data.end
            }
        );
    };

    /**
     * 设置老师可授课时间
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     * @property {Array} data.descript 可授课时间描述
     * @property {Array} data.weeks 格式为：
     *                              [
     *                                  // 第一个是年份
     *                                  // 第二个是第几周
     *                                  // 第三个是位操作的 code
     *                                  [ 2014, 34, 7 ],
     *                                  ...
     *                              ]
     *
     */
    exports.setTeacherBusyDate = function (data) {
        return post(
            '/usable_time/upsert',
            {
                weeks: data.weeks,
                description: data.descript
            }
        );
    };

    /**
     * 新建或编辑教学经历
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *         id: '教学经历 ID '
     *     }
     * }
     *
     * @param {Object} data
     * @property {string} data.id 传 id 表示编辑，不传或 id 为空表示新建
     * @property {number} data.startYear 开始年份
     * @property {number} data.startMonth 开始月份
     * @property {number} data.endYear 结束年份
     * @property {number} data.endMonth 结束月份
     * @property {string} data.content 内容
     * @return {Promise}
     */
    exports.editTeacherExperience = function (data, options) {

        var params = {
            start_year: data.startYear,
            start_month: data.startMonth,
            end_year: data.endYear,
            end_month: data.endMonth,
            content: data.content
        };

        if (data.id != null) {
            params.id = data.id;
        }

        return post(
            '/teacher_bio/upsert',
            params,
            options
        );
    };

    /**
     * 删除教学经历
     *
     * @param {Object} data
     * @property {string} data.id 教学经历 ID
     * @return {Promise}
     */
    exports.delTeacherExperience = function (data) {
        return post(
            '/teacher_bio/delete',
            {
                id: data.id
            }
        );
    };

    /**
     * 新建或编辑相关案例
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *         id: '相关案例 ID '
     *     }
     * }
     *
     * @param {Object} data
     * @property {string} data.id 传 id 表示编辑，不传或 id 为空表示新建
     * @property {number} data.startYear 年份
     * @property {number} data.startMonth 月份
     * @property {string} data.title 标题
     * @property {string} data.content 内容
     * @return {Promise}
     */
    exports.editTeacherSuccess = function (data, options) {

        var params = {
            year: data.year,
            month: data.month,
            title: data.title,
            content: data.content
        };

        if (data.id != null) {
            params.id = data.id;
        }

        return post(
            '/teacher_case/upsert',
            params,
            options
        );
    };

    /**
     * 删除相关案例
     *
     * @param {Object} data
     * @property {string} data.id 相关案例 ID
     * @return {Promise}
     */
    exports.delTeacherSuccess = function (data) {
        return post(
            '/teacher_case/delete',
            {
                id: data.id
            }
        );
    };

    /**
     * 编辑老师其他信息
     *
     * @param {Object} data
     * @property {string} data.content
     * @return {Promise}
     */
    exports.editTeacherOtherInfo = function (data, options) {
        return post(
            '/teacher_center/upsertOtherInfo',
            {
                other_info: data.content
            },
            options
        );
    };

    /**
     * 新建或编辑老师照片
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *         id: 1,
     *         title: '',
     *         url: ''
     *     }
     * }
     *
     * @param {Object} data
     * @property {?string} data.id 照片 ID
     * @property {string} data.title 照片名称
     * @property {string} data.attachmentId 附件 ID
     * @return {Promise}
     */
    exports.editTeacherPhoto = function (data) {

        var params = {
            title: data.title
        };

        if (data != null) {
            params.id = data.id;
        }

        if (data.attachmentId != null) {
            params.attachment_id = data.attachmentId;
        }

        return post(
            '/photo/upsert',
            params
        );
    };

    /**
     * 删除照片
     *
     * @param {Object} data
     * @property {string} data.id 照片 ID
     * @return {Promise}
     */
    exports.delPhoto = function (data) {
        return post(
            '/photo/delete',
            {
                id: data.id
            }
        );
    };

    /**
     * 获取suggestion
     *
     * @param  {Object} data
     * @property {string} key
     * @return {Promise}
     */
    exports.getSuggestion = function (data) {

        var env = store.get('env');

        var envMap = {
            dev: 'http://suggestion.genshuixue.com/s',
            test: 'http://beta.suggestion.genshuixue.com/s',
 //           test: 'http://test.suggestion.genshuixue.com/api',
            beta: 'http://beta.suggestion.genshuixue.com/s',
            www: 'http://suggestion.genshuixue.com/s'
        };

        var url = envMap[env] || envMap['www'];

        return getJsonp(
            url,
            data
        );
    };

    /**
     * 从广告系统获取广告
     * @param  {string} data.adId 广告位id
     * @param  {string} data.cityId 城市id
     * @param  {string} data.sj 定向科目
     * @return {[type]}      [description]
     */
    exports.fetchadvertisement = function (data) {

        var params = $.param({
            ss: data.cityId,
            p:  data.adId,
            sj: data.sj
        });

        var env = store.get('env');

        var envMap = {
            dev: '//test-p-gat.genshuixue.com/p.json',
            test: '//test-p-gat.genshuixue.com/p.json',
            beta: '//beta-p-gat.genshuixue.com/p.json',
            www: '//p-gat.genshuixue.com/p.json'
        };

        var url = envMap[env] || envMap['www'];

        return getJsonp(url, params, 3000);
    }

    /**
     * 从广告系统获取广告
     * @param  {string} data.adId 广告位id
     * @param  {string} data.cityId 城市id
     * @param  {string} data.sj 定向科目
     * @return {[type]}      [description]
     */
    exports.getNavigationAd = function (data) {

        var params = $.param({
            ss: data.cityId,
            p:  data.adId,
            sj: data.sj,
            tag: data.tag
        });

        var env = store.get('env');

        var envMap = {
            dev: '//test-pandora.genshuixue.com/sougou.advertise',
            test: '//test-pandora.genshuixue.com/sougou.advertise',
            beta: '//pandora.genshuixue.com/sougou.advertise',
            www: '//pandora.genshuixue.com/sougou.advertise'
        };

        var url = envMap[env] || envMap['www'];

        return getJsonp(url, params, 3000);
    }


    /**
     * 从广告系统获取广告（新）
     * @param  {string} data.query 搜索词
     * @param  {string} data.cityId 城市id
     * @param  {string} data.source  页面信息
     * @param  {string} data.limit 广告个数
     * @param  {string} data.sj 定向科目id
     * @return {[type]}      [description]
     */
    exports.getAdvertisement = function (data) {
        var params = $.param({
                cityId: data.cityId,
                query: data.query,
                source: data.source,
                limit:  data.limit,
                adPosId: data.adPosId,
                id: data.id,
                offset: data.offset,
                sj: data.sj,
                user_number: data.user_number,
                track_id: data.track_id
            });

        var env = store.get('env');

        var envMap = {
            dev: '//test-pandora.genshuixue.com/generalget.advertise',
            test: '//pandora.genshuixue.com/generalget.advertise',
            beta: '//pandora.genshuixue.com/generalget.advertise',
            www: '//pandora.genshuixue.com/generalget.advertise'
        };

        var url = envMap[env] || envMap['www'];
        return getJsonp(url, params, 2000);
    }

    /**
     * 题库从广告系统获取相关课程推荐
     * @param  {string} data.query 搜索词
     * @param  {string} data.cityId 城市id
     * @param  {string} data.source  页面信息
     * @param  {string} data.limit 广告个数
     * @param  {string} subjectId 定向科目id
     * @return {[type]}      [description]
     */
    exports.getAdvertisementTiku = function (data) {
        var params = $.param({
                id: 13,
                cityId: data.cityId,
                query: data.query,
                offset: 0,
                source: data.source,
                limit:  data.limit,
                adPosId: 68,
                dataType: "teacher"
            });

        var env = store.get('env');

        var envMap = {
            dev: '//test-pandora.genshuixue.com/generalget.advertise',
            test: '//test-pandora.genshuixue.com/generalget.advertise',
            beta: '//pandora.genshuixue.com/generalget.advertise',
            www: '//pandora.genshuixue.com/generalget.advertise'
        };
        var url = envMap[env] || envMap['www'];
        return getJsonp(url, params, 2000);
    }
    /**
     * 题库从广告系统获取广告
     * @param  {string} data.cityId 城市id
     * @param  {string} data.source  页面信息
     * @param  {string} data.limit 广告个数
     * @param  {string} subjectId 定向科目id
     * @return {[type]}      [description]
     */
    exports.getAd = function (data) {

        var params = $.param({
            id: data.id,
            cityId: data.cityId,
            source: data.source,
            adPosId: data.adPosId,
            limit: data.limit,
            offset: 0,
            tagList: data.tagList
        });

        var env = store.get('env');

        var envMap = {
            dev: '//test-pandora.genshuixue.com/generalget.advertise',
            test: '//test-pandora.genshuixue.com/generalget.advertise',
            beta: '//pandora.genshuixue.com/generalget.advertise',
            www: '//pandora.genshuixue.com/generalget.advertise'
        };
        var url = envMap[env] || envMap['www'];
        return getJsonp(url, params, 2000);
    }
    /**
     * 编辑老师基本信息
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     *
     * @property {string} data.realname 真实姓名
     * @property {string} data.sex 性别
     * @property {string} data.nickname 昵称
     * @property {string} data.shortIntroduce 一句话简介
     * @property {string} data.birthday 出生日期，如 2014-07-14
     * @property {string} data.constellation 星座
     * @property {string} data.category 身份
     * @property {string} data.eduBack 最高学历
     * @property {string} data.school 毕业院校
     * @property {string} data.major 专业
     * @property {string} data.regions 可上门授课范围，多个以 , 分割
     * @property {string} data.privateDomain 个人主页地址
     *
     * @return {Promise}
     */
    exports.editTeacherBaseInfo = function (data, options) {
        return post(
            '/teacher_center/upsertBasic',
            {
                realname: data.realname,
                sex: data.sex,
                nickname: data.nickname,
                introduction: data.shortIntroduce,
                birthday: data.birthday,
                constellation: data.constellation,
                category: data.category,
                degree: data.eduBack,
                school: data.school,
                major: data.major,
                regions: data.regions,
                domain: data.privateDomain,
                introduce: data.introduce,
                lesson_way: data.lessonWay
            },
            options
        );
    };



    /**
     * 编辑学生基本信息
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     *
     * @property {string} data.realname 真实姓名
     * @property {string} data.realname 昵称
     * @property {string} data.sex 性别
     * @property {string} data.birthday 出生日期，如 2014-07-14
     * @property {string} data.domain 域名 private_domain: data.domain,
     * @property {string} data.introduce 一句话简介
     * @property {string} data.areaId 最后一级区的 ID
     * @property {string} data.address 常住地具体位置
     * @property {string} data.lng 经纬度
     * @property {string} data.lat 经纬度
     * @property {string} data.subjects 感兴趣的课程，多个以 , 分割
     * @return {Promise}
     */
    exports.editStudentBaseInfo = function (data, options) {
        return post(
            '/student_center/upsertBasic',
            {
                realname: data.realname,
                nickname: data.nickname,
                sex: data.sex,
                birthday: data.birthday,
                short_introduce: data.introduce,
                location: data.areaId,
                address: data.address,
                lng: data.lng,
                lat: data.lat,
                subjects: data.subjects
            },
            options
        );
    };


    /**
     * 编辑学生教育背景
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     *
     * @property {string} data.universitys  大学 { school_id: 1, school_name: 'XXX', enter_school: 1988, type: 4, identity: 1, department: 123 }
     * @property {string} data.seniors 高中 { school_id: 1, school_name: 'XXX', enter_school: 1988, type: 3, class: [41, 203, 203] }
     * @property {string} data.technicals 中专 { school_id: 1, school_name: 'XXX', enter_school: 1988, type: 2 }
     * @property {string} data.juniors 初中 { school_id: 1, school_name: 'XXX', enter_school: 1988, type: 1 }
     * @property {string} data.primarys 小学 { school_name: 'XXX', enter_school: 1988}
     *
     * @return {Promise}
     */
    exports.editStudentBackground = function (data) {
        return post(
            '/student_center/upsertBackground',
            {
                colleges: data.universitys,
                senior_schools: data.seniors,
                special_schools: data.technicals,
                middle_schools: data.juniors,
                primary_schools: data.primarys
            }
        );
    };

    /**
     * 编辑老师背景资料
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     * @property {string} data.institution 所在机构名称
     * @property {number} data.schoolAge 教龄
     * @property {string} data.institution 所在机构名称
     * @property {string} data.tags 教学特点，多个以 , 分割
     * @return {Promise}
     */
    exports.editTeacherBackgroundInfo = function (data, options) {
        return post(
            '/teacher_center/upsert_background',
            {
                school_age: data.schoolAge,
                institution: data.institution,
                tags: data.tags,
                subject_id: data.subject_id
            },
            options
        );
    };


    /**
     * 增加、编辑学生工作情况
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     * @property {Array} data.companys 公司
     *                       [
     *                           {
     *                               id 该记录ID
     *                               company 公司名称
     *                               start_year 工作开始年
     *                               end_year 工作结束年
     *                               end_month 工作结束月
     *                               industry 行业
     *                               job 职位
     *                           }
     *                           ...
     *                        ]
     * @return {Promise}
     */
    exports.editStudentWork = function (data) {
        return post(
            '/student_center/upsertWork',
            {
                companys: data.companys
            }
        );
    };

    /**
     * 隐藏模式
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     * @property {number} data.bitwise 真实姓名1 头像2
     *
     * @return {Promise}
     */
    exports.togglePrivateProtected = function (data) {
        return post(
            '/teacher_center/togglePrivateProtected',
            {
                bitwise: data.bitwise
            }
        );
    };


    /**
     * 获取更多消息
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data
     * }
     *
     * @param {Object} data
     * @property {number} data.page
     * @property {number} data.pageSize
     * @property {string|number} data.type
     * @return {Promise}
     */
    exports.getMessageList = function (data) {

        return post(
            '/message/secretary',
            {
                page: data.page,
                type: data.type,
                page_size: data.pageSize
            }
        );
    };

    /**
     * 发送老师纠错信息
     *
     * 返回数据：
     * {
     *     code: 0,
     * }
     *
     * @param {Object} data
     * @property {string} data.number 老师number
     * @property {string} data.content 纠错信息
     * @property {string} data.name 老师姓名
     * @property {string} data.contact 联系方式
     * @return {Promise}
     */
    exports.sendTeacherRecover = function (data) {
        return post(
            '/teacher/report',
            {
                teacher_number: data.number,
                content: data.content,
                name: data.name,
                contact: data.contact
            }
        );
    };
    /**
     * 发送机构纠错信息
     *
     * 返回数据：
     * {
     *     code: 0,
     * }
     *
     * @param {Object} data
     * @property {string} data.orgId 机构ID
     * @property {string} data.content 纠错信息
     * @property {string} data.name 纠错人姓名
     * @property {string} data.contact 联系方式
     * @return {Promise}
     */
    exports.sendOrgRecover = function (data) {
        return post(
            '/org/report',
            {
                org_id: data.orgId,
                content: data.content,
                name: data.name,
                contact: data.contact
            }
        );
    };

    /**
     * 获取机构的访问量
     *
     * @param  {Object} data
     * @property {number} number 机构number
     * @return {Promise}
     */
    exports.getOrgPv = function (data) {

        var env = store.get('env');

        var envMap = {
            dev: 'http://localhost:8080/org/pvAjax',
            test: 'http://test.genshuixue.com/org/pvAjax',
            beta: 'http://beta.genshuixue.com/org/pvAjax',
            www: 'http://www.genshuixue.com/org/pvAjax'
        };

        var url = envMap[env] || envMap['www'];

        return post(
            url,
            {
                number: data.number
            }
        );
    };

    /**
     * 获取机构的学生数
     *
     * @param  {Object} data
     * @property {number} number 机构number
     * @return {Promise}
     */
    exports.getOrgStudentsCount = function (data) {

        return post(
            '/org/students_count',
            {
                number: data.number
            }
        );
    };

    /**
     * 身份认证/护照，证件号去重
     *
     * 返回数据：
     * {
     *     code: 0,
     * }
     *
     * @param {Object} data
     * @property {string} data.number 证件号
     * @property {number} data.type 证件类型
     * @return {Promise}
     */
    exports.verifyCertNumber = function (data) {
        return post(
            '/teacher_center/verifyCertNumber',
            {
                number: data.number,
                type: data.type
            },
            {
                sync: true
            }
        );
    };

    /**
     * 绑定银行卡
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     * @property {string} data.owner_name 开户姓名
     * @property {string} data.mobile 手机号
     * @property {string} data.id_number 身份证号或护照
     * @property {string} data.card_num 银行卡号
     * @property {string} data.bank_no 银行代号
     * @property {string} data.province 开户省
     * @property {string} data.city 开户市
     * @property {string} data.sms_code 短信验证码
     * @property {string} data.id
     * @return {Promise}
     */
    exports.bindBankCard = function (data, options) {
        return post(
            '/account/addBankCard',
            {
                owner_name: data.owner_name,
                mobile: data.mobile,
                id_number: data.id_number,
                card_num: data.card_num,
                bank_no: data.bank_no,
                region: [ data.province, data.city ].join('_'),
                sms_code: data.sms_code,
                id: data.id,
                token: data.token,
                third_type: data.third_type
            },
            options
        );
    };


    /**
     * 绑定银行卡时所需的获取手机验证码接口
     * @param  {string} data.owner_name 实名
     * @param  {string} data.id_number 身份证号或护照号
     * @param  {string} data.bank_no 银行代号
     * @param  {string} data.mobile 手机号
     * @param  {string} data.card_num 银行卡号
     * @return {Promise}
     */
    exports.sendBindCardSMSCode = function (data, options) {
        return  post(
            '/account/verifyBankCard',
            {
                owner_name: data.owner_name,
                id_number: data.id_number,
                bank_no: data.bank_no,
                mobile: data.mobile,
                card_num: data.card_num
            },
            options
        );
    }

    /**
     * 解绑银行卡
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     * @property {string} data.id 银行卡 ID
     * @property {string} data.pay_password 银行卡 ID
     * @return {Promise}
     */
    exports.unBindBankCard = function (data) {
        return post(
            '/account/delBankCard',
            {
                id: data.id,
                pay_password: data.pay_password
            }
        );
    };


    /**
     * 解绑支付银行卡
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     * @property {string} data.id 银行卡 ID
     * @property {string} data.pay_password 银行卡 ID
     * @return {Promise}
     */
    exports.unBindPayBankCard = function (data) {
        return post(
            '/account/delPayBankCard',
            {
                id: data.id,
                pay_password: data.pay_password
            }
        );
    };

    /**
     * 创建订单
     *
     * @param {Object} data
     * @property {string} data.teachetId 老师 ID
     * @property {string} data.teachetName 老师姓名
     * @property {number} data.courseType 课程类型 0 一对一 1 班课
     * @property {string} data.courseId 课程 ID
     * @property {string} data.courseName 课程名称
     * @property {string} data.subjectId 科目 ID
     * @property {string} data.comboId 套餐 ID
     * @property {number} data.hours 购买课程时长
     * @property {string} data.lessonWay 上课方式
     *                                   teacher 老师上门
     *                                   student 学生上门
     *                                   discuss 协商地点
     *                                   online 在线教学
     * @property {number} data.totalPrice 订单总价
     * @property {number} data.payPrice 需要支付的价格
     * @property {string} data.name 用户名
     * @property {string} data.studentName 上课人姓名
     * @property {boolean} data.isSelf 是否本人上课
     * @property {?string} data.location 上课地点，当 lessonWay 为 teacher 时必传
     * @property {?string} data.note 备注信息，可选
     *
     * @return {Promise}
     */
/*    exports.createPurchase = function (data, options) {

        var params = {
            teacher_id: data.teacherId,
            teacher_name: data.teacherName,
            course_type: data.courseType,
            course_id: data.courseId,
            course_name: data.courseName,
            subject_id: data.subjectId,
            hours: data.hours,
            total_prices: data.totalPrice,
            pay_money: data.payPrice,
            name: data.name,
            student: data.studentName,
            combo_id: data.comboId,
            lesson_way: data.lessonWay,
            is_self: data.isSelf ? 1 : 0
        };

        if (data.lessonWay === 'teacher') {
            params.location = data.location;
        }

        if (data.note) {
            params.note = data.note;
        }

        return post(
            '/pay/createPurchase',
            params,
            options
        );
    };*/

    /**
     * 创建班课订单
     *
     * @param {Object} data
     * @property {string} data.courseNumber 课程编号
     * @property {number} data.totalPrice 订单总价
     * @property {number} data.payPrice 需要支付的价格
     * @property {string} data.name 用户名
     * @property {string} data.studentName 上课人姓名
     * @property {boolean} data.isSelf 是否本人上课
     * @property {string=} data.note 备注信息，可选
     * @params {Object=} options
     * @property {boolean=} options.sync 是否同步
     * @property {Object=} options.errorHandler 自定义错误处理
     * @return {Promise}
     */
    exports.createClassPurchase = function (data, options) {

        var params = {
            course_number: data.courseNumber,
            total_prices: data.totalPrice,
            pay_money: data.payPrice,
            name: data.name,
            student: data.studentName,
            is_self: data.isSelf ? 1 : 0
        };

        if (data.note) {
            params.note = data.note;
        }

        return post(
            '/pay/createClassPurchase',
            params,
            options
        );
    };

    /**
     * 充值
     *
     * @param {Object} data
     * @property {number} data.money
     * @property {string} data.payWay 支付方式
     *                             platform 平台支付，如支付宝
     *                             bank 网银支付
     * @property {string} data.bankNo 如果 payWay 是 bank，需传入银行代号
     */
    exports.createRecharge = function (data) {

        var useBank = data.payWay === 'bank';

        // pay_type统一修改为24，快钱网银

        var params = {
            money: data.money,
            pay_type: 24
        };

        if (useBank) {
            params.bank_no = data.bankNo;
        }

        return post(
            '/account/createRecharge',
            params,
            {
                sync: true
            }
        );
    };

    /**
     * 支付订单
     *
     * @param {Object} data
     * @property {string} data.purchaseId 订单 ID
     * @property {number} data.money 金额
     * @property {number} data.cashType 付款类型
     *                                  1 快捷支付网银在线信用卡首次
     *                                  2 快捷支付网银在线储蓄卡首次
     *                                  3 无卡支付信用卡首次
     *                                  4 快捷支付网银在线信用卡再次
     *                                  5 快捷支付网银在线储蓄卡再次
     *                                  6 无卡支付信用卡再次
     * @property {string} data.payWay 支付方式
     *                             alipay 支付宝
     *                             wechat 微信支付
     *                             bank 网银支付
     *                             creditCard 信用卡
     * @property {string} data.bankName 如果是网银支付或信用卡，需要传入银行代号
     * @property {string} data.cardId 银行卡号带星号的版本
     * @property {string} data.cardType 银行卡类型，C 信用卡 D 储蓄卡
     * @property {string} data.code 短信验证码
     *
     * @property {string=} data.cvv 信用卡号后三位
     * @property {string=} data.expireYear 信用卡过期年份
     * @property {string=} data.expireMonth 信用卡过期月份
     * @property {string=} data.ownerName 银行卡户主姓名
     * @property {string=} data.ownerId 银行卡户主身份证
     * @property {string=} data.ownerMobile 银行卡户主手机
     * @property {string=} data.third_type 第三方支付类型
     * @property {string=} data.token 后端token
     *
     * @return {Promise}
     */
    exports.payPurchase = function (data, options) {
        var params = {
            purchase_id: data.purchaseId
        };

        if (data.money == 0) {
            params.pay_type = '1:0';
        }
        else {

            var payType = [];

            if (data.payWay === 'balance') {
                payType.push('1:' + data.money);
            }
            else if (data.payWay === 'alipay') {
                payType.push('2:' + data.money);
            }
            else if (data.payWay === 'wechat') {
                payType.push('30:' + data.money);
            }
            else if (data.payWay === 'bank') {
                payType.push('24:' + data.money);
                if (data.bankName) {
                    params.bank_no = data.bankName;
                }
            }
            else if (data.payWay === 'creditCard') {
                payType.push('7:' + data.money);
                if (data.bankName) {
                    params.bank_no = data.bankName;
                }
            }
            else if (data.payWay === 'moto') {
                payType.push((data.third_type !== undefined ? data.third_type : '11')  + ':' + data.money);
                if (data.bankName) {
                    params.bank_no = data.bankName;
                }
            }
            else if (data.payWay === 'fenqi') {
                payType.push(data.payTypeNumber + ':' + data.money);
            }

            params.pay_type = payType.join('_');

        }

        params.card_name = data.bankName;
        params.unique_id = data.cardId;
        params.card_type = data.cardType;
        params.exp = data.expireYear + '-' + data.expireMonth;
        params.cvv = data.cvv;
        params.owner_name = data.ownerName;
        params.owner_id = data.ownerId;
        params.owner_mobile = data.ownerMobile;
        params.trade_code = data.code;
        params.cash_type = data.cashType;
        params.money = data.money;
        params.third_type = data.third_type;
        params.token = data.token;
        params.fenqiFlag = data.fenqiFlag;
        params.periods = data.periods;
        if (data.password) {
            params.password = data.password;
        }

        return post(
            '/pay/thirdPartyPay',
            params,
            {
                sync: true,
                errorHandler: options && options.errorHandler
            }
        );
    };
    /**
     * 获取课时优惠接口
     * @param  {string} data.teacherNum 教师number
     * @return {Promise}
     */
    exports.getCourseCombo = function (data) {

        return post(
            '/pay/combo',
            {
                teacher_number: data.teacherNum
            }
        );
    };
    /**
     * 检测优惠券
     * @param  {string} data.code 优惠券密码
     * @param  {string} data.pay_money 订单金额原价
     * @param  {string} data.teacher_id 老师id
     * @param  {string} data.lesson_way  上课方式
     * @param  {string} data.course_type 课程类型
     * @param  {string} data.subject_id 科目id
     * @return {Promise}
     */
    exports.checkFavCode = function (data) {

        return post(
            '/pay/checkFavCode',
            {
                fav_code: data.code,
                pay_money: data.pay_money,
                teacher_id: data.teacher_id,
                lesson_way: data.lesson_way,
                course_type: data.course_type,
                subject_id: data.subject_id,
                course_number: data.course_number
            }
        );
    };

    /**
     * 我的邀请——发送邀请码
     *
     * @param {Object} data
     * @property {string} data.code 邀请码
     * @property {string} data.mobiles 受邀手机号码组合，如：15210651512,15210651513
     *
     * @return {Promise}
     */
    exports.invite = function (data) {

        return post(
            '/invite/sendMobile',
            {
                code: data.code,
                mobiles: data.mobiles
            }
        );

    };

    /**
     * 保存头像
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     * @property {string} data.id 图片 ID
     * @property {number} data.userType 0 老师 2 学生
     * @return {Promise}
     */
    exports.saveAvatar = function (data) {
        return post(
            '/user/upsertAvatar',
            {
                storage_id: data.id,
                role: data.userType
            }
        );
    };

    /**
     * 账户设置——修改登录密码
     *
     * @param {Object} data
     * @property {string} data.old_password 当前登录密码
     * @property {string} data.password 新密码
     * @property {string} data.password_confirm 新密码确认密码
     *
     * @return {Promise}
     */
    exports.saveNewpwd = function (data) {

        return post(
            '/teacher_center/account_ajax?action=savenewpwd',
            {
                old_password: data.old_password,
                password: data.password,
                password_confirm: data.password_confirm
            }
        );

    };


    /**
     * 账户设置——修改绑定手机
     *
     * @param {Object} data
     * @property {string} data.mobile 当前手机号
     * @property {string} data.current_verify_code 手机验证码
     * @property {string} data.new_mobile 新绑定手机号
     * @property {string} data.captcha_name 验证码名字
     * @property {string} data.captcha 验证码
     * @property {string} data.verify_code 手机验证码
     *
     * @return {Promise}
     */
    exports.savePhone = function (data) {

        return post(
            '/teacher_center/account_ajax?action=savephone',
            {
                mobile: data.oldMobile,
                current_verify_code: data.oldVerifyCode,
                new_mobile: data.newMobile,
                captcha_name: 'wyj',
                captcha: data.captcha,
                verify_code: data.newVerifyCode
            }
        );

    };

    /**
     * 账户设置——首次邮箱绑定
     *
     * @param {Object} data
     * @property {string} data.new_email 新/旧邮箱
     * @property {string} data.password 密码
     * @property {string} data.verify_code 手机验证码
     *
     * @return {Promise}
     */
    exports.saveNewemail = function (data) {

        return post(
            '/teacher_center/account_ajax?action=savenewemail',
            {
                new_email: data.new_email,
                password: data.password,
                verify_code: data.verify_code
            }
        );

    };

    /**
     * 账户设置——修改绑定邮箱
     *
     * @param {Object} data
     * @property {string} data.password 密码
     * @property {string} data.new_email 新/旧邮箱
     * @property {string} data.verify_code 邮箱验证码
     *
     * @return {Promise}
     */
    exports.saveEmail = function (data) {

        return post(
            '/teacher_center/account_ajax?action=saveemail',
            {
                password: data.password,
                new_email: data.new_email,
                verify_code: data.verify_code
            }
        );

    };

    /**
     * 账户设置——修改支付密码
     *
     * @param {Object} data
     * @property {string} data.mobile 手机号
     * @property {string} data.verify_code 手机验证码
     * @property {string} data.current_pay_password 原支付密码
     * @property {string} data.pay_password 新支付密码
     * @property {string} data.pay_password_confirm 确认支付密码
     *
     * @return {Promise}
     */
    exports.setPayPassword = function (data) {

        return post(
            '/user/upsert_pay_password',
            {
                mobile: data.mobile,
                verify_code: data.verifyCode,
                current_pay_password: data.currentPayPassword,
                pay_password: data.payPassword,
                pay_password_confirm: data.payPasswordConfirm
            }
        );

    };

    /**
     * 找回（修改）支付密码 - 单独页面
     *
     * @param {Object} data
     * @property {string} data.mobile 手机号
     * @property {string} data.verify_code 手机验证码
     * @property {string} data.captcha 图片验证码
     * @property {string} data.pay_password 新支付密码
     * @property {string} data.pay_password_confirm 确认支付密码
     * @property {string} data.next 跳转url
     *
     * @return {Promise}
     */
    exports.resetPayPassword = function (data) {
        var param = {
            mobile: data.mobile,
            verify_code: data.verify_code,
            captcha: data.captcha,
            captcha_name: data.captchaName,
            card: data.card,
            next: data.next
        };
        //第一步 验证身份
        if (data.check) {
            param.check = 1;
        }
        //第二步 修改密码
        else {
            param.check = 0,
            param.pay_password = data.password,
            param.pay_password_confirm = data.password_confirm
        }

        return post(
            '/user/reset_pay_password',
            param
        );

    };


    /**
     * 认证设置——各种认证
     *
     * @param {Object} data
     * @property {number} data.id ID
     * @property {number} data.type 认证类型 0其他 1身份证 2教师证 3学生证 4机构证 5专业资格证 6护照
     * @property {number} data.storageId 图片ID
     * @property {string} data.idnumber 证件号
     * @property {string} data.realname 真实姓名
     * @property {number} data.imgaId 身份证正面/护照信息页照片
     * @property {number} data.imgbId 身份证反面(X)/护照签名页照片
     *
     * @return {Promise}
     */
    exports.upsertCert = function (data) {

        return post(
            '/user_cert/upsert',
            {
                id: data.id,
                type: data.type,
                storage_id: data.storageId,
                idnumber: data.idnumber,
                name: data.realname,
                additional_imga_id: data.imgaId,
                additional_imgb_id: data.imgbId
            }
        );

    };


    /**
     * 提现
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     * @property {string} data.cardId 银行卡 ID
     * @property {number} data.money 提现金额
     * @property {string} data.payPassword 支付密码
     * @return {Promise}
     */
    exports.createWithdraw = function (data) {
        return post(
            '/pay/createDrawCash',
            {
                card_id: data.cardId,
                money: data.money,
                pay_password: data.payPassword
            }
        );
    };


    /**
     * 检测手机号是否已经注册，如果注册过，注册的身份是什么
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *         exist: 0|1, //是否存在
     *         user_type: ['teacher', 'student'] // 注册过的角色
     *     }
     * }
     *
     * @param {Object} data
     * @property {string} data.mobile
     * @return {Promise}
     */
    exports.checkMobileRegister = function (data) {
        return post(
            '/auth/checkMobile',
            {
                mobile: data.mobile
            }
        );
    };

    /**
     * 检测邮箱账号是否已经绑定
     *
     * @param {Object} data
     * @property {string} data.email
     * @return {Promise}
     */
    exports.checkEmailAuth = function (data) {
        return post(
            '/auth/check_email',
            {
                email: data.email
            }
        );
    };

    /**
     * 浅注册
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     * @property {string=} data.name 姓名
     * @property {string} data.mobile 手机号
     * @property {string} data.code 手机收到的验证码
     * @return {Promise}
     */
    exports.registerSimply = function (data) {
        return post(
            '/auth/registerStudentByMobile',
            {
                name: data.name,
                mobile: data.mobile,
                code: data.code
            }
        );
    };

    /**
     * sem聚合页 － 浅注册
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     * @property {string} data.mobile 手机号
     * @property {string} data.smscode 手机收到的验证码
     * @return {Promise} 返回user_number 且用户以学生身份登陆
     */
    exports.easyRegister = function (data) {
        return post(
            '/auth/signupin_mobile_ajax',
            {
                mobile: data.mobile,
                smscode: data.smscode
            }
        );
    };

    /**
     * 老师注册
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     * @property {string} data.verifycode 手机校验码
     * @property {string} data.mobile 手机号
     * @property {string} data.email 邮箱
     * @property {string} data.password 密码
     * @property {string} data.password_confirm 确认密码
     * @property {string} data.captcha 图片验证码
     * @property {string} data.invitecode 邀请码
     * @property {string} data.next 跳转链接
     * @return {Promise}
     */
    exports.registerTeacher = function (data, options) {
        return post(
            '/auth/signup_teacher_ajax',
            {
                verifycode: data.verifycode,
                mobile: data.mobile,
                email: data.email,
                password: data.password,
                password_confirm: data.password_confirm,
                captcha: data.captcha,
                captcha_name: data.captchaName,
                invitecode: data.invitecode,
                next: data.next
            },
            options
        );
    };
    /**
     * 学生注册
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param {Object} data
     * @property {string} data.verifycode 手机校验码
     * @property {string} data.mobile 手机号
     * @property {string} data.email 邮箱
     * @property {string} data.password 密码
     * @property {string} data.password_confirm 确认密码
     * @property {string} data.captcha 图片验证码
     * @property {string} data.invitecode 邀请码
     * @property {string} data.next 跳转链接
     * @return {Promise}
     */
    exports.registerStudent = function (data, options) {
        return post(
            '/auth/signup_student_ajax',
            {
                verifycode: data.verifycode,
                mobile: data.mobile,
                email: data.email,
                password: data.password,
                password_confirm: data.password_confirm,
                captcha: data.captcha,
                captcha_name: data.captchaName,
                invitecode: data.invitecode,
                next: data.next,
                //TODO 艺术活动结束后移除
                province: data.province,
                city: data.city,
                school: data.school,
                cooperation: data.cooperation
                //TODO
            },
            options
        );
    };
    /**
     * 老师确认约课前检测
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param  {Object} data
     * @property {number|string} data.lessonId 要确认约课的课程id
     *
     * @return {Promise}
     */
    exports.teacherConfirmScheduleCheck = function (data) {
        return post(
            '/lesson/teacherConfirmReserveCheck',
            {
                lesson_id: data.lessonId
            }
        );
    };

    /**
     * 老师确认约课
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param  {Object} data
     * @property {number|string} data.lessonId 要确认约课的课程id
     *
     * @return {Promise}
     */
    exports.teacherConfirmSchedule = function (data) {
        return post(
            '/lesson/teacherConfirmReserve',
            {
                lesson_id: data.lessonId
            }
        );
    };

    /**
     * 学生确认约课前检测
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param  {Object} data
     * @property {number|string} data.lessonId 要确认约课的课程id
     *
     * @return {Promise}
     */
    exports.studentConfirmScheduleCheck = function (data) {
        return post(
            '/lesson/studentConfirmReserveCheck',
            {
                lesson_id: data.lessonId
            }
        );
    };

    /**
     * 学生确认约课
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param  {Object} data
     * @property {number|string} data.lessonId 要确认约课的课程id
     *
     * @return {Promise}
     */
    exports.studentConfirmSchedule = function (data) {
        return post(
            '/lesson/studentConfirmReserve',
            {
                lesson_id: data.lessonId
            }
        );
    };

    /**
     * 确认支付课程的请求
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param  {Object} data
     * @property {string|number} lessonId 要确认支付的课程Id
     * @property {string} data.url 确认支付的ajax链接
     *
     * @return {Promise}
     */
    exports.confirmPaySchedule = function (data) {
        return post(
            data.url,
            {
                lesson_id: data.lessonId
            }
        );
    };

    /**
     * 快速评价
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param  {Object} data
     * @property {string|number} data.lessonId 要快速评价的课程Id
     * @property {string|number} data.rating 给予课程的评价星级
     *
     * @return {Promise}
     */
    exports.ratingSchedule = function (data) {
        return post(
            '/lesson/rating',
            {
                lesson_id: data.lessonId,
                rating: data.rating
            }
        );
    };

    /**
     * 获取某天的课程列表
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * @param  {Object} data
     * @property {string} data.day 要获取的日期格式位YYYY-MM-DD
     * @property {string} data.url ajax url
     *
     *
     * @return {Promise}
     */
    exports.getScheduleList = function (data) {
        return post(
            data.url,
            {
                day: data.day
            }
        );
    };

    /**
     * 获取午餐活动的点赞数目
     *
     * @param  {Object} data
     *
     * @return {Promise}
     */
    exports.getLunchCount = function (data) {
        return post(
            '/activity/countInfo?type=2&activity_id=ground003&has_total=1',
            {
                activity_id: 'ground003'
            }
        );
    };

    /**
     * 获取点赞及记录点赞用户
     *
     * @param  {Object} data
     *
     * @return {Promise}
     */
    exports.sentLunchCount = function (data) {
        return post(
            '/activity/registerUser?activity_id=ground003&type=2&channel_id=pc001&has_total=1',
            {
                activity_id: 'ground003'
            }
        );
    };

    /**
     * im设置，用于权限验证
     *
     * @param {[type]} param [description]
     */
    function setImParam (param) {
        var url = store.get('im_url');

        if (url) {
            param.url = decodeURIComponent(url);
        }
    };

    /**
     * 用来获取环信帐号,登录使用的 token
     * @return {Promise}
     */
    exports.getImInfo = function (data) {
        var param = {
            user_number: data.userNumber,
            user_role: data.userType,
            auth_token: data.authToken
        };

        setImParam(param);

        return post(
            '/im/userInfo',
            param
        );
    };

    /**
     * 用来获取环信帐号,登录使用的 token
     * @return {Promise}
     */
    exports.getKFImInfo = function (data) {
        var param = {
            user_number: data.userNumber,
            user_role: data.userType,
            auth_token: data.authToken
        };

        setImParam(param);

        return post(
            '/custom_im/userInfo',
            param
        );
    };

    exports.getAnonymousInfo = function (data) {

        return post(
            '/im/anonymousInfo',
            {
                source: data.source
            }
        );
    };

    /**
     * 获取用户最近联系人
     *
     * @param  {Object} data
     * @property {string} data.imUsername
     *
     * @return {Promise}
     */
    exports.getLastContacts = function (data) {
        var param = {
            curr_user_name: data.imUsername
        }

        setImParam(param);

        return post(
            '/im/lastContacts',
            param
        );
    };

    /**
     * 增加用户的最近联系人
     *
     * @param {Object} data
     * @property {string} data.imUsername
     * @return {Promise}
     */
    exports.addContact = function (data) {
        var param = {
            im_user_name: data.imUsername,
            curr_user_name: data.currentName
        }

        setImParam(param);

        return post(
            '/im/addContact',
            param,
            {
                errorHandler: {
                    "1": function () {}
                }
            }
        );
    };

    /**
     * 删除用户的最近联系人
     *
     * @param {Object} data
     * @property  {Array.<string>} data.imUsername
     * @return {Promise}
     */
    exports.delContact = function (data) {
        var param = {
            roster_list: data.imUsername,
            curr_user_name: data.currentName
        }

        setImParam(param);

        return post(
            '/im/delContact',
            param
        );
    };

    /**
     * 获取我的老师（学生）
     *
     * @param {Object} data
     * @property {string} data.imUsername
     * @return {Promise}
     */
    exports.getMyContacts = function (data) {
        var param = {
            curr_user_name: data.imUsername,
            target_type: data.target_type
        }

        setImParam(param);

        return post(
            '/im/myContacts',
            param
        );
    };


    /**
     * 获取机构试讲教室链接
     * @param  {string} data.orgId 机构号
     */
    exports.getOrgRoomUrl = function (data) {

        var env = store.get('env');

        var envMap = {
            test: 'http://test-i.genshuixue.com/org/orgOnlineCourse.do',
            beta: 'http://beta-i.genshuixue.com/org/orgOnlineCourse.do',
            www: 'http://i.genshuixue.com/org/orgOnlineCourse.do'
        };

        var url = envMap[env] || envMap['www'];

        return getJsonp(url, {
            org_id: data.orgId
        });
    }


    /**
     * 获取我的机构
     *
     * @param {Object} data
     * @property {string} data.imUsername
     * @return {Promise}
     */
    exports.getMyInstitution = function (data) {
        var param = {
            im_user_name: data.imUsername
        }

        setImParam(param);

        return post(
            '/im/myInstitution',
            param
        );
    };

    /**
     * 获取好友的信息
     *
     * @param {Object} data
     * @property {string} data.userNumber
     * @property {string} data.userType
     * @return {Promise}
     */
    exports.getFriendInfo = function (data) {
        var param = {
            user_number: data.userNumber,
            user_role: data.userType
        }

        setImParam(param);

        return post(
            '/im/getUserInfo',
            param
        );
    };

    /**
     * 获取好友信息接口
     *
     * @param {Object} data
     * @property  {Array.<string>} data.imUsername  用户好友的环信id
     *
     * @return {Promise}
     */
    exports.getRosterList = function (data) {
        var param = {
            roster_list: data.imUsername
        }

        setImParam(param);

        return post(
            '/im/rosterList',
            param
        );
    };

    /**
     * 获取历史信息接口
     *
     * @param {Object} data
     * @property  {string} data.imUserName  用户环信id
     * @property  {number} data.pages  第几次获取
     * @property {number} data.timeStamp  第一次获取消息的时间
     *
     * @return {Promise}
     */
    exports.getHistory = function (data) {
        var param = {
            im_user_name: data.imUsername,
            curr_user_name: data.currentName,
            page: data.pages,
            timestamp: data.timeStamp,

            chat_type: data.chatType,
            group_id: data.groupId
        }

        setImParam(param);

        return post(
            '/im/history',
            param
        );
    };


    /**
     * 获取我的群组
     *
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    exports.getMyGroup = function (data) {
        return post(
            '/im/myGroup',
            {
                curr_user_name: data.imUsername
            }
        );
    };

    /**
     * 获取群信息
     *
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    exports.getGroupInfo = function (data) {
        return post(
            '/im/getGroupInfo',
            {
                im_group_id: data.groupId
            }
        );
    };


    /**
     * 获取群组的成员列表
     *
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    exports.getGroupMembers = function (data) {
        return post(
            '/im/getGroupMembers',
            {
                im_group_id: data.groupId
            }
        );
    };


    /**
     * 设置群名称
     *
     * @param {[type]} data [description]
     */
    exports.setGroupName = function (data) {
        return post(
            '/im/setGroupName',
            {
                curr_user_name: data.imUsername,
                im_group_id: data.groupId,
                groupname: data.groupName
            }
        );
    };


    /**
     * 设置群消息的状态
     *
     * @param {[type]} data [description]
     */
    exports.setMsgStatus = function (data) {
        return post(
            '/im/setMsgStatus',
            {
                curr_user_name: data.imUsername,
                im_group_id: data.groupId,
                msg_status: data.msgStatus
            }
        );
    };

    /**
     * 退出群
     *
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    exports.quitGroup = function (data) {
        return post(
            '/im/quitGroup',
            {
                curr_user_name: data.imUsername,
                im_group_id: data.groupId
            }
        );
    };


    /**
     * 解散群
     *
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    exports.dissolveGroup = function (data) {
        return post(
            '/im/dissolveGroup',
            {
                curr_user_name: data.imUsername,
                im_group_id: data.groupId
            }
        );
    };


    /**
     * 客服系统  设置在线状态
     */
    exports.setOnlineStatus = function (data) {
        var param = {
            id: data.id,
            status: data.status
        }

        setImParam(param);

        return post(
            '/custom_im/setOnlineStatus',
            param
        );
    };

    /**
     * 设置来源页面
     */
    exports.setOriginPage = function (data) {
        var param = {
            curr_user_name: data.imUsername,
            origin_page: data.origin_page
        }

        setImParam(param);

        return post(
            '/custom_im/setOriginPage',
            param
        );
    };


    exports.addKFContact = function (data) {
        var param = {
            id: data.id,
            im_user_name: data.imUsername
        }

        setImParam(param);

        return post(
            '/custom_im/addContact',
            param
        );
    };

    exports.getUserInfoKF = function (data) {
        var param = {
            im_user_name: data.imUsername
        }

        setImParam(param);

        return post(
            '/custom_im/getUserInfo',
            param
        );
    };


    /**
     * 获取接入语
     */
    exports.getFirstText = function (data) {
        var param = {};

        setImParam(param);

        return post(
            '/custom_im/getFirstText',
            param
        );
    };

    /**
     * 客服系统获取最近联系人
     */
    exports.getServiceLastContacts = function (data) {
        var param = {
            curr_user_name: data.currentName
        }

        setImParam(param);

        return post(
            '/custom_im/lastContacts',
            param
        );
    };

    /**
     * 客服IM当前联系人
     */
    exports.serviceContacts = function (data) {
        var param = {
            id: data.id,
            im_user_name: data.imUsername
        }

        setImParam(param);

        return post(
            '/custom_im/serviceContacts',
            param
        );
    };


    /**
     * 检测用户分配给哪个客服
     */
    exports.checkService = function (data) {
        var param = {
            im_user_name: data.imUsername,
            curr_user_name: data.currentName
        }

        setImParam(param);

        return post(
            '/custom_im/checkService',
            param
        );
    };

    /**
     * 检测用户分配给哪个客服
     */
    exports.getUserCustom = function (data) {
        var param = {
            im_user_name: data.imUsername
        }

        setImParam(param);

        return post(
            '/custom_im/getUserCustom',
            param
        );
    };

    /**
     * 检测用户是否分配给自己
     */
    exports.isMyCustom = function (data) {
        var param = {
            im_user_name: data.imUsername,
            id: data.id
        }

        setImParam(param);

        return post(
            '/custom_im/isMyCustom',
            param
        );
    };

    /**
     * 建立客服链接
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    exports.createKFConn = function (data) {
        var param = {
            id: data.id,
            im_user_name: data.imUsername
        }

        setImParam(param);

        return post(
            '/custom_im/createConn',
            param
        );
    };


    /**
     * 关闭会话
     */
    exports.closeService = function (data) {
        var param = {
            id: data.id,
            im_user_name: data.imUsername
        }

        setImParam(param);

        return post(
            '/custom_im/close',
            param
        );
    };

    /**
     * 获取快捷回复
     */
    exports.getQuickReply = function (data) {
        var param = { }

        setImParam(param);
        return post(
            '/custom_im/getQuickReply',
            param
        );
    };


    /**
     * 添加快捷回复
     */
    exports.addQuickReply = function (data) {
        var param = {
            text: data.text
        }

        setImParam(param);

        return post(
            '/custom_im/addQuickReply',
            param
        );
    };


    /**
     * 删除快捷回复
     */
    exports.delQuickReply = function (data) {
        var param = {
            id: data.id
        }

        setImParam(param);

        return post(
            '/custom_im/delQuickReply',
            param
        );
    };

    /**
     * 修改快捷回复
     */
    exports.modQuickReply = function (data) {
        var param = {
            id: data.id,
            text: data.text
        }

        setImParam(param);

        return post(
            '/custom_im/modQuickReply',
            param
        );
    };


    /**
     * 客服im的心跳
     */
    exports.customHeartbeat = function (data) {
        var param = {
            id: data.id
        }

        setImParam(param);

        return post(
            '/custom_im/heartbeat',
            param
        );
    };

    /**
     * 流程体验官报名活动回调是否报名
     *
     * @param  {Object} data
     *
     * @return {Promise}
     */
    exports.checkexApply = function (data) {
        return post(
            '/activity/countInfo?type=1&activity_id=ground002&has_total=1',
            {
                activity_id: 'ground002'
            }
        );
    };

    /**
     * 流程体验官报名活动回调报名
     *
     * @param  {Object} data
     *
     * @return {Promise}
     */
    exports.userexApply = function (data) {
        return post(
            '/activity/registerUser?type=1&activity_id=ground002&has_total=1&channel_id=pc001',
            {
                activity_id: 'ground002'
            }
        );
    };
    /**
     * 获取高考活动得列表
     *
     * @param  {Object} data
     *
     * @return {Promise}
     */
    exports.getGaoKaoActivity = function (data) {
        return post(
            '/activity/college_entrance',
            data
        );
    };

    /**
     * iphone回调是否抽奖
     *
     * @param  {Object} data
     *
     * @return {Promise}
     */
    exports.checkipApply = function (data) {
        return post(
            '/activity/countInfo?type=1&activity_id=ground001&has_total=1',
            {
                activity_id: 'ground001'
            }
        );
    };

    /**
     * iphone用户参与抽奖
     *
     * @param  {Object} data
     *
     * @return {Promise}
     */
    exports.useripApply = function (data) {
        return post(
            '/activity/registerUser?type=1&activity_id=ground001&has_total=1&channel_id=pc001',
            {
                activity_id: 'ground001'
            }
        );
    };

    /**
     * 获取邀请评价的信息
     *
     * @param  {Object} data
     * @property {string} data.teacherId 老师的ID
     *
     * @return {Promise}
     */
    exports.getInviteCommentInfo = function (data) {
        return post(
            '/teacher/getInviteCommentInfo',
            {
                teacher_id: data.teacherId
            }
        );
    };


    /**
     * 获取访问量
     *
     * @param  {Object} data
     * @property {string} data.number 老师的number
     *
     * @return {Promise}
     */
    exports.getTeacherViewAjax = function (data) {
        return post(
            '/teacher/viewAjax',
            {
                number: data.number
            }
        );
    };

    /**
     * 提交邀请评价的表单数据
     *
     * @param  {Object} data
     * @property {string} data.userName 用户名
     * @property {string} data.teacherNumber 老师的number
     * @property {string} data.courseId 老师的科目
     * @property {string} data.lessonWay 科目的上课方式
     * @property {string} data.lessonTime 科目的上课时间
     * @property {string} data.faceType 科目的好评|中评|差评
     * @property {string} data.descMatch 科目的描述相符
     * @property {string} data.teachResult 老师的教学效果
     * @property {string} data.serviceAttitude 老师的服务态度
     * @property {string} data.commentInfo 评论内容
     * @property {array} data.photo_list 晒图
     *
     * @return {Promise}
     */
    exports.sendInviteCommentInfo = function (data, options) {
        return post(
            '/teacher/postComment',
            {
                name: data.userName,
                teacher_number: data.teacherNumber,
                total_score: data.total_score,
                info: data.commentInfo,
                photo_list: data.photoList
            },
            options
        );
    };

    /**
     * 活动-限时秒杀
     *
     * @param  {Object} data
     *
     * @return {Promise}
     */
    exports.sectime = function (data) {
        return post(
            '/activity/sectime?type=1&activity_id=ground001&has_total=1&channel_id=pc001',
            {
                activity_id: 'ground004'
            }
        );
    };

    /**
     * 左导，审核状态
     *
     * @return {Promise}
     */
    exports.overviewAudit = function (data) {
        return post(
            '/teacher_center/overview',
            data
        );
    };

    //抽奖返现活动页面 活动结束后需要移除 liucong
    /**
     * 抽奖请求
     * @param  {Object} data
     * @property {string} data.number 邀请人的number
     * @return {Promise}
     */
    exports.getPrize = function (data) {
        return post(
            '/activity/getPrize',
            data
        );
    };

    /**
     * 获取抽奖（奖学金）记录
     * @param  {Object} data
     * @property {Number} data.page 页码
     * @property {Number=} data.page_size 单页数量
     * @property {string} data.number 邀请人或登录者的number
     * @property {string} data.tyoe 邀请人或登录者的type
     * @return {Promise}
     */
    exports.getPrizeRecord = function (data) {
        return post(
            '/activity/prizeRecord',
            data
        );
    };

    /**
     * 获取返现记录
     * @param  {Object} data
     * @property {Number} data.page 页码
     * @property {Number=} data.page_size 单页数量
     * @property {string} data.number 邀请人或登录者的number
     * @property {string} data.tyoe 邀请人或登录者的type
     * @return {Promise}
     */
    exports.getCashbackRecord = function (data) {
        return post(
            '/activity/cashBackRecord',
            data
        );
    };

    /**
     * 发送邀请活动的短信
     * @param  {String} mobile 要发送的手机号
     * @return {Promise}
     */
    exports.sendCashBackInvite = function (data) {
        return post(
            '/activity/smsInvite',
            {
                mobile: data.mobile
            }
        );
    };

    /**
     * 检测是否重复购买班课／打包课
     *
     * @param {Object} data
     * @property {string} data.courseNumber 班课编号／打包课编号
     * @property {string} data.courseType 班课类型 班课2
     *
     *
     * @return {Promise}
     */
    exports.checkCourseRepeat = function (data, options) {

        return post(
            '/pay/ifCanBuy',
            {
                course_number: data.courseNumber,
                course_type: data.courseType
            },
            {
                sync: true,
                errorHandler: options && options.errorHandler
            }
        );

    };

    /**
     * 班课设置——请求某科目下班课列表
     *
     * @return {Promise}
     */
    exports.getClassCourseList = function (data) {

/*        return post(
            '/teacher_center/classCourse?type=subject&subject_id=' + data.subject_id,
            {
                render: 'ajaxTpl'
            }
        );*/
    //接口变更，不依据subject分组取，而只是分页取班课
        return post(
            '/teacher_center/classCourseList',
            data
        );
    };

    /**
     * 班课设置——提交审核
     *
     * @param {Object} data
     * @property {string} data.number 班课编号
     *
     * @return {Promise}
     */
    exports.classCourseAudit = function (data, options) {

        return post(
            '/class_course/submitAudit',
            {
                number: data.number
            },
            options
        );

    };

    /**
     * 班课设置——撤回审核
     *
     * @param {Object} data
     * @property {string} data.number 班课编号
     *
     * @return {Promise}
     */
    exports.classCourseRevokeAudit = function (data) {

        return post(
            '/class_course/revokeAudit',
            {
                number: data.number
            }
        );

    };


    /**
     * 班课设置——班课招生
     *
     * @param {Object} data
     * @property {string} data.number 班课编号
     * @property {string} data.op begin（开始招生）goon（继续招生）stop（停止招生）
     *
     * @return {Promise}
     */
    exports.statusClassCourse = function (data) {

        return post(
            '/class_course/status',
            {
                number: data.number,
                op: data.op
            }
        );

    };

    /**
     * 班课设置——再开一班
     *
     * @param {Object} data
     * @property {string} data.number 需要复制的班课编号
     *
     * @return {Promise}
     */
    exports.copyClassCourse = function (data) {

        return post(
            '/class_course/copy',
            {
                number: data.number
            }
        );

    };

    /**
     * 班课设置——删除班课
     *
     * @param {Object} data
     * @property {string} data.number 班课编号
     *
     * @return {Promise}
     */
    exports.delClassCourse = function (data) {

        return post(
            '/class_course/delete',
            {
                number: data.number
            }
        );

    };

    /**
     * 班课设置——插入和修改班课课程信息
     *
     * @param {Object} data
     * @property {string} data.subjectId 科目id
     * @property {string} data.name 课程标题
     * @property {string} data.price 课程总价
     * @property {string} data.maxStudent 班级人数
     * @property {string} data.minStudent 最小开班人数
     * @property {string} data.introduction 课程详情
     * @property {string} data.studentDesc 适学人群
     * @property {string} data.target      教学目标
     * @property {string} data.lessonWay 上课方式
     * @property {string} data.addrRadio 上课地点选项
     * @property {string} data.addressId 地址库中某地址ID
     * @property {string} data.areaId 区id(判断上课地点选项)
     * @property {string} data.address 具体地址
     * @property {number} data.lng           新地址经度
     * @property {number} data.lat           新地址纬度
     * @property {number} data.asRegularAddress  1:设为默认地址，0：不设为默认地址
     * @property {string} data.number 班课编号(如果设置此参数，则为修改)
     * @property {number} data.chabanFlag 能否插班 1不能 2班节 3随时
     * @property {number} data.chabanQuota 开班几节课前可插班
     * @property {number} data.chabanPriceFlag 插班价格设置方式
     * @property {number} data.chabanPrice 自定义插班价格
     * @property {number} data.classType 支持手机观看
     * @property {number} data.bsSwitch 是否开启学生通话
     *
     * @return {Promise}
     */
    exports.upsertClassCourse = function (data, options) {

        return post(
            '/class_course/upsert',
            {
                subject_id: data.subjectId,
                name: data.name,
                price: data.price,
                original_price: data.originalPrice,
                max_student: data.maxStudent,
                min_student: data.minStudent,
                introduction: data.introduction,
                student_desc: data.studentDesc,
                target: data.target,
                lesson_way: data.lessonWay,
                user_address_id: data.addressId,
                area_id: data.areaId,
                address: data.address,
                lng: data.lng,
                lat: data.lat,
                as_regular_address: data.asRegularAddress,
                number: data.number,
                class_type: data.classType,
                bs_switch: data.bsSwitch
            },
            options
        );

    };


    /**
     * 班课设置——添加和更新图片
     *
     * @param {Object} data
     * @property {string} data.number 班课编号
     * @property {string} data.id 记录id
     * @property {string} data.storage_id 图片id
     * @property {string} data.title 图片名称
     *
     * @return {Promise}
     */
    exports.upsertClassCoursePhoto = function (data, options) {

        return post(
            '/photo/upsertClassCoursePhoto',
            {
                number: data.courseNumber,
                id: data.id,
                storage_id: data.storage_id,
                title: data.title
            },
            options
        );

    };

    /**
     * 班课设置——删除课程照片
     *
     * @param {Object} data
     * @property {string} data.number 班课编号
     * @property {string} data.id 图片id
     *
     * @return {Promise}
     */
    exports.delClassCoursePhoto = function (data) {

        return post(
            '/photo/delClassCoursePhoto',
            {
                number: data.courseNumber,
                id: data.id
            }
        );

    };

    /**
     * 班课设置 教学计划 新增/更新
     *
     * @param {Object} data
     * @property {string} data.number               班课number
     * @property {string} data.arrangement          课程安排
     * @property {string} data.retire_flag          退课方式 0:随时可退, 1:按小时, 2:按课节
     * @property {string} data.retire_length        退课长度(小时或课节)
     * @property {string} data.chaban_flag          插班规则
     * @property {string} data.chaban_price         插班价格
     * @property {string} data.chaban_quota         多少课节以前可以插班
     * @property {string} data.chaban_price_flag    插班价格方式
     * @property {string} data.confirm_flag         是否强制更新
     * @property {json formatted string} data.schedules 课节 型如
     *
     * schedules: [
     *     {
     *         "class_course_number": 141113475716, 班课number
     *         "id": 123, 教学计划ID
     *         "begin_time": 1415860970, 开始时间
     *         "end_time": 1415862970, 结束时间
     *         "content": "\u8bfe\u7a0b\u5927\u7eb2\u4ecb\u7ecd", 课程内容
     *         "teacher_user_number": 123415 本节班课的主讲老师
     *     }
     * ]
     *
     * @return {Promise}
     */
    exports.classCourseSchedule = function (data, options) {

        return post(
            '/class_course/schedule',
            {
                number: data.number,
                arrangement: data.arrangement,
                retire_flag: data.retire_flag,
                retire_length: data.retire_length,
                chaban_flag: data.chaban_flag,
                chaban_price: data.chaban_price,
                chaban_quota: data.chaban_quota,
                chaban_price_flag: data.chaban_price_flag,
                confirm_flag: data.confirm_flag,
                schedules: data.schedules
            },
            options
        );

    };

    /**
     * 班课设置 - 教学计划 - 删除
     * @param  {string} data.id
     */
    exports.classCourseScheduleDelete = function (data) {

        return post(
            '/class_course_schedule/delete',
            {
                id: data.id
            }
        );

    };

    /**
     * 班课设置 - 教学计划 - 批量删除删除
     * @param  {string} data.ids id用英文逗号分割
     */
    exports.classCourseScheduleBatchDelete = function (data) {

        return post(
            '/class_course_schedule/batch_delete',
            {
                ids: data.ids
            }
        );

    };

    /**
     * 非常规时间班课理由上送接口
     * @param  {string} data.reason 理由
     * @param  {string} data.course_number 班课number
     * @return {Promise}
     */
    exports.classCourseSpecialTimeReason = function (data) {

        return post(
            '/class_course/specialTimeReason',
            {
                reason: data.reason,
                course_number: data.course_number
            }
        );
    }

    /**
     * 获取某个班课的订单列表
     * @param  {string} data.number 班课编号
     * @param  {string} data.student_display_name 学生姓名
     * @param  {string} data.purchase_id 订单编号
     * @param  {string} data.group 订单状态 enum (ALL/WAITING_FOR_PAY/WIP/COMMENT)
     * @param  {number} data.page 页码
     * @return {Promise}
     */
    exports.getClassCourseOrderList = function (data) {

        return post(
            '/class_course/order_list',
            {
                number: data.number,
                student_display_name: data.student_display_name,
                purchase_id: data.purchase_id,
                group: data.group,
                page: data.page
            }
        )
    };

    exports.changeOrderMoney = function (data) {
        return post(
            '/pay/changeMoney',
            {
                purchase_id: data.purchaseId,
                pay_money: data.payMoney
            }
        );
    };

    /**
     *  百度视频统计代码
     *  @param {stirng} url
     */
    exports.baiduVideo = function (data) {
        return post(
            data.url,
            {
                url: data.url
            }
        );
    };

    /**
     * 重置用户密码
     * @param  {Object} data form data
     */
    exports.resetPassword = function (data) {
        return post(
            '/user/reset_password',
            data
        );
    }

    exports.updateReservedLesson = function (data, options) {
        return post(
            '/lesson/updateReserveTime',
            {
                lesson_id: data.lesson_id,
                purchase_id: data.purchase_id,
                start_time: data.start_time,
                end_time: data.end_time,
                force: data.force,
                max_hours: data.max_hours
            },
            options
        );
    }

    exports.createPurchase = function (data, options) {
        return post(
            'https://' + location.host + '/pay/createProductPurchase',
            {
                type: data.type,
                course_id: data.courseId,
                combo_id: data.comboId,
                hours: data.hours,
                lesson_way: data.lessonWay,
                course_number: data.courseNumber,

                is_self: data.isSelf,
                area_id: data.areaId,
                address: data.locationAddr,
                lng: data.lng,
                lat: data.lat,
                note: data.note,
                student_name: data.studentName,
                name: data.name,
                use_plat_ensure: data.usePlatEnsure,
                is_sms: data.isSms,

                pay_type: data.payType,
                pay_password: data.payPassword,
                activity_id: data.activityId,

                discount_type: data.discountType,
                // market_activity_id: data.market_activity_id,
                pay_money: data.pay_money,
                tUId: data.tUId,
                fenqi_flag: data.fenqiFlag,
                periods: data.periods,
                material_post_info: data.material_post_info //邮寄资料个人信息
            },
            options
        );
    };

    exports.createfreePurchase = function (data, options) {
        return post(
            'http://' + location.host + '/teacher/createProductPurchase',
            {
                type: data.type,
                course_id: data.courseId,
                combo_id: data.comboId,
                hours: data.hours,
                lesson_way: data.lessonWay,
                course_number: data.courseNumber,

                is_self: data.isSelf,
                area_id: data.areaId,
                address: data.locationAddr,
                lng: data.lng,
                lat: data.lat,
                note: data.note,
                student_name: data.studentName,
                name: data.name,
                use_plat_ensure: data.usePlatEnsure,
                is_sms: data.isSms,

                pay_type: data.payType,
                pay_password: data.payPassword,
                activity_id: data.activityId,

                discount_type: data.discountType,
                // market_activity_id: data.market_activity_id,
                pay_money: data.pay_money,
                tUId: data.tUId
            },
            options
        );
    };
    /**
     * 自动生成直播课支付订单
     * @property {number} data.course_number 班课number
     * @property {number=} data.course_type 类型 默认班课 机构X课11、12
     * @return {Promise}
     */
    exports.autoPayForLiveCourse = function (data) {
        return post(
            '/pay/autoPayForLiveCourse',
            {
                course_number: data.courseNumber,
                course_type: data.courseType
            }
        );
    };
    /**
     * 获取用户是否已经支付了班课
     * @property {number} data.course_number 班课number
     * @property {number=} data.course_type 课程类型 默认班课2 机构X课11、12
     * @return {Promise}
     */
    exports.getUserPaid = function (data) {
        return post(
            '/pay/hasPayForClassCourse',
            {
                course_number: data.courseNumber,
                course_type: data.courseType,
            }
        );
    };
    /**
     * 保存用户消息设置
     *
     *
     * @param {Object} data
     * @property {number} data.submit_order 新增待支付订单是否发送消息，0 不发 1 发
     * @property {number} data.pay_order 新增已支付订单是否发送消息，0 不发 1 发
     * @property {number} data.cancel_order 取消订单是否发送消息，0 不发 1 发
     * @property {number} data.reserve_course 学生发起约课是否发送消息，0 不发 1 发
     * @property {number} data.confirm_course 学生确认约课是否发送消息，0 不发 1 发
     * @property {number} data.cancel_course 课程取消是否发送消息，0 不发 1 发
     * @property {number} data.remind_1day_before 课前 1 天是否发送消息，0 不发 1 发
     * @property {number} data.remind_1hour_before 课前 1 小时是否发送消息，0 不发 1 发
     * @property {number} data.submit_class_order 新增待支付班课订单是否发送消息，0 不发 1 发
     * @property {number} data.pay_class_order 新增已支付班课订单是否发送消息，0 不发 1 发
     * @property {number} data.cancel_class_order 班课订单取消是否发送消息，0 不发 1 发
     * @property {number} data.full_class 满班是否发送消息，0 不发 1 发
     * @property {number} data.receive_offline_message 有人给你发离线消息是否发送消息，0 不发 1 发
     * @property {number} data.pay_course 课酬已到平台账户是否发送消息，0 不发 1 发
     * @property {number} data.deduct_point 扣分增加通知，0 不发 1 发
     * @property {number} data.deduct_punishment_remove 惩罚状态解除，0 不发 1 发
     * @return {Promise}
     */
    exports.saveMessageSetting = function (data) {
        return post(
            '/message/setting',
            {
                submit_order: data.submit_order,
                pay_order: data.pay_order,
                cancel_order: data.cancel_order,
                reserve_course: data.reserve_course,
                confirm_course: data.confirm_course,
                cancel_course: data.cancel_course,
                remind_1day_before: data.remind_1day_before,
                remind_1hour_before: data.remind_1hour_before,
                submit_class_order: data.submit_class_order,
                pay_class_order: data.pay_class_order,
                cancel_class_order: data.cancel_class_order,
                full_class: data.full_class,
                receive_offline_message: data.receive_offline_message,
                pay_course: data.pay_course,
                deduct_point: data.deduct_point,
                deduct_punishment_remove: data.deduct_punishment_remove
            }
        );
    };

    /**
     * 支付，发送短信接口
     *
     * @param {Object} data
     * @property {string} data.purchaseId 订单 ID
     * @property {number} data.money 金额
     * @property {number} data.cashType 付款类型
     *                                  1 快捷支付网银在线信用卡首次
     *                                  2 快捷支付网银在线储蓄卡首次
     *                                  3 无卡支付信用卡首次
     *                                  4 快捷支付网银在线信用卡再次
     *                                  5 快捷支付网银在线储蓄卡再次
     *                                  6 无卡支付信用卡再次
     * @property {string} data.bankName 银行缩写，如 ICBC
     * @property {string} data.cardId 银行卡号带星号的版本
     * @property {string} data.cardType 银行卡类型，C 信用卡 D 储蓄卡
     * @property {string=} data.cvv 信用卡号后三位
     * @property {string=} data.expireYear 信用卡过期年份
     * @property {string=} data.expireMonth 信用卡过期月份
     * @property {string=} data.ownerName 银行卡户主姓名
     * @property {string=} data.ownerId 银行卡户主身份证
     * @property {string=} data.ownerMobile 银行卡户主手机
     * @return {Promise}
     */
    exports.sendPaySms = function (data) {
        return post(
            '/pay/motoPayVerify',
            {
                card_name: data.bankName.toUpperCase(),
                unique_id: data.cardId,
                card_type: data.cardType,
                exp: data.expireYear + '-' + data.expireMonth,
                cvv: data.cvv,
                owner_name: data.ownerName,
                owner_id: data.ownerId,
                owner_mobile: data.ownerMobile,
                purchase_id: data.purchaseId,
                money: data.money,
                cash_type: data.cashType
            }
        );
    };

    /**
     * 获取银行卡信息
     *
     * @param {Object} data
     * @property {string} data.bankName 银行缩写，如 CMB 表示招行
     * @property {string} data.cardType 卡类型，C 信用卡 D 储蓄卡
     * @return {Promise}
     */
    exports.getCardIndex = function (data) {
        return post(
            '/pay/cardIndex',
            {
                card_name: data.bankName.toUpperCase(),
                card_type: data.cardType
            }
        );
    };

    /**
     * 保存用户设置
     *
     * @param {Object} data
     */
    exports.saveUserConfig = function (data) {
        return post(
            '/user/setConfig',
            data
        );
    };

    /**
     * 校验图形验证码
     * @param  {string} data.captcha 值
     * @param  {string} data.captcha_name 名称
     */
    exports.validateCaptcha = function (data, options) {
        return post(
            '/captcha/validate',
            data,
            options
        );
    };

    /**
     * 获取国际区号
     * 返回格式
     * data: [
     *      {
     *          "text": "中国香港",
     *          "code": "+852",
     *          "pic": "url",
     *          "value": "00852"
     *      }
     * ]
     * @return {JQ Promise}
     */
    exports.getInternationalCode = function() {
        return post(
            '/index/getGlobalMobile'
        );
    };

    /**
     * 预约 － 留单（个体老师）
     *
     * @property {string} data.userName 用户名
     * @property {number} data.mobile 手机号
     * @property {string} data.info 想学什么
     * @property {number} data.expPrice 期望价格
     * @property {number} data.supportOnline 接受线上授课 1接受 0不接受
     * @property {string} data.detailInfo 留言详细的学习内容
     * @property {string} data.pageType 来源 teacher-detail：老师主页
                                             one2one-detail：一对一详情页
                                             class-course-detail：班课详情页
     * @property {string} data.source 渠道 genshuixue
     * @property {string} data.captchaName 验证码名字
     * @property {string} data.captcha 验证码
     * @property {string} data.detailUrl 当前页面链接
     * @property {int} data.teacherNum 在老师主页课程详情页时预约试听需要传老师number
     * @property {int} data.channel 频道
     * @return {Promise}
     */
    exports.addRecommendRecord = function (data, options) {
        return post(
            '/recommend/add_record',
            {
                user_name: data.userName,
                mobile: data.mobile,
                info: data.info,
                exp_price: data.expPrice,
                support_online: data.supportOnline,
                detail_info: data.detailInfo,
                page_type: data.pageType,
                source: data.source,
                // captcha_name: data.captchaName,
                // captcha: data.captcha,
                detail_url: data.detailUrl,
                smscode: data.smscode,
                teacher_number: data.teacherNum,
                channel: data.channel
            }, options
        );
    };

    /**
     * 预约 － 留单（机构白名单老师）
     *
     * @param {Object} data
     * @property {number} data.objectNumber 对象编号：如果是机构页，为机构编号；
                                                    课程，则为课程编号（含班课及一对一）；
                                                    老师主页，老师编号；
     * @property {string} data.contentType 内容类型：cdb.teacher_class_course 班课（非3810）
                                                   cdb.org_course 机构班课（3810）
                                                   yunying.org_account 机构
                                                   cdb.teacher_course 一对一课程
                                                   cdb.teacher 老师主页
     * @property {string} data.mobile 手机号
     * @property {string} data.captcha_code 图形验证码
     * @property {string} data.captcha_name 图形验证码名称
     * @property {string} data.info 留言内容
     * @property {string?} data.detailUrl 当前页面链接
     * @return {Promise}
     *
     */
    exports.createAdvisory = function (data, options) {
        return post(
            '/student_advisory/create',
            {
                object_number: data.objectNumber,
                content_type: data.contentType,
                mobile: data.mobile,
                words: data.info,
                captcha_code: data.captchaCode,
                captcha_name: data.captchaName,
                detail_url: data.detailUrl,
                realname: data.realName,
                advisory_type: data.advisoryType
            },
            options
        );
    };

    /**
     * 发送语音验证码
     * @param  {string} data.mobile 手机号
     * @param  {string} data.captcha 图形验证码
     */
    exports.sendVoiceSMS = function(data, options) {
        return post(
            '/sms/send',
            {
                mobile: data.mobile,
                captcha: data.captcha,
                captcha_name: data.captchaName,
                type: 'voice'
            },
            options
        );
    };

    /**
     * 闪电约课
     * @param {Object} data
     * @param {string} data.teacherNum  置位某个老师的闪电约课(number)
     *                                （没有该参数，置位全部老师）
     * @param {number} data.protocol  使用协议 1同意（废弃）
     * @param {number} data.qreserveSign  当前操作 1开启 0关闭
     * @param {number} data.remind  提醒 1提醒 0不再提醒
     *
     */
    exports.quickLesson = function (data) {
        return post(
            '/lesson/qreserveLesson',
            {
                teacher_number: data.teacherNum,
                qreserve_sign: data.qreserveSign,
                remind: data.remind
            }
        );
    };

    /**
     * 客户端登录
     * @param {Object} data
     * @param {string} data.username  用户名手机
     * @param {string} data.password  用户密码
     * @param {number} data.usertype  用户类型 0老师 2学生
     * @return {Promise}
     */
    exports.clientLogin = function (data) {
        return post(
            '/Auth/signin_client_ajax',
            {
                username: data.phoneNo,
                password: data.password,
                usertype: data.usertype
            }
        );
    };

    /**
     * 查询在线课程
     * @param {Object} data
     * @param {string} data.username  用户名
     * @return {Promise}
     */
    exports.onlineTeacherCourse = function (data) {
        return post(
            '/Video/quickTeacher',
            {
                username: data.username
            }
        );
    };

    /**
     * 查询在线课程
     * @param {Object} data
     * @param {string} data.username  用户名
     * @return {Promise}
     */
    exports.onlineStudentCourse = function (data) {
        return post(
            '/Video/quickStudent',
            {
                username: data.username
            }
        );
    };

    /**
     * 查询最近在线联系人
     * @param {Object} data
     * @param {string} data.username  用户名
     * @return {Promise}
     */
    exports.lastContacts = function (data) {
        return post(
            '/im/lastContacts',
            {
                curr_user_name: data.username
            }
        );
    };

    /**
     * 查询所有在线联系人
     * @param {Object} data
     * @param {string} data.username  用户名
     * @return {Promise}
     */
    exports.teacherContacts = function (data) {
        return post(
            '/im/myContacts',
            {
                username: data.username
            }
        );
    };

    /**
     * 老师个人中心课程分类
     * @param {Object} data
     * @param {string} data.keyword 课程分类的关键字
     * @return {Promise}
     */
    exports.courseClassify = function (data) {
        return post(
            '/teacher_center/subjectRecommend',
            {
                keyword: data.keyword
            }
        );
    };

    exports.applyFreeTutor = function (data) {
        return post(
            '/activity/frTutor',
            {
                'name': data.name,
                'tel': data.telephone,
                'QQ': data.qq,
                'add': data.address,
                'gra': data.grade,
                'sub': data.subject,
                'other': data.other
            }
        );
    }

    /**
     * 地址管理 - 保存与修改
     * @param {Object} data
     * @param {string} data.addressId 地址簿id，有则是更新，无则是新增
     * @param {number} data.areaId      第三级 （区）id
     * @param {number} data.locationAddr       详细地址
     * @param {number} data.lng           经度
     * @param {number} data.lat           纬度
     * @param {number} data.asRegularAddress  1:设为默认地址，0：不设为默认地址
     * @return {Promise}
     *
     */
    exports.upsertAddress = function (data) {
        return post(
            '/teacher_center/upsertAddress',
            {
                address_id: data.addressId,
                area_id: data.areaId,
                address: data.locationAddr,
                lng: data.lng,
                lat: data.lat,
                as_regular_address: data.asRegularAddress
            }
        );
    };

    /**
     * 地址管理 - 保存与修改(2016.12.15)
     * @param {Object} data
     * @param {number} data.addressId   地址id，有则是更新，无则是新增
     * @param {number} data.status      是否是常用地址 0不是 1常用地址
     * @param {number} data.areaId      区ID／国家ID
     * @param {number} data.lng           经度
     * @param {number} data.lat           纬度
     * @param {string} data.locationAddr  所在区域／海外地址
     * @param {string} data.detailedAddr  详细地址
     * @return {Promise}
     *
     */
    exports.upsertNewAddress = function (data) {
        return post(
            '/tcenter/addresses/save',
            {
                address_id: data.addressId,
                status: data.status,
                area_id: data.areaId,
                lng: data.lng,
                lat: data.lat,
                location_addr: data.locationAddr,
                detailed_address: data.detailedAddr,
            }
        );
    };

    /**
     * 地址管理 - 删除
     * @param {Object} data
     * @param {string} data.address_id 地址簿id
     * @return {Promise}
     *
     */
    exports.delAddress = function (data) {
        return post(
            '/teacher_center/delAddress',
            {
                address_id: data.addressId
            }
        );
    };

    /**
     * 地址管理 - 删除(2016.12.15)
     * @param {Object} data
     * @param {string} data.addressId 地址簿id
     * @return {Promise}
     *
     */
    exports.delNewAddress = function (data) {
        return post(
            '/tcenter/addresses/delete',
            {
                id: data.addressId
            }
        );
    };

    /**
     * 地址管理 - 设为常用地址
     * @param {Object} data
     * @param {string} data.address_id 地址簿id
     * @return {Promise}
     *
     */
    exports.setDefaultAddress = function (data) {
        return post(
            '/teacher_center/setDefaultAddress',
            {
                address_id: data.addressId
            }
        );
    };

    /**
     * 地址管理 - 设为常用地址(2016.12.15)
     * @param {Object} data
     * @param {string} data.addressId 地址簿id
     * @return {Promise}
     *
     */
    exports.setDefaultNewAddress = function (data) {
        return post(
            '/tcenter/addresses/set_default',
            {
                id: data.addressId
            }
        );
    };


    /**
     * 地址管理 - 保存位置
     * @param {Object} data
     * @param {number} data.city_id    当前用户选择数据库中市级ID
     * @param {string} data.area_name    百度传回的第三级名称
     * @return {Promise}
     *
     */
    exports.checkAddress = function (data) {
        return post(
            '/teacher_center/checkAddress',
            {
                city_id: data.cityId,
                area_name: data.areaName
            }
        );
    };


    /**
     * 老师资料库（网盘） 获取某目录下的文件信息
     * @param    {string=}  data.query 搜索词
     * @property {string=} data.path 获取指定路径下的资源，当需要进入一个目录的时候，则把目录的path传入进来
     * @property {number=} data.type 筛选类型，1=全部,2=文档,3=图片,4=音乐,5=视频,10=其它
     * @property {string=} data.sortBy 排序类型，size=按大小排序, update_time=按最后更新时间
     * @property {string=} data.direction 升降序类型，asc=升序，desc=降序
     * @return {Promise}
     */
    exports.netdiskSort = function (data) {

        return post(
            '/teacher_center/netdisk', // '/netdisk/sort',
            {
                query: data.query,
                path: data.path,
                type: data.type,
                sort_by: data.sortBy,
                direction: data.direction
            }
        );
    }

    /**
     * 老师资料库（网盘） 浏览目录
     * @param  {string} data.path 目录全路径
     * @return {Promise}
     */
    exports.netdiskDir = function (data) {

        return post(
            '/netdisk/dir',
            {
                path: data.path
            }
        );
    }

    /**
     * 老师资料库 筛选文件  * 废弃 *
     * @param  {string} data.type 1=全部,2=文档,3=图片,4=音乐,5=视频,10=其它
     * @property {string=} data.sortBy "size"按大小排序, "update_time"按最后更新时间
     * @property {string=} data.direction "asc"升序，"desc"降序
     * @return {Promise}
     */
    exports.netdiskCategory = function(data) {

        return post(
            '/netdisk/category',
            {
                type: data.type,
                sort_by: data.sortBy,
                direction: data.direction
            }
        );
    }

    /**
     * 老师资料库 移动文件
     * @param  {string} data.srcPath    源文件目录全路径
     * @param  {string} data.destPath   目标目录全路径
     * @param  {string} data.files      文件名 用逗号分隔
     * @return {Promise}
     */
    exports.netdiskMove = function (data) {

        return post(
            '/netdisk/move',
            {
                src_path: data.srcPath,
                dest_path: data.destPath,
                files: data.files
            }
        );
    }

    /**
     * 老师资料库 创建文件夹
     * @param  {string} data.path 全路径
     * @return {Promise}
     */
    exports.netdiskCreateDir = function (data) {

        return post(
            '/netdisk/createDir',
            {
                path: data.path
            }
        );
    }

    /**
     * 老师资料库 重命名文件 文件夹
     * @param  {string} data.path 文件文件夹全路径
     * @param  {string} data.rename 重命名的名字
     * @return {Promise}
     */
    exports.netdiskRename = function (data) {

        return post(
            '/netdisk/rename',
            {
                path: data.path,
                rename: data.rename
            }
        );
    }

    /**
     * 老师资料库 删除文件文件夹
     * @param  {string} data.paths 全路径 多个文件用逗号分隔
     * @return {Promise}
     */
    exports.netdiskDelete = function (data, options) {

        return post(
            '/netdisk/delete',
            {
                paths: data.paths
            },
            options
        );
    }

    /**
     * 老师资料库 搜索 * 废弃 *
     * @param    {string}  data,query 搜索词
     * @property {string=} data.sortBy "size"按大小排序, "update_time"按最后更新时间
     * @property {string=} data.direction "asc"升序，"desc"降序
     * @return   {Promise}
     */
    exports.netdiskSearch = function (data) {

        return post(
            '/netdisk/search',
            {
                query: data.query,
                sort_by: data.sortBy,
                direction: data.direction
            }
        );
    }

    /**
     * 老师资料库 批量下载
     * @param  {string} data.list 文件全路径，逗号分割 不支持目录
     * @return {Promise}
     */
    exports.netdiskDownload = function (data) {

        return post(
            '/netdisk/download',
            {
                paths: data.list
            }
        );
    }

    /**
     * 提交评论中的【有用】点击
     *
     * @param {Object} data
     * @param {Object} data.id 评论 id
     * @return {Promise}
     */
    exports.commentThumbUp = function (data) {
        return post(
            '/site_thumb/do',
            {
                type: 1,
                action: 1,
                id: data.id
            }
        );
    };

    exports.getVideoCourseOrderList = function (data) {
        return post(
            '/teacher_center/videoCourseOrderList',
            {
                course_number: data.courseNumber
            }
        );
    };

    /**
     * 检测视频课
     * @param  {string} data.courseNumber 课程号
     * @param  {string} data.sectionId
     * @param  {string} data.index 课节序号
     * 返回格式 "data":{ "token": 123123123 }
     */
    exports.checkVideoCourse = function (data, options) {
        return post(
            '/video_course/check',
            {
                course_number: data.courseNumber,
                section_id: data.sectionId,
                index: data.index,
                sign: data.sign,
                modify: data.modify
            },
            options
        );
    };

    /**
     * 直播回放检测视频课
     * @param  {string} data.courseNumber 课程号
     * @param  {string} data.scheduleId
     * 返回格式 "data":{ "token": 123123123 }
     */
    exports.playBackCheckVideoCourse = function (data, options) {
        return post(
            '/class_course/check',
            {
                course_number: data.courseNumber,
                schedule_id: data.scheduleId
            },
            options
        );
    };

    /**
     * PC老师签到
     * @param  {number} data.mood 图片表情
     * @param  {string} data.text 一句话心情
     * @return {Promise}
     */
    exports.checkin = function (data) {
        return post(
            '/teacher_center/checkin',
            {
                mood: data.mood,
                text: data.text
            }
        );
    };


    /**
     * 显示签到日历
     * @param  {string} data.month 月份，如果为空默认是当月
     * @return {Promise}
     */
    exports.getCheckinCalendar = function (data) {
        return post(
            '/teacher_center/getCheckinCalendar',
            {
                month: data.month
            }
        );
    };

    /**
     * 放弃通过 SNS 帐号绑定手机号
     *
     * @return {Promise}
     */
    exports.quitSignupBySns = function () {
        return post(
            '/social_accounts_login/destroy_ajax'
        );
    };

    /**
     * 解除绑定帐号
     *
     * @param {Object} data
     * @property {string} data.type
     * @return {Promise}
     */
    exports.unbindAccount = function (data) {
        return post(
            '/social_accounts_login/unbind_ajax',
            {
                type: data.type
            }
        );
    };

    /**
     * 获取微信二维码
     *
     * data: {
     *     host: '',
     *     redirect: ''
     * }
     *
     * @return {Promise}
     */
    exports.getWechatInfo = function () {
        return post(
            '/social_accounts_login/wechat_qrcode'
        );
    };


    /**
     * 删除评论图片
     *
     * @param {Object} data
     * @property {string} data.storageId 图片存储Id
     *
     * @return {Promise}
     */
    exports.delCommentImg = function (data) {

        return post(
            '/photo/delStorage?call_from=comment&storage_id=' + data.storageId
        );

    };

    /**
     * 快速排课 - 获取一对一学生列表
     * @param {Object} data
     * @property {string} data.keyword 搜索关键词
     * @return {Promise}
     */
    exports.getCourseStudentList = function (data) {
        return post(
            '/teacher_center/courseList',
            {
                keyword: data.keyword
            }
        );
    };

    /**
     * 快速排课 - 获取某学生一对一订单列表
     * @param {Object} data
     * @property {string} data.userNumber 学生number
     * @property {string} data.displayName 订单展示姓名
     * @return {Promise}
     */
    exports.getStudentVIPOrderList = function (data) {
        return post(
            '/teacher_center/orderForm',
            {
                user_num: data.userNumber,
                display_name: data.displayName
            }
        );
    };

    /**
     * 快速排课 - 获取一对一老师列表
     * @param {Object} data
     * @property {string} data.keyword 搜索关键词
     * @return {Promise}
     */
    exports.getCourseTeacherList = function (data) {
        return post(
            '/student_center/courseList',
            {
                keyword: data.keyword
            }
        );
    };

    /**
     * 快速排课 - 获取某老师一对一订单列表
     * @param {Object} data
     * @property {string} data.userNumber 老师number
     * @property {string} data.displayName 订单展示姓名
     * @return {Promise}
     */
    exports.getTeacherVIPOrderList = function (data) {
        return post(
            '/student_center/orderForm',
            {
                user_num: data.userNumber,
                display_name: data.displayName
            }
        );
    };

    /**
     * 检测支付订单状态 用于异步支付的轮询检测 例如微信支付
     * @param  {string} data.purchaseId 订单id
     */
    exports.checkPayPurchaseStatus = function (data, options) {
        return post(
            '/pay/checkPurchaseStatus',
            {
                purchase_id: data.purchaseId
            },
            options
        );
    };

    /**
     * 选择学校
     *
     * @param {Object} data
     *
     * @property {string} data.pid 国家/省/直辖市/区 ID
     * @property {string} data.type 学校类型 1初中 2中专技校 3高中 4大学
     *
     * @return {Promise}
     */
    exports.getSchoolList = function (data) {
        return post(
            '/student_center/school',
            {
                pid: data.pid,
                type: data.type
            }
        );
    };

    /**
     * 选择学校 - 院系
     *
     * @param {Object} data
     *
     * @property {string} data.school_id 学校id
     * @return {Promise}
     */
    exports.getDepartmentList = function (data) {
        return post(
            '/student_center/department',
            {
                school_id: data.schoolId
            }
        );
    };

    /**
     * 删除学生教育信息
     *
     * @param {Object} data
     * @property {string} data.id
     *
     * @return {Promise}
     */
    exports.delStudentBackground = function (data) {
        return post(
            '/student_center/delBackground',
            {
                id: data.id
            }
        );
    };

    /**
     * 删除学生工作信息
     *
     * @param {Object} data
     * @property {string} data.id
     *
     * @return {Promise}
     */
    exports.delStudentWork = function (data) {
        return post(
            '/student_center/delWork',
            {
                id: data.id
            }
        );
    };

    /**
     * 请求小学suggestion
     *
     * @param {Object} data
     * @property {string} data.key 用户输入
     *
     * @return {Promise}
     */
    exports.getPrimarySuggestion = function (data) {

        var env = store.get('env');

        var envMap = {
            test: 'http://beta.suggestion.genshuixue.com/school',
            beta: 'http://beta.suggestion.genshuixue.com/school',
            www: 'http://suggestion.genshuixue.com/school'
        };

        var url = envMap[env] || envMap['www'];

        return getJsonp(
            url,
            data
        );

    };


    /**
     * 请求公司名称suggestion
     *
     * @param {Object} data
     * @property {string} data.key 用户输入
     *
     * @return {Promise}
     */
    exports.getCompanySuggestion = function (data) {

        var env = store.get('env');

        var envMap = {
            test: 'http://beta.suggestion.genshuixue.com/company',
            beta: 'http://beta.suggestion.genshuixue.com/company',
            www: 'http://suggestion.genshuixue.com/company'
        };

        var url = envMap[env] || envMap['www'];

        return getJsonp(
            url,
            data
        );
    };


    /*
     * 赢在校园报名
     *
     * @return {Promise}
     */
    exports.getEnroll = function () {

        return post(
            '/student_center/joinActivity'
        );
    };

    /**
     * 老师个人中心照片信息列表
     *
     * @param {object} data
     * @param {number=} data.page 当前页 默认1
     * @param {number=} data.page_size 当前页条目数 默认12
     *
     */
    exports.getPhotoList = function (data) {
        return post(
            '/photo/list_admin',
            {
                page: data.page,
                page_size: data.pageSize
            }
        );
    };

    /**
     * 三方通话 - 拨打电话
     * @param  {Object} data 发送到后端的参数
     * @param  {string} data.to_number 老师或者机构number
     * @param  {string} data.mobile 学生电话
     * @param  {string} data.smscode 手机验证码
     * @param  {string} data.call_type 拨打类型
     * @return {Promise}
     */
    exports.makePhoneCall = function (data, options) {
        return post(
            '/bellsystem/call',
            data,
            options
        );
    };

    /**
     * 百度地址suggestion
     *
     * @param {Object} data
     * @property {string} data.query 输入建议关键字（支持拼音）
     * @property {string} data.region 所属城市/区域名称或代号 - 市
     * @property {string?} data.output 返回数据格式，可选json、xml两种
     *
     * @return {Promise}
     */
    exports.getAddressSuggestion = function (data) {

        return getJsonp(
            'http://api.map.baidu.com/place/v2/suggestion',
            {
                query: data.query,
                region: data.region,
                output: 'json',
                ak: 'EMB0bKIvMeOd70lyyG92BZlu'
            }
        );

    };

    /**
     * 钱包管理分页 - 历史数据列表
     *
     * @param {object} data
     * @param {number=} data.page 当前页 默认1
     * @param {number=} data.size 当前页条目数 默认10
     * @param {number=} data.user_type 学生还是老师标志，0是老师，1是学生
     *
     */
    exports.getCashHistoryList = function (data) {
        var role = store.get('user').type;

        return post(
                '/student_center/cashAjax',
                {
                  page: data.page,
                  size: data.pageSize,
                  user_type: role
                }
            );
    };

    /**
     * 获得上课数据，即某个日期用户是否有课
     *
     * 返回数据
     * {
     *    code: 0,
     *    data: {
     *        studentLessons: {
     *            "2014-08-15": [
     *                {
     *                    "start_time" => "2014-08-29 06:00:00",
     *                    "end_time" => "2014-08-29 07:00:00",
     *                    "user_type" => 0,
     *                    "teacher_name" => "李老师",
     *                    "student_name" => "李学生"
     *                },
     *                {
     *                    "start_time" => "2014-08-29 06:00:00",
     *                    "end_time" => "2014-08-29 07:00:00",
     *                    "user_type" => 0,
     *                    "teacher_name" => "李老师",
     *                    "student_name" => "李学生"
     *                },
     *                {
     *                    "start_time" => "2014-08-29 06:00:00",
     *                    "end_time" => "2014-08-29 07:00:00",
     *                    "user_type" => 0,
     *                    "teacher_name" => "李老师",
     *                    "student_name" => "李学生"
     *                }
     *            ]
     *        }
     *    }
     * }
     *
     * @param {Object} data
     * @property {string} data.purchaseId 订单 ID
     * @property {string} date.date 当天日期，如 '2014-08-15'
     * @return {Promise}
     */
    exports.getDateLessons = function (data) {
        return post(
            '/lesson/dateLessons',
            {
                purchase_id: data.purchaseId,
                date: data.date
            }
        );
    };

    /*
     * 赢在校园投票 - 投票结果
     *
     * @param {object} data
     * @param {number=} data.userId 投票UserId
     *
     */
    exports.getVoteResult = function (data) {
        return post(
                '/activity/vote_ajax',
                {
                  vote_to_user_id: data.user_id
                }
            );
    };

    /**
     * 获取文章列表
     *
     * @param  {object} data 文章分页参数
     * @property {number|string} data.cp 当前页
     * @property {number|string} data.categoryId 文章的分类id
     * @property {number|string} data.number 当前老师的id
     *
     */
    exports.getArticleList = function (data) {

        return post(
                '/article/list',
                {
                    cp: data.cp,
                    category_id: data.categoryId,
                    number: data.number
                }
            );
    };

    /**
     * 获取草稿列表
     *
     * @param  {object} data 草稿分页参数
     * @property {number|string} data.cp 当前页
     * @property {number|string} data.categoryId 草稿的分类id
     * @property {number|string} data.number 当前老师的id
     *
     */
    exports.getArticleDraftList = function (data) {

        return post(
                '/article/draftList',
                {
                    cp: data.cp,
                    category_id: data.categoryId,
                    number: data.number
                }
            );
    };

    /**
     * 获取文章分类列表
     * @param {object} data 当前主页的所有者信息
     * @property {string|number} data.number 当前主页的老师的id
     * @property {string|number} data.isDraft 是否是草稿分类列表
     */
    exports.getArticleCategoryList = function (data) {

        return post(
                '/article/categoryList',
                {
                    number: data.number,
                    is_draft: data.isDraft
                }
            );
    };

    /**
     * 新增文章分类
     * @param {string} name 新增文章分类的名称
     */
    exports.addArticleCategory = function (name) {

        return post(
                '/article/categoryAdd',
                {
                    name: name
                }
            );
    };

    /**
     * 更新文章分类名称
     * @param  {object} data 分类数据
     * @property {number|string} data.id 分类id
     * @property {number|string} data.name 分类名称
     *
     */
    exports.updateArticleCategory = function (data) {

        return post(
                '/article/categoryEdit',
                {
                    id: data.id,
                    name: data.name
                }
            );
    };

    /**
     * 删除文章分类
     * @param  {string|number} id 分类id
     *
     */
    exports.deleteArticleCategory = function (id) {

        return post(
                '/article/categoryDelete',
                {
                    id: id
                }
            );
    };

    /**
     * 删除文章
     * @param {object} data 删除的数据结构
     * @property {string|number} data.articleId 待删除文章的id
     * @property {string|number} data.captcha 验证码
     * @property {object} errorHandler 自定义错误处理
     */
    exports.deleteArticle = function (data, errorHandler) {

        return post(
                '/article/delete',
                {
                    id: data.articleId,
                    captcha: data.captcha,
                    captcha_name: data.captchaName
                },
                {
                    errorHandler: errorHandler
                }
            );
    };

    /**
     * 删除草稿
     * @param  {string|number} id 待删除草稿的id
     */
    exports.deleteDraft = function (id) {

        return post(
                '/article/deleteDraft',
                {
                    id: id
                }
            );
    };

    /**
     * 老师文章详情页 - 返回评论内容(废弃)
     *
     * @param {object} data
     * @param {number=} data.article_id 文章ID
     * @param {number=} data.page 当前页数
     * @param {number=} data.page_size 每页展示的评论数
     * @param {number=} data.insert_num 本页插入的评论条数
     *
     */
    exports.getArticleComment = function (data) {

        return post(
                '/article/comments',
                {
                  article_id: data.article_id,
                  page:data.page,
                  page_size:data.page_size,
                  insert_num: data.replyCount
                }
            );
    };

    /**
     * 老师文章详情页 - 点赞/取消赞
     *
     * @param {object} data
     * @param {number=} data.page 需要显示评论模板的页数
     *
     */
    exports.getArticlethumbsUp = function (data) {

        return post(
                '/article/support',
                {
                  article_id: data.articleId,
                  value: data.valueId
                }
            );
    };

    /**
     * 老师文章详情页 - 获取评论新
     * article_number 要获取评论的文章number
     * next_cursor 页码 从1开始
     *
     */
    exports.getAritcleCommentNew = function (data) {

        return post(
                '/article_comment/list',
                {
                    article_number: data.article_number,
                    next_cursor: data.next_cursor
                }
            );
    };

    /**
     * 老师文章详情页 - 发布评论新
     * article_number 要评论的文章number
     * content 评论内容
     * comment_id 要回复的评论ID 选填
     *
     */
    exports.creatAritcleComment = function (data) {

        return post(
                '/article_comment/create',
                {
                    article_number: data.article_number,
                    content: data.content,
                    comment_id: data.comment_id
                }
            );
    };
    /**
     * 老师文章详情页 - 删除评论新
     * comment_id 要删除的评论ID
     *
     */
    exports.deleteAritcleComment = function (data) {

        return post(
                '/article_comment/delete',
                {
                    comment_id: data.comment_id
                }
            );
    };
    /**
     * 老师文章详情页 - 评论点赞
     * comment_id 评论ID
     *
     */
    exports.supportAritcleComment = function (data) {

        return post(
                '/article_comment/support',
                {
                    comment_id: data.comment_id
                }
            );
    };
    /**
     * 老师文章详情页 - 举报评论
     * comment_id 要举报的评论ID
     *
     */
    exports.reportAritcleComment = function (data) {

        return post(
                '/article_comment/report',
                {
                    comment_id: data.comment_id
                }
            );
    };

    /**
     * 请老师排课
     *
     * @param {number} purchaseId 订单id
     */
    exports.inviteTeacherReserve = function (data) {
        return post(
                '/lesson/studentInviteTeacherReserve',
                {
                    purchase_id: data.purchaseId
                }
            );
    };



    /**
     * 领取优惠劵
     * @param  {object} data
     * @property {string} data.serial_num
     * @param {object} options 自定义错误处理
     * @property {Function} options.errorHandler 自定义处理函数
     */
    exports.getCoupon = function (data, options) {
        return post(
                '/pay/getCoupon',
                {
                    serial_num: data.serial_num
                },
                {
                    errorHandler: options.errorHandler
                }
            );
    };

    /**
    * 确认领取优惠卷
    *
    *@param {Object} data
    *@preoperty {string} data.serialNum 优惠卷码
    *@preoperty {string=} data.sourceUserRole 优惠券来源 6老师 10机构
    *@preoperty {string=} data.ch 透传数据，不知为何物
    *
    *@return {Promise}
    */
    exports.receiveCoupon = function (data) {
        return post(
            '/pay/getCoupon',
            {
                serial_num: data.serialNum,
                source_user_role: data.sourceUserRole,
                ch: data.ch
            }
        )
    };


    /**
     * 老师用户中心 - 新建优惠券
     *
     * @param {object} data
     * @param {number} data.balance 面值
     * @param {number} data.totalCount 张数
     * @param {number} data.condThreshold 使用条件
     * @param {number} data.effectTime 有效期 - 开始
     * @param {number} data.expireTime 有效期 - 结束
     * @param {number} data.maxRecvCount 每人限领张数
     * @param {string=} data.remark 备注
     */
    exports.addCoupon = function (data) {
        return post(
                '/teacher_center/newCoupon',
                {
                  balance: data.balance,
                  total_count: data.totalCount,
                  cond_threshold: data.condThreshold,
                  effect_time: data.effectTime,
                  expire_time: data.expireTime,
                  max_recv_count: data.maxRecvCount,
                  remark: data.remark
                }
            );
    };

    /**
     * 老师文章详情页 - 文章举报
     *
     * @param {object} data
     * @param {number=} data.article_id 文章ID
     *
     */
   exports.getArticleReport = function (data) {

        return post(
                '/article/report',
                {
                    article_id: data.articleId
                }
            );

   };

   /**
     * 老师文章详情页 - 修改权限
     *
     * @param {object} data
     * @param {number=} data.article_id 文章ID
     *
     */
   exports.getSetPermision = function (data) {

        return post(
                '/article/setPermission',
                {
                    article_id: data.articleId,
                    permission: data.permission
                }
            );

   };

   /**
    *
    * 新增，修改文章或草稿
    * @param  {object} data 文章的数据结构
    * @property {string|number} data.id 文章或草稿的id
    * @property {string|number} data.top 是否置顶 0|1
    * @property {string|number} data.title 文章或草稿的标题
    * @property {string|number} data.content 文章或草稿的内容
    * @property {string|string} data.cover 文章或草稿的封面
    * @property {string|number} data.permission 文章或草稿的权限id
    * @property {string|number} data.categoryId 文章或草稿的分类id
    * @property {string} data.tags 文章标签逗号分隔
    * @property {string|number} data.subjectId 文章的课程分类
    * @property {object=} options 自定义错误处理
    * @property {function} options.errorHandler 自定义处理函数
    */
   exports.saveArticle = function (data, options) {

        return post(
                '/article/save',
                {
                    id: data.id,
                    top: data.top,
                    title: data.title,
                    content: data.content,
                    cover: data.cover,
                    draftid: data.draftId,
                    tags: data.tags || '',
                    subject_id: data.subjectId || '',
                    draft: data.isDraft,
                    permission: data.permission,
                    category_id: data.categoryId
                },
                options
            );
    };

    /**
     * 老师用户中心 - 未领取优惠券学生列表
     *
     * @param {object} data
     * @param {string} data.serialNum 优惠券码
     * @param {string=} data.keyWord 搜索关键字
     * @param {string=} data.orderNum 按订单数排序 desc降序 asc升序
     * @param {string=} data.consume 按消费额排序 desc asc
     * @param {string=} data.page 当前页数
     */
    exports.getCouponFreeStudent = function (data) {
        return post(
                '/teacher_center/getCouponFreeStudent',
                {
                  serial_num: data.serialNum,
                  key_word: data.keyWord,
                  order_num: data.orderNum,
                  consume: data.consume,
                  page: data.page
                }
            );
    };

    /**
     * 老师用户中心 - 发放优惠券给学生
     *
     * @param {object} data
     * @param {array} data.serialNum 优惠券码组
     * @param {array} data.studentNum 学生number组
     *
     * @return {Promise}
     */
    exports.sendCoupon = function (data) {
        return post(
                '/teacher_center/sendCoupon',
                {
                  serial_num: data.serialNum,
                  student_number: data.studentNum
                }
            );
    };

    /**
     * 不发了 - 下线优惠券
     *
     * @param {object} data
     * @param {array} data.serialNum 优惠券码
     *
     * @return {Promise}
     */
    exports.offCoupon = function (data) {
        return post(
                '/teacher_center/offCoupon',
                {
                  serial_num: data.serialNum
                }
            );
    };

   /**
    *
    * 老师文章详情页，获取所有点赞照片
    * @param  {object} data 数据结构
    * @property {string|number} article_id 文章id
    *
    */
   exports.getMorePicture = function (data) {

        return post(

                '/article/supportList',
                {
                    article_id: data.article_id
                }
            );
   };

   /**
    *
    * 获取老师首页的优惠券列表
    * @param {object} data
    * @property  {string|number} data.number 老师的编号
    * @return {Promise} 返回promise对象
    *
    */
   exports.getCouponList = function (data) {

        return post(

                '/teacher/coupon_list',
                {
                    number: data.number
                }
            );
   };

    /**
     * 放置到主页
     *
     * @param {object} data
     * @param {array} data.serialNum 优惠券码
     *
     * @return {Promise}
     */
    exports.syncCoupon = function (data) {
        return post(
                '/teacher_center/syncCoupon',
                {
                  serial_num: data.serialNum
                }
            );
    };

    /**
     * 老师首页优惠券替换
     * @param  {object} data 优惠券参数
     * @property {string|number} data.srcId 被替换的优惠券id
     * @property {string|number} data.destId 目标优惠券id
     * @return {Promise}
     */
    exports.couponReplace = function (data) {

        return post(
                '/teacher_center/replace_coupon_sync',
                {
                  src_id: data.srcId,
                  dest_id: data.destId
                }
            );
    }


    /**
     * 机构收藏列表页翻页
     *
     * @param {object} data
     * @param {string} data.type 类型 teacher org course class_course video_course
     * @param {number=} data.pager 请求页码，默认为1
     *
     * @return {Promise}
     */
    exports.getFavorList = function (data) {
        return post(
                '/collection/list/' + data.type + '/',
                {
                  page: data.page
                }
            );
    };

    /**
     * 添加/修改促销活动 - 班课列表
     *
     * @param {object} data
     * @param {array} data.type 1、全部审核通过的课程，已经添加的不能修改 2、已经添加的课程，可以修改
     * @param {array} data.centerId 促销活动ID
     *
     * @return {Promise}
     */
    exports.groupCourseList = function (data) {
        return post(
                '/market/getAllCourseList',
                {
                    type: data.type,
                    center_id: data.centerId
                }
            );
    };

    /**
     * 删除机构收藏
     *
     * @param {object} data
     * @param {string} data.type 类型  org机构 teacher老师 course班课/视频课 class_course班课 video_course视频课
     * @param {number=} data.number 单一删除 机构/老师/班课/视频课 的number
     * @param {string=} data.classCourse 批量删除 班课的number 格式1,2,3
     * @param {string=} data.videoCourse 批量删除 视频课的number 格式4,5,6
     *
     * @return {Promise}
     */
    exports.deleteFavor = function (data) {
        return post(
                '/collection/deleteAjax/' + data.type + '/',
                {
                  number: data.number,
                  class_course: data.classCourse,
                  video_course: data.videoCourse
                }
            );
    };

    /**
     * 删除/重启、暂停促销活动
     *
     * @param {object} data
     * @param {array} data.center_id 活动Id
     * @param {array} data.type 2、暂停 3、删除 4、重启
     * @param {array} data.start_time 开始时间
     * @param {array} data.end_time 结束时间
     *
     * @return {Promise}
     */
    exports.getSaleHandle = function (data) {
        return post(
                '/market/handle',
                {
                    center_id: data.center_id,
                    type: data.type,
                    start_time: data.start_time,
                    end_time: data.end_time
                }
            );
    };

    /**
     * 收藏 班课/视频课/老师/机构
     *
     * @param {string} data.type 收藏类型：teacher老师 org机构 course课程 class_course班课 video_course视频课 one2one_course一对一课程收藏
     * @param {number} data.number 各信息number
     * @return {Promise}
     */
    exports.addFavouriteAjax = function (data, options) {

        options && (
            options = { errorHandler: options.errorHandler }
        )
        return post(
            '/collection/addAjax/' + data.type + '/',
            {
                number: data.number
            },
            options
        );
    }

    /**
     * 各展示页用户是否收藏了相关信息 班课/视频课/老师/机构
     *
     * @param {string} data.type 收藏类型：teacher老师 org机构 course课程 class_course班课 video_course视频课
     * @param {number} data.number 各信息number
     * @return {Promise} is_favored是否收藏  popularity人气值
     */
    exports.checkCollectedAjax = function (data) {

        return post(
            '/collection/checkCollectedAjax/' + data.type + '/',
            {
                number: data.number
            }
        );
    }

    /**
     * 添加参加促销活动的课程
     *
     * @param {object} data
     * @param {number=} data.centerId 促销活动ID
     * @param {array} data.courses.pre_price 课程信息.序列化 － 折扣前价格
     * @param {array} data.courses.price 课程信息.序列化 － 折后价
     * @param {array} data.courses.course_number 课程信息.序列化 － 课程number
     * @param {array} data.courses.course_type 课程信息.序列化 － 课程类型 2:班课 3:视频课
     *
     * @return {Promise}
     */
    exports.addGroupCourse = function (data) {
        return post(
                '/market/addGroupCourse',
                {
                    center_id: data.centerId,
                    courses: data.courses
                }
            );
    };

    /**
     * 修改参加促销活动的课程
     *
     * @param {object} data
     * @param {number=} data.centerId 促销活动ID
     * @param {array} data.courses 课程信息.序列化 ['pre_price', 'price', 'course_number']
     *
     * @return {Promise}
     */
    exports.updateGroupCourse = function (data) {
        return post(
                '/market/updateGroupCourse',
                {
                    center_id: data.centerId,
                    courses: data.courses
                }
            );
    };

    /**
     * 课程退出活动
     *
     * @param {object} data
     * @param {number=} data.centerId 促销活动ID
     * @param {array} data.courseIds  课程ID.序列化 ['id', 'id', 'id',...]
     *
     * @return {Promise}
     */
    exports.delGroupCourse = function (data) {
        return post(
                '/market/delGroupCourse',
                {
                    center_id: data.centerId,
                    market_course_ids: data.coursesIds
                }
            );
    };

    /**
     * 创建促销活动
     *
     * @param {object} data
     * @param {array} data.type 活动类型 1:限时折扣 2:其他 不传默认为限时折扣
     * @param {array} data.tag_name 折扣名称
     * @param {array} data.start_time 开始时间
     * @param {array} data.end_time 结束时间
     * @param {array} data.info 活动备注
     *
     * @return {Promise}
     */
    exports.getCreateSale = function (data) {
        return post(
                '/market/create',
                {
                    type: data.type,
                    tag_name: data.tag_name,
                    start_time: data.start_time,
                    end_time: data.end_time,
                    info: data.info
                }
            );
    };

    /**
     * 修改促销活动
     *
     * @param {object} data
     * @param {array} data.center_id 活动ID
     * @param {array} data.tag_name 活动标签名
     * @param {array} data.start_time 开始时间
     * @param {array} data.end_time 结束时间
     * @param {array} data.info 活动备注
     *
     * @return {Promise}
     */
    exports.getUpdateSale = function (data) {
        return post(
                '/market/update',
                {
                    center_id:data.center_id,
                    tag_name: data.tag_name,
                    start_time: data.start_time,
                    end_time: data.end_time,
                    info: data.info
                }
            );
    };

    /**
     * 获取直播教室参数
     *
     * @param {object} data
     * @param {array} data.type 教室类型（teacher,organization,lesson）
     * @param {array} data.number 编号
     *
     * @return {Promise}
     */
    exports.getLiveParams = function (data) {
        return post(
                '/live/external/',
                {
                    type: data.type,
                    number: data.number
                }
            );
    };

    /**
     * 获取机构直播教室参数
     *
     * @param {object} data
     * @param {array} data.type 教室类型（teacher,organization,lesson）
     * @param {array} data.number 编号
     *
     * @return {Promise}
     */
    exports.getOrgLiveParams = function (data) {

        var env = store.get('env');

        var envMap = {
            test: 'http://test-i.genshuixue.com/org/orgOnlineCourseClient.do',
            beta: 'http://beta-i.genshuixue.com/org/orgOnlineCourseClient.do',
            www: 'http://i.genshuixue.com/org/orgOnlineCourseClient.do'
        };

        var url = envMap[env] || envMap['www'];

        return getJsonp(
            url,
            {
                type: data.type,
                number: data.number
            }
        );

    };

    /**
     * 设置活动cookie
     */
    exports.setActicityCookies = function () {
        return post('/activity/set_cookie');
    };

    /**
     * 第三方绑定
     *
     * @param {object} data
     * @param {array} data.type 合作网站类型
     * @param {array} data.mobile 手机号
     * @param {array} data.smscode 校验码
     *
     * @return {Promise}
     */
    exports.thirdBinding = function (data) {
        return post(
            '/connect/binding',
            data
        );
    };

    /**
     * 第三方注册
     *
     * @param {object} data
     * @param {array} data.type 合作网站类型
     * @param {array} data.mobile 手机号
     * @param {array} data.smscode 校验码
     * @param {array} data.password 密码
     *
     * @return {Promise}
     */
    exports.thirdSignup = function (data) {
        return post(
            '/connect/signup',
            data
        );
    };

    /**
     * 把长URL转换为短URL
     *
     * @param {object} data
     * @param {array} data.long_url 长地址
     * @param {array} data.q ('f7c1657c6effb51e5a2dea1ad02d3392' + data.long_url)的md5
     *
     * @return {Promise}
     */
    exports.shortUrl = function (data) {
        return post(
            '/short_url/get',
            data
        );
    };

    /**
     * 首页获取推荐老师的列表
     * @return {Promise}
     */
    exports.getRecommendTeachers = function (data) {
        return post(
            '/index/suggestTeacher',
            data
        );
    };

    /**
     * 获取热门直播列表
     * @return {Promise}
     */
    exports.getHotLiveList = function (data) {
        return post(
            '/index/hotLive',
            data
        );
    };

    /**
     * 验证删除此课程之后，老师是否还是生效状态
     *
     * @param {object} data
     *
     * @return {Promise}
     */
    exports.isSingleCourse = function (data) {
        return post(
            '/teacher_center/is_single_course',
            data
        );
    };

    /**
     * 帮我找老师 - 提交订单
     *
     * @param {object} data
     * @param {number} data.subjectId 科目
     * @param {number} data.teacherSex 老师性别（0：女，1：男，2：不限）
     * @param {number} data.lessonType 授课方式（0:不限，1:协商地点, 2:在线授课）
     * @param {number} data.payBound 薪酬（1:50-200元，2:200-500元，3:500元以上）
     * @param {number=} data.areaId 上课地址 区ID（在线授课不填此项）
     * @param {string=} data.location 上课详细地址（在线授课不填此项）
     * @param {number=} data.lng 上课地址 经纬度（在线授课不填此项）
     * @param {number=} data.lat 上课地址 经纬度（在线授课不填此项）
     * @param {string} data.messageTxt 更多描述
     * @param {number=} data.mobile 手机号码（已登录用户不用此信息）
     * @param {number=} data.smsCode 短信校验码（已登录用户不用此信息）
     *
     * @return {Promise}
     */
    exports.seekTeacher = function (data) {
        return post(
                '/seek_teacher/newOrder',
                {
                    subject_id: data.subjectId,
                    teacher_sex: data.teacherSex,
                    lesson_type: data.lessonType,
                    pay_bound: data.payBound,
                    area_id: data.areaId,
                    location: data.location,
                    lng: data.lng,
                    lat: data.lat,
                    message_txt: data.messageTxt,
                    mobile: data.mobile,
                    sms_code: data.smsCode
                }
            );
    };

    /**
     * 验证删除此课程之后，老师是否还是生效状态
     *
     * @param {object} data
     *
     * @return {Promise}
     */
    exports.changeDefaultAvatar = function (data) {
        return post(
            '/teacher_center/set_default_avatar',
            data
        );
    };

    /**
     * 获取城市列表
     *
     * @return {Promise}
     */
    exports.getCityList = function () {
        return post(
            '/changecity/list_ajax'
            );
    };

    /**
     *
     * 批量 保存老师照片
     *
     * @param  {Object} data
     * @property {Array.{Array.{string}}} data.photos [[@id, @des]]
     * @return {Promise}
     */
    exports.batchAdd = function (data) {
        return post(
            '/photo/batch_insert',
            {
                photos: data.photos
            }
        );
    };

    /**
     * SEM K12聚合页 - 筛选聚惠学 课程/老师/机构 信息
     *
     * @param {object} data
     * @param {string} data.type 类型（course课程 teacher老师 org机构）
     * @param {number=} data.category 课程类别
     * @param {number=} data.subject 课程科目
     * @param {number=} data.area 授课区域
     * @param {string=} data.source/plan/group/keyword/q 当前页面请求参数
     *
     * @return {Promise}
     */
    exports.semInfoList = function (data) {
        return post(
            '/sem/k12',
            {
                type: data.type,
                course_1: data.category,
                course_2: data.subject,
                area: data.area,
                source: data.source,
                plan: data.plan,
                group: data.group,
                keyword: data.keyword,
                q: data.q
            });
    };

    /**
     *
     * 照片排序
     *
     * @param {Obejct} data
     * @property {string} data.order 照片的顺序
     * @return {Promise}
     *
     */
    exports.batchSort = function (data) {
        return post(
            '/photo/sort',
            {
                order: data.order
            }
        );
    };

    /**
     * SEM K12聚合页 - 班课评论列表
     *
     * @param {object} data
     * @param {number=} data.faceType 评论列表 1好2中3差
     * @param {number=} data.page 评论分页数据
     * @param {number=} data.source/plan/group/keyword/q 当前页面请求参数
     *
     * @return {Promise}
     */
    exports.semCommentList = function (data) {
        return post(
            '/sem/comment',
            {
                face_type: data.faceType,
                page: data.page,
                source: data.source,
                plan: data.plan,
                group: data.group,
                keyword: data.keyword,
                q: data.q
            }
        );
    };

    /**
     * 设置试听课
     *
     * @param {object} data
     * @param {number} data.switchFlag 控制开关 1、0
     * @param {number} data.trialTime 试听时长（单位：分钟）
     * @param {number=} data.priceOnline 在线试听
     * @param {number=} data.priceOffline 线下试听
     *
     * @return {Promise}
     */
    exports.upsertTrialCourse = function (data) {
        return post(
            '/teacher_center/upsertTrialCourse',
            {
                switch_flag: data.switchFlag,
                length: data.trialTime,
                price_online: data.priceOnline,
                price_offline: data.priceOffline
            }
        );
    };

    /**
     * 班课照片排序
     *
     * @param {Obejct} data
     * @property {string} data.order 照片的顺序
     * @property {string} data.courseNumber 班课number
     * @return {Promise}
     *
     */
    exports.courseBatchSort = function (data) {
        return post(
            '/photo/sortClassCoursePhoto',
            {
                order: data.order,
                class_course_number: data.courseNumber
            }
        );
    };

    /**
     * 获取更多楼中楼回复
     * @param {Object} data
     * @property {string|number} postId 评论id
     * @property {string|number} page 当前页
     * @property {string|number} pageSize 每页大小, 默认20
     */
    exports.getMoreReply = function (data) {
        return post(
            '/forum/commentBrowseAjax',
            {
                post_id: data.postId,
                page: data.page,
                page_size: data.pageSize
            }
        );
    };

    /**
     * 分页获取帖子评论
     * @param {Object} data
     * @property {string|number} thread_id 帖子id
     * @property {string|number} page 当前页
     * @property {string|number} page_size 每页大小, 默认25
     */
    exports.getCurrentCommentList = function (data) {
        return post(
            '/forum/postBrowseAjax',
            {
                thread_id: data.thread_id,
                page: data.page,
                page_size: data.page_size
            }
        );
    };

    /**
     * 给帖子添加评论
     * @param  {Object} data
     * @property {string|number} data.threadId 帖子id
     * @property {string} data.content 评论内容
     * @property {string} data.photoList 图片id列表，逗号分开
     */
    exports.postComment = function (data, errorHandler) {
        return post(
            '/forum/addPost',
            {
                thread_id: data.threadId,
                content: data.content,
                photo_list: data.photoList || ''
            },
            {
                errorHandler: errorHandler
            }
        );
    };

    /**
     * 给评论添加回复
     * @param  {Object} data
     * @property {string|number} data.postId 评论id
     * @property {string} data.content 评论内容
     * @property {string|number} data.commentId 回复id
     */
    exports.postReply = function (data, errorHandler) {
        return post(
            '/forum/addComment',
            {
                post_id: data.postId,
                content: data.content,
                comment_id: data.commentId
            },
            {
                errorHandler: errorHandler
            }
        );
    };

    /*
     * 视频课设置页 - 获取视频课在ios设备的售价
     *
     * @param {Object} data
     * @property {number} data.price 老师设定的其他设备的售价
     *
     * @return {Promise}
    */
    exports.getIosPrice = function (data) {
        return post(
            '/video_course/getiosprice',
            {
                price: data.price
            }
        );
    };


    /**
     * 帖子置顶或取消
     * @param {Object} data
     * @property {string|number} data.threadId 帖子id
     * @property {string|number} data.op 1表示置顶 0表示取消
     */
    exports.setTop = function (data) {
        return post(
            '/forum/topThread',
            {
                thread_id: data.threadId,
                op: data.op
            }
        );
    };

    /**
     * 帖子加精或取消
     * @param {Object} data
     * @property {string|number} data.threadId 帖子id
     * @property {string|number} data.op 1表示加精 0表示取消
     */
    exports.setGood = function (data) {
        return post(
            '/forum/extractThread',
            {
                thread_id: data.threadId,
                op: data.op
            }
        );
    };

     /**
     * 帖子封禁或解禁
     * @param {Object} data
     * @property {string|number} data.userId 用户id
     * @property {string|number} data.groupId 小组id
     * @property {number} data.len 封禁时间（秒）
     * @property {string} data.reason 封禁原因
     */
    exports.setBan = function (data) {
        return post(
            '/user/ban',
            {
                user_id: data.userId,
                group_id: data.groupId,
                length: data.len,
                reason: data.reason
            }
        );
    };

    /**
     * 帖子举报
     * @param {Object} data
     * @property {string|number} data.id 帖子id或者评论id
     * @property {string|number} data.postType 1:主题帖 2:评论贴
     * @property {string|number} data.reasonType 1:广告 2:色情 3:反动 4:欺诈
     */
    exports.setBlack = function (data) {
        return post(
            '/forum/reportThread',
            {
                id: data.id,
                post_type: data.postType,
                reason_type: data.reasonType
            }
        );
    };

    /**
     * 点赞
     * @param {Object} data
     * @property {number} data.id 帖子id或者评论id
     * @property {number} data.postType  1:主题帖 2:评论贴
     * @property {number} data.op 点赞和取消点赞(1:点赞 0:取消)
     */
    exports.setThumbs = function (data) {
        return post(
            '/forum/praiseThread',
            {
                id: data.id,
                post_type: data.postType,
                op: data.op
            }
        );
    };

    /**
     * 删帖
     * @param {Object} data
     * @property {string|number} data.threadId 帖子id
     */
    exports.deleteThread = function (data) {
        return post(
            '/forum/deleteThread',
            {
                thread_id: data.threadId
            }
        );
    };

    /**
     * 删评论
     * @param {Object} data
     * @property {string|number} data.postId 评论id
     */
    exports.deletePost = function (data) {
        return post(
            '/forum/deletePost',
            {
                post_id: data.postId
            }
        );
    };

     /**
     * 删回复
     * @param {Object} data
     * @property {string|number} data.commentId 回复id
     */
    exports.deleteReply = function (data) {
        return post(
            '/forum/deleteComment',
            {
                comment_id: data.commentId
            }
        );
    };

    /**
     * 社区达人榜
     * @param {Object} data
     * @property {string|number} data.groupId 小组id
     * @property {string|number} page 当前页
     * @property {string|number} pageSize 每页大小, 默认50
     */
    exports.getRankStar = function (data) {
        return post(
            '/group/rank',
            {
                group_id: data.groupId,
                page: data.page,
                page_size: data.pageSize,
                type: 2
            }
        );
    };

    /**
     * 社区老师榜
     * @param {Object} data
     * @property {string|number} data.groupId 小组id
     * @property {string|number} page 当前页
     * @property {string|number} page_size 每页大小, 默认50
     */
    exports.getRankTeacher = function (data) {
        return post(
            '/group/rank',
            {
                group_id: data.groupId,
                page: data.page,
                page_size: data.page_size,
                type: 0
            }
        );
    };

     /**
     * 用户所处的排名
     * @param {Object} data
     * @property {string|number} data.groupId 小组id
     * @type {string|number} data.type 0老师榜 2达人榜
     */
    exports.meRank = function (data) {
        return post(
            '/group/me_rank',
            {
                group_id: data.groupId,
                type: data.type
            }
        );
    };

    /**
     * 获取热门帖子
     * @param  {Object} data
     * @property {string|number} data.page 当前页
     * @property {string|number} data.page_size 每页大小，默认20
     */
    exports.getHotPosts = function (data) {
        return post(
            '/forum/hot_posts_ajax',
            {
                page: data.page,
                page_size: data.page_size
            }
        );
    };

    /**
     * 社区中心我的收藏
     * @param  {Object} data
     * @property {string|number} data.page 当前页
     * @property {string|number} data.page_size 每页大小，默认20
     */
    exports.getCollect = function (data) {
        return post(
            '/forum/owner_collect_ajax',
            {
                page: data.page,
                page_size: data.page_size
            }
        );
    };

    /**
     * 社区中心我的小组
     * @param  {Object} data
     * @property {string|number} data.page 当前页
     * @property {string|number} data.page_size 每页大小，默认20
     */
    exports.getGroup = function (data) {
        return post(
            '/forum/owner_group_ajax',
            {
                page: data.page,
                page_size: data.page_size
            }
        );
    };

    /**
     * 收藏后者取消收藏
     * @param  {Object} data
     * @property {string|number} data.threadId 帖子id
     * @property {string|number} data.op 0取消收藏 1收藏
     */
    exports.setCollect = function (data) {
        return post(
            '/forum/collect',
            {
                thread_id: data.threadId,
                op: data.op
            }
        );
    };

    /**
     * 社区中心我的帖子
     * @param {Object} data
     * @property {string|number} data.page 当前页
     * @property {string|number} data.page_size 每页大小，默认20
     */
    exports.getOwner = function (data) {
        return post(
            '/forum/owner_posts_ajax',
            {
                page: data.page,
                page_size: data.page_size
            }
        );
    };

    /**
     * 浏览小组下面的帖子
     * @param  {Object} data
     * @property {string|number} data.forum_group_id 小组id
     * @property {string|number} data.type 1全部贴 2精华帖
     * @property {string|number} data.page 第几页
     * @property {string|number} data.page_size 分页大小
     */
    exports.getThreadBrowse = function (data) {
        return post(
            '/forum/threadBrowseAjax',
            {
                forum_group_id: data.forum_group_id,
                type: data.type,
                page: data.page,
                page_size: data.page_size
            }
        );
    };

    /**
     * 加入小组
     * @param  {Object} data
     * @property {string|number} data.groupId 小组id
     */
    exports.joinGroup = function (data) {
        return post(
            '/forum/joinGroup',
            {
                group_id: data.groupId
            }
        );
    };

    /**
     * 退出小组
     * @param  {Object} data
     * @property {string|number} data.groupId 小组id
     */
    exports.quitGroup = function (data) {
        return post(
            '/forum/quitGroup',
            {
                group_id: data.groupId
            }
        );
    };

    /**
     * 发表帖子
     * @param  {Object} data
     * @property {string|number} data.groupId 小组id
     * @property {string} data.name 小组标题
     * @property {string} data.content 小组内容
     * @property {string} data.threadType 帖子类型 1普通帖 2投票帖 3带课程卡片的帖子
     * @property {object} data.courseCard 课程卡片相关信息
     * @property {number} data.courseCard.courseNumber 课程卡片 － 课程number
     * @property {number} data.courseCard.courseType 课程卡片 － 课程类型
     */
    exports.saveThread = function (data, errorHandler) {
        return post(
            '/forum/addThreadAjax',
            {
                forum_group_id: data.groupId,
                name: data.name,
                content: data.content,
                thread_type: data.threadType,
                course_card: data.courseCard
            },
            {
                errorHandler: errorHandler
            }
        );
    };


    /**
     * 编辑帖子
     * @param  {Object} data
     * @property {string|number} data.threadId 帖子id
     * @property {string} data.name 小组标题
     * @property {string} data.content 小组内容
     * @property {string} data.threadType 帖子类型 1普通帖 2投票帖 3带课程卡片的帖子
     * @property {object} data.courseCard 课程卡片相关信息
     * @property {number} data.courseCard.courseNumber 课程卡片 － 课程number
     * @property {number} data.courseCard.courseType 课程卡片 － 课程类型
     */
    exports.modifyThread = function (data, errorHandler) {
        return post(
            '/forum/modifyThreadAjax',
            {
                thread_id: data.threadId,
                name: data.name,
                content: data.content,
                thread_type: data.threadType,
                course_card: data.courseCard
            },
            {
                errorHandler: errorHandler
            }
        );
    };

    /**
     * 申请管理员
     * @param  {Object} data
     * @property {number} data.groupId 小组id
     * @property {string} data.realname 真实姓名
     * @property {string} data.idCardNumber 身份证号
     * @property {string} data.storageId 手持身份证照片
     * @property {string} data.words 申请誓言
     */
    exports.adminApply = function (data) {
        return post(
            '/permission/moderation_request',
            {
                group_id: data.groupId,
                realname: data.realname,
                id_card_number: data.idCardNumber,
                storage_id: data.storageId,
                words: data.words
            }
        );
    };

    /**
     * 签到
     * @param {Object} data
     * @property {number} data.groupId
     */
    exports.signCheck = function (data) {
         return post('/forum/check_in', {group_id: data.groupId});
    };

    /**
     * 设置消息为已读
     * @param {Object} data
     * @property {number} data.msgId 消息id,
     * @property {number} data.isRead 0:未读，1：已读
     */
    exports.setMsgRead = function (data) {
        return post(
            '/message/setStatus',
            {
                msg_id: data.msgId,
                is_read: data.isRead
            }
        );
    };

    /**
     * 获取未读消息数量
     */
    exports.getUnreadMessage = function () {
        return post('/message/unreadNumber');
    };

    /**
     * 保存用户头像和昵称
     * @param {Object} data
     * @property {number} data.avatar 头像id
     * @property {number} data.nickname 昵称
     */
    exports.updateSocialProfile = function (data) {
        return post(
            '/forum/userUploadAvatar',
            {
                save_upload: 1,
                avatar: data.avatar,
                nickname: data.nickname
            }
        );
    };

    /**
     * 保存用户头像和昵称
     * @param {Object} data
     * @property {number} data.nickname 昵称
     */
    exports.checkNickname = function (data) {
        return post(
            '/user/checkRepeatedNicknamAjax',
            {
                nickname: data.nickname
            }
        );
    };

    /**
     * 浅注册老师设置个人信息
     * @param {Object} data
     * @property {string} data.avatar 头像
     * @property {string} data.sex 性别
     * @property {string} data.realname 真实姓名
     * @property {string} data.subjectId 科目
     */
    exports.upsertProfile = function (data) {
        return post(
            '/teacher_center/upsert_profile',
            {
                avatar: data.avatar,
                sex: data.sex,
                realname: data.realname,
                subject_id: data.subjectId
            }
        );
    };

    /**
     * 课节评价
     *
     * @param {Obejct} data
     * @property {number} data.purchaseId 订单编号
     * @property {string} data.serialNo 课节，默认为0：总评
     * @property {string=} data.teacherNum 指定对某个老师进行评价（班课会存在多老师）
     * @property {number} data.faceType 总评：好评1 中评2 差评3
     * @property {int} data.descMatch 描述相符 1-5
     * @property {int} data.teachResult 教学效果 1-5
     * @property {int} data.serviceAttitude 服务态度 1-5
     * @property {string} data.info 评价内容
     * @property {string} data.photoList 图片附件IDs＋titles
     * @property {number} data.anonymous 匿名评价 1匿名
     * @property {number} data.score 评分［视频课专属］
     *
     * @return {Promise}
     *
     */
    exports.addCommentMore = function (data, options) {
        return post(
            '/comment/addComment',
            {
                purchase_id: data.purchaseId,
                serial_number: data.serialNo,
                teacher_number: data.teacherNum,
                total_score: data.total_score,
                info: data.info,
                photo_list: data.photoList,
                anonymous: data.anonymous,
                score: data.score,
                skip_verify: data.skip_verify || ''
            },
            options
        );
    };
    /**
     * 搜狗导航页异步数据获取分类课程
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *         tpl: 'html'
     *     }
     * }
     *
     * @param {Object} data
     * @property {string} data.id 课程类目 ID
     * @return {Promise}
     */
    exports.getSougouCourseList = function (data) {
        return post(
            '/sogou/async_info',
            {
                subject_id: data.id
            }
        );
    };

    /*
     * 老师主页 － 获取当前学生可评价课程／课节列表
     *
     * @param {Obejct} data
     * @property {number} data.teacherNum 老师编号
     *
     * @return {Promise}
     */
    exports.getCanCommentOrderList = function (data) {
        return post(
            '/comment/getCanCommentOrderList',
            {
                teacher_number: data.teacherNum
            }
        );
    };

    /*
     * 中差评改好评
     *
     * @param {Obejct} data
     * @property {number} data.commentId 总id
     * @property {int} data.descMatch 描述相符 1-5
     * @property {int} data.teachResult 教学效果 1-5
     * @property {int} data.serviceAttitude 服务态度 1-5
     * @property {string} data.info 评价内容
     *
     * @return {Promise}
     */
    exports.modifyComment = function (data, options) {
        return post(
            '/comment/modifyCommentAjax',
            {
                comment_id: data.commentId,
                total_score: data.total_score,
                info: data.info,
                photoList: data.photoList,
            },
            options
        );
    };


    /**
     * 保存班课
     */
    exports.submitClassCourse = function (data, options) {
        return post(
            '/class_course/upsert',
            data,
            {
                errorHandler: options && options.errorHandler,
                sync: true
            }
        );
    };

    /*
     * 联报优惠 － 课程套餐创建订单
     *
     * @param {Obejct} data
     * @property {string} data.courseNumbers 套餐课程number
     * @property {number} data.activityId 套餐ID
     * @property {number} data.isSelf 是否本人上课
     * @property {string} data.studentName 上课人姓名
     * @property {string} data.note 给老师留言
     *
     */
    exports.createUnionPurchase = function (data, options) {
        return post(
            'https://' + location.host + '/pay/createUnionProductPurchase',
            {
                course_numbers: data.courseNumbers,
                mc_activity_id: data.activityId,
                is_self: data.isSelf,
                student_name: data.studentName,
                note: data.note
            },
            options
        );
    };

    /**
     * 考研专区 － 打包课 － 提交订单
     * 组合课 － 提交订单
     *
     * @property {string} url 区分考研打包课和组合课请求链接
     * @property {number} data.courseNumber 打包课number
     * @property {number} data.isSelf 是否是本人上课 1是 0否
     * @property {number} data.studentName 上课人姓名
     * @property {number} data.note 给老师留言
     * @return {Promise}
     */
    exports.createPackagePurchase = function (url, data, options) {
        return post(
            url,
            {
                course_number: data.courseNumber,
                is_self: data.isSelf,
                student_name: data.studentName,
                note: data.note
            },
            options
        );
    };

    /**
     *
     * 视频课删除
     *
     * @param {Obejct} data
     * @property {string} data.number 视频课number
     * @property {string} data.act 视频课操作 check检查是否可删除 delete删除
     * @property {boolean} data.deleteMedia 是否删除视频
     * @return {Promise}
     *
     */
    exports.deletevideocourse = function (data) {
        return post(
            '/video_course/deletevideocourse',
            {
                number: data.number,
                act: data.act,
                delete_media: data.deleteMedia ? 1 : 0
            }
        );
    };

    /**
     *
     * 视频课撤销发布
     *
     * @param {Obejct} data
     * @property {string} data.number 视频课number
     * @return {Promise}
     *
     */
    exports.cancelvideocourse = function (data) {
        return post(
            '/video_course/cancelvideocourse',
            {
                number: data.number
            }
        );
    };

    /*
     * 学生个人中心——隐私设置页面 是否隐藏学习轨迹
     * @param {Object} data
     * @property {number} data.trajectory_hide 0表示他人可见，1表示他人不可见
     * @return {Promise}
    */

    exports.setTrajectory = function (data) {
        return post(
            '/student_center/setting',
            {
                trajectory_hide: data.trajectory
            }
        );
    };

    /**
     *
     * 3810订单确认支付前，需判断是否含已购买过课程
     *
     * @param {Obejct} data
     * @property {string} data.purchaseId 该订单ID
     * @return {Promise}
     *
     */
    exports.hasSuccBuy = function (data) {
        return post(
            '/pay/hasSuccBuy',
            {
                purchase_id: data.purchaseId
            }
        )
    };

    /**
     *
     * 增发优惠券
     *
     * @param {Obejct} data
     * @property {number} data.serialNum 优惠券编号
     * @property {number} data.addCount 增发张数
     * @return {Promise}
     *
     */
    exports.raiseCouponTotalCount = function (data) {
        return post(
            '/teacher_center/raiseCouponTotalCount',
            {
                serial_num: data.serialNum,
                add_count: data.addCount
            }
        );
    };

    /**
     *
     * 检查学生是否已经预约该试听课 - 废弃
     *
     * @param {Obejct} data
     * @property {number} data.objectNumber 对象编号，如果是机构，为机构编号，课程为课程编号
     * @property {string} data.contentType 内容类型：cdb.teacher_class_course班课（非3810）
                                                    cdb.org_course机构班课（3810）
                                                    yunying.org_account机构
     * @return {Promise}
     *
     */
    exports.checkAdvisory = function (data) {
        return post(
            '/student_advisory/check',
            {
                object_number: data.objectNumber,
                content_type: data.contentType
            }
        );
    };

    /*
     * 学生追评
     * @param {Object} data
     * @property {number} data.commentId 评论ID
     * @property {string} data.info 追评内容
     *
     * @return {Promise}
     */
    exports.additionComment = function (data, options) {
        return post(
            '/comment/addCommentAddition',
            {
                comment_id: data.commentId,
                info: data.info
            },
            options
        );
    }

    /*
     * 老师回复评价
     * @param {Object} data
     * @property {number} data.commentId 评论ID
     * @property {string} data.info 回复内容
     *
     * @return {Promise}
     */
    exports.reviewComment = function (data, options) {
        return post(
            '/comment/addCommentReview',
            {
                comment_id: data.commentId,
                info: data.info
            },
            options
        );
    }


     /**
     *
     * 黑板报点赞
     *
     * @param {Obejct} data
     * @property {number} data.board_id 黑板报id
     * @property {string} data.action 内容类型：cancel 取消赞 like 点赞
     * @return {Promise}
     *
     */
    exports.createSuport = function (data) {
        return post(
            '/org/support',
            {
                board_id: data.board_id,
                action: data.action
            }
        );
    };

    /**
     *
     * 黑板报报名
     *
     * @param {Obejct} data
     * @property {Array} data.sign_info 用户信息
     * @property {number} data.board_id 黑板报id
     * @property {string} data.smscode 验证码
     * @return {Promise}
     *
     */
    exports.createReport = function (data) {
        return post(
            '/org/addApplyMsg',
            {
                signInfo: data.signInfo,
                board_id: data.board_id,
                smscode: data.smscode
            }
        );
    };
    /**
     *
     * 黑板报报名
     *
     * @param {Obejct} data
     * @property {array} data.sign_info 用户信息
     * @property {number} data.board_id 黑板报id
     * @property {string} data.smscode 验证码
     * @return {Promise}
     *
     */
    exports.aishihengenJoin = function (data) {
        return post(
            '/activity/aishihengen_join',
            {
                email: data.email,
                name : data.name
            }
        );
    };

    /**
     *
     * 社区 － 获取课程卡片信息
     *
     * @param {Obejct} data
     * @property {array} data.url 课程链接
     * @return {Promise}
     *
     */
    exports.getCourseCard = function (data) {
        return post(
            '/forum/getCourseCard',
            {
                url: data.url
            }
        );
    };

    /**
     * 报名超级老师

        {
            "code": 0,
            "data": {
                "user_number": 124325
            },
            "ts": 1479439702,
            "msg": "succ"
        }

     * @return {Promise}
     */
    exports.joinSuperTeacher = function (data, options) {
        return post(
            '/activity/superTeacherAjax',
            {

            },
            options
        );
    };

    /**
     * 超级老师 - 为老师投票

        {
            "code": 0,
            "data": {
                "coupon": {
                    "amount": 100, // 面额
                    "coupon_check_code": "3773",
                    "code": "14588224417817",
                    "detail": {
                        "type": "general", //班课:class,视频课:video
                        "name": "", //通用没有名字
                        "count": 0 //通用为0
                    }
                },
                "status": 1 // 第几次投票
            },
            "ts": 1479439702,
            "msg": "succ"
        }

     *
     * @param {Obejct} data
     * @property {number} data.number 老师number
     * @return {Promise}
     */
    exports.superVoteAjax = function (data) {
        return post(
            '/activity/superVoteAjax',
            {
                number: data.number
            }
        );
    };

    /**
     * 超级老师 - 为老师投票 - 优惠券存入账户
     *
     * @param {Obejct} data
     * @property {number} data.code 优惠券码
     * @property {number} data.checkCode 校验码
     * @return {Promise}
     */
    exports.superTeacherBindCoupon = function (data) {
        return post(
            '/activity/superTeacherBindCoupon',
            {
                code: data.code,
                coupon_check_code: data.checkCode
            }
        );
    };

    /**
     * 班课设置页获取是否第一次开设直播课/是否国外ip
     */
    exports.onLineTip = function () {
        return post('/class_course/online_tip');
    };

    /**
     * 寒假运营专题增加提交手机号接口
     */
    exports.winterHoliday = function (data) {
        return post(
            '/activity/winter_holiday',
            {
                mobile: data.mobile
            }
        );
    };

    /**
     * 寒假一对一辅导增加提交手机号接口
    */
    exports.vacationCourse = function (data) {
        return post(
            '/activity/winter_holiday',
            {
                type: data.type_id,
                mobile: data.mobile
            }
        );
    };
    /**
     * 设置会员模板
     */
    exports.setTeacherIndexModel = function (data) {
        return post(
            '/teacher_center/update_template',
            {
                template_pc: data.templateName
            }
        );
    };
    /**
     * 报名知识视频库
     */
    exports.joinVideoLibrary = function (data) {
        return post(
            '/video_course/store_house_apply',
            data
        );
    };

    /**
     * 考研搜索结果页，按条件筛选对应老师
     * @param {Obejct} data
     * @property {string: subject_id} param.subject_id 科目编码
     * @property {string: teacher_number} param.teacher_number 老师number
     * @property {boolean: direct_play} param.directPlay 是否直播
     * * @property {boolean: record_play} param.recordPlay 是否录播
     * * @property {boolean: joint_class} param.jointClass 是否联报课
     * @return {Promise}
     *
     */
    exports.graduateSearch = function (param) {
        return post(
            '/kaoyan/graduate',
            {
                "subject_id": param.subject_id,
                "teacher_number": param.teancher_number,
                "direct_play": param.directPlay,
                "record_play": param.recordPlay,
                "joint_class": param.jointClass
            }
        );
    };

    /**
     * 获取云端直播回放视频列表
     * @param {Obejct} data
     * @property {array} data.startDate 开始时间 2016-02-01
     * @property {number} data.endDate 结束时间 2016-03-13
     * @property {number} data.courseType 课程类型 1：一对一，2：在线班课
     * @return {Promise}
     *
     */
    exports.getPlaybackList = function (data) {
        return post(
            '/class_course/courselistforcloudplayback',
            {
                start: data.startDate,
                end: data.endDate,
                course_type: data.courseType
            }
        );
    };

    /**
     * 设置回放视频有效期
     * @param {Obejct} data
     * @property {array} data.number 课程number
     * @property {number} data.courseType 课程类型 1一对一 2班课
     * @property {number} data.expireDay 有效期：0-100（0表示永久有效）
     * @return {Promise}
     *
     */
    exports.setPlaybackExpireDay = function (data) {
        return post(
            '/class_course/setplaybackexpireday',
            {
                number: data.number,
                course_type: data.courseType,
                playback_expire_day: data.expireDay
            }
        );
    };

    /**
     * 删除云端录制视频
     * @param {Obejct} data
     * @property {array} data.playbackId 云端录制回放id
     * @return {Promise}
     *
     */
    exports.deleteCloudPlayback = function (data) {
        return post(
            '/class_course/deletecloudplayback',
            {
                playback_id: data.playbackId
            }
        );
    };

    /**
     * 云端录制视频同步到视频课
     * @param {Obejct} data
     * @property {array} data.scheduleId 直播课节id
     * @return {Promise}
     *
     */
    exports.copyToVideoCourse = function (data, options) {
        return post(
            '/class_course/copytocloudvideocourse',
            {
                schedule_id: data.scheduleId
            },
            options
        );
    };

    /**
     * 跟谁学3.31发布会 报名
     * @data {Obejct} data
     * @property {string: name} data.name 姓名
     * @property {string: company} data.company 公司
     * @property {string: mobile} data.mobile 电话
     * @property {string: position} data.position 职位
     * @property {string: email} data.email 邮箱
     * @return {Promise}
     *
     */
    exports.conference = function (data) {
        return post(
            '/activity/conference',
            {
                "name": data.name,
                "company": data.company,
                "mobile": data.mobile,
                "position": data.position,
                "email": data.email
            }
        );
    };
    /**
    * 中英文化交流 查看举报内容
    * @data {Object} data
    *property {string:name} data.number 编号
    *@return {Promise}
    */
    exports.report = function(data){
        return post(
            '/uk/check_report',
            //'/activity/ukAdmin/reportAjax',
            {
                "number": data.number,
            }
        );
    };
    /**
    * 中英文化交流 更换冻结状态
    * @data {Object} data
    *property {string:name} data.number 编号
    *@return {Promise}
    */
    exports.frozen = function(data){
        return post(
            '/uk/check_frozen',
            //'/activity/ukAdmin/frozenAjax',
            {
                "number":data.number,
            }
        );
    };

    /**
     * 创建购买存储空间的订单
     * @data {Obejct} data
     * @property {number} data.capacity 购买容量，单位GB
     * @return {Promise}
     */
    exports.createStoragePurchase = function (data) {
        return post(
            '/pay/createStoragePurchase',
            {
                capacity: data.capacity
            }
        );
    };

    /**
     * 获取PC学生端云端录播回放课节列表（ajax）
     * @data {Obejct} data
     * @property {number} data.courseNum 课程number/一对一课程为purchase_id
     * @property {number} data.courseType 课程种类 1:一对一
     * @property {number} data.limit 条数限制
     * @return {Promise}
     */
    exports.lessonsPlaybackAjax = function (data) {
        return post(
            '/lesson/lessonsPlaybackAjax',
            {
                course_number: data.courseNum,
                course_type: data.courseType,
                limit: data.limit
            }
        );
    };

    /**
     * 保存视频课学习记录
     * @data {Obejct} data
     * @property {number} data.courseNum 视频课number
     * @property {number} data.sectionNum 视频课课节number
     * @return {Promise}
     */
    exports.setStudyHistory = function (data) {
        return post(
            '/study_history/setHistory',
            {
                video_course_number: data.courseNum,
                section_number: data.sectionNum
            }
        );
    };

    /**
     * 商学院 － 咨询留单
     * @data {Obejct} data
     * @property {string} data.info 留单内容
     * @property {string} data.realname 真实姓名
     * @property {string} data.org 所在组织机构
     * @property {string} data.city 所在城市
     * @property {string} data.mobile 电话号码
     * @return {Promise}
     */
    exports.addConsultAjax = function (data) {
        return post(
            '/business_school/addConsult',
            {
                info: data.info,
                name: data.realname,
                org: data.org,
                city: data.city,
                mobile: data.mobile
            }
        );
    };

    /**
     * 学生数/老师数/机构数统一配置化需求
     * @data {Obejct} data
     * @return {Promise} student 学生数
                         teacher 老师数
                         org 机构数

     */
    exports.getTheCount = function (data) {
        return post(
            '/account_count/get'
        );
    };

    /**
     * 评价管理 － 发起申诉
     * @data {Obejct} data
     * @property {number} data.commentId 评价id
     * @property {string} data.reason 申诉原因
     * @return {Promise}
     */
    exports.commentAppeal = function (data) {
        return post(
            '/comment/appeal',
            {
                comment_id: data.commentId,
                reason: data.reason
            }
        );
    };

    /**
     * 学生课表
     * @params {Object}
     * @return {Promise}
     */
    exports.getSchedule = function (data) {
        return post(
            '/tcenter/timetable/stat'
        );
    };

    /**
     * 获取付费直播课是否支持试听信息
     */
    exports.getIsSupportTrial = function (data) {
        return post(
            '/class_course/check_trial_info',
            {
                room_no: data.roomNo
            }
        );
    };

    /** 获取分期信息
     * @return {Promise}
     *  /course/fenqi   /mock/classCourse/getStageDataAjax.php
     */
    exports.getStageData = function (data) {
        return post(
            '/course/fenqi',
            {
                money: data.money,
                course_number: data.courseNum,
                course_type: data.courseType
            }
        );
    };

    /**
     * 提交试听结束不报名理由
     */
    exports.sendNoEnrollReason = function (data) {
        return post(
            '/class_course/trial_feedback_ajax',
            {
                reason: data.reason,
                room_no: data.roomNo
            }
        );
    };

    /** post分期选择
     * @return {Promise}
     *  course_number 课程number
     *  course_type     课程类型
     *  stage_number   分期期数
     *  /course/fenqiChoice   /mock/classCourse/sendStageChoiceAjax.php
     */
    exports.sendStageChoice = function (data) {
        return post(
            '/course/fenqiChoice',
            {
                course_number: data.courseNum,
                course_type: data.courseType,
                stage_number: data.periods
            }
        );
    };

    /** 申请退款
     *  @return {Promise}
     *  purchase_id 订单id
     *  reason_id 申请退款原因id
     *  action 0新建 1编辑
     */
    exports.refundSubmit = function (data) {
        return post(
            '/pay/refundSubmit',
            {
                purchase_id: data.purchaseId,
                reason_id: data.reasonId,
                action: data.action
            }
        );
    };

    /** 申请退款撤销
     *  @return {Promise}
     *  purchase_id 订单id
     */
    exports.refundCancel = function (data) {
        return post(
            '/pay/refundCancel',
            {
                purchase_id: data.purchaseId
            }
        );
    };

    /**
     * 确认／取消 课消
     * @data {Obejct} data
     * @property {number} data.serialNumber 唯一编号
     * @property {number} data.type 1:确认 2:取消
     * @return {Promise}
     */
    exports.confirmClassFire = function (data) {
        return post(
            '/org_course/confirmClassFire',
            {
                serial_number: data.serialNumber,
                type: data.type
            }
        );
    };

    /**
     * 获取机构X课评论列表 - 父课程
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *         tpl: {
     *             comment_overview: 'html',
     *             comment_list: 'html'
     *         }
     *     }
     * }
     *
     * @param {Object} data
     * @property {number} data.number 课程number
     * @property {number=} data.sortBy 排序 display_order || create_time
     * @property {number} data.page 页码
     * @property {number} data.pageSize 每页的评论数量
     * @property {number} data.faceType 评论分类 0全部,1好评,2中评,3差评
     * @return {Promise}
     */
    exports.getOrgParentCourseAjax = function (data) {
        return post(
            '/comment/fromOrgParentCourseAjax',
            {
                number: data.number,
                sort_by: data.sortBy,
                page: data.page,
                page_size: data.pageSize,
                face_type: data.faceType
            }
        );
    };

    /**
     * 获取机构X课评论列表 - 机构子班课
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *         tpl: {
     *             comment_overview: 'html',
     *             comment_list: 'html'
     *         }
     *     }
     * }
     *
     * @param {Object} data
     * @property {number} data.number 课程number
     * @property {number=} data.sortBy 排序 display_order || create_time
     * @property {number} data.page 页码
     * @property {number} data.pageSize 每页的评论数量
     * @property {number} data.faceType 评论分类 0全部,1好评,2中评,3差评
     * @return {Promise}
     */
    exports.getOrgClassCourseAjax = function (data) {
        return post(
            '/comment/fromOrgClassCourseAjax',
            {
                number: data.number,
                sort_by: data.sortBy,
                page: data.page,
                page_size: data.pageSize,
                face_type: data.faceType
            }
        );
    };

    /**
     * 获取机构X课评论列表 - 一对一
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *         tpl: {
     *             comment_overview: 'html',
     *             comment_list: 'html'
     *         }
     *     }
     * }
     *
     * @param {Object} data
     * @property {number} data.number 课程number
     * @property {number=} data.sortBy 排序 display_order || create_time
     * @property {number} data.page 页码
     * @property {number} data.pageSize 每页的评论数量
     * @property {number} data.faceType 评论分类 0全部,1好评,2中评,3差评
     * @return {Promise}
     */
    exports.getOrg1v1CourseAjax = function (data) {
        return post(
            '/comment/fromOrg1v1CourseAjax',
            {
                number: data.number,
                sort_by: data.sortBy,
                page: data.page,
                page_size: data.pageSize,
                face_type: data.faceType
            }
        );
    };

    /*
     * 获取国家列表
     *
     * wiki: http://ewiki.baijiahulian.com/www/api/addresses/country-list.md
     */
    exports.getCountryList = function () {
        return post(
            '/tcenter/foundation/country/list'
        );
    };

    /**
     * @data {Obejct} data 留单至个体老师
     * @property {number} data.student_number 学生number
     * @property {number} data.teacher_number 老师number
     * @return {Promise}
     */
    exports.createReservation = function (data) {
        return post(
            '/reservations/create',
            {
                teacher_number: data.teacher_number,
                student_number: data.student_number
            }
        );
    };

    /**
     * 老师课程页 - ajax获取课程列表
     *
     * @data {Obejct} data
     * @property {number} data.number 老师number
     * @property {number} data.type 课程类型 0所有，11对1，2线下班课，3视频课，8直播课，9历史课程，13优选一对一
     * @property {number} data.tagId 标签ID
     * @property {number} data.page 页数
     * @return {Promise}
     */
    exports.getCourseAjax = function (data) {
        return post(
            '/teacher/courseAjax',
            {
                id: data.number,
                type: data.type,
                tag_id: data.tagId,
                page: data.page
            }
        );
    };

    /**
     * 汇课间获取手机验证码
     *
     * 返回数据：
     * {
     *     code: 0
     * }
     *
     * 如果返回的code 1000111表示要输入图形验证码
     *
     * @param {Object} data
     * @property {string} data.mobile 手机号码
     * @property {string} data.type 获取验证码的类型 'common'|'register'|'forgetPassword'|'voice'|'change_pay_password'
     * @property {=string} data.captcha 图形验证码
     * @property {=string} data.captcha_name 与请求图片验证码的key一致
     * @return {Promise}
     */
    exports.getHuikeSMSCode = function (data, options) {

        return post(
            '/sms/huike_send',
            {
                mobile: data.mobile,
                type: data.type || 'common',
                captcha: data.captcha || '',
                is_voice: data.is_voice || 0,
                captcha_name: data.captcha_name || data.type || 'common'
            },
            options
        );
    };

    /**
     * 金牌机构活动页表单提交
     *
     * @data {Obejct} data
     * @property {number} data.name    填写人姓名
     * @property {number} data.mobile  填写人手机号
     * @property {number} data.city    填写人所在城市
     * @return {Promise}
     */
    exports.sendGoldApply = function (data) {
        return post(
            '/org/gold_apply',
            {
                name: data.name,
                mobile: data.mobile,
                city: data.city
            }
        );
    };

    /**
     * 订单详情页  老师获取待确认课酬
     *
     * @data {Obejct} data
     * @property {number} data.purchaseId 订单id
     * @return {Promise}
     */
    exports.getRefundMoney = function (data) {
        return post(
            '/tcenter/orders/get-refund-money',
            {
                purchase_id: data.purchaseId
            }
        );
    };

    /**
     * 金牌机构活动页三方通话接口
     *
     * @data {Obejct} data
     * @property {number} data.mobile  拨打的手机号
     * @return {Promise}
     */
    exports.sendThirdCall = function (data) {
        return post(
            '/org/third_call',
            {
                mobile: data.mobile
            }
        );
    };

    /**
     * 订单详情页  老师取消订单
     *
     * @data {Obejct} data
     * @property {number} data.purchaseId 订单id
     * @property {string} data.action 操作类型
     * @property {object} data.args 其他参数
     * @return {Promise}
     */
    exports.teacherCancelOrder = function (data) {
        return post(
            '/tcenter/orders/do',
            {
                purchase_id: data.purchaseId,
                action: data.action,
                args: data.args
            }
        );
    };
    /**
     * 班课按钮 
     *  @data {Obejct} data
     *  @property {number} course_number 课程号
     *  @property {number} course_type 课程类型(2:在线班课 4:线下班课)
     */
     exports.classCourseButton = function (data) {
         return post(
             '/class-courses/display-status',
             {
                 course_number: data.courseNumber,
                 course_type: data.courseType
             }
         )
     }

    /**
     * 检查当前登录用户是否在指定课程老师的黑名单中
     *
     * @data {Obejct} data
     * @property {object} data.course_type 课程类型  3 视频课
     * @property {object} data.course_number 课程编号
     * @return {Promise}
     */
    exports.checkBlackList = function (data) {
        return post(
            '/api/video_course/checkBlackList',
            {
                course_type: data.course_type,
                course_number: data.course_number
            }
        );
    };

    /**
     * 学生订单列表--学生搜索订单
     *
     * @data {Obejct} data
     * @property {string} data.search 学生搜索信息
     * @property {int} data.page  页码
     * @return {Promise}
     */
    exports.studentSearchOrder = function (params) {
        return post(
            '/search/order',
            {
                search: params.search,
                page: (params && params.page) || 1,
            }
        );
    };
    
    /**
     * 学生订单列表--学生删除订单
     *
     * @data {Obejct} data
     * @property {string} data.purchase_id 
     * @return {Promise}
     */
    exports.studentDeleteOrder = function (params) {
        return post(
            '/new-order/delete',
            {
                purchase_id: params.purchase_id
            }
        );
    };

    /**
     * 通用收藏 - 查询是否收藏过
     *
     * @data {Obejct} data
     * @property {number} data.num 收藏对象的number
     * @property {number} data.type 对象类型
     * @return {Promise}
     */
    exports.favoriteCheck = function (data) {
        return post(
            '/favorite/check',
            {
                object_id: data.num,
                object_type: data.type
            }
        );
    };

    /**
     * 通用收藏 - 收藏/取消收藏一个对象
     *
     * @data {Obejct} data
     * @property {number} data.num 收藏对象的number
     * @property {number} data.type 对象类型
     * @property {number} data.operate 操作指令，ADD添加,DELETE删除
     * @return {Promise}
     */
    exports.favoriteOperate = function (data) {
        return post(
            '/favorite/operate',
            {
                object_id: data.num,
                object_type: data.type,
                operate_type: data.operate
            }
        );
    };

    /**
     * 获取优选一对一课程详情（购买课时弹窗专用）
     *
     * @data {Obejct} data
     * @property {number} data.number 课程number
     * @return {Promise}
     * http://ewiki.baijiahulian.com/m/api/ono-on-one-course/get2.md
     */
    exports.getDetailInfo = function (data) {
        return post(
            '/one-on-one-course/get2',
            {
                number: data.number
            }
        );
    };

    /**
     * 通用评价 - 获取评价汇总信息ajax
     *
     * @data {Obejct} data
     * @property {string} data.key 筛选key
     * @property {string} data.value 对应各项目number
     *
     * http://ewiki.baijiahulian.com/m/api/comment/summary.md
     */
    exports.getCommentSummary = function (data) {
        return post(
            '/comment/summary',
            {
                key: data.key,
                value: data.value
            }
        );
    };

    /**
     * 通用评价 - 分页获取评价列表ajax
     *
     * @data {Obejct} data
     * @property {string} data.key 筛选key
     * @property {string} data.value 对应各项目number
     * @property {number} data.page 页码
     * @property {number} data.pageSize 每页评论数
     * @property {string} data.orderBy 排序，CREATE_TIME:创建时间，SORT:智能排序
     *
     * http://ewiki.baijiahulian.com/m/api/comment/list.md
     */
    exports.getCommentList = function (data) {

        return post(
            '/comment/list',
            {
                key: data.key,
                value: data.value,
                page: data.page,
                page_size: data.pageSize,
                order_by: data.orderBy
            }
        );
    };

    /**
     * 学生订单列表--tab
     *
     * @return {Promise}
     */
    exports.studentTabOrder = function () {
        return post(
            '/new-order/get-collection-count'
        );
    };

    /**
     * 通用点赞 - 批量查询是否对一个对象进行过赞/踩操作
     *
     * @data {Obejct} data
     * @property {string} data.type 对象类型：COMMENT评价类型
     * @property {Array} data.ids 类型对应的值数组
     * @property {string} data.action 要执行的动作 UP赞／DOWN踩／CANCEL_UP取消赞／CANCEL_DOWN取消踩
     * @return {Promise}
     */
    exports.thumbCheck = function (data) {
        return post(
            '/thumb/check',
            {
                object_type: data.type,
                object_ids: data.ids,
                action: data.action
            }
        );
    };

    /**
     * 学生订单列表
     *
     * @return {Promise}
     */
    exports.studentOrderList = function (params) {
        return post(
            '/order/studentOrders', {
                page: (params && params.page) || 1,
                status: (params && params.status) || 1,
                render: 'json'
            }
        );
    };

    /**
     * 通用点赞 - 赞/踩一个对象
     *
     * @data {Obejct} data
     * @property {string} data.type 对象类型：COMMENT评价类型
     * @property {Array} data.id 类型对应的值
     * @property {string} data.action 要执行的动作 UP赞／DOWN踩／CANCEL_UP取消赞／CANCEL_DOWN取消踩
     * @return {Promise}
     */
    exports.thumbOperate = function (data) {
        return post(
            '/thumb/operate',
            {
                object_type: data.type,
                object_id: data.id,
                action: data.action
            }
        );
    };

    /**
     * 学生用户中心 - 删除视频课
     *
     * @data {Obejct} data
     * @property {String} data.purchase_ids 订单ids（逗号分隔） e.g. 12390, 1115
     * @return {Promise}
     */
    exports.deleteStudentVideoCourse = function (data) {
        return post(
            '/new-order/video-delete',
            {
                purchase_ids: data.ids
            }
        );
    };



});

