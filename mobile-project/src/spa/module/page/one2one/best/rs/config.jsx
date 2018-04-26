/**
 * 1对1优选配置文件
 * @file hurry
 * @date 2017/04/10
 */
const config = {
    PATHS: {
        // 老师点击同意并确认签约按钮
        SIGN: '/one-on-one-course/teacher-signning',
        // 签约科目和分成比例
        SIGNED_SUBJECTS_RATE: '/one-on-one-course/teacher-sign-detail',
        // 签约情况
        SIGN_STATUS: '/one-on-one-course/sign-status',
        // 招募状态
        RECRUIT_STATUS: '/one-on-one-course/teacher-recruit-status'
    },
    // 签约状态
    SIGN_STATUS: {
        // 未通过审核
        NO_VERIFY: 0,
        // 已通过审核，未签约
        NO_SIGN_WITH_SUCCESS_VERIFY: 1,
        // 已签约
        IS_SIGN: 2,
        // 未申请招募
        NO_RECRUIT: 3                
    },
    // 招募状态
    RECRUIT_STATUS: {
        // 未申请招募
        NO_RECRUIT: 0,                 
        // 招募审核中
        IS_VERIFING: 1,             
        // 招募审核没通过   
        VERIFY_REFUSE: 2,           
        // 招募审核通过
        VERIFY_SUCCESS: 3,           
        // 未生效
        NO_VALID: 4               
    }
};

export default config;