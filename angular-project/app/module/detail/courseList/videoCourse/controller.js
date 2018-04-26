/**
 * @file 视频课列表
 * @author wangyujie
 */
define(function (require) {

    'use strict';

    var localStorage = require('cc/util/localStorage');

    function Controller($scope, courseListService, $state, tipsService, utilService) {

        // 初始化: 搜索 - 收费类别下拉菜单
        var feeTypeList = [
            {text: '全部', value: 'all'},
            {text: '付费课程', value: 'need_pay'},
            {text: '免费课程', value: 'free'}
        ];
        function initFeeType() {
            $scope.feeTypeOptions = {
                defaultValue: 'all',
                dataSource: feeTypeList,
                onSelected: function(data) {
                    $scope.fee_type = data.value;
                }
            };
        }

        // 初始化: 搜索 - 视频课状态
        var courseStatusList = [
            {text: '全部状态', value: 'all'},
            {text: '审核中', value: 'verifying'},
            {text: '审核被拒', value: 'verify_failed'},
            {text: '售卖中', value: 'enroll_started'},
            {text: '已下架', value: 'sold_out'},
        ];
        function initCourseStatus() {
            $scope.courseStatusOptions = {
                defaultValue: $scope.course_status,
                dataSource: courseStatusList,
                onSelected: function (data) {
                    $scope.course_status = data.value;
                }
            };
        }

        /*
         * 获取视频课列表
         *
         * params - ajax参数
         * isSearch - 是否是搜索结果
         */
        function getCourseList(params, isSearch) {
            $scope.isLoading = true;

            // 搜索结果
            if (isSearch) {
                $scope.isSearchResult = true;
            }
            else {
                $scope.isSearchResult = false;
            }

            courseListService
            .getVideoCourseList(params)
            .then(function (response) {
                $scope.isLoading = false;
                var data = response.data;

                $scope.vipLevel = data.vip_level;
                $scope.hasRoster = data.has_roster;

                $scope.courseList = data.courses;
                $.each($scope.courseList, function (index, item) {
                    // 截取视频课名称
                    if (item.display_name.length > 32) {
                        item.displayName = item.display_name.substr(0, 31) + '...';
                    }
                    // 配置课程分享参数
                    item.shareOptions = {
                        bdText: item.display_name,
                        bdUrl: item.pc_dynamic_url,
                        bdPic: item.cover_url
                    };
                });

                var pager = data.pager;
                $scope.totalCount = pager.total;
                $scope.pageSize = pager.page_size;
                $scope.currentPage = pager.current_page;
            });
        }

        // 初始化视图
        function initView() {
            $scope.addNewCourseUrl = location.origin + '/main.html#/videoCourseEdit/';
            $scope.addWaterMarkUrl = 'https://www.genshuixue.com/video_course/editwatermark';

            // 初始化: 搜索 - 收费类别下拉菜单
            $scope.fee_type = 'all';
            initFeeType();

            // 初始化: 搜索 - 视频课状态
            $scope.course_status = 'all';
            initCourseStatus();

            // 取本地草稿
            if (localStorage.get('editVideoCourse')) {
                $scope.cacheCourse = utilService.JSON.parse(localStorage.get('editVideoCourse'));
                if ($scope.cacheCourse.baseInfo.courseName.length > 32) {
                    $scope.cacheCourse.baseInfo.displayName = $scope.cacheCourse.baseInfo.courseName.substr(0, 31) + '...';
                }
            }

            // 获取视频课列表
            getCourseList();
        }
        initView();

        // 开课须知
        var videoCourseNoticeTpl = '<div class="attention">'
                                    + '<div class="attention-content">'
                                        + '<p class="indent head">跟谁学网站为入驻机构及老师提供售卖教学视频服务，机构及老师自行上传教学视频并使用跟谁学相关服务时，请遵守如下规定：</p>'
                                        + '<div class="section">'
                                            + '<h3>一、视频内容</h3>'
                                            + '<p>机构及老师上传的视频内容应仅限于机构情况介绍、老师情况介绍及与教学相关的内容，</p>'
                                            + '<p>其他与教学无关的内容请勿上传跟谁学网站。</p>'
                                        + '</div>'
                                        + '<div class="section">'
                                            + '<h3>二、法律责任</h3>'
                                            + '<p>1、机构及老师对上传视频内容的真实性、合法性、有效性承担法律责任。</p>'
                                            + '<p>2、机构及老师对上传的视频应享有合法的、完整的著作权。</p>'
                                            + '<p>3、视频内容如涉嫌违反法律规定或侵犯其他第三方著作权等合法权益的，由上传机构及老师独立承担法律责任。由此给跟谁学造成损失的，亦应对跟谁学承担赔偿责任。</p>'
                                        + '</div>'
                                        + '<div class="section">'
                                            + '<h3>三、视频作品的定价及观看有效期</h3>'
                                            + '<p>1、定价不符合市场规律或与品质相差悬殊导致付费用户投诉的，由机构及老师自行承担退费或赔偿责任。</p>'
                                            + '<p>2、机构及老师上传的视频作品可以自行设置观看有效期，但所有付费用户的观看有效期均届满时，机构及老师方可删除该视频作品。</p>'
                                            + '<p>3、视频作品的观看有效期可随时更改，但不得影响已付费用户的权益。</p>'
                                            + '<p>4、机构及老师上传的视频作品如设置永久有效，且存在付款用户时，该视频作品无法删除。</p>'
                                        + '</div>'
                                        + '<div class="section">'
                                            + '<h3>四、跟谁学权利</h3>'
                                            + '<p>1、跟谁学如收到任何第三方声明相关视频侵犯其合法权益的维权通知，应及时告知相关机构及老师，同时，跟谁学有权删除相关侵权视频。</p>'
                                            + '<p>2、机构及老师上传的视频如涉嫌包含违反法律规定或黄赌毒等内容，跟谁学有权立即删除相关视频。</p>'
                                            + '<p>3、机构及老师如违反本须知规定，跟谁学有权终止向其提供服务。</p>'
                                        + '</div>'
                                        + '<div class="section">'
                                            + '<h3>五、跟谁学免责声明</h3>'
                                            + '<p>1、学生在浏览或付费观看相关视频作品时，如基于非其本人学习使用之目的而进行的拍摄、修改、复制、传播、盈利等行为，跟谁学均无法控制，亦不承担任何法律责任。</p>'
                                            + '<p>2、机构及老师在跟谁学上传视频内容而导致任何第三方提出索赔要求或衍生的任何损害或损失，跟谁学不承担任何责任。</p>'
                                        + '</div>'
                                        + '<div class="section">'
                                            + '<h3>六、跟谁学平台对视频课管理有解释和修订权</h3>'
                                            + '<p class="indent">当前跟谁学对机构及老师售卖的视频作品不收取任何费用，未来如需收取技术服务等相关费用，跟谁学将在网站首页提前公告，机构及老师可选择接受或拒绝继续使用跟谁学服务。</p>'
                                        + '</div>'
                                    + '</div>'
                                 + '</div>';
        function videoCourseNotice () {
            utilService.showMessage({
                title: '视频上传须知',
                content: videoCourseNoticeTpl,
                skinClass: 'video-course-notip',
                width: 800,
                cacheKey: 'VIDEOCOURSENOTIP',
                okBtnPosition: 'left',
                okBtnText: '同意',
                okHandler: function () {
                    // 开课去~
                    location.href = location.origin + '/main.html#/videoCourseEdit/';
                },
                hideCancel: false,
                cancelBtnText: '不同意',
                cancelHandler: function () {
                    localStorage.set('VIDEOCOURSENOTIP', 'remindAgain');
                }
            });
        }

        // 添加视频课
        $scope.addCourseRemind = function () {
            if (localStorage.get('APPLECOIN') === 'notRemindAgain') { // 不再提醒 - 苹果渠道费
                if (localStorage.get('VIDEOCOURSENOTIP') === 'notRemindAgain') { // 不再提醒 - 视频上传须知
                    // 开课去~
                    location.href = location.origin + '/main.html#/videoCourseEdit/';
                }
                else {
                    videoCourseNotice();
                }
            }
            else {
                utilService.showMessage({
                    title: '温馨提示',
                    content: '根据苹果公司规定，学生在苹果手机上通过跟谁学客户端购买付费视频课，苹果公司会收取学生实付课酬金额的30%作为苹果渠道费。',
                    skinClass: 'apple-coin',
                    cacheKey: 'APPLECOIN',
                    okBtnText: '继续开课',
                    okHandler: function () {
                        if (localStorage.get('VIDEOCOURSENOTIP') === 'notRemindAgain') { // 不再提醒 - 视频上传须知
                            // 开课去~
                            location.href = location.origin + '/main.html#/videoCourseEdit/';
                        }
                        else {
                            videoCourseNotice();
                        }
                    }
                });
            }
        };

        // 搜索课程
        $scope.orderBy = { // 当前课程展示是否有排序参与
            'price': false,
            'totalPaySuccess': false
        };
        $scope.orderByParams = { // 两种排序方式，默认均降序
            'price': 'desc',
            'totalPaySuccess': 'desc'
        };
        $scope.searchCourse = function (orderByColumn) {
            $scope.orderBy = { // 当前课程展示是否有排序参与 - 重置为false
                'price': false,
                'totalPaySuccess': false
            };

            // 课程排序标准 - 二选一
            if (orderByColumn === 'price') { // 按价格排序
                $scope.orderBy.price = true;
                $scope.orderByParams.price = $scope.orderByParams.price === 'desc' ? 'asc' : 'desc';
                $scope.orderByParams.totalPaySuccess = 'desc';

                $scope.orderByColumn = 'price';
                $scope.orderByPattern = $scope.orderByParams.price;
            }
            else if (orderByColumn === 'totalPaySuccess') { // 按购买人数排序
                $scope.orderBy.totalPaySuccess = true;
                $scope.orderByParams.totalPaySuccess = $scope.orderByParams.totalPaySuccess === 'desc' ? 'asc' : 'desc';
                $scope.orderByParams.price = 'desc';

                $scope.orderByColumn = 'total_pay_success';
                $scope.orderByPattern = $scope.orderByParams.totalPaySuccess;
            }

            var params = {
                keyword: $scope.searchKeyword,
                fee_type: $scope.fee_type,
                state: $scope.course_status,
                order_by_column: $scope.orderByColumn,
                order_by_pattern: $scope.orderByPattern
            };

            // 获取视频课列表
            getCourseList(params, true);
        };

        // 清除筛选条件
        $scope.clearSearchTerms = function () {
            $scope.searchKeyword = '';
            $scope.feeTypeOptions.assignedValue = 'all';
            $scope.courseStatusOptions.assignedValue = 'all';
        };

        // 操作
        $scope.doAction = function (action, course) {
            switch (action) {
                case 'revokeVerify':
                    // 撤回审核
                    utilService.showMessage({
                        title: '温馨提示',
                        content: '确认撤回审核?',
                        okBtnPosition: 'left',
                        okBtnText: '取消',
                        hideCancel: false,
                        cancelBtnText: '确定',
                        cancelHandler: function () {
                            courseListService
                            .videoCourseDoSomething({
                                number: course.number,
                                action: action
                            })
                            .then(function () {
                                tipsService
                                .show({type: 'success', content:'已撤回审核', position: 'top'})
                                .then(function () {
                                    location.reload();
                                });
                            });
                        }
                    });
                    break;
                case 'toEdit':
                    // 编辑
                    if (course) {
                        location.href = location.origin + '/main.html#/videoCourseEdit/' + course.number;
                    }
                    else { // 草稿
                        location.href = location.origin + '/main.html#/videoCourseEdit/';
                    }
                    break;
                case 'shareFiles':
                    // 共享资料
                    location.href = course.share_file_url;
                    break;
                case 'deleteCourse':
                    // 删除课程
                    if (course) {
                        utilService.showMessage({
                            title: '温馨提示',
                            content: '确认删除该视频课吗?',
                            cacheKey: 'delCourse',
                            remindText: '同步删除课程视频',
                            skinClass: 'delete-tip',
                            okBtnPosition: 'left',
                            hideCancel: false,
                            okHandler: function () {
                                courseListService
                                .videoCourseDoSomething({
                                    number: course.number,
                                    action: action,
                                    params: {
                                        delete_video_item: localStorage.get('delCourse') === 'notRemindAgain' ? true : false
                                    }
                                })
                                .then(function () {
                                    tipsService.show({type: 'success', content:'已删除', position: 'top'})
                                    .then(function () {
                                        location.reload();
                                    });
                                });
                            }
                        });
                    }
                    else { // 草稿
                        utilService.showMessage({
                            title: '温馨提示',
                            content: '确认删除该视频课吗?',
                            skinClass: 'delete-tip',
                            okBtnPosition: 'left',
                            hideCancel: false,
                            okHandler: function () {
                                localStorage.remove('editVideoCourse');
                                $scope.cacheCourse = null;
                            }
                        });
                    }

                    break;
                case 'shareCourse':
                    // 分享课程

                    break;
                case 'soldOut':
                    // 下架
                    courseListService
                    .videoCourseDoSomething({
                        number: course.number,
                        action: action
                    })
                    .then(function () {
                        tipsService
                        .show({type: 'success', content:'已下架', position: 'top'})
                        .then(function () {
                            location.reload();
                        });
                    });
                    break;
                case 'reOpen':
                    // 上架
                    courseListService
                    .videoCourseDoSomething({
                        number: course.number,
                        action: action
                    })
                    .then(function () {
                        tipsService
                        .show({type: 'success', content:'已上架', position: 'top'})
                        .then(function () {
                            location.reload();
                        });
                    });
                    break;
            }
        };

        // 翻页
        $scope.changePage = function (newPage) {
            var params = {
                keyword: $scope.searchKeyword,
                fee_type: $scope.fee_type,
                state: $scope.course_status,
                order_by_column: $scope.orderByColumn,
                order_by_pattern: $scope.orderByPattern,
                page: newPage,
                page_size: 10
            };
            // 获取视频课列表
            getCourseList(params);
        };

    }

    Controller.$inject = [
        '$scope', 'courseListService', '$state', 'tipsService', 'utilService'
    ];

    return Controller;
});
