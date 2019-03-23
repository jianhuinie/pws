/**
 * 多课节模式
 * @author xiazhiyao
 */
import {PureComponent} from 'react';
import SingleSection from '../SingleSection/index';
import http from '~/service/http';
import constant from '~/service/constant';
import './index.styl';


class MultiSection extends PureComponent {
    constructor(props) {
        super(props);
        const {chapters: {lessons}, pager} = this.props;
        const {cursor, hasMore} = pager;
        this.state = {
            cursor,
            lessons,
            hasMore
        };
    }

    checkMore = () => {
        http
            .get(constant.CELLCLAZZ.PAGERLESSON, {
                params: {
                    // number: urlParams.number,
                    cellChapterNumber: this.state.lessons.number,
                    cursor: this.state.cursor,
                    pageSize: 20
                }
            })
            .then(res => {
                const {lessons, pager} = res.data;
                const {cursor, hasMore} = pager;
                this.setState({
                    cursor,
                    hasMore,
                    lessons: this.state.lessons.concat(lessons)
                });
            });
    }

    render() {
        const {lessons, loggerId, hasMore} = this.state;
        // let lessons;
        // if (this.props.chapters.length > 0) {
        //     lessons = this.props.chapters[0].lessons;
        // }
        return (
            <div className="multi-section">
                {
                    lessons.map((item, index) => {
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
                    hasMore && (
                        <div
                            className="check-more"
                            role="presentation"
                            onClick={this.checkMore}
                        >
                            <span>查看更多</span>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default MultiSection;
