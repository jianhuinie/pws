import React, { PropTypes } from 'react';
import CommonController from 'common/controller/CommonController';
require('css-loader!./index.styl');

export default class Avatar extends CommonController {
    static propTypes = {
        isV: PropTypes.bool,
        // avatarSize: PropTypes.number,
        // avatarVSize: PropTypes.number,
        src: PropTypes.string.isRequired,
        srcV: PropTypes.string,
        className: PropTypes.string
    };
    static defaultProps = {
        isV: false,
        // avatarSize: 56,
        // avatarVSize: 23,
        srcV: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a4af22893683.png',
        className: ''
    };

    render() {
        return (
            <div className={`avatar-container ${this.props.className}`}>
                <img 
                    src={this.props.src} 
                    // height={this.props.avatarSize - 2} 
                    // width={this.props.avatarSize - 2} 
                    className="avatar-container-big" 
                />
                {
                    this.props.isV
                        ?
                            <img 
                                // height={this.props.avatarVSize} 
                                // width={this.props.avatarVSize} 
                                className="avatar-container-v" 
                                src={this.props.srcV}
                            />
                        :
                            null
                }
            </div>
        );
    }
}