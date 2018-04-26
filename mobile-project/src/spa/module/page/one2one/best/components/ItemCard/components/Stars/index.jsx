/**
 * 一对一优选 -- 星星
 * @file huangshiming
 * @data 2017/04/10
 */
import React, { PropTypes } from 'react';
require('css-loader!./index.styl');
const $ = require('zepto');
const initStars = require('common/comment/initStars');
class Stars extends React.Component {
    static propTypes = {
        number: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);
        this.getStars = this.getStars.bind(this);
    }

    componentDidMount() {
        this.getStars(); 
    }

    getStars() {
        const scoreSpan = $('.score-span');
        scoreSpan.each(function () {
            const that = $(this);
            initStars.initStars(that); 
        }); 
    }
    
    render() {
        return (
            <span 
                className="score-span" 
                data-scores={this.props.number}    
            ></span>
        );
    }
}
export default Stars;