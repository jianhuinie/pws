/**
 * 搜索科目输入框
 */

import React from 'react';
const uiNew = require('common/ui');
require('css-loader!./index.styl');

class AutoSearchSubject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showDropdownList: 0,
            dropList: [],
            inputSubject: null
        };
        this.getDropdownList = this.getDropdownList.bind(this);
        this.getOrangeBorder = this.getOrangeBorder.bind(this);
        this.removeOrangeBorder = this.removeOrangeBorder.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const self = this;
        
        if (nextProps.isPost === 0) {
            const stateObj = self.state;
            stateObj.inputSubject = null;
            self.setState(stateObj);
        }
    }

    getOrangeBorder(e) {
        $(e.target).removeClass('gray');
        $(e.target).parent().removeClass('gray').addClass('orange');
    }

    getDropdownList(event) {
        const self = this;
        const val = $.trim(event.target.value);
        let url = 'https://suggestion.genshuixue.com/s';

        if (location.host.indexOf('beta') !== -1) {
            url = 'https://beta-suggestion.genshuixue.com/s';
        }
        
        self.setState({
            inputSubject: val
        });

        if (val) {
            const params = {
                key: val,
                type: 1,
                v: 2
            };

            $.ajax({
                url: url,
                data: params,
                dataType: 'jsonp'
            }).done(function (res) {
                if (+res.code === 1) {
                    const dataList = res.result && res.result.r;
                    if (dataList.length > 0) {
                        const stateObj = self.state;
                        stateObj.showDropdownList = 1;
                        stateObj.dropList = dataList;
                        self.setState(stateObj);
                    }
                } else {
                    uiNew.alert(res.message);
                }
            });
        } else {
            self.choosedSubject({});
        }
    }

    removeOrangeBorder(e) {
        const domEle = $(e.target);
        const val = $.trim(domEle.val());
        if (!val) {
            domEle.addClass('gray');
            domEle.parent().addClass('gray');
        }
        domEle.parent().removeClass('orange');
    }

    choosedSubject(item) {
        const self = this;
        self.setState({
            showDropdownList: 0,
            dropList: [],
            inputSubject: item.title || ''
        });
        // self.refs.myTextInput.value = item.title || '';
        self.props.callbackChoosed(item);
    }
    
    render() {
        const self = this;
        const dataList = self.state.dropList;
        const inputSubject = self.state.inputSubject || '';

        const subjectComponents = dataList.map(function (item) {
            return <li className="subject-li" key={item.id} onClick={self.choosedSubject.bind(self, item)}>{item.title}</li>;
        });


        return (
            <div className="input-border name-border subject-border gray">
                <input 
                    className="subject gray" type="text" name="subject-search"
                    required="required" ref="myTextInput" value={inputSubject}
                    onFocus={self.getOrangeBorder} onBlur={self.removeOrangeBorder}
                    maxLength="20" placeholder="您要学习的科目" onChange={self.getDropdownList} />
                <ul 
                    className={self.state.showDropdownList ? 'search-suggestion' : 'search-suggestion hide'} 
                    data-type="liudan">
                    {subjectComponents}
                </ul>
            </div>
        );
    }
};

export default AutoSearchSubject;