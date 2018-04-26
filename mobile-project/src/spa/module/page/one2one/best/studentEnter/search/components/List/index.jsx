/**
 * 一对一优选 -- 列表页面
 * @file huangshiming
 * @data 2017/04/10
 */
import React, { PropTypes } from 'react';
import ListItem from 'spa/module/page/one2one/best/components/ItemCard/index';
require('css-loader!./index.styl');

class List extends React.Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
    };


    // constructor(props) {
    //     super(props);
    //     // this.state = {
    //     //     list: this.props.list
    //     // };
    // }


    // componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         list: nextProps.list
    //     });
    // }

    render() {
        const list = this.props.list;
        return (
            <div className="list-contents">
                {
                    list.map(function (item) {
                        return (
                            <ListItem
                                key={item.number}
                                item={item}
                        />
                        );
                    })
                }
            </div>
        );
    }
}
export default List;