/**
 * 所有页面公共Controller
 * @file hurry
 * @date 2017/06/19
 */
import React from 'react';
import { is, fromJS } from 'immutable';

export default class CommonController extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        // return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
        return !(this.props === nextProps || is(fromJS(this.props), fromJS(nextProps))) ||
                !(this.state === nextState || is(fromJS(this.state), fromJS(nextState)));
    }
};
