/**
 * 课程右侧信息
 * @author niejianhui
 */
import {PureComponent} from 'react';
import EnrollTips from './EnrollTips/index';
import RecommendClazz from './RecommendClazz/index';

import './index.styl';

class RightBar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {name} = this.props;
        return (
            <div className="right-bar">
                <EnrollTips />
                <RecommendClazz />
            </div>
        );
    }
}

export default RightBar;
