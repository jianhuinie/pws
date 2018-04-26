/**
 * @file service引入
 * @author hurry
 */
define(function (require) {
    'use strict';
    require('./module');
	require('./backTop/directive');
    require('./baiduShare/directive');
    require('./daterangepicker/directive');
    require('./datetimepicker/directive');
    require('./tooltip/directive');
    require('./dropdown/directive');
    require('./pager/directive');
    require('./searchInput/directive');
    require('./searchSubject/directive');
    require('./subjectList/directive');
    require('./subjectSelector/directive');
    require('./emptyData/directive');
    require('./umeditor/directive');
    require('./sideNav/directive');
    require('./loadingStatus/directive');
    require('./popup/directive');
    require('./qrcode/directive');
    require('./footer/directive');
    require('./siteNav/directive');
    require('./sideBar/directive');
    require('./todayDate/directive');
    require('./cropImage/directive');
    require('./editorComponent/main');
    require('./richEditor/directive');
    require('./languageSelector/directive');
    require('./selectSubject/directive');
    require('./historySubjects/directive');
    require('./tribbleSubject/directive');
});