/**
 * @file 接口层
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var service = require('../../common/service');
    var SparkMD5 = require('../../common/biz/SparkMD5');

    function post(url, data, options) {

        return service.post(url, data, options)
        .then(null, function (response) {
            if (response.msg && (options && !options.preventError)) {
                alert({
                    title: '温馨提示',
                    content: response.msg
                });
            }
            return response;
        });
    }


    exports.saveCourseInfo = function (data) {
        var values = [ ];
        var texts = [ ];

        $.each(
            data.subjects,
            function (index, subject) {
                values.push(subject.value);
                texts.push(subject.text);
            }
        );

        var subjects = $.merge(values, texts);

        var params = {
            user_number: userData.number,
            title: data.title,
            portrait: data.cover,
            introduce: data.intro,
            price: data.price,
            expire_time: data.expireDay,
            subject_id: subjects.join(','),
            language: data.language.value,
            label_ids: data.tags.join(',')
        };
        if (data.number) {
            params.number = data.number;
        }

        return post(
            '/video_course/setcourseinfo',
            params
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
     * @property {string} data.cdnHost 本地测速选择的 cdn
     * @return {Promise}
     */
    exports.getVideoUploadUrl = function (data, options) {
        return post(
            '/video_course/getuploadurl',
            {
                user_number: userData.number,
                title: data.fileName,
                total_size: data.fileSize,
                cdn_host: data.cdnHost,
                uploadtype: 1
            },
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
     * @property {string} data.videoId
     * @return {Promise}
     */
    exports.getVideoResumeUploadUrl = function (data) {
        return post(
            '/video_course/getresumeuploadurl',
            {
                user_number: userData.number,
                cdn_host: data.cdnHost,
                video_id: data.videoId
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
     * @property {number} data.number 视频课 number
     * @property {number} data.sectionId 课节 id
     * @property {string} data.sectionName 课节标题
     * @property {number} data.videoId 视频 id
     * @property {string} data.videoName 视频名字
     * @property {number} data.sectionIndex 视频课位置，从 1 开始
     * @property {number} data.payStatus
     * @property {number} data.action
     * @return {Promise}
     */
    exports.saveSection = function (data) {
        var params = {
            user_number: userData.number,
            number: data.number,
            name: data.sectionName,
            video_id: data.videoId,
            file_name: data.videoName,
            index: data.sectionIndex,
            pay_status: data.payStatus,
            type: data.action
        };
        if (data.sectionId) {
            params.section_id = data.sectionId;
        }
        return post(
            '/video_course/setvideoinfo',
            params
        );
    };

    exports.deleteSection = function (data) {
        return post(
            '/video_course/removevideoitem',
            {
                section_id: data.sectionId,
                delete_media: data.deleteMedia ? 1 : 0
            }
        );
    };

    exports.saveVideoOrder = function (data) {
        return post(
            '/video_course/resetvideopos',
            {
                user_number: userData.number,
                number: data.number,
                section_ids: data.sectionIds
            }
        );
    };

    exports.saveCourseDetail = function (data) {
        return post(
            '/video_course/setcoursebrief',
            {
                user_number: userData.number,
                number: data.number,
                brief: data.brief
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
     * @property {number} data.number 视频课 number
     * @property {number} data.status 1 发布 2 保存至待发布 3 下架 4 取消显示在主页 5 保存在主页
     * @property {string} data.modifyReason 修改原因
     * @return {Promise}
     */
    exports.saveCourse = function (data) {
        return post(
            '/video_course/setcoursestatus',
            {
                user_number: userData.number,
                number: data.number,
                type: data.status,
                modify_reason: data.modifyReason
            }
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

        return service.post(
            '/user/basicInfo',
            params
        );
    };

    exports.checkChunkUploadLack = function (data) {
        var prefix = siteData.env === 'www' ? '' : (siteData.env + '-');
        var ts = $.now()
        var token = SparkMD5.hash('fids' + data.fid + 'ts' + ts);
        return service.jsonp(
            'http://' + prefix + 'upload-video.genshuixue.com/lackSegmentList',
            {
                fids: data.fid,
                ts: ts,
                token: token
            }
        )
        .then(function (response) {

            var result = '';

            $.each(
                response.data,
                function (index, item) {
                    if (item.fid == data.fid) {
                        result = item.lackData;
                    }
                }
            );

            return {
                code: 0,
                data: {
                    lack: result
                }
            };

        })
    };

});