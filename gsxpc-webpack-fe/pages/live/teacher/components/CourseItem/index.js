import {PureComponent} from 'react';
import PropTypes from 'prop-types';
// import Link from 'next/link';

import './index.styl';

class PushCourseItem extends PureComponent {
    static defaultProps = {
        item: {},
        onPush() {},
    }

    static propTypes={
        item: PropTypes.shape({
            coverUrl: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            recommendType: PropTypes.number.isRequired,
            number: PropTypes.string.isRequired,
        }),
        onPush: PropTypes.func
    }

    // constructor(props) {
    //     super(props);

    //     this state = {
    //         linkUrl: ''
    //     };
    //     this.state = state;
    // }


    onPush = () => {
        const {number} = this.props.item;
        // console.log(location);
        // const {pathname} = location;
        // const url = pathname.replace(/\/tlive\/.+$/, `/tlive/pushcourse/${number}`);
        // history.pushState({}, '', url);
        // window.location.href = pathname.replace(/\/tlive\/.+$/, `/tlive/pushcourse/${number}`);
        this.props.onPush(number);
    }

    render() {
        const {item} = this.props;
        const {coverUrl, name, recommendType} = item;
        return (
            <div className="push-course-item">
                <div className="left-content">
                    <img src={coverUrl} alt="" />
                </div>
                <div className="right-content">
                    <p className="course-name" title={name}>
                        {
                            recommendType === 4 ? (
                                <span className="union-label">
                                    多课联报
                                </span>
                            ) : ''
                        }
                        {name}
                    </p>
                    {/* <p className="course-prices">
                        <span className={+price === 0 ? 'price-now text-green' : 'price-now'}>{+price === 0 ? '免费' : '¥' + util.formatPrice(price)}</span>
                        {
                            !originalPrice ? (
                                ''
                            ) : (
                                    <span className="price-origin">&nbsp;¥&nbsp;{util.formatPrice(originalPrice)}&nbsp;</span>
                                )
                        }
                    </p> */}
                    <button type="button" onClick={this.onPush}>推荐</button>
                </div>
                <div className="clear-box"></div>
            </div>
        );
    }
}

export default PushCourseItem;
