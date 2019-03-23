import * as actions from '../service/cellClass';

export default {
    state: {
        classInfo: {},
        bottomInfo: {},
        teacherInfo: {},
        userInfo: {},
        commentSummary: {},
        recommendInfo: {},
        sidebarCourses: {},
        showEnrollSuccess: false,
        showLinkModal: false,
        showAssistantTeacher: false,
        showFloatLayer: false,
        hasAudition: false,
        loggerId: '',
        linkItems: [],
        showEnrollSuccessSubclazzNumber: 0,
        currentTabIndex: 0,
        countDownStatus: 0
    },

    action: {
        detailPosts(postData) {
            return actions.detailPosts(postData);
        },
        cellClazzLinkClazzesPosts(postData) {
            return actions.cellClazzLinkClazzesPosts(postData);
        },
        footbarPosts(postData) {
            return actions.footbarPosts(postData);
        },
        recommendclazzPosts(postData) {
            return actions.recommendclazzPosts(postData);
        },
        teachersPosts(postData) {
            return actions.teachersPosts(postData);
        },
        createrOrderPosts(postData) {
            return actions.createrOrderPosts(postData);
        },

        getCommentSummary(postData) {
            return actions.getCommentSummary(postData);
        },
        productPageComments(postData) {
            return actions.productPageComments(postData);
        },
        hasloginPosts() {
            return actions.hasloginPosts();
        },
        changeInitState(type) {
            return type;
        },
    },

    reducer: {
        detailPosts(state, {payload: {loggerId, data: classInfo}}) {
            return {
                ...state,
                classInfo,
                loggerId
            };
        },
        cellClazzLinkClazzesPosts(state, {payload: {loggerId, data: linkInfo}}) {
            return {
                ...state,
                linkInfo,
                loggerId
            };
        },
        footbarPosts(state, {payload: {loggerId, data: bottomInfo}}) {
            return {
                ...state,
                bottomInfo,
                loggerId
            };
        },
        recommendclazzPosts(state, {payload: {loggerId, data: recommendInfo}}) {
            return {...state, recommendInfo, loggerId};
        },
        teachersPosts(state, {payload: {loggerId, data: teacherInfo}}) {
            return {
                ...state,
                teacherInfo,
                loggerId
            };
        },
        createrOrderPosts(state, {payload: {loggerId, data: createrOrder}}) {
            return {
                ...state,
                createrOrder,
                loggerId
            };
        },
        getCommentSummary(state, {payload: {loggerId, data: commentSummary}}) {
            return {
                ...state,
                commentSummary,
                loggerId
            };
        },
        hasloginPosts(state, {payload: {loggerId, data: userInfo}}) {
            return {
                ...state,
                userInfo,
                loggerId
            };
        },
        productPageComments(state, {payload: {loggerId, data: pageComments}}) {
            return {
                ...state,
                pageComments,
                loggerId
            };
        },
        changeInitState(state, {payload}) {
            const {
                type,
                subclazzNumber,
                enrollInfo,
                currentTabIndex
            } = payload;
            switch (type) {
                case 'showEnrollSuccess':
                    return {
                        ...state,
                        showEnrollSuccess: true,
                        subclazzNumber
                    };
                case 'hideEnrollSuccess':
                    return {
                        ...state,
                        showEnrollSuccess: false,
                    };
                case 'showLinkModal':
                    return {
                        ...state,
                        showLinkModal: true,
                    };
                case 'hideLinkModal':
                    return {
                        ...state,
                        showLinkModal: false,
                    };
                case 'saveEnrollInfo':
                    return {
                        ...state,
                        enrollInfo
                    };
                case 'showAssistantTeacher':
                    return {
                        ...state,
                        showAssistantTeacher: true
                    };
                case 'hideAssistantTeacher':
                    return {
                        ...state,
                        showAssistantTeacher: false
                    };
                case 'addCurrentTabIndex':
                    return {
                        ...state,
                        currentTabIndex
                    };
                default:
                    return state;
            }
        },
    }
};
