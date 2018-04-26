import React, { PropTypes } from 'react';
require('css-loader!./index.styl');

class Sort extends React.Component {
    static propTypes = {
        callback: PropTypes.func.isRequired,
        sortWayIndex: PropTypes.string.isRequired,
        sortWayArray: PropTypes.array.isRequired,
        show: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            index: this.props.sortWayIndex
        };
    }

    chooseSort(item) {
        const data = {
            sortName: item.name,
            id: item.id
        };
        this.setState({
            index: item.id
        });

        if (typeof this.props.callback === 'function') {
            this.props.callback(data);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            index: nextProps.sortWayIndex,
        });
    }

    render() {
        const self = this;
        return (
            <div className={this.props.show ? 'sort-content' : 'sort-content hide'}>
                {
                    this.props.sortWayArray.map(function (item, index) {
                        return (
                            <div
                                className="item"
                                onClick={self.chooseSort.bind(self, item)}
                                key={index}
                            >
                                <span className={self.state.index === item.id ? 'text text-active' : 'text'}>{item.name}</span>
                                <i className={self.state.index === item.id ? 'icon icon-checkmark' : 'icon icon-checkmark hide'}></i>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default Sort;
