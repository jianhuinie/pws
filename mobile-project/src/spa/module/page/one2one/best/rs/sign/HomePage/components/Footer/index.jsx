/**
 * 1对1优选签约-底部按钮
 * @file hurry
 * @date 2017/04/10
 */
import React, { PropTypes } from 'react';
import CONFIG from '../../../../config';
import Button from '../../../../../components/Button/index';
require('css-loader!./index.styl');
const service = require('common/service');
const urlUtil = require('util/url_v2');

class Header extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        callback: PropTypes.func
    };
    static defaultProps = {
        title: '同意并确认签约',
        callback: null
    };
    constructor(props) {
        super(props);
        this.signHandler = this.signHandler.bind(this);
    }
    signHandler() {
        const me = this;
        const subjectId = urlUtil.parseQuery(location.search).subject_id;
        const data = {};
        if (subjectId) {
            data.subject_id = subjectId;
        }
        return service
            .post(
                CONFIG.PATHS.SIGN,
                data
            )
            .then(function (res) {
                if (res.code === 0) {
                    // 签约成功
                    if (typeof me.props.callback === 'function') {
                        me.props.callback();
                    }
                }
            });
    }
    render() {
        return (
            <Button 
                title="同意并确认签约"
                callback={this.signHandler}
                containerClass="sign-home-footer"
            />
        );
    }
};

export default Header;