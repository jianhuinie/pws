/**
 * 评价item
 * @author niejianhui
 */
import React from 'react';
import CropImage from '~/component/CropImage/index';

import './index.styl';

export default function CommentItem(props) {
    const {comment, index, loggerId} = props;
    const item = comment;
    return (
        <div
            className="comment-item analysis-haoke-log-scroll"
            data-index={index}
            data-event-id="27567001"
            data-logger-id={loggerId}
        >
            <div className="student-info">
                <CropImage width={40} height={40} ImgSrc={item.creator.avatarUrl} />
                <span className="student-name">
                    {item.creator.displayName}
                </span>
                <span className="product-name">
                    来自：
                    {item.comment.productName}
                </span>
                <span className="comment-time">
                    {item.comment.createTime.substr(0, 16)}
                </span>
            </div>
            <div className="comment-detail">
                {item.comment.content}
                {
                    item.replyComments.length || item.additionComments.length ? (
                        <div className="extra-comment">
                            {
                                item.replyComments.length && (
                                    <div>
                                        {item.replyComments.map(reply => (
                                            <div key={reply.number}>
                                                <div>老师回复:</div>
                                                <div>
                                                    {reply.content}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            }
                            {
                                item.additionComments.length && (
                                    <div>
                                        {item.additionComments.map(addition => (
                                            <div key={addition.number}>
                                                <div>追加评论:</div>
                                                <div>
                                                    {addition.content}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            }
                        </div>
                    ) : ''
                }
            </div>
        </div>
    );
}
