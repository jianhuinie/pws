import React from 'react';
import { Radio } from 'antd';
import CommonController from 'common/controller/CommonController';
require('css-loader!./index.styl');

export default class CourseRadio extends CommonController {
    
    constructor(props) {
        super(props);
        this.state = {
            selectedId: props.defaultCourseType
        };
    }

    /**
     * @override
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        const me = this;
        if (nextProps.defaultCourseType && nextProps.defaultCourseType !== me.props.defaultCourseType) {
            me.setState({
                selectedId: nextProps.defaultCourseType
            });
        }
    }
    
    /**
     * 处理选中
     */
    handleChange = (e) => {
        this.setState({
            selectedId: e.target.value
        });
        this.props.onChange(e.target.value);
    }
 
    render() {
        const RadioButton = Radio.Button;
        const RadioGroup = Radio.Group;
        return (
            <div className="course-radio">
                <RadioGroup 
                    onChange={this.handleChange} 
                    value={this.state.selectedId}
                >
                    {
                        this.props.options.map((item) => (
                            <div key={item.id} className="course-radio-item">
                                <RadioButton value={item.id}>{item.name}</RadioButton>
                                {
                                    this.state.selectedId === item.id ? <span className="icon-type-select" /> : null
                                }    
                            </div>
                            
                        ))
                    }
                </RadioGroup>
            </div>
        );
    }
}

