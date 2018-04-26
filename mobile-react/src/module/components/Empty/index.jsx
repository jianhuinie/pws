import CommonController from 'common/controller/CommonController';
import React, { PropTypes } from 'react';
require('css-loader!./index.styl');

export default class Empty extends CommonController {

    static propTypes = {
        emptyText: PropTypes.string,
        className: PropTypes.string,
        buttonText: PropTypes.string,
        next: PropTypes.string,
        image: PropTypes.string
    };

    static defaultProps = {
        emptyText: '暂无相关内容',
        className: '',
        image: '',
        buttonText: ''
    };
    
    render() {
        return (
            <div className={`empty-container ${this.props.className}`}>
                <div className="empty-content">
                    <img className="empty-content-img" src={this.props.image} />
                    <div className="empty-content-text">{this.props.emptyText}</div>
                    {
                        this.props.buttonText 
                            ?
                            <a href={this.props.redirect}>
                                <button className="ws-btn-red empty-content-btn">{this.props.buttonText}</button>
                            </a>
                            :
                            null
                    }
                </div>
            </div>
        );
    }
}