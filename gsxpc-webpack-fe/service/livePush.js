/**
 * @file Icon 组件
 * @author dafo<huanghoujin@baijiahulian.com>
 */
import http from './http';
import {Live} from './constant';

export const getCourse = params => http.get(Live.STUDENTPUSHCOURSEDETAIL, {params}, {timeout: 500});

export const getTeacherCourse = params => http.get(Live.TEACHERPUSHCOURSEDETAIL, {params}, {timeout: 500});

export const getPushCourseList = params => http.get(Live.TEACHERPUSHCOURSELIST, {params}, {timeout: 500});
