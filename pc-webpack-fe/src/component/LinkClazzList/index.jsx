/**
 * 联报优惠list
 * @author xiazhiyao
 */
import {PureComponent} from 'react';
import util from '~/util/util';
import './index.styl';

class LinkClazzList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            item: props.item,
            fromPage: props.fromPage,
        };
    }

    // onClick = (fromPage, scheme) => {
    //     if (fromPage === 'cellDetail') {
    //         util.skipScheme(scheme);
    //         location.reload();
    //     }
    // }

    render() {
        const {item, fromPage} = this.state;
        const {
            name,
            arrangement,
            lessonCount,
            originalPrice,
            masterTeachers,
            price,
            scheme
        } = item;
        const {displayName} = masterTeachers[0];
        return (
            <div
                role="presentation"
                className={`list-wrap ${fromPage === 'linkModal' && 'list-wrap-link-modal'}`}
                // onClick={this.onClick(fromPage, scheme)}
            >
                {
                    fromPage !== 'linkModal'
                        ? (
                            <img
                                className="link-bg-img"
                                src="https://imgs.genshuixue.com/0cms/d/file/content/2018/06/5b2206eddea82.png" alt=""
                            />
                        )
                        : null
                }
                <div className="link-title">{name}</div>
                <div className="link-time">
                    <span className="lesson-arrangement" title={arrangement}>{arrangement}</span>
                    <span className="lesson-count" title={lessonCount + '次课'}>{lessonCount}次课</span>
                </div>
                <div className="link-footer">
                    <div className="teacher left">{displayName}</div>
                    <div className="price right">
                        <span className="now-price">￥{util.formatPrice(originalPrice)}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default LinkClazzList;
