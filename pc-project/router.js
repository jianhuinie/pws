/**
 * @file 配置路由转发
 * @author zhujialu
 */
var rewriteURLRules = [

    {
        pattern: /^\/static\/report/,
        path: '/mock/report.js'
    },

    //  Hello Teacher 专题
    {
        pattern: /^\/activity\/helloteacher/,
        path: '/mock/activity/helloteacher.php'
    },

    //  名师高校团
    {
        pattern: /^\/activity\/mingshi/,
        path: '/mock/activity/mingshi.php'
    },

    //  名师高校团3
    {
        pattern: /^\/activity\/mingshi3/,
        path: '/mock/activity/mingshi3.php'
    },

    // 一键抢生源
    {
        pattern: /^\/activity\/onekey_teacher/,
        path: '/mock/activity/newFace.php'
    },

    //  活动二
    {
        pattern: /^\/activity\/countDown/,
        path: '/mock/activity/countDown.php'
    },

    //  活动二
    {
        pattern: /^\/activity\/channel/,
        path: '/mock/activity/channel.php'
    },

    //  活动二
    {
        pattern: /^\/activity\/advance/,
        path: '/mock/activity/advance.php'
    },

    //  活动懂行
    {
        pattern: /^\/activity\/knowit/,
        path: '/mock/activity/knowit.php'
    },

    //  活动懂行落地页
    {
        pattern: /^\/life\/index/,
        path: '/mock/life/index.php'
    },

    //  天津塘沽活动
    {
        pattern: /^\/activity\/tj/,
        path: '/mock/activity/tj.php'
    },

    //  活动二
    {
        pattern: /^\/activity\/benefit/,
        path: '/mock/activity/benefit.php'
    },

    //  master 活动
    {
        pattern: /^\/activity\/master/,
        path: '/mock/activity/master.php'
    },

    //  活动一
    {
        pattern: /^\/activity\/exercise/,
        path: '/mock/activity/exercise.php'
    },

    //  活动二
    {
        pattern: /^\/activity\/sendMoney/,
        path: '/mock/activity/sendMoney.php'
    },
    //免费家教
    {
        pattern: /^\/activity\/freeTutor/,
        path: '/mock/activity/freeTutor.php'
    },
    //  志愿老师
    {
        pattern: /^\/activity\/volunteer/,
        path: '/mock/activity/volunteer.php'
    },
    //  武汉专题 1元托管
    {
        pattern: /^\/activity\/oneYuan/,
        path: '/mock/activity/oneYuan.php'
    },
    //  公共
    {
        pattern: /^\/activity\/center/,
        path: '/mock/activity/center.php'
    },

    //  考神架到
    {
        pattern: /^\/activity\/teacherTop/,
        path: '/mock/activity/teacherTop.php'
    },

    //  跟谁学周年纪念
    {
        pattern: /^\/activity\/ceremony/,
        path: '/mock/activity/ceremony.php'
    },

    //  活动页面公共模版
    {
        pattern: /^\/activity\/activityCommon/,
        path: '/mock/activity/activityCommon.php'
    },

    //  windows客记端
    {
        pattern: /^\/static\/windows/,
        path: '/mock/static/windows.php'
    },

    //  百度视频
    {
        pattern: /^\/static\/baiduVideo/,
        path: '/mock/static/baiduVideo.php'
    },

    //  百度视频2
    {
        pattern: /^\/static\/baiduVideo2/,
        path: '/mock/static/baiduVideo2.php'
    },

    //  拍试卷
    {
        pattern: /^\/activity\/paper/,
        path: '/mock/activity/paper.php'
    },

    // 搜索列表 - 课程
    {
        pattern: /^\/course\/search/,
        path: '/mock/course/search.php'
    },

    // 修改视频课的在线状态
    {
        pattern: /^\/video_course\/setcourseonlinestatus/,
        path: '/mock/video/setCourseOnlineStatus.php'
    },
    // 视频课详情页 2017.01.03
    {
        pattern: /^\/video_course\/getcourseshowdetail/,
        path: '/mock/video/detail.php'
    },
    // 视频课详情页 old
    {
        pattern: /^\/video_course\/getcourseshowdetailOld/,
        path: '/mock/video/detailOld.php'
    },
    // 视频课下架页
    {
        pattern: /^\/video\/dropdown/,
        path: '/mock/video/dropdown.php'
    },

    // pc端 - 新闻详情页面
    {
        pattern: /^\/information\/infoDetail/,
        path: '/mock/information/infoDetail.php'
    },

    // 移动端 - 微信服务号分享名片
    {
        pattern: /^\/mobile\/postcard/,
        path: '/mock/mobile/postcard.php'
    },

    //  -- 帮助中心
    {
        pattern: /^\/guide\/nlayout/,
        path: '/mock/guide/nlayout.php'
    },

    // 新增 -- 媒体报道
    {
        pattern: /^\/guide\/news/,
        path: '/mock/guide/news.php'
    },

    // 友情链接
    {
        pattern: /^\/static\/links/,
        path: '/mock/static/links.php'
    },

    // 接口 -- 限时秒杀
    {
        pattern: /^\/activity\/sectime/,
        path: '/mock/activity/sectime.php'
    },

    // 活动页面6 -- 限时秒杀
    {
        pattern: /^\/activity\/seckill/,
        path: '/mock/activity/seckill.php'
    },

    //  点赞-- 点击请求
    {
        pattern: /^\/activity\/registerUser/,
        path: '/mock/activity/registerUser.php'
    },

    //  点赞-- 加载请求
    {
        pattern: /^\/activity\/countInfo/,
        path: '/mock/activity/countInfo.php'
    },
    //  抽奖
    {
        pattern: /^\/activity\/prize/,
        path: '/mock/activity/prize.php'
    },

    //  -- 帮助中心
    {
        pattern: /^\/guide\/olayout/,
        path: '/mock/guide/org_layout.php'
    },

    //  -- 帮助中心
    {
        pattern: /^\/guide\/tlayout/,
        path: '/mock/guide/teacher_layout.php'
    },

    //  -- 帮助中心
    {
        pattern: /^\/guide\/slayout/,
        path: '/mock/guide/student_layout.php'
    },

    // 活动页面5 -- iphone6
    {
        pattern: /^\/activity\/iphone/,
        path: '/mock/activity/iphone.php'
    },

    // 活动页面4 -- 全流程体验官
    {
        pattern: /^\/activity\/experience/,
        path: '/mock/activity/experience.php'
    },

    // 活动页面3 -- 状元页面
    {
        pattern: /^\/activity\/wise/,
        path: '/mock/activity/wise.php'
    },

    // 活动页面2 -- 圆梦页面
    {
        pattern: /^\/activity\/oneiromancy/,
        path: '/mock/activity/oneiromancy.php'
    },

    // 活动页面1 --免费午餐
    {
        pattern: /^\/activity\/lunch/,
        path: '/mock/activity/lunch.php'
    },

    // 新增 -- 7底导-管理团队
    {
        pattern: /^\/guide\/team/,
        path: '/mock/guide/team.php'
    },

    // 新增 -- 6底导-活动公告
    {
        pattern: /^\/guide\/notice/,
        path: '/mock/guide/notice.php'
    },

    // 新增 -- 5底导-支付方式
    {
        pattern: /^\/guide\/pay/,
        path: '/mock/guide/pay.php'
    },

    // 新增 -- 8底导-侵权投诉
    {
        pattern: /^\/guide\/tort/,
        path: '/mock/guide/tort.php'
    },

    // 新增 -- 4底导-上课流程
    {
        pattern: /^\/guide\/process/,
        path: '/mock/guide/process.php'
    },

    // 新增 -- 3底导-老师入驻
    {
        pattern: /^\/guide\/entering/,
        path: '/mock/guide/entering.php'
    },

    // 新增 -- 机构入驻
    {
        pattern: /^\/guide\/org/,
        path: '/mock/guide/org.php'
    },

    // 新增底导-查找页面
    {
        pattern: /^\/letter/,
        path: '/mock/guide/letter.php'
    },

    // 新增 -- 2底导-老师帮助
    {
        pattern: /^\/guide\/teacher/,
        path: '/mock/guide/teacher.php'
    },

    // 新增 -- 1底导-学生帮助
    {
        pattern: /^\/guide\/student/,
        path: '/mock/guide/student.php'
    },

    // 7底导-加入我们
    {
        pattern: /^\/guide\/join/,
        path: '/mock/guide/join.php'
    },

    // 6底导-网站条款
    {
        pattern: /^\/guide\/clause/,
        path: '/mock/guide/clause.php'
    },
    // 5底导-联系我们
    {
        pattern: /^\/guide\/business/,
        path: '/mock/guide/business.php'
    },

    // 底导-意见返馈的ajax
    {
        pattern: /^\/guide\/feedback/,
        path: '/mock/guide/feedback.php'
    },
     // 5底导-平台保障
    {
        pattern: /^\/guide\/guarantee/,
        path: '/mock/guide/guarantee.php'
    },
     // 4底导-意见返馈
    {
        pattern: /^\/guide\/back-feedback/,
        path: '/mock/guide/back-feedback.php'
    },

    // 3底导-了解我们
    {
        pattern: /^\/guide\/about/,
        path: '/mock/guide/about.php'
    },

    // 2底导-视频拍摄
    {
        pattern: /^\/guide\/video/,
        path: '/mock/guide/video.php'
    },

    // 校园招聘
    {
        pattern: /^\/guide\/recruit/,
        path: '/mock/guide/recruit.php'
    },

    // 校园招聘异步接口
    {
        pattern: /^\/guide\/jobList/,
        path: '/mock/guide/jobList.php'
    },

    // 本地上传测试
    {
        pattern: /^\/upload/,
        path: '/mock/upload.php'
    },

    // 在线课程
    {
        pattern: /^\/online\/classroom/,
        path: '/mock/online/InteractiveClassClient.php'
    },

    // 登录页面
    {
        pattern: /^\/static\/login/,
        path: '/mock/static/login.php'
    },

    // 注册页面
    {
        pattern: /^\/static\/register/,
        path: '/mock/static/register.php'
    },

    // 忘记密码页面
    {
        pattern: /^\/static\/forget/,
        path: '/mock/static/forget.php'
    },

    // 老师介绍页
    {
        pattern: /^\/static\/teacher/,
        path: '/mock/static/teacher.php'
    },

    // 学生展示页 - 平台流程
    {
        pattern: /^\/static\/student/,
        path: '/mock/static/student.php'
    },

    // 网站首页
    {
        pattern: /^\/static\/search/,
        path: '/mock/main/main.php'
    },

    // 城市切换页
    {
        pattern: /^\/changecity\/init/,
        path: '/mock/main/changeCity.php'
    },

    // 获取城市列表
    {
        pattern: /^\/changecity\/list_ajax/,
        path: '/mock/sem/getCityList.php'
    },

    // app下载页
    {
        pattern: /^\/static\/app/,
        path: '/mock/static/app.php'
    },
    // 学生数/老师数/机构数统一配置化需求
    {
        pattern: /^\/account_count\/get/,
        path: '/mock/static/count.php'
    },
    // 组件文档
    {
        pattern: /^\/component/,
        path: '/mock/component.php'
    },
    // 搜索列表 - 老师
    {
        pattern: /^\/teacher\/search/,
        path: '/mock/teacher/search.php'
    },

    // 地图找老师页面
    {
        pattern: /^\/teacher\/map/,
        path: '/mock/teacher/map.php'
    },

    // 地图找老师页面Ajax接口
    {
        pattern: /^\/teacher\/mapSearch/,
        path: '/mock/teacher/mapSearch.php'
    },

    // 快速帮我找老师
    {
        pattern: /^\/recommend\/addRecord/,
        path: '/mock/recommend/addRecord.php'
    },
    // 新版老师详情页 - 主页
    {
        pattern: /^\/teacher\/newDetail/,
        path: '/mock/teacher/newDetail.php'
    },
    // 老师主页 - 会员模板1
    {
        pattern: /^\/teacher\/newDetail1/,
        path: '/mock/teacherIndex/model1/index.php'
    },
    // 老师主页 - 会员模板2
    {
        pattern: /^\/teacher\/newDetail2/,
        path: '/mock/teacherIndex/model2/index.php'
    },
    // 老师主页 - 会员模板3
    {
        pattern: /^\/teacher\/newDetail3/,
        path: '/mock/teacherIndex/model3/index.php'
    },
    // 老师主页 - 会员模板4
    {
        pattern: /^\/teacher\/newDetail4/,
        path: '/mock/teacherIndex/model4/index.php'
    },
    // 新版老师文章主页 - 线下课
    {
        pattern: /^\/teacher\/newArticle/,
        path: '/mock/teacher/newArticle.php'
    },

    // 新版老师详情页 - 非会员 - 线下课
    {
        pattern: /^\/teacher\/newOffline/,
        path: '/mock/teacher/newOffline.php'
    },

    // 新版老师详情页 - 非会员 - 课程tab
    {
        pattern: /^\/teacher\/newCourse/,
        path: '/mock/teacher/newCourse.php'
    },

    // 新版老师详情页 - 非会员 - 在线课
    {
        pattern: /^\/teacher\/newOnline/,
        path: '/mock/teacher/newOnline.php'
    },

    // 新版老师详情页 - 非会员 - 1对1
    {
        pattern: /^\/teacher\/newOne/,
        path: '/mock/teacher/newOne.php'
    },
    // 新版老师详情页 - 视频课
    {
        pattern: /^\/teacher\/newVideo/,
        path: '/mock/teacher/newVideo.php'
    },

    // 新版老师详情页 - 个人资料
    {
        pattern: /^\/teacher\/newIntro/,
        path: '/mock/teacher/newIntro.php'
    },

    // 新版老师详情页 - 评价
    {
        pattern: /^\/teacher\/newComment/,
        path: '/mock/teacher/newComment.php'
    },

    // 新版老师详情页 - 相册/视频
    {
        pattern: /^\/teacher\/newPhotoVideo/,
        path: '/mock/teacher/newPhotoVideo.php'
    },

    // 新版老师详情页文章列表 - 主页
    {
        pattern: /^\/article\/list/,
        path: '/mock/teacher/article.php'
    },

    // 新版老师详情页草稿列表 - 主页
    {
        pattern: /^\/article\/draftList/,
        path: '/mock/teacher/draft.php'
    },

    // 新版老师详情页文章列表 - 主页
    {
        pattern: /^\/article\/categoryList/,
        path: '/mock/teacher/articleCategory.php'
    },

    // 老师详情页 - 老师授课时间 ajax
    {
        pattern: /^\/teacher\/busyDate/,
        path: '/mock/teacher/busyDate.php'
    },

    // 老师详情页 - 获取课程列表 ajax
    {
        pattern: /^\/teacher\/courseList/,
        path: '/mock/teacher/courseList.php'
    },

    // 老师详情页 - 获取视频/相册列表 ajax
    {
        pattern: /^\/teacher\/videoPhotoList/,
        path: '/mock/teacher/videoPhotoList.php'
    },

    // 老师详情页 - 获取评论列表 ajax
    {
        pattern: /^\/comment\/fromStudentAjax/,
        path: '/mock/comment/fromStudentAjax.php'
    },

    // 学生信用中心
    {
        pattern: /^\/comment\/fromTeacherDetail/,
        path: '/mock/student/detail.php'
    },
    // 检测是否重复购买班课
    {
        pattern: /^\/pay\/ifCanBuy/,
        path: '/mock/pay/ifCanBuy.php'
    },
    // 检测是否支付了班课
    {
        pattern: /^\/pay\/hasPayForClassCourse/,
        path: '/mock/pay/hasPayForClassCourse.php'
    },
    // 自动生成直播课支付订单
    {
        pattern: /^\/pay\/autoPayForLiveCourse/,
        path: '/mock/pay/autoPayForLiveCourse.php'
    },
    // 支付 - 选择课时
    {
        pattern: /^\/pay\/course/,
        path: '/mock/pay/course.php'
    },
    // 支付 - 确认订单
    {
        pattern: /^\/pay\/productDetail/,
        path: '/mock/pay/order.php'
    },
    // 支付 - 支付
    {
        pattern: /^\/pay\/payProductPurchase/,
        path: '/mock/pay/pay.php'
    },
    // 支付 - 修改订单价格
    {
        pattern: /^\/pay\/changeMoney/,
        path: '/mock/pay/changeMoney.php'
    },

    // 支付 - 提交订单 ajax 接口
    {
        pattern: /^\/pay\/createProductPurchase/,
        path: '/mock/pay/createProductPurchase.php'
    },

    // 支付 - 账户充值
    {
        pattern: /^\/pay\/recharge/,
        path: '/mock/pay/recharge.php'
    },
    // 支付 - 检测优惠券
    {
        pattern: /^\/pay\/checkFavCode/,
        path: '/mock/pay/checkFavCode.php'
    },
    // 支付 - 发送支付验证码
    {
        pattern: /^\/pay\/motoPayVerify/,
        path: '/mock/pay/motoPayVerify.php'
    },
    // 获取绑定的银行卡信息
    {
        pattern: /^\/pay\/cardIndex/,
        path: '/mock/pay/cardIndex.php'
    },

    // 获取老师的课时优惠接口 ajax
    {
        pattern: /^\/pay\/combo/,
        path: '/mock/pay/combo.php'
    },
    //检测订单支付状态
    {
        pattern: /^\/pay\/checkPurchaseStatus/,
        path: '/mock/pay/checkPurchaseStatus.php'
    },
    // 充值 - ajax 接口
    {
        pattern: /^\/account\/createRecharge/,
        path: '/mock/account/createRecharge.php'
    },
    // 设置支付密码
    {
        pattern: /^\/account\/setPwd/,
        path: '/mock/account/setPwd.php'
    },

    // 检测手机是否已注册
    {
        pattern: /^\/auth\/checkMobile/,
        path: '/mock/auth/checkMobile.php'
    },
    // 浅注册
    {
        pattern: /^\/auth\/registerStudentByMobile/,
        path: '/mock/auth/registerStudentByMobile.php'
    },
    // 浅注册
    {
        pattern: /^\/auth\/signupin_mobile_ajax/,
        path: '/mock/auth/registerStudentByMobile.php'
    },
    // 切换老师、学生身份
    {
        pattern: /^\/auth\/signin_ajax/,
        path: '/mock/auth/signin_ajax.php'
    },
    // 发送手机验证码
    {
        pattern: /^\/auth\/sendNormalSMSCode/,
        path: '/mock/auth/sendNormalSMSCode.php'
    },

    // 登录 - 发送手机验证码
    {
        pattern: /^\/auth\/sendLoginSMSCode/,
        path: '/mock/auth/sendLoginSMSCode.php'
    },
    // 检测手机验证码，验证后销毁验证码
    {
        pattern: /^\/auth\/verifyNormalSMSCode/,
        path: '/mock/auth/verifyNormalSMSCode.php'
    },
    // 检测手机验证码，验证后不销毁验证码
    {
        pattern: /^\/auth\/checkNormalSMSCode/,
        path: '/mock/auth/checkNormalSMSCode.php'
    },
    // 给老师写评价
    {
        pattern: /^\/comment\/addTeacher/,
        path: '/mock/comment/addTeacher.php'
    },
    // 给学生写评价
    {
        pattern: /^\/comment\/addStudent/,
        path: '/mock/comment/addStudent.php'
    },
    //
    {
        pattern: /^\/pay\/thirdPartyPay/,
        path: '/mock/pay/thirdPartyPay.php'
    },
    // 支付完成页 － 新版2016.10.09
    {
        pattern: /^\/pay\/result/,
        path: '/mock/pay/result.php'
    },

    // 老师个人中心 - 个人信息
    {
        pattern: /^\/teacher_center\/profile/,
        path: '/mock/teacherCenter/profile.php'
    },

    // 老师个人中心 - 我的照片
    {
        pattern: /^\/teacher_center\/photos/,
        path: '/mock/teacherCenter/myPhoto.php'
    },

    // 老师个人中心 - 个人信息 - 头像上传
    {
        pattern: /^\/user\/avatar/,
        path: '/mock/user/avatar.php'
    },

    // 老师个人中心 - 个人信息 - 头像上传
    {
        pattern: /^\/user\/upsertAvatar/,
        path: '/mock/user/upsertAvatar.php'
    },

    // 老师个人中心 - 隐私保护
    {
        pattern: /^\/teacher_center\/togglePrivateProtected/,
        path: '/mock/teacherCenter/togglePrivateProtected.php'
    },

    // 老师个人中心 - 个人信息 - save基本信息
    {
        pattern: /^\/teacher_center\/upsertBasic/,
        path: '/mock/teacherCenter/upsertBaseInfo.php'
    },

    // 学生个人中心 - 个人信息 - save基本信息
    {
        pattern: /^\/student_center\/upsertBasic/,
        path: '/mock/studentCenter/upsertBaseInfo.php'
    },

    // 学生个人中心 - 个人信息 - save教育背景
    {
        pattern: /^\/student_center\/upsertBackground/,
        path: '/mock/studentCenter/upsertBackground.php'
    },

    // 学生个人中心 - 个人信息 - save工作情况
    {
        pattern: /^\/student_center\/upsertWork/,
        path: '/mock/studentCenter/upsertWork.php'
    },
    // 老师个人中心 - 个人信息 - 保存背景资料
    {
        pattern: /^\/teacher_center\/upsert_background/,
        path: '/mock/teacherCenter/upsertBackground.php'
    },

    // 老师个人中心 - 视频课管理
    {
        pattern: /^\/video_course\/getcourselist/,
        path: '/mock/teacherCenter/myVideoCourse.php'
    },

    // 老师个人中心 - 发布/编辑视频课
    {
        pattern: /^\/video_course\/getcourseeditdetail/,
        path: '/mock/teacherCenter/setVideoCourse.php'
    },

    // 老师个人中心 - 没权限的老师展示页
    {
        pattern: /^\/teacher_center\/tipVideoCourse/,
        path: '/mock/teacherCenter/tipVideoCourse.php'
    },

    //老师资料库 获取某目录下的文件信息
    {
        pattern: /^\/netdisk\/sort/,
        path: '/mock/netdisk/sort.php'
    },
    //老师资料库（网盘） 浏览目录
    {
        pattern: /^\/netdisk\/dir/,
        path: '/mock/netdisk/dir.php'
    },
    //老师资料库 筛选文件
    {
        pattern: /^\/netdisk\/category/,
        path: '/mock/netdisk/category.php'
    },
    //老师资料库 移动文件
    {
        pattern: /^\/netdisk\/move/,
        path: '/mock/netdisk/move.php'
    },
    //老师资料库 创建文件夹
    {
        pattern: /^\/netdisk\/createDir/,
        path: '/mock/netdisk/createDir.php'
    },
    //老师资料库 重命名文件 文件夹
    {
        pattern: /^\/netdisk\/rename/,
        path: '/mock/netdisk/rename.php'
    },
    //老师资料库 删除文件文件夹
    {
        pattern: /^\/netdisk\/delete/,
        path: '/mock/netdisk/delete.php'
    },
    //老师资料库 搜索
    {
        pattern: /^\/netdisk\/search/,
        path: '/mock/netdisk/search.php'
    },
    //老师资料库 批量下载
    {
        pattern: /^\/netdisk\/download/,
        path: '/mock/netdisk/download.php'
    },
    //老师资料库 文件上传接口
    {
        pattern: /^\/netdisk\/upload/,
        path: '/mock/netdisk/upload.php'
    },

    // 省市区区域联动一个接口
    {
        pattern: /^\/area\/list/,
        path: '/mock/area/list.php'
    },

    // 行业联动一个接口
    {
        pattern: /^\/industry\/list/,
        path: '/mock/industry/list.php'
    },

    // 职位联动一个接口
    {
        pattern: /^\/job\/list/,
        path: '/mock/job/list.php'
    },

    // 老师个人中心 - 个人信息 - save背景资料
    {
        pattern: /^\/teacher_center\/upsertOtherInfo/,
        path: '/mock/teacherCenter/upsertOtherInfo.php'
    },

    // 老师个人中心 - 个人信息 - save教学经历
    {
        pattern: /^\/teacher_bio\/upsert/,
        path: '/mock/teacherCenter/upsertExperience.php'
    },

    // 老师个人中心 - 个人信息 - save成功案例
    {
        pattern: /^\/teacher_case\/upsert/,
        path: '/mock/teacherCenter/upsertSuccess.php'
    },

    // 老师个人中心 - 个人信息 - save我的照片
    {
        pattern: /^\/photo\/upsert/,
        path: '/mock/photo/upsert.php'
    },

    // 老师个人中心 - 个人信息 - 删除照片 ajax
    {
        pattern: /^\/photo\/delete/,
        path: '/mock/photo/delete.php'
    },

    // 老师个人中心 - 个人信息 - save其他信息
    {
        pattern: /^\/teacher_center\/saveOtherInfo/,
        path: '/mock/teacherCenter/saveOtherInfo.php'
    },

    // 老师个人中心 - 认证设置
    {
        pattern: /^\/teacher_center\/user_cert/,
        path: '/mock/teacherCenter/certification.php'
    },

    // 老师个人中心 - 认证设置 - 身份认证
    {
        pattern: /^\/user_cert\/identity_detail/,
        path: '/mock/teacherCenter/identity.php'
    },

    // 老师个人中心 - 认证设置 - 图片上传
    {
        pattern: /^\/user\/previewImage/,
        path: '/mock/teacherCenter/previewImage.php'
    },

    // 老师个人中心 - 认证设置 - 身份证去重
    {
        pattern: /^\/teacher_center\/verifyCertNumber/,
        path: '/mock/teacherCenter/verifyCertNumber.php'
    },

    // 老师个人中心 - 认证设置 - save各种认证
    {
        pattern: /^\/user_cert\/upsert/,
        path: '/mock/teacherCenter/upsertCert.php'
    },

    // 老师个人中心 - 课程设置
    {
        pattern: /^\/teacher_center\/set_course/,
        path: '/mock/teacherCenter/courseList.php'
    },
    // 老师个人中心 - 课程信息ajax
    {
        pattern: /^\/teacher\/courseListAsy/,
        path: '/mock/teacherCenter/ajaxCourseList.php'
    },
    // 老师个人中心 - 课程设置 - 添加与修改一对一课程
    {
        pattern: /^\/teacher_course\/edit_form/,
        path: '/mock/teacherCenter/courseEdit.php'
    },
    //老师个人中心 - 课程设置 - 班课设置 - 教学计划 upsert
    {
        pattern: /^\/class_course\/preview/,
        path: '/mock/course/detail.php'
    },
    // 老师个人中心 - 课程设置 - 修改课程 ajax【旧】
    {
        pattern: /^\/teacher_center\/editCourse/,
        path: '/mock/teacherCenter/editCourse.php'
    },
    // 老师个人中心 - 课程设置 - 修改课程【新】
    {
        pattern: /^\/teacher_course\/upsert/,
        path: '/mock/teacherCenter/editCourse.php'
    },
    // 老师个人中心 - 课程设置 - 删除课程
    {
        pattern: /^\/teacher_course\/delete/,
        path: '/mock/teacherCenter/delCourse.php'
    },
    // 老师个人中心 - 课程设置 - 设置可授课时间
    {
        pattern: /^\/usable_time\/setting/,
        path: '/mock/teacherCenter/courseDate.php'
    },
    // 老师个人中心 - 课程设置 - 课时优惠包
    {
        pattern: /^\/teacher_combo\/list_admin/,
        path: '/mock/teacherCenter/courseCombo.php'
    },
    //老师个人中心 - 课程设置 - 班课设置 - 教学计划 upsert
    {
        pattern: /^\/class_course\/schedule/,
        path: '/mock/teacherCenter/classCourseSchedule.php'
    },
    //老师个人中心 - 课程设置 - 班课设置 - 教学计划 删除
    {
        pattern: /^\/class_course_schedule\/delete/,
        path: '/mock/teacherCenter/classCourseScheduleDelete.php'
    },
    // 获取某个班课的订单列表
    {
        pattern: /^\/class_course\/order_list/,
        path: '/mock/teacherCenter/classCourseOrderListByCourse.php'
    },
    //老师个人中心 - 课程设置 - 班课设置 - 教学计划 批量删除
    {
        pattern: /^\/class_course_schedule\/batch_delete/,
        path: '/mock/teacherCenter/classCourseScheduleBatchDelete.php'
    },
    // 老师个人中心 - 课程设置 - 获取班课列表列表
    {
        pattern: /^\/teacher_center\/classCourseSearch/,
        path: '/mock/teacherCenter/classCourseSearch.php'
    },

    // 老师个人中心 - 课程设置 - 提交审核
    {
        pattern: /^\/class_course\/submitAudit/,
        path: '/mock/teacherCenter/submitAudit.php'
    },
    // 老师个人中心 - 课程设置 - 班课 - 再开一班
    {
        pattern: /^\/class_course\/copy/,
        path: '/mock/teacherCenter/copyClassCourse.php'
    },

    // 老师个人中心 - 课程设置 - 班课招生
    {
        pattern: /^\/class_course\/status/,
        path: '/mock/teacherCenter/statusClassCourse.php'
    },

    // 老师个人中心 - 课程设置 - 删除班课
    {
        pattern: /^\/class_course\/delete/,
        path: '/mock/teacherCenter/delClassCourse.php'
    },

    // 老师个人中心 - 班课订单列表
    {
        pattern: /^\/teacher_center\/classCourseOrderList/,
        path: '/mock/teacherCenter/classCourseOrderList.php'
    },

    // 老师个人中心 - 课程设置 - 添加／编辑班课
    {
        pattern: /^\/tcenter\/courses\/class-courses\/form/,
        path: '/mock/teacherCenter/classCourse.php'
    },

    // 老师个人中心 - 课程设置 - 班课设置 - 图片新增与编辑
    {
        pattern: /^\/teacher_center\/upsertClassCoursePhoto/,
        path: '/mock/teacherCenter/upsertClassCoursePhoto.php'
    },

    // 老师个人中心 - 课程设置 - 班课设置 - 图片删除
    {
        pattern: /^\/teacher_center\/delClassCoursePhoto/,
        path: '/mock/teacherCenter/delClassCoursePhoto.php'
    },

    // 老师个人中心 - 课程设置 - 班课设置成功页
    {
        pattern: /^\/class_course\/success/,
        path: '/mock/teacherCenter/classCourseOk.php'
    },

    // 老师个人中心 - 我的邀请 - 发送邀请码
    {
        pattern: /^\/invite\/sendMobile/,
        path: '/mock/ajax/invite/sendMobile.php'
    },

    // 老师个人中心 - 账户设置
    {
        pattern: /^\/teacher_center\/account/,
        path: '/mock/teacherCenter/account.php'
    },

    // 老师个人中心 - 我的机构
    {
        pattern: /^\/teacher_center\/org/,
        path: '/mock/teacherCenter/org.php'
    },

    // 老师个人中心 - 账户设置 - 验证手机号是否属于当前用户
    {
        pattern: /^\/user\/validateMobile/,
        path: '/mock/user/validateAccount.php'
    },

    // 老师个人中心 - 账户设置 - 验证邮箱是否属于当前用户
    {
        pattern: /^\/user\/validateEmail/,
        path: '/mock/user/validateAccount.php'
    },

    // 老师个人中心 - 账户设置 - 验证登录密码是否属于当前用户
    {
        pattern: /^\/user\/validatePassword/,
        path: '/mock/user/validateAccount.php'
    },

    // 老师个人中心 - 账户设置 - 发送手机验证码
    // 老师个人中心 - 账户设置 - 发送邮箱验证码
    // 老师个人中心 - 账户设置 - 修改登录密码
    // 老师个人中心 - 账户设置 - 手机绑定
    // 老师个人中心 - 账户设置 - 初次邮箱绑定
    // 老师个人中心 - 账户设置 - 新邮箱绑定
    {
        pattern: /^\/teacher_center\/account_ajax/,
        path: '/mock/teacherCenter/accountVerify.php'
    },
    // 老师个人中心 - 账户设置 - 支付密码发送验证码
    {
        pattern: /^\/user\/verify_mobile/,
        path: '/mock/user/accountPayVerify.php'
    },
    // 老师个人中心 - 账户设置 - 支付密码保存
    {
        pattern: /^\/user\/upsert_pay_password/,
        path: '/mock/user/accountPayVerify.php'
    },
    {
        pattern: /^\/user\/reset_password/,
        path: '/mock/user/resetPassword.php'
    },
    {
        pattern: /^\/user\/reset_pay_password/,
        path: '/mock/user/resetPayPassword.php'
    },

    // 老师个人中心 - 资金中心
    {
        pattern: /^\/teacher_center\/cash/,
        path: '/mock/teacherCenter/cash.php'
    },
    // 老师个人中心 - 资金中心 - 提现
    {
        pattern: /^\/teacher_center\/withdraw/,
        path: '/mock/teacherCenter/withdraw.php'
    },
    // 老师个人中心 - 资金中心 - 提现 - ajax
    {
        pattern: /^\/pay\/createDrawCash/,
        path: '/mock/pay/createDrawCash.php'
    },
    // 老师个人中心 - 资金中心 - 绑定银行卡
    {
        pattern: /^\/teacher_center\/bind/,
        path: '/mock/teacherCenter/bindCard.php'
    },
    // 老师个人中心 - 资金中心 - 绑定银行卡 - ajax
    {
        pattern: /^\/account\/addBankCard/,
        path: '/mock/account/addBankCard.php'
    },
    // 老师个人中心 - 资金中心 - 解绑银行卡 - ajax
    {
        pattern: /^\/account\/removeBankCard/,
        path: '/mock/account/removeBankCard.php'
    },

    // 老师个人中心 - 我的视频
    {
        pattern: /^\/teacher_center\/video/,
        path: '/mock/teacherCenter/video.php'
    },
    //老师个人中心 - 视频订单列表(展示课程 下拉订单)
    {
        pattern: /^\/teacher_center\/videoCourseList/,
        path: '/mock/teacherCenter/videoCourseList.php'
    },
    //获取视频课订单的异步接口
    {
        pattern: /^\/teacher_center\/videoCourseOrderList/,
        path: '/mock/teacherCenter/videoCourseOrderList.php'
    },
    // 老师个人中心 - 视频上传
    {
        pattern: /^\/teacher_center\/uploadVideo/,
        path: '/mock/teacherCenter/uploadVideo.php'
    },
    // 老师个人中心 - 编辑视频信息
    {
        pattern: /^\/teacher_center\/videoEdit/,
        path: '/mock/teacherCenter/videoEdit.php'
    },
    // 老师个人中心 - 资料库
    {
        pattern: /^\/teacher_center\/netdisk/,
        path: '/mock/teacherCenter/netdisk.php'
    },
    // 学生个人中心 - 收藏老师
    {
        pattern: /^\/student_center\/addFavouriteTeacher/,
        path: '/mock/studentCenter/addFavouriteTeacher.php'
    },
    // 获取收藏状态
    {
        pattern: /^\/collection\/checkCollectedAjax\/teacher/,
        path: '/mock/teacher/checkCollect.php'
    },

    // 学生个人中心 - 钱包管理 - 余额
    {
        pattern: /^\/student_center\/cash/,
        path: '/mock/studentCenter/cash.php'
    },
    // 学生个人中心 - 钱包管理 - 优惠券
    {
        pattern: /^\/student_center\/coupon/,
        path: '/mock/studentCenter/coupon.php'
    },
    // 学生个人中心 - 资金中心 - 提现
    {
        pattern: /^\/student_center\/withdraw/,
        path: '/mock/studentCenter/withdraw.php'
    },
    // 学生个人中心 - 资金中心 - 绑定银行卡
    {
        pattern: /^\/student_center\/bind/,
        path: '/mock/studentCenter/bindCard.php'
    },

    // 老师个人中心 - 我的订单
    {
        pattern: /^\/teacher_center\/orders/,
        path: '/mock/teacherCenter/orderList.php'
    },

    // 老师个人中心 - 班课订单汇总
    {
        pattern: /^\/class_course\/order_detail/,
        path: '/mock/teacherCenter/classCourseOrderSummary.php'
    },

    // 老师个人中心 - 我的学生
    {
        pattern: /^\/lesson\/myStudents/,
        path: '/mock/teacherCenter/student.php'
    },

    // 老师个人中心 - 订单详情
    {
        pattern: /^\/order\/teacherOrderDetail/,
        path: '/mock/teacherCenter/orderDetail.php'
    },

    // //  老师个人中心 －我的课表
    // {
    //     pattern: /^\/teacher_center\/timetable/,
    //     path: '/mock/teacherCenter/schedule.php'
    // },
    {
        pattern: /^\/lesson\/teacherLessons/,
        path: '/mock/teacherCenter/teacherLessons.php'
    },
    // 老师个人中心 - 课程评价
    {
        pattern: /^\/order\/teacherComment/,
        path: '/mock/teacherCenter/comment.php'
    },
    // 老师个人中心 - 我的信用 - 评价学生
    {
        pattern: /^\/teacher_center\/commentStudent/,
        path: '/mock/comment/student.php'
    },
    // 老师个人中心 - 我的信用 - 来自学生的评价
    {
        pattern: /^\/teacher_center\/commentFromStudent/,
        path: '/mock/comment/fromStudent.php'
    },

    // 老师详情页 - 来自学生的评价 - ajax
    {
        pattern: /^\/comment\/fromStudentAjax/,
        path: '/mock/comment/fromStudentAjax.php'
    },
    // // 后端的老师个人中心－我的课表
    // {
    //     pattern: /^\/lesson\/teacherLessons/,
    //     path: '/mock/teacherCenter/schedule.php'
    // },
    // 学生个人中心 - 我的评价 - 评价老师
    {
        pattern: /^\/student_center\/commentTeacher/,
        path: '/mock/comment/teacher.php'
    },
    // 学生个人中心 - 我的评价 - 来自老师的评价
    {
        pattern: /^\/student_center\/commentFromTeacher/,
        path: '/mock/comment/fromTeacher.php'
    },
    // 学生个人中心 - 课程评价
    {
        pattern: /^\/order\/studentComment/,
        path: '/mock/studentCenter/comment.php'
    },

    // 学生个人中心 - 我的老师
    {
        pattern: /^\/student_center\/teacher/,
        path: '/mock/studentCenter/teacher.php'
    },

    // // 学生个人中心 - 我的订单
    // {
    //     pattern: /^\/order\/studentOrders/,
    //     path: '/mock/studentCenter/orderList.php'
    // },
    // 学生个人中心 - 我的视频课
    {
        pattern: /^\/student_center\/videoLessons/,
        path: '/mock/studentCenter/videoLessons.php'
    },
    // 学生个人中心 - 订单详情
    {
        pattern: /^\/order\/studentOrderDetail/,
        path: '/mock/studentCenter/orderDetail.php'
    },

    // 学生个人中心 - 我的老师
    {
        pattern: /^\/lesson\/myTeacherDetail/,
        path: '/mock/studentCenter/ajaxOrderList.php'
    },

    // 老师个人中心 - 我的学生
    {
        pattern: /^\/teacher_center\/student/,
        path: '/mock/teacherCenter/student.php'
    },

    // 学生个人中心 － 我的课表
    {
        pattern: /^\/student_center\/schedule/,
        path: '/mock/studentCenter/schedule.php'
    },

    // 学生个人中心 - 我的收藏 - 老师收藏
    {
        pattern: /^\/student_center\/favourite/,
        path: '/mock/studentCenter/favourite.php'
    },
    // 学生个人中心 - 我的收藏 - 课程收藏
    {
        pattern: /^\/collection\/list\/course/,
        path: '/mock/studentCenter/favouriteCourse.php'
    },
    // 学生个人中心 - 机构收藏
    {
        pattern: /^\/collection\/list\/org/,
        path: '/mock/studentCenter/favouriteOrg.php'
    },
    // 后端的学生个人中心－我的课表
    {
        pattern: /^\/lesson\/studentLessons/,
        path: '/mock/studentCenter/schedule.php'
    },
    // 老师排课 － 试听课
    {
        pattern: /^\/lesson\/reserveTrial/,
        path: '/mock/lesson/reserveTrial.php'
    },
    // 老师排课
    {
        pattern: /^\/lesson\/teacherReserveLesson/,
        path: '/mock/lesson/teacherReserveLesson.php'
    },

    // 学生发起约课
    {
        pattern: /^\/lesson\/studentReserveLesson/,
        path: '/mock/lesson/studentReserveLesson.php'
    },

    // 学生发起约课 - 获取日期对应的上课信息
    {
        pattern: /^\/lesson\/studentReserveLessonAjaxCal/,
        path: '/mock/lesson/studentReserveLessonAjaxCal.php'
    },

    // 获取最大重复次数
    {
        pattern: /^\/lesson\/reserveLessonAjaxTimes/,
        path: '/mock/lesson/reserveLessonAjaxTimes.php'
    },

    // 学生发起约课 - 获取最大重复次数
    {
        pattern: /^\/lesson\/studentReserveLessonAjaxTimes/,
        path: '/mock/lesson/studentReserveLessonAjaxTimes.php'
    },

    // 学生发起约课 - 提交表单验证
    {
        pattern: /^\/lesson\/studentReserveLessonAjaxCheckForm/,
        path: '/mock/lesson/studentReserveLessonAjaxCheckForm.php'
    },

    // 学生发起约课 - 提交表单
    {
        pattern: /^\/lesson\/studentReserveLessonAjaxForm/,
        path: '/mock/lesson/studentReserveLessonAjaxForm.php'
    },

    // 老师排课 - 提交表单
    {
        pattern: /^\/lesson\/reserveLessonAjaxForm/,
        path: '/mock/lesson/studentReserveLessonAjaxForm.php'
    },

    // 顶部导航 - 课程列表
    {
        pattern: /^\/lesson\/list/,
        path: '/mock/lesson/list.php'
    },

    // 获取授课科目列表 ajax
    {
        pattern: /^\/course\/getList/,
        path: '/mock/course/getList.php'
    },

    {
        pattern: /^\/video\/getUploadUrl/,
        path: '/mock/video/getUploadUrl.php'
    },

    // 消息中心 - 私信
    {
        pattern: /^\/message\/mail/,
        path: '/mock/message/mail.php'
    },

    // 消息中心 - 公告
    {
        pattern: /^\/message\/announcement/,
        path: '/mock/message/announcement.php'
    },

    // 学生中心 - 秘书提醒
    {
        pattern: /^\/student_center\/message/,
        path: '/mock/studentCenter/message.php'
    },

    // 老师中心 - 秘书提醒
    {
        pattern: /^\/teacher_center\/message/,
        path: '/mock/teacherCenter/message.php'
    },

    // ajax 获取用户已开通的角色列表
    {
        pattern: /^\/user\/roles/,
        path: '/mock/ajax/user/roles.php'
    },

    // ajax 提交邀请码
    {
        pattern: /^\/user\/switch_role_ajax/,
        path: '/mock/ajax/user/switch_role_ajax.php'
    },

    // 学生个人中心 - 账户设置
    {
        pattern: /^\/student_center\/account/,
        path: '/mock/studentCenter/profile.php'
    },
    // 学生个人中心 - 安全设置
    {
        pattern: /^\/student_center\/security/,
        path: '/mock/studentCenter/account.php'
    },

    // 学生个人中心 - 隐私设置
    {
        pattern: /^\/student_center\/privacy/,
        path: '/mock/studentCenter/privacy.php'
    },

    // 老师 - 邀请评价
    {
        pattern: /^\/teacher\/comment/,
        path: '/mock/teacher/comment.php'
    },

    // 学生个人中心 - 个人信息
    {
        pattern: /^\/student_center\/profile/,
        path: '/mock/studentCenter/profile.php'
    },

    // 手机端 - 服务条款
    {
        pattern: /^\/mobile\/clause/,
        path: '/mock/mobile/clause.php'
    },

    //
    {
        pattern: /^\/message\/secretary/,
        path: '/mock/message/ajaxMessageList.php'
    },

    // 机构详情页 - 静态页
    {
        pattern: /^\/i\/329569289/,
        path: '/mock/org/detail.php'
    },

    // 移动端 - 订单详情
    {
        pattern: /^\/mobile\/orderDetail/,
        path: '/mock/mobile/orderDetail.php'
    },

    // 移动端 - APP下载
    {
        pattern: /^\/mobile\/download/,
        path: '/mock/mobile/download.php'
    },

    // 404错误页
    {
        pattern: /^\/static\/e404/,
        path: '/mock/static/e404.php'
    },
    // 哎呀，出错了
    {
        pattern: /^\/static\/error/,
        path: '/mock/static/error.php'
    },
    // 哎呀，出错了
    {
        pattern: /^\/static\/teacher404/,
        path: '/mock/static/teacher404.php'
    },

    {
        pattern: /^\/im\/main/,
        path: '/mock/hermes/main.php'
    },

    {
        pattern: /^\/hermes\/syncConfig/,
        path: '/mock/hermes/json/config.json'
    },
    {
        pattern: /^\/hermes\/polling/,
        path: '/mock/hermes/ajax/polling.php'
    },
    {
        pattern: /^\/hermes\/getMsg/,
        path: '/mock/hermes/json/getHistory.json'
    },
    {
        pattern: /^\/hermes\/sendMsg/,
        path: '/mock/hermes/json/mod.json'
    },
    {
        pattern: /^\/hermes\/getContact/,
        path: '/mock/hermes/json/myContact.json'
    },
    {
        pattern: /^\/hermes\/getMyTeacher/,
        path: '/mock/hermes/json/myTeacher.json'
    },
    {
        pattern: /^\/hermes\/getMyStudent/,
        path: '/mock/hermes/json/myStudent.json'
    },
    {
        pattern: /^\/hermes\/addContact/,
        path: '/mock/hermes/json/addContact.json'
    },
    {
        pattern: /^\/hermes\/getMyOrg/,
        path: '/mock/hermes/json/myOrg.json'
    },
    {
        pattern: /^\/hermes\/removeContact/,
        path: '/mock/hermes/json/mod.json'
    },
    {
        pattern: /^\/hermes\/getUserInfo/,
        path: '/mock/hermes/json/userInfo.json'
    },
    {
        pattern: /^\/hermes\/getGroup/,
        path: '/mock/hermes/json/myGroup.json'
    },

    {
        pattern: /^\/hermes\/getGroupInfo/,
        path: '/mock/hermes/json/getGroupInfo.json'
    },

    {
        pattern: /^\/hermes\/getGroupMembers/,
        path: '/mock/hermes/json/groupMembers.json'
    },

    {
        pattern: /^\/hermes\/setGroupName/,
        path: '/mock/hermes/json/mod.json'
    },

    {
        pattern: /^\/hermes\/setMsgStatus/,
        path: '/mock/hermes/json/mod.json'
    },

    {
        pattern: /^\/hermes\/quitGroup/,
        path: '/mock/hermes/json/mod.json'
    },

    {
        pattern: /^\/hermes\/dissolveGroup/,
        path: '/mock/hermes/json/mod.json'
    },

    // 客服

    {
        pattern: /^\/kefu\/getServiceInfo/,
        path: '/mock/hermes/json/getServiceInfo.json'
    },
    {
        pattern: /^\/kefu\/getGroupProfile/,
        path: '/mock/hermes/json/getUserInfo.json'
    },
    {
        pattern: /^\/kefu\/addContact/,
        path: '/mock/hermes/json/addContact.json'
    },
    {
        pattern: /^\/kefu\/setOnlineStatus/,
        path: '/mock/hermes/json/mod.json'
    },
    {
            pattern: /^\/kefu\/getOnlineStatus/,
            path: '/mock/hermes/json/mod.json'
    },
    {
        pattern: /^\/kefu\/setOriginPage/,
        path: '/mock/hermes/json/setOriginPage.json'
    },
    {
        pattern: /^\/kefu\/allContacts/,
        path: '/mock/hermes/json/allContacts.json'
    },
    {
        pattern: /^\/kefu\/serviceContacts/,
        path: '/mock/hermes/json/serviceContacts.json'
    },
    {
        pattern: /^\/kefu\/checkService/,
        path: '/mock/hermes/json/checkService.json'
    },
    {
        pattern: /^\/kefu\/isMyContact/,
        path: '/mock/hermes/json/isMyContact.json'
    },
    {
        pattern: /^\/kefu\/createConn/,
        path: '/mock/hermes/json/mod.json'
    },
    {
        pattern: /^\/kefu\/closeConn/,
        path: '/mock/hermes/json/mod.json'
    },
    {
        pattern: /^\/kefu\/getQuickReply/,
        path: '/mock/hermes/json/getQuickReply.json'
    },
    {
        pattern: /^\/kefu\/addQuickReply/,
        path: '/mock/hermes/json/addQuickReply.json'
    },
    {
        pattern: /^\/kefu\/delQuickReply/,
        path: '/mock/hermes/json/mod.json'
    },
    {
        pattern: /^\/kefu\/modQuickReply/,
        path: '/mock/hermes/json/mod.json'
    },
    {
        pattern: /^\/im\/getAnonymousInfo/,
        path: '/mock/hermes/json/anonymousInfo.json'
    },
    {
        pattern: /^\/user\/basicInfo/,
        path: '/mock/user/basicInfo.php'
    },
    {
        pattern: /^\/editor\/route/,
        path: '/mock/editor/route.php'
    },
    {
        pattern: /^\/teacher_center\/overview/,
        path: '/mock/teacherCenter/overview.php'
    },
    {
        pattern: /^\/activity\/getPrize/,
        path: '/mock/activity/getPrize.php'
    },
    {
        pattern: /^\/activity\/prizeRecord/,
        path: '/mock/activity/prizeRecord.php'
    },
    {
        pattern: /^\/activity\/cashBackRecord/,
        path: '/mock/activity/cashBackRecord.php'
    },

    {
        pattern: /^\/activity\/helloteacher/,
        path: '/mock/activity/helloteacher.php'
    },
    //爱视恒恩录课专题
    {
        pattern: /^\/activity\/aishihengen/,
        path: '/mock/activity/lovevedio.php'
    },
        //爱视恒恩录课专题ajax
    {
        pattern: /^\/activity\/aishihengen_join/,
        path: '/mock/activity/lovevedio_join.php'
    },

    //学生中心 返现活动
    {
        pattern: /^\/student_center\/cashBack/,
        path: '/mock/studentCenter/cashBack.php'
    },

    //老师中心 返现活动
    {
        pattern: /^\/teacher_center\/cashBack/,
        path: '/mock/teacherCenter/cashBack.php'
    },
    //个人中心 返现活动 短信
    {
        pattern: /^\/activity\/smsInvite/,
        path: '/mock/activity/smsinvite.php'
    },
    // 机构主页
    {
        pattern: /^\/org\/index/,
        path: '/mock/org/index.php'
    },
    // 汇课间
    {
        pattern: /^\/i\/index/,
        path: '/mock/org/index.php'
    },
    // 机构教师页
    {
        pattern: /^\/i\/teacher/,
        path: '/mock/org/teacher.php'
    },
    // 机构黑板报列表页
    {
        pattern: /^\/i\/black/,
        path: '/mock/org/blackboard.php'
    },
    // 机构黑板报详情页
    {
        pattern: /^\/i\/blackDetail/,
        path: '/mock/org/blackboarddetail.php'
    },
    // 机构视频页
    {
        pattern: /^\/i\/video/,
        path: '/mock/org/video.php'
    },
    // 机构相册页
    {
        pattern: /^\/i\/photo/,
        path: '/mock/org/photo.php'
    },
    // 机构校区页
    {
        pattern: /^\/i\/area/,
        path: '/mock/org/area.php'
    },
    // 机构简介页
    {
        pattern: /^\/i\/intro/,
        path: '/mock/org/intro.php'
    },
    // 机构评价页
    {
        pattern: /^\/i\/comment/,
        path: '/mock/org/comment.php'
    },
    // 机构班课页
    {
        pattern: /^\/org\/course/,
        path: '/mock/org/course.php'
    },
    // 机构班课页 - 汇课间
    {
        pattern: /^\/i\/course/,
        path: '/mock/org/concentration.php'
    },
    // 机构访问量
    {
        pattern: /^\/i\/pvAjax/,
        path: '/mock/org/pvAjax.php'
    },
    // 机构搜索列表
    {
        pattern: /^\/org\/search/,
        path: '/mock/org/search.php'
    },
    // 活动 排名 第一期
    {
        pattern: /^\/activity\/teacherRank1/,
        path: '/mock/activity/teacherRank1.php'
    },
    // 活动 排名 第二期
    {
        pattern: /^\/activity\/teacherRank2/,
        path: '/mock/activity/teacherRank2.php'
    },
    // 活动 排名 第三期
    {
        pattern: /^\/activity\/teacherRank3/,
        path: '/mock/activity/teacherRank3.php'
    },
    // 活动 排名 第四期
    {
        pattern: /^\/activity\/teacherRank4/,
        path: '/mock/activity/teacherRank4.php'
    },
    // 活动 排名 第五期
    {
        pattern: /^\/activity\/teacherRank5/,
        path: '/mock/activity/teacherRank5.php'
    },
    // 活动 排名 第六期 独立老师榜
    {
        pattern: /^\/activity\/teacherRank6/,
        path: '/mock/activity/teacherRank6.php'
    },
    // 活动 排名 第六期 机构
    {
        pattern: /^\/activity\/teacherRank6Org/,
        path: '/mock/activity/teacherRank6Org.php'
    },
    // 活动 排名 2015终极壹榜
    {
        pattern: /^\/activity\/teacherRank2015/,
        path: '/mock/activity/teacherRank2015.php'
    },
    //老师中心 排名 第一期
    {
        pattern: /^\/teacher_center\/teacherRank1/,
        path: '/mock/teacherCenter/teacherRank1.php'
    },
    //老师中心 排名 第二期
    {
        pattern: /^\/teacher_center\/teacherRank2/,
        path: '/mock/teacherCenter/teacherRank2.php'
    },
    //老师中心 排名 第三期
    {
        pattern: /^\/teacher_center\/teacherRank3/,
        path: '/mock/teacherCenter/teacherRank3.php'
    },
    //老师中心 排名 第四期
    {
        pattern: /^\/teacher_center\/teacherRank4/,
        path: '/mock/teacherCenter/teacherRank4.php'
    },
    //老师中心 排名 第五期
    {
        pattern: /^\/teacher_center\/teacherRank5/,
        path: '/mock/teacherCenter/teacherRank5.php'
    },
    //老师中心 排名 第五期
    {
        pattern: /^\/teacher_center\/teacherRank6/,
        path: '/mock/teacherCenter/teacherRank6.php'
    },
    //老师中心 排名 第五期
    {
        pattern: /^\/teacher_center\/teacherRank2015/,
        path: '/mock/teacherCenter/teacherRank2015.php'
    },
    //活动 艺术公益
    {
        pattern: /^\/jiangzuo/,
        path: '/mock/activity/art.php'
    },
    //活动 艺术工艺 报纸
    {
        pattern: /^\/static\/cdnews/,
        path: '/mock/activity/artNewspaper.php'
    },
    {
        pattern: /^\/lesson\/updateReserveTime/,
        path: '/mock/lesson/updateReserveTime.php'
    },
    {
        pattern: /^\/captcha\/validate/,
        path: '/mock/captcha/validate.php'
    },
    // 老师个人中心 - 地址管理
    {
        pattern: /^\/tcenter\/addresses\/list/,
        path: '/mock/teacherCenter/address.php'
    },
    {
        pattern: /^\/activity\/appPrize/,
        path: '/mock/activity/appPrize.php'
    },
    {
        pattern: /^\/lesson\/qreserveLesson/,
        path: '/mock/lesson/quickReserveLesson.php'
    },

    // 客户端登录页
    {
        pattern: /^\/client\/login/,
        path: '/mock/client/login.php'
    },
    {
        pattern: /^\/client\/upgrade/,
        path: '/mock/client/upgrade.php'
    },
    {
        pattern: /^\/client\/courseList/,
        path: '/mock/client/courseList.php'
    },
    //客户端学生页面
    {
        pattern: /^\/client\/student/,
        path: '/mock/client/student.php'
    },
    {
        pattern: /^\/client\/student_empty/,
        path: '/mock/client/student_empty.php'
    },
    {
        pattern: /^\/client\/teacher/,
        path: '/mock/client/teacher.php'
    },
    {
        pattern: /^\/client\/teacher_empty/,
        path: '/mock/client/teacher_empty.php'
    },
    {
        pattern: /^\/Video\/quickTeacher/,
        path: '/mock/teacherCenter/json/onlineTeacherCourse.json'
    },
    {
        pattern: /^\/Video\/quickStudent/,
        path: '/mock/studentCenter/json/onlineStudentCourse.json'
    },
    {
        pattern: /^\/im\/myContacts/,
        path: '/mock/studentCenter/json/teacherContacts.json'
    },
    {
        pattern: /^\/im\/onlineContacts/,
        path: '/mock/studentCenter/json/onlineContacts.php'
    },
    // 获取国际区号
    {
        pattern: /^\/index\/getGlobalMobile/,
        path: '/mock/index/getGlobalMobile.php'
    },
    // 获取海外国家列表
    {
        pattern: /^\/tcenter\/foundation\/country\/list/,
        path: '/mock/index/getCountryList.php'
    },
    // 带有图形验证码参数的发送手机验证码
    {
        pattern: /^\/auth\/sendSMSCode2/,
        path: '/mock/auth/sendSMSCode2.php'
    },

    {
        pattern: /^\/auth\/sendVoiceSMS/,
        path: '/mock/auth/sendVoiceSMS.php'
    },
    {
        pattern: /^\/teacher_center\/subjectRecommend/,
        path: '/mock/teacherCenter/subjectRecommend.php'
    },
    // 地址管理 - 保存修改
    {
        pattern: /^\/teacher_center\/upsertAddress/,
        path: '/mock/teacherCenter/upsertAddress.php'
    },
    // 地址管理 - 删除
    {
        pattern: /^\/teacher_center\/delAddress/,
        path: '/mock/teacherCenter/delAddress.php'
    },
    // 地址管理 - 设为常用地址
    {
        pattern: /^\/teacher_center\/setDefaultAddress/,
        path: '/mock/teacherCenter/setDefaultAddress.php'
    },
    // 地址管理 - 保存位置
    {
        pattern: /^\/teacher_center\/checkAddress/,
        path: '/mock/teacherCenter/checkAddress.php'
    },
    // 视频课 观看视频
    {
        pattern: /^\/video_course\/play/,
        path: '/mock/video/playVideoCourse.php'
    },
    {
        pattern: /^\/video_course\/check/,
        path: '/mock/video/check.php'
    },
    // 获取科目信息
    {
        pattern: /^\/subject\/getList/,
        path: '/mock/video/getList.php'
    },
    // 帮我找老师 - 科目信息
    {
        pattern: /^\/recommend\/subjectList/,
        path: '/mock/video/getList.php'
    },
    // 视频课保存课程信息
    {
        pattern: /^\/video_course\/setcourseinfo/,
        path: '/mock/video/setCourseInfo.php'
    },
    // 视频课保存视频课节信息
    {
        pattern: /^\/video_course\/setvideoinfo/,
        path: '/mock/video/setVideoInfo.php'
    },
    // 视频课保存全部视频课节信息
    {
        pattern: /^\/video_course\/resetvideopos/,
        path: '/mock/video/resetVideoPos.php'
    },
    // 视频课保存课程详情
    {
        pattern: /^\/video_course\/setcoursebrief/,
        path: '/mock/video/setCourseBrief.php'
    },
    // 视频课1发布 2保存至待发布 3下架 4取消显示在主页 5保存在主页
    {
        pattern: /^\/video_course\/setcoursestatus/,
        path: '/mock/video/setCourseStatus.php'
    },
    // 添加到我的视频课
    {
        pattern: /^\/video_course\/addfree/,
        path: '/mock/video/addFree.php'
    },
    // pc端视频播放器页面
    {
        pattern: /^\/video_course\/view/,
        path: '/mock/video/videoCourseView.php'
    },
    // m站视频播放器页面
    {
        pattern: /^\/m_video_course\/view/,
        path: '/mock/video/player.php'
    },
    // 绑定银行卡时 发送短信验证码
    {
        pattern: /^\/account\/verifyBankCard/,
        path: '/mock/account/verifyBankCard.php'
    },
    //解绑银行卡
    {
        pattern: /^\/account\/delBankCard/,
        path: '/mock/account/delBankCard.php'
    },
    // 花名册 - 列表
    {
        pattern: /^\/course\/roster/,
        path: '/mock/course/roster.php'
    },
    // 邮寄资料 - 列表
    {
        pattern: /^\/course\/postMaterial/,
        path: '/mock/course/postMaterial.php'

    },
    // 花名册 - 打印
    {
        pattern: /^\/class_course\/full_roster/,
        path: '/mock/course/fullRoster.php'
    },
    // 邮寄资料 - 打印
    {
        pattern: /^\/class_course\/print_postMaterial/,
        path: '/mock/course/printPostMaterial.php'
    },
    // PC签到
    {
        pattern: /^\/teacher_center\/checkin/,
        path: '/mock/teacherCenter/checkin.php'
    },
    // 完整第三方帐号绑定
    {
        pattern: /^\/static\/account/,
        path: '/mock/static/account.php'
    },
    // 聚惠学
    {
        pattern: /^\/activity\/privilege/,
        path: '/mock/activity/privilege.php'
    },
    // 领取优惠卷
    {
        pattern: /^\/org\/orgCoupon/,
        path: '/mock/org/coupon.php'
    },
    {
        pattern: /^\/pay\/couponDetail/,
        path: '/mock/org/coupon.php'
    },
    // 获取曾有一对一订单的老师列表
    {
        pattern: /^\/student_center\/courseList/,
        path: '/mock/studentCenter/json/courseTeacherList.json'
    },
    // 获取学生一对一订单列表
    {
        pattern: /^\/teacher_center\/orderForm/,
        path: '/mock/teacherCenter/json/studentVIPOrderList.json'
    },
    // 获取老师一对一订单列表
    {
        pattern: /^\/student_center\/orderForm/,
        path: '/mock/studentCenter/json/teacherVIPOrderList.json'
    },
    // 赢在校园【预报名】
    {
        pattern: /^\/activity\/xiaoyuan/,
        path: '/mock/activity/xiaoyuan.php'
    },

    // 学生的个人资料
    {
        pattern: /^\/student\/personal/,
        path: '/mock/student/personal.php'
    },
    // 学生的学习轨迹-正在学
    {
        pattern: /^\/student\/trackLearning/,
        path: '/mock/student/trackLearning.php'
    },
    // 学生的学习轨迹-已学
    {
        pattern: /^\/student\/trackLearned/,
        path: '/mock/student/trackLearned.php'
    },
    // 学生个人主页
    {
        pattern: /^\/student\/index/,
        path: '/mock/student/index.php'
    },
    // 获取学校列表
    {
        pattern: /^\/student_center\/school/,
        path: '/mock/studentCenter/json/school.json'
    },
    // 获取学校院系列表
    {
        pattern: /^\/student_center\/department/,
        path: '/mock/studentCenter/json/department.json'
    },
    // 删除学生教育信息
    {
        pattern: /^\/student_center\/delBackground/,
        path: '/mock/studentCenter/delBackground.php'
    },
    // 删除学生工作信息
    {
        pattern: /^\/student_center\/delWork/,
        path: '/mock/studentCenter/delWork.php'
    },
    // ajax地址
    {
        pattern: /^\/student_center\/joinActivity/,
        path: '/mock/studentCenter/joinActivity.php'
    },
    // 保存可授课时间
    {
        pattern: /^\/teacher_center\/upsertUsabletime/,
        path: '/mock/teacherCenter/upsertUsabletime.php'
    },
    // 获取老师个人中心照片列表
    {
        pattern: /^\/photo\/list_admin/,
        path: '/mock/teacherCenter/json/photoList.json'
    },
    // 获取钱包管理分页历史记录【学生】
    {
        pattern: /^\/student_center\/cashAjax/,
        path: '/mock/studentCenter/json/cashHistoryList.json'
    },
    // 获取钱包管理分页历史记录【老师】
    {
        pattern: /^\/teacher_center\/cashAjax/,
        path: '/mock/teacherCenter/json/cashHistoryList.json'
    },
    {
        pattern: /^\/bellsystem\/call/,
        path: '/mock/bellsystem/call.php'
    },
    // 赢在校园【投票】
    {
        pattern: /^\/activity\/vote/,
        path: '/mock/activity/vote.php'
    },
    // 获取用户某天课程信息
    {
        pattern: /^\/lesson\/dateLessons/,
        path: '/mock/lesson/getDateLessons.php'
    },
    // 请老师排课
    {
        pattern: /^\/lesson\/studentInviteTeacherReserve/,
        path: '/mock/lesson/studentInviteTeacherReserve.php'
    },
    // 新建或编辑文章
    {
        pattern: /^\/article\/write/,
        path: '/mock/teacher/articleEdit.php'
    },
    // 保存文章或草稿
    {
        pattern: /^\/article\/save/,
        path: '/mock/teacher/articleSave.php'
    },
    // 删除文章
    {
        pattern: /^\/article\/delete/,
        path: '/mock/article/delete.php'
    },
    // 老师文章详情页
    {
        pattern: /^\/article\/detail/,
        path: '/mock/teacher/articleDetail.php'
    },
    // 增加文章分类
    {
        pattern: /^\/article\/categoryAdd/,
        path: '/mock/article/categoryAdd.php'
    },
    // 616活动主场
    {
        pattern: /^\/activity\/birthday_main/,
        path: '/mock/rave/main.php'
    },
    // 618活动主场
    {
        pattern: /^\/activity\/compensation/,
        path: '/mock/rave/compensation.php'
    },
    // 616活动详情页
    {
        pattern: /^\/rave\/detail/,
        path: '/mock/rave/detail.php'
    },
    //  领劵接口
    {
        pattern: /^\/pay\/getCoupon/,
        path: '/mock/rave/getCoupon.php'
    },
    // 老师个人中心 - 营销中心 - 我的优惠券
    // 老师个人中心 - 我的学生 - 某学生可领取优惠券列表
    {
        pattern: /^\/teacher_center\/myCoupons/,
        path: '/mock/teacherCenter/myCoupons.php'
    },
    {
        pattern: /^\/teacher\/coupon_list/,
        path: '/mock/teacher/coupon_list.php'
    },

    // 老师个人中心 - 营销中心 - 新建优惠券页面
    {
        pattern: /^\/teacher_center\/addCoupon/,
        path: '/mock/teacherCenter/addCoupon.php'
    },
    // 老师个人中心 - 营销中心 - 新建优惠券
    {
        pattern: /^\/teacher_center\/newCoupon/,
        path: '/mock/teacherCenter/newCoupon.php'
    },
    // 老师个人中心 - 营销中心 - 新建优惠券成功页
    {
        pattern: /^\/teacher_center\/addCouponSuccess/,
        path: '/mock/teacherCenter/addCouponSuccess.php'
    },
    // 老师个人中心 - 营销中心 - 未领取优惠券学生列表
    {
        pattern: /^\/teacher_center\/getCouponFreeStudent/,
        path: '/mock/teacherCenter/getCouponFreeStudent.php'
    },
    // 老师个人中心 - 营销中心 - 发放优惠券
    {
        pattern: /^\/teacher_center\/sendCoupon/,
        path: '/mock/teacherCenter/sendCoupon.php'
    },
    // 老师个人中心 - 营销中心 - 促销活动(新)
    {
        pattern: /^\/teacher_center\/market/,
        path: '/mock/teacherCenter/limitSales.php'
    },
    // 老师个人中心 - 营销中心 - 促销活动 - 选择课程
    {
        pattern: /^\/market\/getAllCourseList/,
        path: '/mock/mktCenter/getAllCourseList.php'
    },
    // 领取优惠券结果
    {
        pattern: /^\/teacher_center\/receiveCouponResult/,
        path: '/mock/teacherCenter/receiveCouponResult.php'
    },
    // 确认领取优惠券
    {
        pattern: /^\/teacher_center\/receiveCoupon/,
        path: '/mock/teacherCenter/receiveCoupon.php'
    },
    // 下线优惠券 - 不发了
    {
        pattern: /^\/teacher_center\/offCoupon/,
        path: '/mock/teacherCenter/offCoupon.php'
    },
    // 放置优惠券至老师个人主页
    {
        pattern: /^\/teacher_center\/syncCoupon/,
        path: '/mock/teacherCenter/syncCoupon.php'
    },
    // 优惠券专题页
    {
        pattern: /^\/activity\/couponTopic/,
        path: '/mock/rave/couponTopic.php'
    },
    // 秒杀专题页
    {
        pattern: /^\/activity\/seckillTopic/,
        path: '/mock/rave/seckillTopic.php'
    },

    // 添加各种收藏
    {
        pattern: /^\/collection\/addAjax/,
        path: '/mock/student_center/addFavouriteTeacher.php'
    },
    // 取消各种收藏
    {
        pattern: /^\/collection\/deleteAjax\/video_course/,
        path: '/mock/student_center/addFavouriteTeacher.php'
    },
    {
        pattern: /^\/collection\/deleteAjax\/class_course/,
        path: '/mock/student_center/addFavouriteTeacher.php'
    },
    // 促销活动 - 班课列表
    {
        pattern: /^\/market\/getAllCourseList/,
        path: '/mock/mktCenter/getAllCourseList.php'
    },
    // 促销活动 - 添加参加活动的课程
    {
        pattern: /^\/market\/addGroupCourse/,
        path: '/mock/mktCenter/addGroupCourse.php'
    },
    // 促销活动 - 修改参加活动的课程
    {
        pattern: /^\/market\/updateGroupCourse/,
        path: '/mock/mktCenter/updateGroupCourse.php'
    },
    // 促销活动 - 删除参加活动的课程
    {
        pattern: /^\/market\/delGroupCourse/,
        path: '/mock/mktCenter/delGroupCourse.php'
    },
    // 404
    {
        pattern: /^\/index\/error/,
        path: '/mock/error.php'
    },
    // video 404
    {
        pattern: /^\/index\/videoError/,
        path: '/mock/videoError.php'
    },
    {
        pattern: /^\/short_url\/get/,
        path: '/mock/weixin.php'
    },
    {
        pattern: /teacher_center\/is_single_course/,
        path: '/mock/teacherCenter/isEffectiveByRemove.php'
    },
    // 首页推荐老师
    {
        pattern: /^\/index\/suggestTeacher/,
        path: '/mock/main/teacherList.php'
    },

    // 首页热门直播
    {
        pattern: /^\/index\/hotLive/,
        path: '/mock/main/hotLive.php'
    },
    // 帮我找老师页面
    {
        pattern: /^\/recommend\/seekTeacher/,
        path: '/mock/static/seekTeacher.php'
    },
    // 学习头条
    {
        pattern: /^\/headline\/index/,
        path: '/mock/headline/index.php'
    },
    {
        pattern: /^\/teacher_center\/set_default_avatar/,
        path: '/mock/teacherCenter/setDefaultAvatar.php'
    },
    // 活动模板
    {
        pattern: /^\/activity\/template/,
        path: '/mock/activity/template.php'
    },
    // sem - k12聚合页
    {
        pattern: /^\/sem\/k12/,
        path: '/mock/sem/k12.php'
    },
    {
        pattern: /^\/activity\/running/,
        path: '/mock/activity/running.php'
    },
    {
        pattern: /^\/sms\/send/,
        path: '/mock/sms/send.php'
    },
    // 试听课 - 列表页
    {
        pattern: /^\/teacher_center\/trial_course/,
        path: '/mock/teacherCenter/listTrialCourse.php'
    },
    // 试听课 － 设置页
    {
        pattern: /^\/teacher_center\/upsertTrialCourse/,
        path: '/mock/teacherCenter/upsertTrialCourse.php'
    },
    // 试听课 － 备注
    {
        pattern: /^\/teacher_center\/upsertTrialCourseNote/,
        path: '/mock/teacherCenter/upsertTrialCourseNote.php'
    },
    // 社区首页
    {
        pattern: /^\/forum\/index/,
        path: '/mock/social/index.php'
    },
    // 小组详情页
    {
        pattern: /^\/social\/group/,
        path: '/mock/social/group.php'
    },
    // 社区中心
    {
        pattern: /^\/social\/center/,
        path: '/mock/social/center.php'
    },
    // 社区发帖
    {
        pattern: /^\/social\/write/,
        path: '/mock/social/write.php'
    },
    // 社区排行榜
    {
        pattern: /^\/social\/rank/,
        path: '/mock/social/rank.php'
    },
    // 社区管理员申请
    {
        pattern: /^\/social\/apply/,
        path: '/mock/social/apply.php'
    },
    {
        pattern: /^\/permission\/moderation_request/,
        path: '/mock/social/applyRequest.php'
    },
    // 社区帖子详情页
    {
        pattern: /^\/social\/detail/,
        path: '/mock/social/detail.php'
    },
    // 社区贴吧资料设置
    {
        pattern: /^\/social\/profile/,
        path: '/mock/social/profile.php'
    },
    // 社区经验页面
    {
        pattern: /^\/social\/experience/,
        path: '/mock/social/experience.php'
    },
    // 是否加入小组
    {
        pattern: /^\/forum\/joinGroup/,
        path: '/mock/social/joinGroup.php'
    },
    // 是否签到
    {
        pattern: /^\/forum\/check_in/,
        path: '/mock/social/checkin.php'
    },
    // 添加评论
    {
        pattern: /^\/forum\/addPost/,
        path: '/mock/social/addPost.php'
    },
    // 分页获取评论
    {
        pattern: /^\/forum\/postBrowseAjax/,
        path: '/mock/social/getPost.php'
    },
    // 添加回复
    {
        pattern: /^\/forum\/addComment/,
        path: '/mock/social/addReply.php'
    },
    // 分页获取回复
    {
        pattern: /^\/forum\/getMoreReply/,
        path: '/mock/social/getReply.php'
    },
    // 帖子状态设置
    {
        pattern: /^\/forum\/toThread/,
        path: '/mock/social/setTop.php'
    },
    // 获取排行榜
    {
        pattern: /^\/group\/rank/,
        path: '/mock/social/getRank.php'
    },
    // 获取排行榜
    {
        pattern: /^\/group\/me_rank/,
        path: '/mock/social/meRank.php'
    },
    // 首页热门帖子分页
    {
        pattern: /^\/forum\/hot_posts_ajax/,
        path: '/mock/social/hotPosts.php'
    },
    // 社区中心我的收藏
    {
        pattern: /^\/forum\/owner_collect_ajax/,
        path: '/mock/social/ownerCollects.php'
    },
    // 社区中心我的帖子
    {
        pattern: /^\/forum\/owner_posts_ajax/,
        path: '/mock/social/ownerPosts.php'
    },
    // 社区中心我的小组
    {
        pattern: /^\/forum\/owner_group_ajax/,
        path: '/mock/social/ownerGroups.php'
    },
    // 收藏或取消收藏
    {
        pattern: /^\/forum\/collect/,
        path: '/mock/social/setCollect.php'
    },
    // 浏览小组帖子
    {
        pattern: /^\/forum\/threadBrowse/,
        path: '/mock/social/threadBrowse.php'
    },
    // 课程卡片
    {
        pattern: /^\/social\/customizeDialogPage.html/,
        path: '/mock/social/customizeDialogPage.php'
    },
    {
        pattern: /^\/social\/notFound/,
        path: '/mock/social/notFound.php'
    },
    // 学生个人中心 - 课节评价
    {
        pattern: /^\/comment\/purchaseInfo/,
        path: '/mock/studentCenter/commentMore.php'
    },
    // 学生个人中心 - 课节评价 - 提交评价
    {
        pattern: /^\/comment\/addComment/,
        path: '/mock/studentCenter/addCommentMore.php'
    },
    // 获取当前可评价课程／课节列表
    {
        pattern: /^\/comment\/getCanCommentOrderList/,
        path: '/mock/teacher/canCommentOrderList.php'
    },
    // 2016招聘信息 － 与猎聘网合作活动
    {
        pattern: /^\/activity\/recpre2016/,
        path: '/mock/activity/recruitment2016.php'
    },
    // 导航页 － 与搜狗合作导航
    {
        pattern: /^\/navigation\/sougou/,
        path: '/mock/navigation/sougou.php'
    },
    // 上传班课封面接口
    {
        pattern: /^\/user\/previewBinaryImage/,
        path: '/mock/user/previewBinaryImage.php'
    },
    // 导航页 － 与搜狗合作导航 分页面 异步获取分类数据
    {
        pattern: /^\/sogou\/async_info/,
        path: '/mock/navigation/sougouAjax.php'
    },
    // 导航页 － 与搜狗合作导航 分页面
    {
        pattern: /^\/navigation\/sougouSubPage/,
        path: '/mock/navigation/sougouSubPage.php'
    },
    // 导航页 － 与360合作导航
    {
        pattern: /^\/navigation\/360/,
        path: '/mock/navigation/360.php'
    },
    // 中差评改好评
    {
        pattern: /^\/comment\/modifyComment/,
        path: '/mock/studentCenter/modifyComment.php'
    },
    // 联报优惠 － 订单提交页
    {
        pattern: /^\/pay\/productGroup/,
        path: '/mock/pay/productGroup.php'
    },
    // 检查学生是否已预约试听 某课程或机构
    {
        pattern: /^\/student_advisory\/check/,
        path: '/mock/course/checkAdvisory.php'
    },
    // 创建预约试听课
    {
        pattern: /^\/student_advisory\/creat/,
        path: '/mock/course/checkAdvisory.php'
    },
    // 绑定银行卡 - 银行卡 suggestion
    {
        pattern: /^\/pay\/suggestBank/,
        path: '/mock/pay/suggestBank.php'
    },
    {
        pattern: /^\/bank_card\/sendSMS/,
        path: '/mock/bank_card/sendSMS.php'
    },
    {
        pattern: /^\/bank_card\/verifyCard/,
        path: '/mock/bank_card/verifyCard.php'
    },
    {
        pattern: /^\/pay\/getPayUserInfo/,
        path: '/mock/pay/getPayUserInfo.php'
    },
    {
        pattern: /^\/pay\/getSupportedBankList/,
        path: '/mock/pay/getSupportedBankList.php'
    },
    {
        pattern: /^\/pay\/changeWithdrawCard/,
        path: '/mock/pay/changeWithdrawCard.php'
    },
    // 评价 － 学生追评
    {
        pattern: /^\/comment\/addCommentAddition/,
        path: '/mock/comment/addCommentAddition.php'
    },
    // 评价 － 老师回复
    {
        pattern: /^\/comment\/addCommentReview/,
        path: '/mock/comment/addCommentReview.php'
    },
    // 黑板报点赞
    {
        pattern: /^\/org\/support/,
        path: '/mock/org/support.php'
    },
    // 黑板报活动报名
    {
        pattern: /^\/org\/addApplyMsg/,
        path: '/mock/org/addApplyMsg.php'
    },
    {
        pattern: /^\/course\/login/,
        path: '/mock/org/login.php'
    },
    // 社区 － 获取课程卡片信息
    {
        pattern: /^\/forum\/getCourseCard/,
        path: '/mock/social/getCourseCard.php'
    },
    // 视频课 － 视频专区
    {
        pattern: /^\/videozone/,
        path: '/mock/activity/videoList.php'
    },
    // 直播课 － 直播专区
    {
        pattern: /^\/livezone/,
        path: '/mock/activity/liveList.php'
    },
     // 超级老师分页
    {
        pattern: /^\/activity\/superAjax/,
        path: '/mock/activity/superteacherListAjax.php'
    },
    {
        pattern: /^\/video_course\/getiosprice/,
        path: '/mock/teacherCenter/getIosPrice.php'
    },
    // 帮助中心 - 服务规则
    {
        pattern: /^\/guide\/service/,
        path: '/mock/guide/service.php'
    },
    //  帮助中心 - 服务规则子页
    {
        pattern: /^\/guide\/serviceLayout/,
        path: '/mock/guide/service_layout.php'
    },
    // 寒假抢先机活动主页
    {
        pattern: /^\/activity\/winterVacation/,
        path: '/mock/activity/winterVacation.php'
    },
    //寒假课程一对一活动首页
    {
        pattern: /^\/activity\/vacationCourse/,
        path: '/mock/activity/vacation/vacationCourse.php'
    },
    //寒假课程一对一活动详情页
    {
        pattern: /^\/activity\/courseDetail/,
        path: '/mock/activity/vacation/courseDetail.php'
    },
    {
        pattern: /^\/pay\/createVipPurchase/,
        path: '/mock/pay/createVipPurchase.php'
    },
    //高考活动首页
    {
        pattern: /^\/activity\/gaokao/,
        path: '/mock/activity/gaokao.php'
    },
    //高考ajax加载更多
    {
        pattern: /^\/activity\/vacationCourse/,
        path: '/mock/activity/vacation/vacationCourse.php'
    },
    //高考活动详情页
    {
        pattern: /^\/activity\/gaokao_detail/,
        path: '/mock/activity/gaokaoDetail.php'
    },
    //高考活动首页
    {
        pattern: /^\/activity\/gaokao/,
        path: '/mock/activity/gaokao.php'
    },
    //高考ajax加载更多
    {
        pattern: /^\/activity\/vacationCourse/,
        path: '/mock/activity/vacation/vacationCourse.php'
    },
    //高考活动详情页
    {
        pattern: /^\/activity\/gaokao_detail/,
        path: '/mock/activity/gaokaoDetail.php'
    },
    // 班课设置页获取是否首次开设直播课 是否国外ip
    {
        pattern: /^\/class_course\/online_tip/,
        path: '/mock/teacherCenter/onlineTip.php'
    },
    //  一对一详情页
    {
        pattern: /^\/teacher\/one2oneCourseDetail/,
        path: '/mock/one2one/detail.php'
    },

    // 新版老师个人中心数据中心访问数据
    {
        pattern: /^\/teacher_center\/visit_data/,
        path: '/mock/userCenter/teacherCenter/dataCenter/visitData.php'
    },
    //  新版老师个人中心数据中心交易数据
    {
        pattern: /^\/teacher_center\/transaction_data/,
        path: '/mock/userCenter/teacherCenter/dataCenter/transactionData.php'
    },
    //  新版老师个人中心数据中心综合排名
    {
        pattern: /^\/teacher_center\/sysnthetic_sort/,
        path: '/mock/userCenter/teacherCenter/dataCenter/sysntheticSort.php'
    },
    //  新版老师个人中心数据中心扣分记录
    {
        pattern: /^\/teacher_center\/deductList/,
        path: '/mock/userCenter/teacherCenter/dataCenter/recordPoint.php'
    },
    //  活动报名
    {
        pattern: /^\/teacher_center\/activity_apply/,
        path: '/mock/userCenter/teacherCenter/mktCenter/activityApply.php'
    },
    //  浅注册老师设置信息页
    {
        pattern: /^\/teacher_center\/add_profile/,
        path: '/mock/static/registerInfo.php'
    },
    // 老师个人中心 - 管理总览
    {
        pattern: /^\/teacher_center\/index/,
        path: '/mock/userCenter/teacherCenter/index.php'
    },
    // 显示签到日历（旧）
    {
        pattern: /^\/teacher_center\/getCheckinCalendar/,
        path: '/mock/teacherCenter/getCheckinCalendar.php'
    },
    // 显示签到日历（新）
    {
        pattern: /^\/teacher_center\/getCheckinCalendar/,
        path: '/mock/userCenter/teacherCenter/getCheckinCalendar.php'
    },
    // 老师中心－我的邀请（新）
    {
        pattern: /^\/teacher_center\/invite/,
        path: '/mock/userCenter/teacherCenter/invite.php'
    },
    // 获取曾有一对一订单的学生列表（旧）
    {
        pattern: /^\/teacher_center\/courseList/,
        path: '/mock/teacherCenter/json/courseStudentList.json'
    },
    // 老师个人中心 - 会员中心
    {
        pattern: /^\/teacher_center\/vip_center/,
        path: '/mock/userCenter/teacherCenter/vipCenter.php'
    },
    // 老师个人中心 - 会员中心特权
    {
        pattern: /^\/teacher_center\/vip_detail/,
        path: '/mock/userCenter/teacherCenter/vipDetail.php'
    },
    // 老师中心－主页装修
    {
        pattern: /^\/teacher_center\/index_decorate/,
        path: '/mock/userCenter/teacherCenter/indexDecorate.php'
    },
    // 老师中心－主页装修 - 发布
    {
        pattern: /^\/teacher_center\/update_template/,
        path: '/mock/userCenter/teacherCenter/indexDecorate.php'
    },
    // 老师中心 － 检测主页完善度
    {
        pattern: /^\/teacher_center\/ajaxTaskList/,
        path: '/mock/userCenter/teacherCenter/ajaxTaskList.php'
    },
    //  班课详情页 - 旧
    {
        pattern: /^\/teacher\/classCourseDetailOld/,
        path: '/mock/course/detail.php'
    },
    // 非会员模版 － 班课详情页
    {
        pattern: /^\/teacher\/classCourseDetail\/tpl0/,
        path: '/mock/classCourse/tpl0/detail.php'
    },
    // 会员模版（微澜）－ 班课详情页
    {
        pattern: /^\/teacher\/classCourseDetail\/tpl1/,
        path: '/mock/classCourse/tpl1/detail.php'
    },
    // 会员模版（紫）－ 班课详情页
    {
        pattern: /^\/teacher\/classCourseDetail\/tpl2/,
        path: '/mock/classCourse/tpl2/detail.php'
    },
    // 高级会员模版 － 班课详情页
    {
        pattern: /^\/teacher\/classCourseDetail\/tpl3/,
        path: '/mock/classCourse/tpl3/detail.php'
    },
    // 超级会员模版 － 班课详情页
    {
        pattern: /^\/teacher\/classCourseDetail\/tpl4/,
        path: '/mock/classCourse/tpl4/detail.php'
    },

    // 中英活动大赛首页
    {
        pattern: /^\/uk/,
        path: '/mock/activity/uk/index.php'
    },
    // 中英活动大赛 参赛流程
    {
        pattern: /^\/uk\/rule/,
        path: '/mock/activity/uk/ukProcess.php'
    },
    // 中英活动大赛 赛事展示
    {
        pattern: /^\/uk\/rank/,
        path: '/mock/activity/uk/memberList.php'
    },
    // 中英活动大赛 选手详情
    {
        pattern: /^\/uk\/detail/,
        path: '/mock/activity/uk/memberProfile.php'
    },
    // 中英活动大赛 个人中心
    {
        pattern: /^\/uk\/profile/,
        path: '/mock/activity/uk/profile.php'
    },
    // 中英活动大赛 编辑个人资料
    {
        pattern: /^\/uk\/edit/,
        path: '/mock/activity/uk/profileEdit.php'
    },
    // 中英活动大赛 投票
    {
        pattern: /^\/uk\/vote/,
        path: '/mock/activity/uk/voteAjax.php'
    },
    // 中英活动大赛 编辑资料
    {
        pattern: /^\/uk\/insert/,
        path: '/mock/activity/uk/editAjax.php'
    },
    // 中英活动大赛 编辑资料
    {
        pattern: /^\/uk\/upload/,
        path: '/mock/activity/uk/upload.php'
    },
    // 中英活动大赛 编辑资料
    {
        pattern: /^\/uk\/uploadVideo/,
        path: '/mock/activity/uk/uploadAjax.php'
    },
    // 中英活动大赛 编辑资料
    {
        pattern: /^\/uk\/pay/,
        path: '/mock/activity/uk/pay.php'
    },

    // 数据中心申述
    {
        pattern: /^\/teacher\/deductAppeal/,
        path: '/mock/teacher/deductAppeal.php'
    },
    // 考研专区 － 打包课
    {
        pattern: /^\/packageCourse\/detail/,
        path: '/mock/kaoyan/packageCourse.php'
    },
    // 考研专区 - 支付 - 确认订单
    {
        pattern: /^\/kaoyan\/pay\/productDetail/,
        path: '/mock/kaoyan/productDetail.php'
    },
    // 平台留单
    {
        pattern: /^\/recommend\/fill_info/,
        path: '/mock/activity/seekTeacher.php'
    },
    // 云端录制直播回放
    {
        pattern: /^\/teacher_center\/cloudplayback/,
        path: '/mock/teacherCenter/cloudPlayback.php'
    },
    // 云端录制直播回放 - 售卖课节
    {
        pattern: /^\/class_course\/copytocloudvideocourse/,
        path: '/mock/teacherCenter/copyToVideoCourse.php'
    },
    // 知识视频库 － 列表页
    {
        pattern: /^\/activity\/videoLibrary/,
        path: '/mock/videoLibrary/list.php'
    },
    // 真题库 － 列表页
    {
        pattern: /^\/video_course\/zhenti/,
        path: '/mock/videoLibrary/list.php'
    },
    //中英活动管理平台 - 数据统计
    {
        pattern: /^\/activity\/ukAdmin\/data/,
        path: '/mock/activity/ukAdmin/data.php'
    },
    //中英活动管理平台 - 选手管理
    {
        pattern: /^\/activity\/ukAdmin\/member/,
        path: '/mock/activity/ukAdmin/member.php'
    },
    //中英活动管理平台 - 举报管理
    {
        pattern: /^\/activity\/ukAdmin\/report/,
        path: '/mock/activity/ukAdmin/report.php'
    },
    //中英活动管理平台 - 解冻
    {
        pattern: /^\/activity\/ukAdmin\/frozen/,
        path: '/mock/activity/ukAdmin/frozenAjax.php'
    },
    //中英活动管理平台 - 查看举报内容
    {
        pattern: /^\/activity\/ukAdmin\/reportAjax/,
        path: '/mock/activity/ukAdmin/checkReportAjax.php'
    },
    // 组合课
    {
        pattern: /^\/package_course\/detail/,
        path: '/mock/classCourse/packageCourse.php'
    },
    // 购买空间
    {
        pattern: /^\/teacher_center\/storage_space/,
        path: '/mock/teacherCenter/storageSpace.php'
    },
    // 创建购买空间订单
    {
        pattern: /^\/pay\/createStoragePurchase/,
        path: '/mock/pay/createProductPurchase.php'
    },
    // 学生个人中心 － 我的课程回放
    {
        pattern: /^\/lesson\/lessonsPlayback/,
        path: '/mock/studentCenter/playback.php'
    },
    // 学生个人中心 － 我的课程回放 - 获取课程目录
    {
        pattern: /^\/lesson\/lessonsPlaybackAjax/,
        path: '/mock/studentCenter/json/lessonsPlaybackAjax.json'
    },
    // 网站地图
    {
        pattern: /^\/static\/seoWebMap/,
        path: '/mock/static/teaseoWebMap.php'
    },
    // 删除视频课节
    {
        pattern: /^\/video_course\/removevideoitem/,
        path: '/mock/video/removeVideoItem.php'
    },
    // 短信充值
    {
        pattern: /^\/sms_account\/charge/,
        path: '/mock/userCenter/teacherCenter/mktCenter/smsCharge.php'
    },
    // 添加视频课水印
    {
        pattern: /^\/video_course\/editwatermark/,
        path: '/mock/userCenter/teacherCenter/watermarkEdit.php'
    },
    // 短信中心
    {
        pattern: /^\/sms_account\/center/,
        path: '/mock/userCenter/teacherCenter/mktCenter/smsCenter.php'
    },
    // 商学院 － 首页
    {
        pattern: /^\/business_school\/detail/,
        path: '/mock/activity/businessSchool/detail.php'
    },
    // 商学院 － 课程介绍
    {
        pattern: /^\/business_school\/courseIntroduce/,
        path: '/mock/activity/businessSchool/courseIntroduce.php'
    },
    // 商学院 － 关于我们
    {
        pattern: /^\/business_school\/aboutUs/,
        path: '/mock/activity/businessSchool/aboutUs.php'
    },
    // 数据中心
    {
        pattern: /^\/teacher_center\/visit_data_ajax/,
        path: '/mock/userCenter/teacherCenter/dataCenter/visitAjax.php'
    },
    // 会员2.0静态页
    {
        pattern: /^\/vip\/vipIntro/,
        path: '/mock/static/vipIntro.php'
    },
    // 会员2.0静态页 New 基于之前的老师会员中心
    {
        pattern: /^\/vip\/vip_benefit/,
        path: '/mock/userCenter/teacherCenter/vipStatic.php'
    },
    // 老师个人中心 - 订单管理 － 花名册
    {
        pattern: /^\/teacher_center\/roster_list/,
        path: '/mock/userCenter/teacherCenter/orderManage/roster.php'
    },
    // 老师个人中心 - 订单管理 － ajax花名册
    {
        pattern: /^\/teacher_center\/roster_list_ajax/,
        path: '/mock/userCenter/teacherCenter/orderManage/rosterAjax.php'
    },

    // 老师个人中心 - 课程设置 - 获取班课列表列表(旧版)
    {
        pattern: /^\/teacher_center\/classCourseListOld/,
        path: '/mock/teacherCenter/classCourseList.php'
    },

    // 老师个人中心 - 课程设置 － 线下班课列表
    {
        pattern: /^\/tcenter\/courses\/class-courses\/list-html/,
        path: '/mock/userCenter/teacherCenter/classCourseList.php'
    },

    // 老师个人中心 - 课程设置 － 直播课列表
    {
        pattern: /^\/teacher_center\/liveCourseList/,
        path: '/mock/userCenter/teacherCenter/liveCourseList.php'
    },
    // 学费卫士
    {
        pattern: /^\/static\/bodyguard/,
        path: '/mock/static/bodyguard.php'
    },
    // 老师个人中心 - 课程排序
    {
        pattern: /^\/tcenter\/courses\/all-courses\/list-by-sort/,
        path: '/mock/userCenter/teacherCenter/indexManage/coursesort.php'
    },
    // 资料共享
    {
        pattern: /^\/tcenter\/courses\/files\/list/,
        path: '/mock/userCenter/teacherCenter/netdiskShare.php'
    },
    // 开通会员
    {
        pattern: /^\/pay\/vip/,
        path: '/mock/pay/vip.php'
    },
    // 试听结束反馈页
    {
        pattern: /^\/class_course\/trial_feedback/,
        path: '/mock/classCourse/trialEnd.php'
    },
    // 个人中心 - ajax
    {
        pattern: /^\/teacher_center\/indexCountAjax/,
        path: '/mock/userCenter/teacherCenter/indexCountAjax.php'
    },
    // 机构X课 － 父课程详情页
    {
        pattern: /^\/org_course\/detail/,
        path: '/mock/orgCourse/detail.php'
    },
    // 机构X课 － 班课详情页
    {
        pattern: /^\/org_course\/classDetail/,
        path: '/mock/orgCourse/classDetail.php'
    },
    // 机构X课 － 一对一课程详情页
    {
        pattern: /^\/org_course\/one2oneDetail/,
        path: '/mock/orgCourse/one2oneDetail.php'
    },
    // 申请退款
    {
        pattern: /^\/pay\/refund/,
        path: '/mock/pay/refund.php'
    },
    // 2016风云老师大赛
    {
        pattern: /^\/activity\/superTeacher/,
        path: '/mock/activity/superTeacher.php'
    },
    // 2016风云老师大赛 - 老师列表页
    {
        pattern: /^\/activity\/superTeacherVote/,
        path: '/mock/activity/superTeacherVote.php'
    },
    // 2016风云老师大赛 - 老师个人主页
    {
        pattern: /^\/activity\/superTeacherPersonal/,
        path: '/mock/activity/superTeacherPersonal.php'
    },
    // 2016风云老师大赛 - 获奖榜单
    {
        pattern: /^\/activity\/superTeacherEnd/,
        path: '/mock/activity/superTeacherRank.php'
    },
    // 汇课间用户找回密码
    {
        pattern: /^\/huike\/forget/,
        path: '/mock/static/huikeForget.php'
    },
    // 金牌机构宣传页
    {
        pattern: /^\/activity\/goldcertOrg/,
        path: '/mock/activity/goldcertOrg.php'
    },
    // 获取分期数据异步接口
    {
        pattern: /^\/course\/fenqi/,
        path: '/mock/classCourse/getStageDataAjax.php'
    },
    // 班课按钮的异步接口
    {
        pattern: /^\/class-courses\/display-status/,
        path: '/mock/classCourse/button_info_ajax.php'
    },
    // 检查当前登录用户是否在指定课程老师的黑名单中 异步接口
    {
        pattern: /^\/api\/video_course\/checkBlackList/,
        path: '/mock/video/checkBlackList.php'
    },
    // 创建订单 异步接口
    {
        pattern: /^\/teacher\/createProductPurchase/,
        path: '/mock/teacher/createProductPurchase.php'
    },
    //  优选一对一详情页
    {
        pattern: /^\/teacher\/one2oneBetterCourseDetail/,
        path: '/mock/one2one/betterDetail.php'
    },
    //  优选一对一详情页 - 购买课时ajax
    {
        pattern: /^\/one-on-one-course\/get2/,
        path: '/mock/one2one/betterDetail2.php'
    },
    //  优选一对一详情页 - 获取评价汇总信息ajax
    {
        pattern: /^\/comment\/summary/,
        path: '/mock/one2one/getCommentSummary.php'
    },
    //  优选一对一详情页 - 获取评价ajax
    {
        pattern: /^\/comment\/list/,
        path: '/mock/one2one/getCommentList.php'
    },
    // 获取直播课班课列表 异步接口
    {
        pattern: /^\/tcenter\/courses\/class-courses\/list/,
        path: '/mock/userCenter/teacherCenter/getCourseListAjax.php'
    },
    //获取学生搜索订单得到订单列表 异步接口
    {
        pattern: /^\/search\/order/,
        path: '/mock/studentCenter/orderListSearchAjax.php'
    },
    //学生删除订单 异步接口
    {
        pattern: /^\/new-order\/delete/,
        path: '/mock/studentCenter/orderListDeleteAjax.php'
    },
    //学生订单列表tab  异步接口
    {
        pattern: /^\/new-order\/get-collection-count/,
        path: '/mock/studentCenter/orderListTabAjax.php'
    },
    //学生订单列表  异步接口
    {
        pattern: /^\/order\/studentOrders/,
        path: '/mock/studentCenter/orderListAjax.php'
    },
    //预约名师试听弹窗 异步接口
    {
        pattern: /^\/recommend\/add_record/,
        path: '/mock/teacher/getFindTeacherDialogAjax.php'
    }

];

exports.rules = rewriteURLRules;
