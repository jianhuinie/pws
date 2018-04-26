/**
 * Suggestion
 * @file hurry
 * @date 2017/04/11
 */
import React, { PropTypes } from 'react';
const $ = require('zepto');
require('css-loader!./index.styl');

class Suggestion extends React.Component {
    static propTypes = {
        /**
         * @params {Array<Object>} 数据源
         * 例如:
         *      [
         *          {
         *              value: 1001,
         *              title: 'hello'
         *          }
         *      ]
         */
        dataSource: PropTypes.array,
        // 选中回调
        onSelectedHandler: PropTypes.func.isRequired,
        // 样式
        className: PropTypes.string
    };
    static defaultProps = {
        dataSource: null,
        className: ''
    }
    constructor(props) {
        super(props);
        this.onSelected = this.onSelected.bind(this);
        this.state = {
            isOpen: false
        };
    }
    componentDidMount() {
        const me = this;
        $(document.body).on('click', function () {
            me.setState({
                isOpen: false
            });
        });
    }
    componentWillReceiveProps() {
        let isOpen = false;
        if (Array.isArray(this.props.dataSource) && this.props.dataSource.length) {
            isOpen = true;
        }
        this.setState({
            isOpen: isOpen
        });
    }
    onSelected(event) {
        const target = $(event.target);
        if (typeof this.props.onSelectedHandler === 'function') {
            this.props.onSelectedHandler({
                value: target.data('val'),
                title: target.text()
            });
        }
    }
    render() {
        return (
            <div
                className={`suggestion ${this.props.className} ${this.state.isOpen ? '' : 'hidden'}`}
                onClick={this.onSelected}>
                {
                    this.props.dataSource && this.props.dataSource.map(function (item) {
                        return (
                            <div
                                key={item.value}
                                className="item"
                                data-val={item.value}
                            >
                                {item.title}
                            </div>
                        );
                    })
                }
            </div>
        );
    }
};

export default Suggestion;