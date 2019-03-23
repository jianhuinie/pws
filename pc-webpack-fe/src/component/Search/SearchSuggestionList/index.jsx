import {PureComponent} from 'react';

import './index.styl';

export default class Search extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.dataList || [],
            loggerId: props.loggerId,
        };
    };

    // 挂载
    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            list: nextProps.dataList,
        });
    }

    onMouseDown = (e) => {
        const self = this;
        const inputValue = e.target.getAttribute('data-value');
        const params = {
            value: inputValue
        };
        self.props.onMouseDown(params);
    }

    render() {
        const self = this;
        const { list, loggerId } = self.state;
    
        return (
            <div className="search-list-div">
                {/* 联想词列表 */}
                <ul className="search-list-ul">
                    {
                        list.length > 0 ? (
                            list.map((item, index) => {
                                return (
                                    <li
                                        key={item}
                                        className="analysis-haoke-log"
                                        data-index={index}
                                        data-event-id="14158058"
                                        data-logger-id={loggerId}
                                        onMouseDown={self.onMouseDown}
                                        data-value={item}
                                    >{item}</li>
                                );
                            })
                        ) : (
                                ''
                            )
                    }
                </ul>
            </div>
        );
    }
}
