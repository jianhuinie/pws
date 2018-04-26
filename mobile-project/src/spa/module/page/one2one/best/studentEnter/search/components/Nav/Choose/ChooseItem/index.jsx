import React, { PropTypes } from 'react';
require('css-loader!./index.styl');

class ChooseItem extends React.Component {
    static propTypes ={
        callback: PropTypes.func.isRequired,
        itemArray: PropTypes.array.isRequired,
        name: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            itemArray: this.props.itemArray,
            index: +this.props.index,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            itemArray: nextProps.itemArray,
            index: +nextProps.index
        });
    }

    clickChooseItem(item) {
        if (typeof this.props.callback === 'function') {
            this.props.callback({
                value: +item.value
            });
        }
    }

    render() {
        const self = this;
        return (
            <div className="choose-items">
                <div className="itemName">{self.props.name}</div>
                <div className="items-content">
                    {
                        self.props.itemArray.map(function (item, index) {
                            return (
                                <span
                                    key={index}
                                    className={+item.value === +self.state.index ? 'active-item' : 'normal-item'}
                                    onClick={self.clickChooseItem.bind(self, item)}
                                >
                                    {item.name}
                                </span>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
export default ChooseItem;