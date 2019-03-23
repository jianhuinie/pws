/**
 * 课程详情
 * @author niejianhui
 */
import {PureComponent} from 'react';
import EmptyData from '~/component/EmptyData/index';
import CommentItem from './CommentItem/index';
import {connect} from 'react-redux';
import {productPageComments} from '~/service/cellClass';
// import util from '~/util/util';

import cellClass from '~/model/cellClass';
import './index.styl';

class CourseComments extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeType: 1,
            commentList: [],
            cursor: 0,
            isLoading: false,
            // currentTotal: void 0,
            // pastTotal: void 0

        };
    }

    componentDidMount() {
        const self = this;
        const {dispatch, number} = this.props;
        self.getCommentList(1, false, false);
        dispatch(cellClass.getCommentSummary({productNumber: number}));
    }

    getCommentList = async (type, clearBefore, clearCursor) => {
        const self = this;
        self.setState({
            isLoading: true
        });
        const {cursor, commentList} = this.state;
        const params = {
            productNumber: self.props.number,
            thisProductComment: type,
            cursor: clearCursor ? 0 : cursor
        };
        const res = await productPageComments(params);
        const {pager, items} = res.data || {};
        const beforeList = clearBefore ? [] : commentList;
        self.setState({
            isLoading: false,
            cursor: pager.cursor || 0,
            commentList: beforeList.concat(items)
        });
        if (pager.hasMore) {
            window.addEventListener('scroll', self.scrollHandler);
        }
        else {
            window.removeEventListener('scroll', self.scrollHandler);
        }
    }

    scrollHandler = () => {
        const self = this;
        const {isLoading, activeType} = this.state;
        const fixHeight = 200;
        // const type = self.state.activeType;
        const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
        if ((scrollTop + clientHeight + fixHeight >= scrollHeight) && !isLoading) {
            self.getCommentList(activeType, false, false);
        }
    }

    changeCommentType = e => {
        const self = this;
        const {type} = e.target.dataset;
        if (type !== void 0 && +type !== self.state.activeType) {
            self.setState({
                activeType: +type
            });
            self.getCommentList(+type, true, true);
        }
    }

    render() {
        const {cellClass: {commentSummary, loggerId}} = this.props;
        const {currentTotal, pastTotal} = commentSummary;
        const self = this;
        const {commentList, activeType} = this.state;
        const commentListComponent = commentList.map(
            (item, index) => (
                <CommentItem
                    index={index}
                    loggerId={loggerId}
                    key={item.comment.number}
                    comment={item}
                />
            )
        );
        return (
            <div className="module" id="course-comments">
                <div className="module-name">
                    <span></span>
                    课程评价
                </div>
                <div className="comment-box">
                    <div
                        className="tabs-type"
                        onClick={self.changeCommentType}
                        role="presentation"
                    >
                        <span
                            className={`analysis-haoke-log ${activeType === 1 ? 'active' : ''}`}
                            data-type="1"
                            data-event-id="8873956"
                        >
                            本期评价&nbsp;
                            {currentTotal || ''}
                        </span>
                        <span
                            className={`analysis-haoke-log ${activeType === 0 ? 'active' : ''}`}
                            data-type="0"
                            data-event-id="8873940"
                        >
                            往期评价&nbsp;
                            {pastTotal || ''}
                        </span>
                    </div>
                    {
                        commentList.length ? (
                            <div className="comment-list">
                                {commentListComponent}
                            </div>
                        ) : (
                            <EmptyData text="暂时没有评价，少年抢沙发？" />
                        )
                    }
                </div>
            </div>
        );
    }
}

export default connect(s => s)(CourseComments);
