/**
 * @file 课程信息弹框
 * @author wangtianhua
 */
define(function (require, exports) {

    var ractiveDialog = require('../../common/function/ractiveDialog');
    var Validator = require('custom/form/Validator');

    /**
     * @param {Object} options
     * @property {Function=} options.onsave
     * @property {Function=} options.oncancel
     */
    return function (options) {

        options = options || { };

        var dialog = ractiveDialog({
            template: require('html!./CourseInfoDialog.html'),
            data: {
                style: require('text!./CourseInfoDialog.styl'),
                applicationInputOptions: {
                    name: 'application_input',
                    value: '',
                    placeholder: '如：英语词汇基础较弱的中考及初中生',
                    className: 'application-input',
                    lazy: true
                },
                relativeInputOptions: {
                    name: 'relative_input',
                    value: '',
                    placeholder: '如：词汇是英语学习的基础',
                    className: 'relative-input',
                    lazy: true
                },
                questionInputOptions: {
                    name: 'question_input',
                    value: '',
                    placeholder: '如：词汇量少、记忆方法有误的问题',
                    className: 'question-input',
                    lazy: true
                },
                learnwayInputOptions: {
                    name: 'learnway_input',
                    value: '',
                    placeholder: '如：对历年真题进行总结，结合独特的情景记忆法',
                    className: 'learnway-input',
                    lazy: true
                },
                timeInputOptions: {
                    name: 'time_input',
                    value: '',
                    placeholder: '如：5-10节课',
                    className: 'time-input',
                    lazy: true
                },
                targetInputOptions: {
                    name: 'target_input',
                    value: '',
                    placeholder: '如：掌握核心中考词汇',
                    className: 'target-input',
                    lazy: true
                },
                preview: function () {

                    var html = '';

                    if (this.get('relativeInputOptions.value')) {
                        html += this.get('relativeInputOptions.value');
                    }
                    if (this.get('questionInputOptions.value')) {
                        html += '学生容易遇到' + this.get('questionInputOptions.value') +
                        '等方面的问题，'
                    }
                    if (this.get('applicationInputOptions.value')) {
                        html += '课程面向' + this.get('applicationInputOptions.value')+'，'
                    }

                    if (this.get('learnwayInputOptions.value')){
                        html += '通过' + this.get('learnwayInputOptions.value')+'，'
                    }

                    if (this.get('timeInputOptions.value')) {
                        html += '在' + this.get('timeInputOptions.value')+'内，'
                    }

                    if (this.get('targetInputOptions.value')) {
                        html += '达到' + this.get('targetInputOptions.value') +'的学习目标。'
                    }
                    return html;
                },
            },
            components: {
                Input: require('../../common/component/Input')
            },
            onrender: function(){

            },
            publish: function () {

                this.validator = new Validator({
                    mainElement: $('.dialog'),
                        fields: {
                            application_input: {
                                rules: {
                                    required: true
                                },
                                errors: {
                                    required: '请填写适合学生'
                                }
                            },
                            relative_input: {
                                rules: {
                                    required: true
                                },
                                errors: {
                                    required: '请填写信息介绍'
                                }
                            },
                            question_input: {
                                rules: {
                                    required: true
                                },
                                errors: {
                                    required: '请填写遇到的困难'
                                }
                            },
                            learnway_input: {
                                rules: {
                                    required: true
                                },
                                errors: {
                                    required: '请填写教学内容或方法'
                                }
                            },
                            target_input: {
                                rules: {
                                    required: true
                                },
                                errors: {
                                    required: '请填写学习目标'
                                }
                            },
                        }
                    });

                if (this.validator.validate()) {
                    if ($.isFunction(options.onsave)) {
                        options.onsave({
                            courseInfo: this.get('preview').call(this)
                        });
                    }
                    else {
                        return {
                            courseInfo: this.get('preview').call(this)
                        }
                    }
                    dialog.hide();
                }
            }
        });

        return dialog;

    };

});
