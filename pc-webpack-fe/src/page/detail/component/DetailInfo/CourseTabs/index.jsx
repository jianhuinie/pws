/**
 * tabs
 * @author niejianhui
 */
import {PureComponent} from 'react';
import './index.styl';

export default class CourseTabs extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    clickTab = e => {
        const {moduleName} = e.target.dataset;
        this.props.onClickTab(moduleName);
    }

    render() {
        const {hasAudition, config, activeModule} = this.props;
        return (
            <div className="course-tabs">
                {
                    config && config.COURSETABS.map(tab => (
                        <span
                            key={tab.name}
                            data-module-name={tab.moduleName}
                            className={`analysis-haoke-log  ${activeModule === tab.moduleName ? 'active' : ''}`}
                            onClick={this.clickTab}
                            role="presentation"
                        >
                            {tab.name}
                            {
                                tab.moduleName === 'course-plan' && hasAudition && (
                                    <div className="label-audition">试听</div>
                                )
                            }
                        </span>
                    ))
                }
            </div>
        );
    }
}
