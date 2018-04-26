import CommonController from 'common/controller/CommonController';
import React, { PropTypes } from 'react';
import SlideInDialog from 'common/components/SlideInDialog/index';
import { walletTypeEnum, walletTypeMap } from 'common/enum/walletDetailType';
require('css-loader!./index.styl');

export default class FilterPannel extends CommonController {

    static propTypes = {
        isShowFilter: PropTypes.bool,
        selectKey: PropTypes.number,
        onTypeChange: PropTypes.func.isRequired
    };

    static defaultProps = {
        isShowFilter: false,
        selectKey: walletTypeEnum.ALL
    };

    constructor(props) {
        super(props);
        this.state = {
            isShowFilter: props.isShowFilter,
            selectKey: props.selectKey
        };
        this.showFilter = this.showFilter.bind(this);
        this.closeFilter = this.closeFilter.bind(this);
    }

    /**
     * 打开面板
     */
    showFilter() {
        this.setState({
            isShowFilter: true
        });
    }
    
    /**
     * 关闭面板
     */
    closeFilter() {
        this.setState({
            isShowFilter: false
        });
    }

    /**
     * 点击某一类型
     * @param {number} key 
     */
    handleTypeClick(key) {
        if (key !== this.state.selectKey) {
            this.setState({
                selectKey: key
            });
            this.props.onTypeChange(key);
            this.closeFilter();
        }
    }

    render() {
        return (
            <div className="filter-pannel">
                <div className="filter-pannel-btn" onClick={this.showFilter}>
                    筛选
                </div>
                <SlideInDialog 
                    onCloseHandler={this.closeFilter} 
                    isShowDialog={this.state.isShowFilter}
                >
                    <div className="filter-pannel-content">
                        <div className="filter-pannel-content-title">选择筛选类型</div>
                        <div className="filter-pannel-content-option">
                            { 
                                Object.keys(walletTypeEnum).map((item) => {
                                    const key = walletTypeEnum[item];
                                    return (
                                        <div
                                             key={key} 
                                             className={`option-item ${this.state.selectKey === key ? 'active' : ''}`}
                                             onClick={() => {
                                                 this.handleTypeClick(key);
                                             }}
                                        >
                                            {walletTypeMap.get(key)}
                                        </div>
                                    );
                                })
                            }
                            <div className="option-item clear"></div>
                            <div className="option-item clear"></div>
                        </div>
                        <div className="filter-pannel-content-close" onClick={this.closeFilter}>
                            取消
                        </div>
                    </div> 
                </SlideInDialog>
            </div>
        );
    }
}