import {PureComponent} from 'react';
import {connect} from 'react-redux';
import habo from 'habo';
import TopBanner from '~/component/TopBanner/index';
import LinkClazzItems from './LinkClazzItems/index';
import ChannelNav from '../component/ChannelNav/index';
import DetailInfo from '../component/DetailInfo/index';
import RightBar from '../component/RightBar/index';
import FloatLayer from '../component/FloatLayer/index';
import CourseInfo from './courseInfo/index';
import EnrollSuccess from './EnrollSuccess/index';
import Footer from '~/component/Footer/index';
import SideLayer from '~/component/SideLayer/index';
import cellClass from '~/model/cellClass';
import config from './config';
import $ from 'jquery';
import util from '~/util/util';
import './index.styl';

class CellClass extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeModule: 'course-detail',
            showFloatLayer: false
        };
    }

    componentDidMount() {
        const {dispatch, match} = this.props;
        const classNumber = match.params.id;
        const {subclazzNumber} = util.parseUrl(location.href);
        dispatch(cellClass.detailPosts({
            number: classNumber,
            chapterPageSize: 10,
            lessonPageSize: 10
        }));
        dispatch(cellClass.footbarPosts({number: classNumber, subclazzNumber}));
        dispatch(cellClass.cellClazzLinkClazzesPosts({number: match.params.id}));
        dispatch(cellClass.recommendclazzPosts({number: match.params.id}));
        dispatch(cellClass.teachersPosts({number: classNumber, subclazzNumber}));
        dispatch(cellClass.hasloginPosts());
        window.addEventListener('scroll', this.scrollHandler);
    }

    onClickTab = moduleName => {
        const selector = moduleName;
        const offsetTop = document.getElementById(selector).offsetTop - 28;
        this.setState({
            activeModule: moduleName
        });
        $('body, html').animate({
            scrollTop: offsetTop
        });
    }

    // Tab滚动处理函数
    scrollHandler = () => {
        const courseTabs = config.COURSETABS;
        const {scrollTop} = document.documentElement;
        let showFloatLayer = false;
        let activeModule;
        const {length} = courseTabs;
        if (scrollTop > 620) {
            showFloatLayer = true;
        }
        if (!document.getElementById(courseTabs[1].moduleName)) {
            return;
        }
        const secondTabSelector = '#' + courseTabs[1].moduleName;
        const lastTabSelector = '#' + courseTabs[length - 1].moduleName;
        const secondTabSelectorTop = document.getElementById(courseTabs[1].moduleName).offsetTop - 60;
        const lastTabSelectorTop = document.getElementById(courseTabs[length - 1].moduleName).offsetTop - 60;
        if ($(secondTabSelector).offset() && $(lastTabSelector).offset()) {
            if (scrollTop <= secondTabSelectorTop) {
                activeModule = courseTabs[0].moduleName;
            } else if (scrollTop >= lastTabSelectorTop) {
                activeModule = courseTabs[length - 1].moduleName;
            } else {
                for (let i = 1; i <= length - 1; i++) {
                    const curTabSelectorTop = document.getElementById(courseTabs[i].moduleName).offsetTop - 60;
                    const nextTabSelectorTop = document.getElementById(courseTabs[i + 1].moduleName).offsetTop - 60;
                    // const curTabSelector = '#' + courseTabs[i].moduleName;
                    // const nextTabSelector = '#' + courseTabs[i + 1].moduleName;
                    // // 加个判断
                    // if ($(curTabSelector).offset() && $(nextTabSelector).offset()) {
                    if (scrollTop >= curTabSelectorTop
                        && scrollTop < nextTabSelectorTop
                    ) {
                        activeModule = courseTabs[i].moduleName;
                        break;
                    } else {
                        activeModule = courseTabs[i + 1].moduleName;
                        break;
                    }
                    // }
                }
            }
        }
        this.setState({
            showFloatLayer,
            activeModule
        });
    }

    hideEnrollSuccess = () => {
        const {dispatch} = this.props;
        dispatch(cellClass.changeInitState({
            type: 'hideEnrollSuccess',
        }));
        location.reload();
    }

    render() {
        const {showFloatLayer, activeModule} = this.state;
        const {
            cellClass: {
                classInfo,
                bottomInfo,
                showEnrollSuccess,
                subclazzNumber,
                linkInfo
            }
        } = this.props;
        const clazz = classInfo && classInfo.clazz;
        if (!clazz) {
            return (<div className="course-info"></div>);
        }
        return (
            <div className="cellclass-detail">
                <TopBanner />
                <ChannelNav />
                <div>
                    <CourseInfo />
                    <div className="link-clazzs">
                        {
                            linkInfo && linkInfo.linkItems.length !== 0 && (
                                <LinkClazzItems
                                    key={linkInfo.linkItems.number}
                                    linkItems={linkInfo.linkItems}
                                    // linkCellClazzNumber={linkCellClazzNumber}
                                    // getLinkTabIndex={self.getLinkTabIndex}
                                />
                            )
                        }
                    </div>
                    <div className="detail-box">
                        {
                            classInfo && (
                                <DetailInfo
                                    onClickTab={this.onClickTab}
                                    activeModule={activeModule}
                                    config={config}
                                />
                            )
                        }
                        <RightBar />
                    </div>
                    {
                        bottomInfo && showFloatLayer && (
                            <FloatLayer
                                role="presentation"
                                onClickTab={this.onClickTab}
                                classInfo={classInfo}
                                bottomInfo={bottomInfo}
                                activeModule={activeModule}
                            />
                        )
                    }
                </div>
                {
                    showEnrollSuccess && (
                        <EnrollSuccess
                            showEnrollSuccess={showEnrollSuccess}
                            onCloseDialog={this.hideEnrollSuccess}
                            subclazzNumber={subclazzNumber}
                        />
                    )
                }
                <Footer />
                <SideLayer />
            </div>
        );
    }
}
export default connect(s => s)(CellClass);
