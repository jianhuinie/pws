/**
 * 左边导航栏
 * @author leon
 */
import React from 'react';
import CONFIG from 'common/config';
import { hashHistory } from 'react-router';
const classroomHash = '#/classroom';
require('css-loader!./index.styl');

class LeftSider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    getSecondMenu = (data) => {
        const isInclude = data.some((item) => {
            const activeItem = new RegExp(item.path);
            return activeItem.test(location.hash);
        });
        const secondListComponet = data.map(function (item) {
            const activeItem = new RegExp(item.path);
            const isCurrentPage = activeItem.test(location.hash);
            return (
                <li className={isCurrentPage ? 'second-sider-name active cursor path-tab' : 'second-sider-name cursor path-tab'} data-path={item.path} key={item.name}>
                    <span className={item.icon}></span>
                    {item.name}
                </li>
            );
        });
        return (
            <ul className={isInclude ? 'second-sider-name' : 'second-sider-name hide'}>
                {secondListComponet}
            </ul>
        );
    }

    clickMenu = (e) => {
        let ele = $(e.target);
        if (e.target.tagName === 'SPAN') {
            ele = ele.parent();
        }
        const path = ele.data('path');
        if (ele.hasClass('cursor')) {
            if (path) {
                if (ele.hasClass('active')) {
                    window.location.reload();
                } else {
                    hashHistory.push(path);
                }
            } else {
                // 折叠收起
                const secondEle = ele.next();
                if (secondEle.hasClass('hide')) {
                    secondEle.removeClass('hide');
                } else {
                    secondEle.addClass('hide');
                }
            }
        }
    }

    render() {
        const self = this;
        const isClassroom = location.hash === classroomHash;
        const  menu = isClassroom ? CONFIG.COURSE_MENU : CONFIG.MENU;

        const listComponet = menu.map(function (item) {
            let html;
            if (item.children && item.children.length) {
                html = (
                    <div className="sider-name" key={item.name}>
                        <div className="cursor path-tab">
                            <span className={item.icon}></span>
                            {item.name}
                            <span className="icon-title-packup-nor"></span>
                        </div>
                        {self.getSecondMenu(item.children)}
                    </div>
                );
            } else {
                const isCurrentPage = item.path === location.hash.substr(1);
                html = (
                    <div className={isCurrentPage ? 'sider-name active cursor path-tab' : 'sider-name cursor path-tab'} data-path={item.path} key={item.name}>
                        <span className={item.icon}></span>
                        {item.name}
                    </div>
                );
            }
            return html;
        });
        
        return (
            <div className="nav-page" onClick={self.clickMenu}>
                {listComponet}
            </div>
        );
    }
};

export default LeftSider;