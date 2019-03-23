/**
 * 课程大纲
 * @author niejianhui
 */
import {PureComponent} from 'react';
import ChapterSection from './ChapterSection/index';
import MultiSection from './MultiSection/index';

class CoursePlan extends PureComponent {
    render() {
        const {
            loggerId,
            clazz: {
                chapterMode,
                chapters,
                pager
            }
        } = this.props;
        return (
            <div className="module" id="course-plan">
                <div className="module-name">
                    <span></span>
                    课程表
                </div>
                {
                    chapterMode ? (
                        <ChapterSection chapters={chapters} pager={pager} loggerId={loggerId} />
                    ) : (
                        <MultiSection chapters={chapters[0]} pager={pager} loggerId={loggerId} />
                    )
                }
            </div>
        );
    }
}

export default CoursePlan;
