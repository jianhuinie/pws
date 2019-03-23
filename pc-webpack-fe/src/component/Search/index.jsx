/**
 * 顶导搜索
 * @author fengguangyu
 */
import {PureComponent} from 'react';
import ajaxConfig from '~/service/constant';
import ajaxService from '~/service/http';
import HotList from './SeachHotList/index';
import SuggestionList from './SearchSuggestionList/index';

import './index.styl';

export default class Search extends PureComponent {
    constructor(props) {
        super(props);
        let historyList = [];
        if (window.localStorage.historySearch !== 'undefined'
            && window.localStorage.historySearch !== null
            && window.localStorage.historySearch !== void 0) {
            historyList = JSON.parse(window.localStorage.historySearch);
        }
        this.state = {
            userInfo: {},
            showSuggestionList: false,
            showHotList: false,
            hotList: [],
            historyList: historyList,
            suggstionList: [],
            inputValue: '',
            loggerId: '',
            onFocused: false,
            canSearchSuggestion: 2      // 输入过程中，联想词是否可以发送请求，
            // 0:已发送过请求，未接收到响应，不可以再次发送，1：已发送过请求，并接收到响应，可以再次发送，2:初始值
        };
    }

    // 回车确定搜索
    onSearch = e => {
        const self = this;
        if (e.which !== 13) {
            return false;
        }
        const searchInput = document.getElementById('search-input');
        if (self.state.inputValue !== '') {
            self.setHistory(self.state.inputValue);
            searchInput.blur();
            window.location.href = location.origin
                + '/pcweb/#/search/searchResults/'
                + encodeURIComponent(self.state.inputValue);
        } else {
            searchInput.focus();
        }
    }

    // 内容改变请求联想词
    onChange = value => {
        const {canSearchSuggestion} = this.state;
        this.setState({
            canSearchSuggestion: 0
        });
        if (value.trim() !== '' && canSearchSuggestion) {
            const params = {
                keyword: value,
                dsp: 'pc'
            };
            ajaxService
                .get(ajaxConfig.SEARCH.SUGGESTIONKEYWORDS, params)
                .then(res => {
                    this.setState({
                        inputValue: value.trim(),
                        suggstionList: res.data.items,
                        showSuggestionList: true,
                        showHotList: false,
                        canSearchSuggestion: 1
                    });
                });
        } else {
            self.setState({
                inputValue: value,
                canSearchSuggestion: 1
            });
            self.onFocus();
        }
    }

    // 搜索框获取焦点时请求热词及展示历史记录
    onFocus = () => {
        this.setState({
            onFocused: true
        });
        ajaxService
            .get(ajaxConfig.SEARCH.POPULARKEYWORDS, {
                dsp: 'pc'
            })
            .then(res => {
                this.setState({
                    hotList: res.data.items,
                    showHotList: true,
                    showSuggestionList: false,
                    loggerId: res.loggerId
                });
            });
    }

    // 热词、历史记录点击
    onHotMouseDown = params => {
        const inputValue = params.value;
        this.setState({
            inputValue,
            showHotList: false,
            showSuggestionList: false
        });
        const serchInput = document.getElementById('search-input');
        serchInput.value = inputValue;
        if (inputValue !== '') {
            this.setHistory(inputValue);
            window.location.href = location.origin
                + '/pcweb/#/search/searchResults/'
                + encodeURIComponent(inputValue);
        } else {
            this.setState({
                showSuggestionList: false,
                showHotList: false
            });
        }
    }

    // 联想词点击
    onSuggestionMouseDown = params => {
        const clickValue = params.value;
        this.setState({
            inputValue: clickValue,
            showHotList: false,
            showSuggestionList: false
        });
        const serchInput = document.getElementById('search-input');
        serchInput.value = clickValue;
        if (clickValue !== '') {
            this.setHistory(clickValue);
            window.location.href = location.origin
                + '/pcweb/#/search/searchResults/'
                + encodeURIComponent(clickValue);
        } else {
            this.setState({
                showSuggestionList: false,
                showHotList: false
            });
        }
    }

    onBlur = () => {
        this.setState({
            showHotList: false,
            showSuggestionList: false,
            onFocused: false
        });
    }

    onClearInput = () => {
        const input = document.getElementById('search-input');
        input.value = '';
        this.setState({
            inputValue: ''
        });
        input.focus();
    }

    // 操作历史记录
    setHistory = text => {
        let historyList = [];
        if (window.localStorage.historySearch !== 'undefined'
            && window.localStorage.historySearch !== null
            && window.localStorage.historySearch !== void 0) {
            historyList = JSON.parse(window.localStorage.historySearch);
        }
        if (historyList.indexOf && typeof (historyList.indexOf) === 'function') {
            const index = historyList.indexOf(text);
            if (index === -1) {
                historyList.unshift(text);
                if (historyList.length > 10) {
                    historyList.pop();
                }
                this.setState({
                    showSuggestionList: false,
                    showHotList: false,
                });

                window.localStorage.historySearch = JSON.stringify(historyList);
            }
        }
    }

    render() {
        const {
            showSuggestionList,
            showHotList,
            loggerId,
            hotList,
            suggstionList,
            onFocused
        } = this.state;
        return (
            <div className="search-div">
                <input
                    id="search-input"
                    type="text"
                    className="search-input"
                    onChange={e => this.onChange(e.currentTarget.value)}
                    onKeyPress={self.onSearch}
                    onFocus={self.onFocus}
                    onBlur={self.onBlur}
                    placeholder="搜索你想学的课程试试"
                    autoComplete="off"
                />
                {
                    onFocused
                        ? <img className="icon icon-search" src="https://imgs.genshuixue.com/0cms/d/file/content/2018/09/5b8e5b41b4dce.png" alt="" />
                        : <img className="icon icon-search" src="https://imgs.genshuixue.com/0cms/d/file/content/2018/09/5b8e5b4172f38.png" alt="" />
                }

                <div className="search-list">
                    {/* 热词、历史记录列表 */}
                    {
                        showHotList && hotList.length
                            ? (
                                <HotList
                                    dataList={hotList}
                                    onMouseDown={self.onHotMouseDown}
                                    onFocus={self.onFocus}
                                    loggerId={loggerId}
                                />
                            )
                            : ''
                    }

                    {/* 联想词列表 */}
                    {
                        showSuggestionList && suggstionList.length
                            ? (
                                <SuggestionList
                                    dataList={suggstionList}
                                    onMouseDown={self.onSuggestionMouseDown}
                                    loggerId={loggerId}
                                />
                            )
                            : ''
                    }
                </div>

            </div>
        );
    }
}