import CommonController from 'common/controller/CommonController';
import React, { PropTypes } from 'react';
require('css-loader!./index.styl');

export default class MenuItem extends CommonController {

    static propTypes = {
        title: PropTypes.node.isRequired,
        content: PropTypes.node,
        menuClassName: PropTypes.string,
        next: PropTypes.string
    };

    static defaultProps = {
        content: '',
        menuClassName: ''
    };

    constructor(props) {
        super(props);
        this.goToNext = this.goToNext.bind(this);
    }

    goToNext() {
        if (this.props.next) {
            location.href = this.props.next;
        }
    }

    render() {
        return (
            <div className={`menu-list-item ${this.props.menuClassName}`} onClick={this.goToNext}>
                <div className="menu-list-item-title">{this.props.title}</div>
                <div className="menu-list-item-content">{this.props.content}</div>
                <div className="menu-list-item-next icon-next"></div>
            </div>
        );
    }
}
export class MenuList extends CommonController {

    static propTypes = {
        children: PropTypes.node.isRequired
    };

    render() {
        return (
            <div className="menu-list">
                { this.props.children }
            </div>
        );
    }
}