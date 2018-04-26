/**
 * 人气榜-列表
 * @author huangshiming
 * @data 2017/05/05
 */

import React, { PropTypes } from 'react';
import ListItem from './ItemCard/index';
require('css-loader!./index.styl');

class ItemListContainer extends React.Component {

    static propTypes = {
        list: PropTypes.array.isRequired,
        type: PropTypes.string.isRequired
    };


    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            list: nextProps.list
        });
    }

    render() {
        const list = this.state.list;
        const type = this.props.type;
        return (
            <div className="box-list">
                {
                    list.map(function (item, index) {
                        return (
                            <ListItem 
                                key={item.rank_order + type}
                                item={item}
                                type={type}
                            />
                        );
                    })
                }
            </div>
        );
    }
};
export default ItemListContainer;