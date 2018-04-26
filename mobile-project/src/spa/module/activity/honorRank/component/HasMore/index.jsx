import React, { PropTypes } from 'react';
const $ = require('zepto');

class HasMore extends React.Component {
    static propTypes = {
        hasMore: PropTypes.number.isRequired,
        page: PropTypes.number.isRequired,
        callback: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            hasMore: 0,
            page: this.props.page,
            lastScrollHeight: 1000000000
        };
    }

    componentWillReceiveProps(nextProps) {
        const hasMore = $('.has-more');
        let lastScrollHeight = hasMore.position().top;
        if (+nextProps.hasMore === 0) {
            lastScrollHeight = 1000000000;
        }
        this.setState({
            hasMore: nextProps.hasMore,
            page: nextProps.page,
            lastScrollHeight: lastScrollHeight
        });
    }

    componentDidUpdate() {
        const self = this;
        const getList = (obj) => {
            if (typeof self.props.callback === 'function') {
                self.props.callback(obj);
            }
        }

        const initDom = () => {
            if (window.scrollY + window.innerHeight >= self.state.lastScrollHeight - 20) {
                getList({
                    page: self.state.page
                });
            }
        };
        $(window).unbind('scroll', initDom);
        $(window).on('scroll', initDom);
    }

    render() {
        return (
            <div className={this.state.hasMore ? 'has-more' : 'has-more hide'}>
            </div>
        );
    }
};

export default HasMore;