import {PureComponent} from 'react';

import './index.styl';

export default class Search extends PureComponent {
    constructor(props) {
        super(props);
        let historyList = [];
        if (window.localStorage.historySearch !== 'undefined' && window.localStorage.historySearch !== null && window.localStorage.historySearch !== undefined) {
            historyList = JSON.parse(window.localStorage.historySearch);
        }
        this.state = {
            list: this.props.dataList || [],
            historyList: historyList,
            loggerId: props.loggerId,
        };
    };

    // 挂载
    componentDidMount() {

    }

    onMouseDown = (e) => {
        const self = this;
        const inputValue = e.target.getAttribute('data-value');
        const params = {
            value: inputValue
        };
        self.props.onMouseDown(params);
    }

    // 删除历史记录
    deleteHistory = () => {
        const self = this;
        self.setState({
            historyList: []
        });
        window.localStorage.historySearch = '[]';
        setTimeout(() => {
            const input = document.getElementById('search-input');
            input.focus();
        }, 0);
    }

    render() {
        const self = this;
        const { loggerId, list, historyList } = self.state;
        return (
            <div className="search-list-div">
                {/* 热词列表 */}
                <ul className="search-list-ul">
                    <li>
                        <span>热门搜索</span>
                    </li>
                    {
                        list.length > 0 ? (
                            list.map((item, index) => {
                                if (index < 5) {
                                    return (
                                        <li
                                            key={item}
                                            className="analysis-haoke-log"
                                            data-index={index}
                                            data-event-id="14157899"
                                            data-logger-id={loggerId}
                                            onMouseDown={self.onMouseDown} data-value={item}
                                        >{item}</li>
                                    );
                                } else {
                                    return '';
                                }
                            })
                        ) : (
                                ''
                            )
                    }
                </ul>

                {
                    historyList.length > 0 ? (

                        <ul className="search-history-list">
                            <li style={{ paddingTop: '20px' }}>
                                <span>历史搜索记录</span>
                                <icon className="icon icon-bin" onMouseDown={self.deleteHistory}></icon>
                            </li>
                            {
                                historyList.map((item, index) => {
                                    return (
                                        <li className="history-list-item" onMouseDown={self.onMouseDown} data-index={index} data-value={item}>{item}</li>
                                    );
                                })
                            }
                        </ul>
                    ) : (
                            ''
                        )
                }

            </div>
        );
    }
}
