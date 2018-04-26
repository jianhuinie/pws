/**
 * 所有页面公共Controller
 * @file hurry
 * @date 2017/06/19
 */
import React from 'react';
import analysis from 'spa/common/util/analysis';

export default class PageController extends React.Component {
    constructor(props) {
        super(props);
        this.analysis();
    }
    analysis() {
        analysis.pgv(this.pvOptions);
    }
};
