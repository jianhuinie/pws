/**
 * 课程详情
 * @author niejianhui
 */
import {PureComponent} from 'react';
import Title from './Title/index';
import Body from './Body/index';
import Photo from './Photo/index';
import Video from './Video/index';
import Audio from './Audio/index';
import JoinClazzTip from './JoinClazzTip/index';


class CourseDetail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            overTime: props.overTime
        };
    }

    render() {
        const {introItems, loggerId} = this.props;
        const {overTime} = this.state;
        const introItemsComponents = introItems && introItems.map((item, index) => {
            let html;
            const {type} = item;
            switch (type) {
                case 1:
                    html = (<Title item={item} loggerId={loggerId} key={type} />);
                    break;
                case 2:
                    html = (<Body item={item} loggerId={loggerId} key={type} />);
                    break;
                case 3:
                    html = (<Photo item={item} loggerId={loggerId} key={type} />);
                    break;
                case 4:
                    if (item.entityReady) {
                        html = (<Video item={item} loggerId={loggerId} key={type} />);
                    }
                    break;
                case 5:
                    html = (<Audio item={item} loggerId={loggerId} key={type} />);
                    break;
                default:
                    break;
            }
            return html;
        });

        return (
            <div className="module" id="course-detail">
                {
                    introItems && introItems.length !== 0
                    && (
                        <div className="module-name">
                            <span></span>
                            课程详情
                        </div>
                    )
                }
                {introItemsComponents}
                <JoinClazzTip
                    overTime={overTime}
                />
            </div>
        );
    }
}

export default CourseDetail;
