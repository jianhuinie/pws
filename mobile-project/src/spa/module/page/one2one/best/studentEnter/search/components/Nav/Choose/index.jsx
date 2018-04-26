/**
 * 一对一筛选-筛选组件
 * @file huangshiming
 * @data 2017/04/10
 */
import React, { PropTypes } from 'react';
import ChooseItem from './ChooseItem/index';
import ChooseButton from './ChooseButton/index';
require('css-loader!./index.styl');

class Choose extends React.Component {
    static PropTypes = {
        callback: PropTypes.func.isRequired,
        chooseObj: PropTypes.object.isRequired,
        show: PropTypes.number.isRequired,
        params: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            choose: {
                sex: [],
                school_age: [],
                price_range: []
            },
            chooseIndex: {
                sex: 0,
                schoolAge: 0,
                priceRange: 0
            }
        };

        this.reset = this.reset.bind(this);
        this.confirm = this.confirm.bind(this);
        this.chooseSex = this.chooseSex.bind(this);
        this.chooseTeachTime = this.chooseTeachTime.bind(this);
        this.choosePrice = this.choosePrice.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const chooseIndex = this.state.chooseIndex;
        chooseIndex.sex = nextProps.params.sex;
        chooseIndex.schoolAge = nextProps.params.school_age;
        chooseIndex.priceRange = nextProps.params.price_range;
        this.setState({
            choose: nextProps.chooseObj,
            show: nextProps.show
        });
    }

    reset() {
        const chooseIndex = this.state.chooseIndex;
        chooseIndex.sex = 0;
        chooseIndex.schoolAge = 0;
        chooseIndex.priceRange = 0;
        this.setState({
            chooseIndex: chooseIndex
        });
    }

    confirm(data) {
        const chooseIndex = this.state.chooseIndex;
        chooseIndex.sex = data.sex;
        chooseIndex.schoolAge = data.schoolAge;
        chooseIndex.priceRange = data.priceRange;
        const datas = {
            sex: data.sex,
            schoolAge: data.schoolAge,
            priceRange: data.priceRange
        };
        this.props.callback(datas);
    }

    chooseSex(data) {
        const chooseIndex = this.state.chooseIndex;
        chooseIndex.sex = +data.value;
        this.setState({
            chooseIndex: chooseIndex
        });
    }

    chooseTeachTime(data) {
        const chooseIndex = this.state.chooseIndex;
        chooseIndex.schoolAge = +data.value;
        this.setState({
            chooseIndex: chooseIndex
        });
    }

    choosePrice(data) {
        const chooseIndex = this.state.chooseIndex;
        chooseIndex.priceRange = +data.value;
        this.setState({
            chooseIndex: chooseIndex
        });
    }

    render() {
        return (
            <div
                className={this.props.show ? 'choose-content' : 'choose-content hide'}
            >
                <div className='choose-content-item'>
                    <ChooseItem
                        name="老师性别"
                        index={+this.state.chooseIndex.sex}
                        itemArray={this.state.choose.sex}
                        callback={this.chooseSex}
                    />

                    <ChooseItem
                        name="教龄范围"
                        index={+this.state.chooseIndex.schoolAge}
                        itemArray={this.state.choose.school_age}
                        callback={this.chooseTeachTime}
                    />

                    <ChooseItem
                        name="价格区间"
                        index={+this.state.chooseIndex.priceRange}
                        itemArray={this.state.choose.price_range}
                        callback={this.choosePrice}
                    />

                </div>
                <ChooseButton
                    chooseIndex={this.state.chooseIndex}
                    callbackReset={this.reset}
                    callbackConfirm={this.confirm}
                />
            </div>
        );
    }

}

export default Choose;