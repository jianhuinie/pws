/**
 * @file URL 处理
 * @author dafo<huanghoujin@baijiahulian.com>
 */

/**
 * 提取url后面的参数 返回一个对象
 *
 * @param {URL} url URL 地址
 * @return {Object} url 中的包含的 query 对象化
 */
export const parseUrl = url => {
    const query = {};
    const paraArray = url.substring(url.indexOf('?') + 1).split('&');
    for (let i = 0, len = paraArray.length; i < len; i++) {
        const [key, value] = paraArray[i].split('=');
        query[key] = value;
    }
    return query;
};

/**
 *  获取 originPath
 *
 * @return {string} 获取到的 originPath
 */
export const getOriginPath = () => {
    const {
        origin,
        pathname
    } = location;

    return origin + pathname;
};

/**
 *  获取当前环境
 *
 * {string} 开发环境
 */
export const getCurrentEnv = () => {
    let env;
    env = location.host.split('.')[0].split('-')[0];
    if (env.indexOf(':') > -1 || env.indexOf('127') > -1) {
        env = 'develop';
    }
    return env;
};

/**
 *  处理请求url  后端改成 api.genshuixue 了 不能用相对路径请求
 *
 * @param {URL} url 要请求的 URL
 * @return {URL} 匹配当前开发环境的 URL
 */
export const formatRequestUrl = url => {
    const env = getCurrentEnv();
    if (env === 'www') {
        url = `https://www-api.genshuixue.com${url}`;
    }
    else if (env === 'test' || env === 'beta' || env === 'dev') {
        url = `https://${env}-www-api.genshuixue.com${url}`;
    }
    return url;
};

/**
 * 课程类型
 *
 * @const {number}
 */
const COURSE_TYPE = {
    // MULTICELLULARITY
    15: '0',
    // SUPPLEMENT
    17: '1'
};

/**
 * scheme 跳转处理
 *
 * @param {string} scheme 要跳转的 scheme
 * @param {boolean} isOpenNewTab 是否在新标签页打开
 */
export const skipScheme = (scheme, isOpenNewTab) => {
    const {
        a: type,
        cellClazzNumber,
        cellClazzNumbers,
        cellSubclazzNumbers,
        courseNumber,
        courseType,
        linkClazzNumber,
        orderNumber,
        subclazzNumber,
        subclazzNumbers
    } = parseUrl(scheme);

    const orderTypeNumber = COURSE_TYPE[courseType];

    const url = {
        // 订单详情页
        orderDetail: `/student/orderDetail/${orderNumber}/0`,

        // 订单列表页
        orderList: '/student/manage/orderList',

        // 细胞课学习中心
        classroomCellCourseDetail: `/student/courseCenter/${cellClazzNumber}`,

        // 细胞课详情页
        classDetail: `/detail/cellClass/${courseNumber}${subclazzNumber ? `/${subclazzNumber}` : ''}`,

        // 联报课详情页
        linkClassDetail:
            `/detail/comboCourse/${linkClazzNumber}${
                cellClazzNumbers ? `/${cellClazzNumbers}` : ''
            }${
                subclazzNumbers ? `/${subclazzNumbers}` : ''
            }`,

        //  联报课订单详情页
        goBuyLinkClazz:
            `/student/submitLinkOrder/${linkClazzNumber}/${cellSubclazzNumbers}/${cellClazzNumbers}`,

        // 跳转订单详情页
        goPay: orderTypeNumber && `/student/orderDetail/${orderNumber}/${orderTypeNumber}`
    }[type];

    if (url) {
        const prefix = '/pcweb/#';
        window.open(prefix + url, isOpenNewTab ? '_blank' : '_self');
    }
};

/**
 * 获取课件上传接口地址
 *
 * @return {URL} 获取到的上传接口地址
 */
export const getUploadFileUrl = () => {
    const env = getCurrentEnv();

    return {
        www: 'https://api.wenzaizhibo.com/web/doc/fileUpload',
        beta: 'https://beta-api.wenzaizhibo.com/web/doc/fileUpload'
    }[env] || 'https://test-api.wenzaizhibo.com/web/doc/fileUpload';
};
