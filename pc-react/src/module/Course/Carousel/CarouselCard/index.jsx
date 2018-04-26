/**
 * 轮播图所有卡片
 * 
 * @author zhaoxiudan@baijiahulian.com
 */

import React, { PropTypes } from 'react';
import PageController from 'common/controller/PageController';
import CarouselCardItem from '../CarouselCardItem/index';
import Dragula from 'dragula';
import { Button } from 'antd';
require('css-loader!./index.styl');

export default class CarouselCard extends PageController {

    static propTypes = {
        list: PropTypes.array,
        onChange: PropTypes.func,
        onDelete: PropTypes.func,
        onAdd: PropTypes.func,
        onChangeSeq: PropTypes.func
    };

    /**
     * 处理拖拽
     */
    handleDrag = (carousleCard) => {
        const me = this;
        if (carousleCard) {
            const options = { 
                accepts: function (el, target, source, sibling) {
                    if (sibling) {
                        me.props.onChangeSeq(Number(el.id), Number(sibling.id));
                    } else {
                        me.props.onChangeSeq(Number(el.id), undefined);
                    }
                    return true;
                }
            };
            Dragula([carousleCard], options);
        }
    }

    /**
     * @override
     */
    render() {
        return (
            <div className="carousel-card">
                <div className="carousel-card-title">课堂轮播图</div>
                <div className="carousel-card-items" ref={this.handleDrag}>
                    {
                        this.props.list ?
                            this.props.list.map((item) => {
                                return (
                                    <CarouselCardItem
                                        key={item.bannerId} 
                                        item={item}
                                        onChange={this.props.onChange} 
                                        onDelete={this.props.onDelete} 
                                    />
                                );
                            })
                        :
                        null
                    }
                </div>
                <div className="carousel-card-add">
                    <Button className={this.props.list.length > 7 ? 'carousel-card-add-button white-btn classic-btn disabled' : 'carousel-card-add-button white-btn classic-btn'} onClick={this.props.onAdd}>添加课堂轮播图</Button>
                    <span className="carousel-card-add-tip">最多添加8张</span>
                </div>
            </div>
        );
    }
}