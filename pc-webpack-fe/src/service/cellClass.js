/**
 * @file Icon 组件
 * @author xzy<xiazhiyao@baijiahulian.com>
 */
import http from './http';
import constant from './constant';

export const detailPosts = params => http.get(constant.CELLCLAZZ.DETAIL, {params});
export const cellClazzLinkClazzesPosts = params => http.get(constant.LINKCLAZZ.CELLCLAZZLINKCLAZZES, {params});
export const footbarPosts = params => http.get(constant.CELLCLAZZ.FOOTBAR, {params});
export const recommendclazzPosts = params => http.get(constant.CELLCLAZZ.RECOMMENDCLAZZ, {params});
export const teachersPosts = params => http.get(constant.CELLCLAZZ.TEACHERS, {params});
export const createrOrderPosts = params => http.get(constant.PURCHASE.CREATEORDER, {params});

export const getCommentSummary = params => http.get(constant.COMMENT.SUMMARY, {params});
export const productPageComments = params => http.get(constant.COMMENT.PRODUCEPAGECOMMENTS, {params});

export const hasloginPosts = params => http.get(constant.USER.BASICINFO, {params});
