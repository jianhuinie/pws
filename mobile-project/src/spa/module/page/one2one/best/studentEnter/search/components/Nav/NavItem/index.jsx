import React, { PropTypes } from 'react';
require('css-loader!./index.styl');

class NavItem extends React.Component {
    static propTypes = {
        callback: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        itemClassStatus: PropTypes.string.isRequired,
        iconStatus: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.clickNavItem = this.clickNavItem.bind(this);
    }

    clickNavItem() {
        if (typeof this.props.callback === 'function') {
            this.props.callback();
        }
    }

    render() {
        return (
            <div 
                className={this.props.itemClassStatus}
                onClick={this.clickNavItem}
            >
                <span className="text">
                    {this.props.name}
                    <i className={this.props.iconStatus}></i>
                </span>
            </div>
        );
    }

}

export default NavItem;