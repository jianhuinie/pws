/**
 * 章节模式
 * @author xiazhiyao
 */
import {PureComponent} from 'react';
import SingleSection from '../SingleSection/index';
import http from '~/service/http';
import constant from '~/service/constant';
import './index.styl';

let preSelect;
let hasLoad = [];

class ChapterSection extends PureComponent {
    constructor(props) {
        super(props);
        const {chapters, pager} = props;
        this.state = {
            selectIndex: 1,
            expandArrange: true,
            chapters,
            hasMoreChapter: pager.hasMore,
            hasMoreLesson: chapters[0].pager.hasMore,
            chapterCursor: pager.cursor,
            cursor: chapters[0].pager.cursor
        };
    }

    // 展开章节模式课程
    expandClick = e => {
        preSelect = this.state.selectIndex;
        const currentIndex = e.currentTarget.dataset.index;
        if (+preSelect === +currentIndex
            && this.state.chapters[currentIndex - 1].lessons.length !== 0) {
            this.setState({
                expandArrange: !this.state.expandArrange
            });
        } else {
            if (!hasLoad.includes(currentIndex) && +currentIndex !== 1) {
                hasLoad.push(currentIndex);
                this.setState({
                    cursor: 0
                }, () => {
                    this.getMorePager(currentIndex, true);
                });
            } else {
                const {hasMore, cursor} = this.state.chapters[+currentIndex - 1].pager;
                this.setState({
                    cursor,
                    hasMoreLesson: hasMore,
                    selectIndex: currentIndex,
                    expandArrange: true
                }, () => {
                    this.stick(currentIndex);
                });
            }
        }
    }

    // 打开新章节，DOM结构变化，导致页面定位错误，采取当前章置顶方案
    stick = currentIndex => {
        const navWrapper = document.getElementsByClassName('float-layer-clazz')[0];
        const navWrapperHeight = navWrapper.offsetHeight;
        const arrangeBox = document.getElementsByClassName('chapter-section')[0];
        const itmBoxHeight = document.getElementsByClassName('chapter-name')[0].offsetHeight;
        window.scrollTo(0, arrangeBox.offsetTop - navWrapperHeight + itmBoxHeight * +(currentIndex - 1));
    }

    // 查看更多章
    checkMoreChapter = () => {
        http
            .get(constant.CELLCLAZZ.PAGERCHAPTER, {
                params: {
                    // number: params.number,
                    pageSize: 20,
                    cursor: this.state.chapterCursor
                }
            })
            .then(res => {
                const {chapters, pager} = res.data;
                const {cursor, hasMore} = pager;
                this.setState({
                    chapterCursor: cursor,
                    hasMoreChapter: hasMore,
                    chapters: this.state.chapters.concat(chapters)
                });
            });
    }

    // 查看更多节
    checkMoreLesson = e => {
        const currentIndex = e.currentTarget.dataset.index;
        this.getMorePager(currentIndex);
    }

    getMorePager(currentIndex, delay) {
        const {chapters, cursor} = this.state;
        http
            .get(constant.CELLCLAZZ.PAGERLESSON, {
                params: {
                    // number: params.number,
                    cellChapterNumber: chapters[currentIndex - 1].number,
                    cursor,
                    pageSize: 20
                }
            })
            .then(res => {
                const {lessons, pager} = res.data;
                const {cursor, hasMore} = pager;
                // eslint-disable-next-line array-callback-return
                chapters.map((item, index) => {
                    if (+currentIndex === +index + 1) {
                        item.lessons = item.lessons.concat(lessons);
                    }
                });
                chapters[currentIndex - 1].pager = pager;
                this.setState({
                    hasMoreLesson: hasMore,
                    cursor,
                    selectIndex: currentIndex,
                    expandArrange: true,
                    chapters
                }, () => {
                    if (delay) {
                        this.stick(currentIndex);
                    }
                });
            });
    }

    render() {
        const {
            selectIndex,
            chapters,
            expandArrange,
            loggerId,
            hasMoreChapter,
            hasMoreLesson
        } = this.state;

        // for (let i = 0; i < chapters.length; i++) {
        //     const chapter = chapters[i];
        //     for (let j = 0; j < chapter.lessons.length; j++) {
        //         if (chapter.lessons[j].audition) {
        //             chapters[i].hasAudition = true;
        //             break;
        //         }
        //     }
        // }
        return (
            <div className="chapter-section">
                {
                    chapters.map((chapter, index) => {
                        return (
                            <div key={chapter.cellClazzChapterNumber}>
                                <div
                                    role="presentation"
                                    className="chapter-name"
                                    data-index={chapter.idx}
                                    onClick={this.expandClick}
                                >
                                    第
                                    {chapter.idx}
                                    章&nbsp;
                                    {chapter.name}
                                    {
                                        chapter.hasAudition ? (
                                            <div className="label-audition">试听</div>
                                        ) : ''
                                    }
                                    {
                                        chapter.showMore
                                            ? (
                                                <i className="icon-gengduo"></i>
                                            )
                                            : (
                                                <i className="icon-gengduo rotate"></i>
                                            )
                                    }
                                </div>
                                <div className={`item-box-content
                                    ${+selectIndex === +index + 1 && expandArrange ? '' : 'hide'}`}
                                >
                                    {
                                        chapter.lessons.map((item, index) => {
                                            return (
                                                <SingleSection
                                                    key={item.cellCourseLessonNumber}
                                                    item={item}
                                                    // hide={!chapter.showMore}
                                                    index={index}
                                                    loggerId={loggerId}
                                                />
                                            );
                                        })
                                    }
                                    {
                                        hasMoreLesson && (
                                            <div
                                                className="check-more"
                                                role="presentation"
                                                onClick={this.checkMoreLesson}
                                                data-index={index + 1}
                                            >
                                                <span>查看更多课节</span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        );
                    })
                }
                {
                    hasMoreChapter && (
                        <div
                            className="check-more"
                            role="presentation"
                            onClick={this.checkMoreChapter}
                        >
                            <span>查看更多章节</span>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default ChapterSection;
