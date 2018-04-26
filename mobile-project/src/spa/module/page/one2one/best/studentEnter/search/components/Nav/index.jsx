/**
 * 一对一优选 -- navbar
 * @file huangshiming
 * @data 2017/04/10
 */

import React, { PropTypes } from 'react';
import Subject from './Subject/index';
import LessonWay from './LessonWay/index';
import Sort from './Sort/index';
import Choose from './Choose/index';
import NavItem from './NavItem/index';
require('css-loader!./index.styl');
class Nav extends React.Component {

    static propTypes = {
        lessonWayName: PropTypes.string.isRequired,
        sortWayName: PropTypes.string.isRequired,
        lessonWayArray: PropTypes.array.isRequired,
        sortWayArray: PropTypes.array.isRequired,
        chooseObject: PropTypes.object.isRequired,
        courseObject: PropTypes.object.isRequired,
        callback: PropTypes.func.isRequired,
        params: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            subJect: '',
            lessonWay: '不限',
            sortWay: '智能排序',
            choose: '筛选',
            navStatus: [
                'normal',
                'normal',
                'normal',
                'normal'
            ],
            showContent: [0, 0, 0, 0],
            iconStatus: [
                'icon-caret-down2',
                'icon-caret-down2',
                'icon-caret-down2',
                'icon-caret-down2'
            ],
            sortWayArray: [],
            lessonWayArray: [],
            chooseObj: this.props.chooseObject,
            courseObject: this.props.courseObject,
            maskStatus: 0,
            params: {
                subject_id: 0,
                lesson_way: 0,
                sort: 'all',
                sex: 0,
                school_age: 0,
                price_range: 0
            }
        };
        this.lessonWayFunc = this.lessonWayFunc.bind(this);
        this.sortFunc = this.sortFunc.bind(this);
        this.chooseFunc = this.chooseFunc.bind(this);
        this.subjectFunc = this.subjectFunc.bind(this);
        this.clickMask = this.clickMask.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        let subJectName = '';
        const selectedName = nextProps.courseObject.selected_name;
        const selectedNameLength = selectedName.length;
        if (selectedNameLength) {
            subJectName = selectedName[selectedNameLength - 1];
        }
        this.setState({
            subJect: subJectName,
            lessonWay: nextProps.lessonWayName,
            sortWay: nextProps.sortWayName,
            lessonWayArray: nextProps.lessonWayArray,
            sortWayArray: nextProps.sortWayArray,
            chooseObj: nextProps.chooseObject,
            courseObject: nextProps.courseObject,
            params: nextProps.params
        });
    }

    clickItem(index) {
        const self = this;
        const navStatus = this.state.navStatus;
        const iconStatus = this.state.iconStatus;
        const showContent = this.state.showContent;
        let  maskStatus = this.state.maskStatus;
        for (let i = 0; i < navStatus.length; i++) {
            if (i !== index) {
                showContent[i] = 0;
                if (navStatus[i] !== 'choosed') {
                    navStatus[i] = 'normal';
                    iconStatus[i] = 'icon-caret-down2';
                }
            } 
        }
        if (showContent[index]) {
            showContent[index] = 0;
        } else {
            showContent[index] = 1;
        } 

        if (navStatus[index] === 'active') {
            navStatus[index] = 'normal';
            iconStatus[index] = 'icon-caret-down2';
            maskStatus = 0;
        } else if (navStatus[index] === 'normal') {
            navStatus[index] = 'active';
            iconStatus[index] = 'icon-caret-up2';
            maskStatus = 1;
        } else if (navStatus[index] === 'choosed') {
            if (maskStatus && !showContent[index]) {
                maskStatus = 0;
            } else {
                maskStatus = 1;
            }
        }

        self.setState({
            navStatus: navStatus,
            iconStatus: iconStatus,
            maskStatus: maskStatus,
            showContent: showContent
        });
    }    

    lessonWayFunc(data) {
        const navStatus = this.state.navStatus;
        const iconStatus = this.state.iconStatus;
        const showContent = this.state.showContent;
        showContent[1] = 0;
        const params = this.state.params;
        params.lesson_way = +data.value;
        if (+data.value) {
            navStatus[1] = 'choosed';
            iconStatus[1] = 'icon-caret-down2 icon-choosed';
        } else {
            navStatus[1] = 'normal';
            iconStatus[1] = 'icon-caret-down2';
        }
        this.setState({
            navStatus: navStatus,
            iconStatus: iconStatus,
            maskStatus: 0,
            params: params
        });

        if (typeof this.props.callback === 'function') {
            this.props.callback(params);
        }
    }

    sortFunc(data) {
        const navStatus = this.state.navStatus;
        const iconStatus = this.state.iconStatus;
        const showContent = this.state.showContent;
        showContent[2] = 0;
        const params = this.state.params;
        params.sort = data.id;
        if (data.id === 'all') {
            navStatus[2] = 'normal';
            iconStatus[2] = 'icon-caret-down2';
        } else {
            navStatus[2] = 'choosed';
            iconStatus[2] = 'icon-caret-down2 icon-choosed';
        }
        this.setState({
            navStatus: navStatus,
            iconStatus: iconStatus,
            maskStatus: 0,
            params: params
        });

        if (typeof this.props.callback === 'function') {
            this.props.callback(params);
        }
    }

    chooseFunc(data) {
        const navStatus = this.state.navStatus;
        const iconStatus = this.state.iconStatus;
        const showContent = this.state.showContent;
        showContent[3] = 0;
        navStatus[3] = 'choosed';
        iconStatus[3] = 'icon-caret-down2 icon-choosed';
        const params = this.state.params;
        params.sex = data.sex;
        params.school_age = data.schoolAge;
        params.price_range = data.priceRange;
        if (!+data.sex && !+data.schoolAge && !+data.priceRange) {
            navStatus[3] = 'normal';
            iconStatus[3] = 'icon-caret-down2';
        } else {
            navStatus[3] = 'choosed';
            iconStatus[3] = 'icon-caret-down2 icon-choosed';
        }
        this.setState({
            navStatus: navStatus,
            iconStatus: iconStatus,
            maskStatus: 0,
            params: params
        });

        if (typeof this.props.callback === 'function') {
            this.props.callback(params);
        }
    }

    subjectFunc(data) {
        const navStatus = this.state.navStatus;
        const iconStatus = this.state.iconStatus;
        const showContent = this.state.showContent;
        showContent[0] = 0;
        navStatus[0] = 'choosed';
        iconStatus[0] = 'icon-caret-down2 icon-choosed';
        const params = this.state.params;
        params.subject_id = data.index;
        this.setState({
            navStatus: navStatus,
            iconStatus: iconStatus,
            maskStatus: 0,
            params: params
        });

        if (typeof this.props.callback === 'function') {
            this.props.callback(params);
        }
    }

    clickMask() {
        console.log(this.state.navStatus);
        const navStatusArr = this.state.navStatus.map(function (item) {
            let it = item;
            if (item === 'active') {
                it = 'normal';
            }
            return it;
        });
        this.setState({
            maskStatus: 0,
            showContent: [0, 0, 0, 0],
            iconStatus: [
                'icon-caret-down2',
                'icon-caret-down2',
                'icon-caret-down2',
                'icon-caret-down2'
            ],
           navStatus: navStatusArr
        });
    }

    render() {
        return (
            <div className="nav-container">
                <div className="nav-bar">
                    <NavItem
                        name={this.state.subJect}
                        callback={this.clickItem.bind(this, 0)}
                        itemClassStatus={this.state.navStatus[0]}
                        iconStatus={this.state.iconStatus[0]}
                    />

                    <NavItem
                        name={this.state.lessonWay}
                        callback={this.clickItem.bind(this, 1)}
                        itemClassStatus={this.state.navStatus[1]}
                        iconStatus={this.state.iconStatus[1]}
                    />

                    <NavItem
                        name={this.state.sortWay}
                        callback={this.clickItem.bind(this, 2)}
                        itemClassStatus={this.state.navStatus[2]}
                        iconStatus={this.state.iconStatus[2]}
                    />

                    <NavItem
                        name={this.state.choose}
                        callback={this.clickItem.bind(this, 3)}
                        itemClassStatus={this.state.navStatus[3]}
                        iconStatus={this.state.iconStatus[3]}
                    />
                </div>

                <Subject 
                    show={this.state.showContent[0]}
                    callback={this.subjectFunc}
                    selected={this.state.courseObject.selected}
                />

                <LessonWay
                    show={this.state.showContent[1]}
                    callback={this.lessonWayFunc}
                    lessonWayArray={this.state.lessonWayArray}
                    lessonWayIndex={+this.state.params.lesson_way}
                />
                <Sort
                    show={this.state.showContent[2]}
                    callback={this.sortFunc}
                    sortWayArray={this.state.sortWayArray}
                    sortWayIndex={this.state.params.sort}
                 />
                 <Choose
                    show={this.state.showContent[3]}
                    callback={this.chooseFunc}
                    chooseObj={this.state.chooseObj}
                    params={this.state.params}
                 />
                <div 
                    className={this.state.maskStatus ? 'mask' : 'mask hide'}
                    onClick={this.clickMask}
                ></div>
            </div>
        );
    }
};

export default Nav;