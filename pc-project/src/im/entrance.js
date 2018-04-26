define(function (require, exports) {

    'use strict';

    var LoginDialog = require('common/component/LoginDialog');
    var ImageDialog = require('common/component/ImageDialog');
    var InviteResultDialog = require('common/component/InviteResultDialog');
    var EnterClassroomDialog = require('common/center/component/EnterClassroomDialog');

    var store = require('common/store');

    exports.init = function () {

        initDependency();

        require(['hermes/dispatcher'], function (hermes) {
            hermes.init();
        });
    };

    exports.done = function (callback) {
        require(['hermes/dispatcher'], function (hermes) {
            hermes.done(callback);
        });
    };

    exports.chatToKF = function () {
        require(['hermes/dispatcher'], function (hermes) {
            hermes.chatToKF();
        });
    };

    exports.chatTo = function (data) {
        require(['hermes/dispatcher'], function (hermes) {
            hermes.chatTo(data);
        });
    };

    function initDependency() {
        store.set('hermesDependency', {
            LoginDialog: LoginDialog,
            ImageDialog: ImageDialog,
            InviteResultDialog: InviteResultDialog,
            EnterClassroomDialog: EnterClassroomDialog
        });
    }

});